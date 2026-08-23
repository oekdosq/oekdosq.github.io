interface ID3Result {
  title?: string;
  artist?: string;
  album?: string;
  artworkBlob?: Blob;
  artworkMime?: string;
}

function readSyncsafeInt(buf: Uint8Array, offset: number): number {
  return (
    ((buf[offset] & 0x7f) << 21) |
    ((buf[offset + 1] & 0x7f) << 14) |
    ((buf[offset + 2] & 0x7f) << 7) |
    (buf[offset + 3] & 0x7f)
  );
}

function readUint32(buf: Uint8Array, offset: number): number {
  return (buf[offset] << 24) | (buf[offset + 1] << 16) | (buf[offset + 2] << 8) | buf[offset + 3];
}

function decodeText(buf: Uint8Array, offset: number, end: number): string {
  if (end <= offset) return "";
  const encoding = buf[offset];
  const data = buf.subarray(offset + 1, end);
  let decoder: TextDecoder;
  switch (encoding) {
    case 1: decoder = new TextDecoder("utf-16"); break;
    case 2: decoder = new TextDecoder("utf-16be"); break;
    case 3: decoder = new TextDecoder("utf-8"); break;
    default: decoder = new TextDecoder("iso-8859-1"); break;
  }
  return decoder.decode(data).replace(/\0+$/, "").trim();
}

function findNullTerm(buf: Uint8Array, start: number, end: number, doubleByte: boolean): number {
  for (let i = start; i < end - 1; i++) {
    if (doubleByte) {
      if (buf[i] === 0 && buf[i + 1] === 0) return i;
    } else {
      if (buf[i] === 0) return i;
    }
  }
  return end;
}

export async function parseID3(file: File): Promise<ID3Result> {
  if (!file.name.toLowerCase().endsWith(".mp3") && !file.type.includes("mpeg")) {
    return {};
  }

  try {
    const header = new Uint8Array(await file.slice(0, 10).arrayBuffer());
    if (header[0] !== 0x49 || header[1] !== 0x44 || header[2] !== 0x53) return {};

    const version = header[3];
    const tagSize = readSyncsafeInt(header, 6);
    if (tagSize < 1 || tagSize > 10 * 1024 * 1024) return {};

    const tagData = new Uint8Array(await file.slice(10, 10 + tagSize).arrayBuffer());
    const isV24 = version === 4;
    const result: ID3Result = {};

    let pos = 0;
    while (pos < tagData.length - 10) {
      const frameId = String.fromCharCode(tagData[pos], tagData[pos + 1], tagData[pos + 2], tagData[pos + 3]);
      if (frameId[0] === "\0") break;
      if (!/^[A-Z0-9]{4}$/.test(frameId)) break;

      const frameSize = isV24 ? readSyncsafeInt(tagData, pos + 4) : readUint32(tagData, pos + 4);
      if (frameSize <= 0 || pos + 10 + frameSize > tagData.length) break;

      const frameData = tagData.subarray(pos + 10, pos + 10 + frameSize);
      const frameStart = pos + 10;
      const frameEnd = pos + 10 + frameSize;

      if (frameId === "TIT2" && !result.title) {
        const text = decodeText(tagData, frameStart, frameEnd);
        if (text) result.title = text;
      } else if (frameId === "TPE1" && !result.artist) {
        const text = decodeText(tagData, frameStart, frameEnd);
        if (text) result.artist = text;
      } else if (frameId === "TALB" && !result.album) {
        const text = decodeText(tagData, frameStart, frameEnd);
        if (text) result.album = text;
      } else if (frameId === "APIC" && !result.artworkBlob) {
        try {
          const encoding = tagData[frameStart];
          const doubleByte = encoding === 1 || encoding === 2;
          let p = frameStart + 1;

          const mimeEnd = findNullTerm(tagData, p, frameEnd, false);
          const mime = new TextDecoder("ascii").decode(tagData.subarray(p, mimeEnd));
          p = mimeEnd + 1;

          p += 1;

          const descEnd = findNullTerm(tagData, p, frameEnd, doubleByte);
          p = descEnd + (doubleByte ? 2 : 1);

          if (p < frameEnd) {
            result.artworkBlob = new Blob([tagData.subarray(p, frameEnd)], {
              type: mime || "image/jpeg",
            });
            result.artworkMime = mime || "image/jpeg";
          }
        } catch {}
      }

      pos += 10 + frameSize;
    }

    return result;
  } catch {
    return {};
  }
}
