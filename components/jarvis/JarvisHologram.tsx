"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { HologramRings, ScanLine, HologramNoise, CenterHUD } from "./HUD";
import {
  ClockWidget,
  WeatherWidget,
  SystemWidget,
  NotesWidget,
  MusicWidget,
  CommandLog,
} from "./Widgets";
import { useVoiceRecognition } from "./useVoiceRecognition";
import { processCommand } from "./processCommand";
import { speak } from "./useTTS";

function AmbientAudio({ isPlaying }: { isPlaying: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(
        "https://cdn.freesound.org/previews/612/612095_5674468-lq.mp3"
      );
      audioRef.current.loop = true;
      audioRef.current.volume = 0.15;
    }
    if (isPlaying) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
    return () => {
      audioRef.current?.pause();
    };
  }, [isPlaying]);

  return null;
}

export function JarvisHologram() {
  const [notes, setNotes] = useState<string[]>([]);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [commandLogs, setCommandLogs] = useState<string[]>([]);
  const [responseText, setResponseText] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const [mode, setMode] = useState("STANDBY");
  const [bootComplete, setBootComplete] = useState(false);

  // Boot sequence
  useEffect(() => {
    const timer = setTimeout(() => setBootComplete(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const addNote = useCallback((note: string) => {
    setNotes((prev) => [...prev, note]);
  }, []);

  const deleteNote = useCallback((index: number) => {
    setNotes((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const addLog = useCallback((log: string) => {
    setCommandLogs((prev) => [...prev.slice(-20), log]);
  }, []);

  const handleCommand = useCallback(
    (transcript: string) => {
      setMode("PROCESSING");

      const response = processCommand(transcript, {
        notes,
        addNote,
        deleteNote,
        toggleMusic: () => setIsMusicPlaying((p) => !p),
        isMusicPlaying,
        addLog,
      });

      if (response) {
        setResponseText(response);
        setShowResponse(true);
        setTimeout(() => {
          setMode("LISTENING");
        }, 2000);
      }
    },
    [notes, addNote, deleteNote, isMusicPlaying, addLog]
  );

  const { isListening, transcript, isSupported, startListening, stopListening } =
    useVoiceRecognition({
      onCommand: handleCommand,
    });

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
      setMode("STANDBY");
    } else {
      startListening();
      setMode("LISTENING");
      speak("Jarvis aktif. Ada yang bisa saya bantu?");
    }
  }, [isListening, startListening, stopListening]);

  if (!bootComplete) {
    return (
      <div className="fixed inset-0 bg-[#050a0f] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full border border-cyan-400/30 mx-auto mb-4 animate-pulse" />
          <div className="text-[10px] text-cyan-400/50 font-mono tracking-[0.5em] uppercase">
            Initializing Jarvis
          </div>
          <div className="mt-4 w-32 h-1 bg-cyan-400/10 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-cyan-400/40 rounded-full animate-[boot_2s_ease-out_forwards]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#050a0f] overflow-hidden">
      <AmbientAudio isPlaying={isMusicPlaying} />

      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,255,0.03)_0%,transparent_70%)]" />
      <HologramRings />
      <ScanLine />
      <HologramNoise />

      {/* Status bar */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-40">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isListening ? "bg-green-400 animate-pulse" : "bg-cyan-400/30"}`} />
          <span className="text-[9px] text-cyan-400/40 font-mono tracking-[0.2em] uppercase">
            {isListening ? "VOICE ACTIVE" : "VOICE OFF"}
          </span>
        </div>
        <div className="text-[9px] text-cyan-400/30 font-mono tracking-[0.2em]">
          J.A.R.V.I.S — v1.0
        </div>
      </div>

      {/* Center HUD */}
      <CenterHUD isActive={isListening} mode={mode} />

      {/* Left panel - Widgets */}
      <div className="absolute top-16 left-4 w-56 space-y-3 z-40 hidden md:block">
        <ClockWidget />
        <WeatherWidget />
      </div>

      {/* Right panel - Widgets */}
      <div className="absolute top-16 right-4 w-56 space-y-3 z-40 hidden md:block">
        <SystemWidget />
        <NotesWidget notes={notes} onAdd={addNote} onDelete={deleteNote} />
      </div>

      {/* Bottom panel */}
      <div className="absolute bottom-4 left-4 right-4 z-40">
        <div className="max-w-2xl mx-auto space-y-3">
          {/* Response display */}
          {showResponse && (
            <div className="bg-cyan-400/5 border border-cyan-400/20 rounded-lg p-4 backdrop-blur-sm text-center animate-[fadeIn_0.3s_ease-out]">
              <div className="text-[10px] text-cyan-400/40 font-mono tracking-[0.3em] uppercase mb-2">
                Response
              </div>
              <div className="text-sm text-cyan-400/80 font-mono leading-relaxed">
                {responseText}
              </div>
            </div>
          )}

          {/* Transcript display */}
          {transcript && (
            <div className="bg-cyan-400/5 border border-cyan-400/10 rounded-lg p-3 backdrop-blur-sm text-center">
              <div className="text-[9px] text-cyan-400/30 font-mono tracking-[0.2em] uppercase mb-1">
                Hearing
              </div>
              <div className="text-xs text-cyan-400/60 font-mono">
                {transcript}
              </div>
            </div>
          )}

          {/* Voice toggle button */}
          <div className="flex justify-center">
            <button
              onClick={toggleListening}
              className={`relative group px-8 py-3 rounded-full border transition-all duration-300 ${
                isListening
                  ? "border-green-400/50 bg-green-400/10 shadow-[0_0_30px_rgba(0,255,100,0.1)]"
                  : "border-cyan-400/20 bg-cyan-400/5 hover:border-cyan-400/40 hover:bg-cyan-400/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full transition-all ${
                    isListening ? "bg-green-400 animate-pulse" : "bg-cyan-400/40"
                  }`}
                />
                <span className="text-[10px] text-cyan-400/70 font-mono tracking-[0.3em] uppercase">
                  {isListening ? "Listening..." : "Activate Voice"}
                </span>
              </div>
              {isListening && (
                <div className="absolute inset-0 rounded-full border border-green-400/20 animate-ping" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile widgets (stacked at bottom) */}
      <div className="absolute bottom-32 left-4 right-4 z-40 md:hidden">
        <div className="grid grid-cols-2 gap-2">
          <ClockWidget />
          <WeatherWidget />
          <SystemWidget />
          <MusicWidget isPlaying={isMusicPlaying} onToggle={() => setIsMusicPlaying((p) => !p)} />
        </div>
      </div>

      {/* Desktop music + command log */}
      <div className="absolute bottom-4 left-4 w-56 space-y-3 z-40 hidden md:block">
        <MusicWidget isPlaying={isMusicPlaying} onToggle={() => setIsMusicPlaying((p) => !p)} />
        <CommandLog logs={commandLogs} />
      </div>

      {!isSupported && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2 z-50">
          <span className="text-[10px] text-red-400/70 font-mono">
            Voice recognition not supported in this browser
          </span>
        </div>
      )}
    </div>
  );
}
