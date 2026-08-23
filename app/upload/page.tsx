"use client";

import { useState, useCallback, useEffect } from "react";

interface FileEntry {
  name: string;
  size: number;
  created: number;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / 1048576).toFixed(1) + " MB";
}

const IMAGE_EXT = /\.(jpg|jpeg|png|gif|webp|svg|bmp|ico)$/i;
const VIDEO_EXT = /\.(mp4|webm|mov|avi|mkv)$/i;

export default function UploadPage() {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [preview, setPreview] = useState<string | null>(null);

  const loadFiles = useCallback(async () => {
    const res = await fetch("/api/upload");
    const data = await res.json();
    setFiles(data.files);
  }, []);

  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  const handleUpload = async (fileList: FileList | File[]) => {
    const formData = new FormData();
    Array.from(fileList).forEach((f) => formData.append("files", f));
    setUploading(true);
    await fetch("/api/upload", { method: "POST", body: formData });
    setUploading(false);
    loadFiles();
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) handleUpload(e.dataTransfer.files);
  };

  const onDelete = async (name: string) => {
    await fetch(`/api/upload?name=${encodeURIComponent(name)}`, {
      method: "DELETE",
    });
    loadFiles();
  };

  const isImage = (name: string) => IMAGE_EXT.test(name);
  const isVideo = (name: string) => VIDEO_EXT.test(name);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-10">
      <h1 className="text-3xl font-bold mb-2 tracking-tight">
        Upload <span className="text-[var(--volt,#a3e635)]">Foto / Video</span>
      </h1>
      <p className="text-neutral-400 mb-8 text-sm">
        Upload file ke sini biar gue bisa liat langsung. Drag & drop atau klik.
      </p>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => document.getElementById("file-input")?.click()}
        className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
          dragging
            ? "border-[var(--volt,#a3e635)] bg-[var(--volt,#a3e635)]/5"
            : "border-neutral-700 hover:border-neutral-500"
        }`}
      >
        <input
          id="file-input"
          type="file"
          multiple
          accept="image/*,video/*,.md,.txt,text/*"
          className="hidden"
          onChange={(e) => e.target.files && handleUpload(e.target.files)}
        />
        <div className="text-4xl mb-3">{uploading ? "⏳" : "📁"}</div>
        <p className="text-neutral-300 font-medium">
          {uploading
            ? "Uploading..."
            : "Drop foto/video di sini atau klik untuk pilih"}
        </p>
        <p className="text-neutral-500 text-xs mt-2">
          JPG, PNG, GIF, WebP, MP4, WebM, MOV
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-4 text-neutral-200">
            Uploaded Files ({files.length})
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {files.map((f) => (
              <div
                key={f.name}
                className="group relative bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-neutral-600 transition cursor-pointer"
                onClick={() => {
                  if (isImage(f.name)) setPreview(`/uploads/${f.name}`);
                }}
              >
                {isImage(f.name) ? (
                  <img
                    src={`/uploads/${f.name}`}
                    alt={f.name}
                    className="w-full h-32 object-cover"
                  />
                ) : isVideo(f.name) ? (
                  <video
                    src={`/uploads/${f.name}`}
                    className="w-full h-32 object-cover"
                    muted
                    preload="metadata"
                  />
                ) : (
                  <div className="w-full h-32 flex items-center justify-center text-2xl">
                    📄
                  </div>
                )}
                <div className="p-2">
                  <p className="text-xs truncate text-neutral-300">{f.name}</p>
                  <p className="text-[10px] text-neutral-500">
                    {formatSize(f.size)}
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(f.name);
                  }}
                  className="absolute top-1.5 right-1.5 bg-red-600/80 hover:bg-red-500 text-white text-xs w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                >
                  x
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {preview && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setPreview(null)}
        >
          <img
            src={preview}
            alt="preview"
            className="max-w-full max-h-[85vh] rounded-xl shadow-2xl"
          />
          <button className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl">
            x
          </button>
        </div>
      )}
    </div>
  );
}
