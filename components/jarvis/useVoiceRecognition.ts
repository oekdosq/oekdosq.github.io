"use client";

import { useState, useCallback, useRef, useEffect } from "react";

interface VoiceRecognitionState {
  isListening: boolean;
  transcript: string;
  confidence: number;
  isSupported: boolean;
}

interface UseVoiceRecognitionOptions {
  onResult?: (transcript: string) => void;
  onCommand?: (command: string) => void;
}

export function useVoiceRecognition(options?: UseVoiceRecognitionOptions) {
  const [state, setState] = useState<VoiceRecognitionState>({
    isListening: false,
    transcript: "",
    confidence: 0,
    isSupported: false,
  });

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setState((prev) => ({ ...prev, isSupported: true }));
    }
  }, []);

  const startListening = useCallback(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "id-ID"; // Start with Indonesian, can switch

    recognition.onresult = (event: any) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        const confidence = event.results[i][0].confidence;

        if (event.results[i].isFinal) {
          finalTranscript += transcript;
          options?.onCommand?.(transcript.toLowerCase().trim());
        } else {
          interimTranscript += transcript;
        }
      }

      setState((prev) => ({
        ...prev,
        transcript: finalTranscript || interimTranscript,
        confidence: event.results[event.resultIndex]?.[0]?.confidence || 0,
      }));

      if (finalTranscript) {
        options?.onResult?.(finalTranscript.toLowerCase().trim());
      }
    };

    recognition.onerror = (event: any) => {
      console.warn("Speech recognition error:", event.error);
      if (event.error !== "no-speech") {
        setState((prev) => ({ ...prev, isListening: false }));
      }
    };

    recognition.onend = () => {
      // Auto-restart if we want continuous listening
      if (recognitionRef.current) {
        try {
          recognition.start();
        } catch {}
      }
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
      setState((prev) => ({ ...prev, isListening: true }));
    } catch {}
  }, [options]);

  const stopListening = useCallback(() => {
    recognitionRef.current = null;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        // Create a dummy to stop any existing
        const r = new SpeechRecognition();
        r.abort();
      } catch {}
    }
    setState((prev) => ({ ...prev, isListening: false }));
  }, []);

  return {
    ...state,
    startListening,
    stopListening,
  };
}
