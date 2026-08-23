"use client";

let lastUtterance: SpeechSynthesisUtterance | null = null;

export function speak(text: string, lang = "id-ID") {
  if (typeof window === "undefined" || !window.speechSynthesis) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 1.05;
  utterance.pitch = 0.85;
  utterance.volume = 0.9;

  // Try to find a good voice
  const voices = window.speechSynthesis.getVoices();
  const preferredVoice = voices.find(
    (v) => v.lang.startsWith("id") && v.name.toLowerCase().includes("google")
  ) || voices.find((v) => v.lang.startsWith("id")) || voices.find((v) => v.lang.startsWith("en"));

  if (preferredVoice) utterance.voice = preferredVoice;

  lastUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

export function speakEnglish(text: string) {
  speak(text, "en-US");
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}
