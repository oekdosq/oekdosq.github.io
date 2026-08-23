"use client";

import { useEffect, useState } from "react";

export function ClockWidget() {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
      setDate(
        now.toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-cyan-400/5 border border-cyan-400/15 rounded-lg p-4 backdrop-blur-sm">
      <div className="text-[9px] text-cyan-400/50 font-mono tracking-[0.3em] uppercase mb-3">
        Clock
      </div>
      <div className="text-3xl font-mono font-bold text-cyan-400 tracking-wider text-center tabular-nums">
        {time}
      </div>
      <div className="text-[10px] text-cyan-400/40 font-mono text-center mt-2 tracking-wide">
        {date}
      </div>
    </div>
  );
}

export function WeatherWidget({ data }: { data?: any }) {
  const [weather, setWeather] = useState<any>(data || null);

  useEffect(() => {
    if (!weather) {
      // Simulated weather data
      setWeather({
        temp: 28,
        condition: "Cerah",
        humidity: 72,
        wind: "12 km/h",
        feelsLike: 31,
        icon: "☀️",
      });
    }
  }, [weather]);

  if (!weather) return null;

  return (
    <div className="bg-cyan-400/5 border border-cyan-400/15 rounded-lg p-4 backdrop-blur-sm">
      <div className="text-[9px] text-cyan-400/50 font-mono tracking-[0.3em] uppercase mb-3">
        Weather
      </div>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-mono font-bold text-cyan-400">
            {weather.temp}°C
          </div>
          <div className="text-[10px] text-cyan-400/50 mt-1">{weather.condition}</div>
        </div>
        <div className="text-4xl">{weather.icon}</div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-cyan-400/10">
        <div>
          <div className="text-[8px] text-cyan-400/30 font-mono">HUMIDITY</div>
          <div className="text-xs text-cyan-400/70">{weather.humidity}%</div>
        </div>
        <div>
          <div className="text-[8px] text-cyan-400/30 font-mono">WIND</div>
          <div className="text-xs text-cyan-400/70">{weather.wind}</div>
        </div>
      </div>
    </div>
  );
}

export function SystemWidget() {
  const [info, setInfo] = useState({
    ram: "N/A",
    cores: "N/A",
    platform: "N/A",
    battery: "N/A",
  });

  useEffect(() => {
    setInfo({
      ram: `${Math.round((performance as any).deviceMemory || 8)} GB`,
      cores: `${navigator.hardwareConcurrency || "N/A"}`,
      platform: navigator.platform || "Unknown",
      battery: "N/A",
    });

    if ("getBattery" in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        setInfo((prev) => ({
          ...prev,
          battery: `${Math.round(battery.level * 100)}%`,
        }));
      });
    }
  }, []);

  return (
    <div className="bg-cyan-400/5 border border-cyan-400/15 rounded-lg p-4 backdrop-blur-sm">
      <div className="text-[9px] text-cyan-400/50 font-mono tracking-[0.3em] uppercase mb-3">
        System
      </div>
      <div className="space-y-2">
        {[
          { label: "RAM", value: info.ram },
          { label: "CPU CORES", value: info.cores },
          { label: "PLATFORM", value: info.platform },
          { label: "BATTERY", value: info.battery },
        ].map((item) => (
          <div key={item.label} className="flex justify-between items-center">
            <span className="text-[9px] text-cyan-400/30 font-mono">{item.label}</span>
            <span className="text-[11px] text-cyan-400/70 font-mono">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function NotesWidget({
  notes,
  onAdd,
  onDelete,
}: {
  notes: string[];
  onAdd: (note: string) => void;
  onDelete: (index: number) => void;
}) {
  return (
    <div className="bg-cyan-400/5 border border-cyan-400/15 rounded-lg p-4 backdrop-blur-sm">
      <div className="text-[9px] text-cyan-400/50 font-mono tracking-[0.3em] uppercase mb-3">
        Notes
      </div>
      <div className="space-y-2 max-h-32 overflow-y-auto scrollbar-hide">
        {notes.length === 0 ? (
          <div className="text-[10px] text-cyan-400/20 font-mono text-center py-2">
            No notes yet. Say &quot;add note...&quot;
          </div>
        ) : (
          notes.map((note, i) => (
            <div
              key={i}
              className="flex items-center justify-between group"
            >
              <span className="text-[10px] text-cyan-400/60 font-mono truncate flex-1 mr-2">
                {note}
              </span>
              <button
                onClick={() => onDelete(i)}
                className="text-[8px] text-red-400/40 hover:text-red-400 font-mono opacity-0 group-hover:opacity-100 transition-opacity"
              >
                DEL
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export function MusicWidget({
  isPlaying,
  onToggle,
}: {
  isPlaying: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="bg-cyan-400/5 border border-cyan-400/15 rounded-lg p-4 backdrop-blur-sm">
      <div className="text-[9px] text-cyan-400/50 font-mono tracking-[0.3em] uppercase mb-3">
        Audio
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onToggle}
          className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
            isPlaying
              ? "border-cyan-400/50 bg-cyan-400/10 shadow-[0_0_15px_rgba(0,255,255,0.1)]"
              : "border-cyan-400/15 bg-transparent"
          }`}
        >
          {isPlaying ? (
            <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-cyan-400/60" fill="currentColor" viewBox="0 0 24 24">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </button>
        <div className="flex-1">
          <div className="text-[10px] text-cyan-400/60 font-mono">
            {isPlaying ? "Playing ambient" : "Tap to play"}
          </div>
          <div className="flex gap-1 mt-2">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className={`w-1 bg-cyan-400/40 rounded-full transition-all ${
                  isPlaying ? "animate-pulse" : ""
                }`}
                style={{
                  height: isPlaying ? `${8 + Math.random() * 12}px` : "3px",
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CommandLog({ logs }: { logs: string[] }) {
  return (
    <div className="bg-cyan-400/5 border border-cyan-400/15 rounded-lg p-4 backdrop-blur-sm">
      <div className="text-[9px] text-cyan-400/50 font-mono tracking-[0.3em] uppercase mb-3">
        Command Log
      </div>
      <div className="space-y-1 max-h-24 overflow-y-auto scrollbar-hide">
        {logs.length === 0 ? (
          <div className="text-[10px] text-cyan-400/20 font-mono text-center py-2">
            Waiting for commands...
          </div>
        ) : (
          logs.slice(-5).map((log, i) => (
            <div key={i} className="text-[9px] text-cyan-400/40 font-mono">
              <span className="text-cyan-400/20">&gt;</span> {log}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
