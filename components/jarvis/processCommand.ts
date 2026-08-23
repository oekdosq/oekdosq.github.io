"use client";

import { speak, speakEnglish } from "./useTTS";

interface CommandContext {
  notes: string[];
  addNote: (note: string) => void;
  deleteNote: (index: number) => void;
  toggleMusic: () => void;
  isPlaying: boolean;
  addLog: (log: string) => void;
}

const SITE_MAP: Record<string, string> = {
  youtube: "https://youtube.com",
  google: "https://google.com",
  github: "https://github.com",
  instagram: "https://instagram.com",
  twitter: "https://twitter.com",
  tiktok: "https://tiktok.com",
  facebook: "https://facebook.com",
  discord: "https://discord.com",
  spotify: "https://spotify.com",
  netflix: "https://netflix.com",
  reddit: "https://reddit.com",
  linkedin: "https://linkedin.com",
  whatsapp: "https://web.whatsapp.com",
  chatgpt: "https://chatgpt.com",
  claude: "https://claude.ai",
  gemini: "https://gemini.google.com",
  maps: "https://maps.google.com",
  gmail: "https://mail.google.com",
  drive: "https://drive.google.com",
  docs: "https://docs.google.com",
  sites: "https://sites.google.com",
};

function openSite(name: string) {
  const url = SITE_MAP[name.toLowerCase()];
  if (url) {
    window.open(url, "_blank");
    return true;
  }
  return false;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 5) return "Malam, belum tidur?";
  if (hour < 12) return "Selamat pagi";
  if (hour < 17) return "Selamat siang";
  if (hour < 21) return "Selamat sore";
  return "Selamat malam";
}

function getTimeString(): string {
  const now = new Date();
  return now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function getDateString(): string {
  const now = new Date();
  return now.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function processCommand(
  raw: string,
  ctx: CommandContext
): string | null {
  const cmd = raw.toLowerCase().trim();
  ctx.addLog(raw);

  // === GREETINGS ===
  if (
    cmd.includes("halo") || cmd.includes("hei") || cmd.includes("hai") ||
    cmd.includes("hello") || cmd.includes("hi jarvis") || cmd.includes("hey") ||
    cmd.includes("yo") || cmd.includes("woi") || cmd.includes("bro")
  ) {
    const response = `${getGreeting()}! Ada yang bisa gue bantu?`;
    speak(response);
    return response;
  }

  // === TIME ===
  if (
    cmd.includes("jam berapa") || cmd.includes("jam pintar") ||
    cmd.includes("what time") || cmd.includes("what's the time") ||
    cmd.includes("time is it") || cmd.includes("sekarang jam") ||
    cmd.includes("what time is it")
  ) {
    const time = getTimeString();
    const response = `Sekarang jam ${time}`;
    speak(response);
    return response;
  }

  // === DATE ===
  if (
    cmd.includes("tanggal berapa") || cmd.includes("hari apa") ||
    cmd.includes("what date") || cmd.includes("what day") ||
    cmd.includes("what's the date") || cmd.includes("date today") ||
    cmd.includes("what's today") || cmd.includes("what day is it")
  ) {
    const date = getDateString();
    const response = `Hari ini ${date}`;
    speak(response);
    return response;
  }

  // === WEATHER ===
  if (
    cmd.includes("cuaca") || cmd.includes("weather") ||
    cmd.includes("hujan") || cmd.includes("panas") ||
    cmd.includes("dingin") || cmd.includes("mendung")
  ) {
    const response =
      "Cuaca hari ini cerah, suhu 28 derajat celcius, kelembaban 72 persen. Angin sepoi-sepoi 12 kilometer per jam.";
    speak(response);
    return response;
  }

  // === OPEN SITE ===
  if (cmd.includes("buka ") || cmd.includes("open ")) {
    const words = cmd.replace("buka ", "").replace("open ", "").trim();
    for (const [name, url] of Object.entries(SITE_MAP)) {
      if (words.includes(name)) {
        openSite(name);
        const response = `Membuka ${name}`;
        speak(response);
        return response;
      }
    }
    // If not found in map, try google search
    const response = `Mencari "${words}" di Google`;
    window.open(`https://google.com/search?q=${encodeURIComponent(words)}`, "_blank");
    speak(response);
    return response;
  }

  // === NOTES ===
  if (cmd.includes("tambah catatan") || cmd.includes("catatan baru") ||
      cmd.includes("add note") || cmd.includes("new note") || cmd.includes("simpan catatan")) {
    let note = raw;
    const patterns = [
      /tambah catatan (.+)/i,
      /catatan baru (.+)/i,
      /add note (.+)/i,
      /new note (.+)/i,
      /simpan catatan (.+)/i,
      /note (.+)/i,
    ];
    for (const p of patterns) {
      const m = raw.match(p);
      if (m) { note = m[1]; break; }
    }
    ctx.addNote(note);
    const response = `Catatan tersimpan: ${note}`;
    speak(response);
    return response;
  }

  if (cmd.includes("hapus catatan") || cmd.includes("delete note") || cmd.includes("remove note")) {
    const m = cmd.match(/(\d+)/);
    if (m) {
      const idx = parseInt(m[1]) - 1;
      ctx.deleteNote(idx);
      const response = `Catatan nomor ${m[1]} dihapus`;
      speak(response);
      return response;
    }
    const response = "Sebutkan nomor catatan yang ingin dihapus";
    speak(response);
    return response;
  }

  if (cmd.includes("baca catatan") || cmd.includes("read note") || cmd.includes("list catatan")) {
    if (ctx.notes.length === 0) {
      const response = "Belum ada catatan";
      speak(response);
      return response;
    }
    const response = `Kamu punya ${ctx.notes.length} catatan. ${ctx.notes.map((n, i) => `Nomor ${i + 1}: ${n}`).join(". ")}`;
    speak(response);
    return response;
  }

  // === MUSIC ===
  if (cmd.includes("musik") || cmd.includes("music") || cmd.includes("lagu") ||
      cmd.includes("putar") || cmd.includes("play") || cmd.includes("stop") ||
      cmd.includes("pause") || cmd.includes("matikan musik")) {
    ctx.toggleMusic();
    const response = ctx.isPlaying ? "Musik dimatikan" : "Musik dinyalakan";
    speak(response);
    return response;
  }

  // === SYSTEM INFO ===
  if (cmd.includes("sistem") || cmd.includes("system") || cmd.includes("info laptop") ||
      cmd.includes("info komputer") || cmd.includes("spec")) {
    const cores = navigator.hardwareConcurrency || "N/A";
    const ram = (performance as any).deviceMemory || "N/A";
    const response = `Sistem kamu punya ${cores} core CPU, RAM ${ram} GB, platform ${navigator.platform}`;
    speak(response);
    return response;
  }

  // === HELP ===
  if (cmd.includes("bantuan") || cmd.includes("help") || cmd.includes("bisa apa") ||
      cmd.includes("apa yang bisa") || cmd.includes("command") || cmd.includes("perintah")) {
    const response =
      "Aku bisa bantu: cek jam, cek tanggal, cek cuaca, buka website, simpan catatan, putar musik, dan info sistem. Coba bilang: buka YouTube, jam berapa, atau tambah catatan belajar coding.";
    speak(response);
    return response;
  }

  // === CALCULATOR (simple) ===
  if (cmd.includes("kalkulasi") || cmd.includes("hitung") || cmd.includes("calculate")) {
    try {
      const expr = cmd.replace(/[a-z\s]+/gi, "").replace(/[^0-9+\-*/().]/g, "");
      if (expr) {
        const result = Function(`"use strict"; return (${expr})`)();
        const response = `Hasilnya adalah ${result}`;
        speak(response);
        return response;
      }
    } catch {}
    const response = "Maaf, saya tidak bisa menghitung itu. Coba format: hitung 2 + 3";
    speak(response);
    return response;
  }

  // === SHUTDOWN / BYE ===
  if (cmd.includes("matikan") || cmd.includes("shutdown") || cmd.includes("bye") ||
      cmd.includes("dadah") || cmd.includes("sampai jumpa") || cmd.includes("see you")) {
    const response = "Sampai jumpa! Hati-hati di jalan.";
    speak(response);
    return response;
  }

  // === DEFAULT ===
  const response = `Maaf, saya belum mengerti perintah "${raw}". Bilang "help" untuk daftar perintah.`;
  speak(response);
  return response;
}
