
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export interface TextToSpeechOptions {
  voiceId?: string;
  model?: string;
  shouldCache?: boolean;
}

// Using a default API key - you should replace this with your own
const DEFAULT_API_KEY = "your-eleven-labs-api-key-here";

export const useTextToSpeech = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  const speak = useCallback(async (text: string, options: TextToSpeechOptions = {}) => {
    try {
      const {
        voiceId = "21m00Tcm4TlvDq8ikWAM", // Default voice: Rachel
        model = "eleven_monolingual_v1",
        shouldCache = true
      } = options;

      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': DEFAULT_API_KEY
        },
        body: JSON.stringify({
          text,
          model_id: model,
          voice_settings: {
            stability: 0.75,
            similarity_boost: 0.75
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate speech');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      if (audioElement) {
        audioElement.pause();
        URL.revokeObjectURL(audioElement.src);
      }

      const audio = new Audio(url);
      setAudioElement(audio);
      
      audio.onplay = () => setIsPlaying(true);
      audio.onended = () => {
        setIsPlaying(false);
        if (!shouldCache) {
          URL.revokeObjectURL(url);
        }
      };
      audio.onerror = () => {
        setIsPlaying(false);
        toast.error("Failed to play audio");
      };

      await audio.play();
    } catch (error) {
      console.error('Text-to-speech error:', error);
      toast.error("Failed to generate speech");
      setIsPlaying(false);
    }
  }, [audioElement]);

  const stop = useCallback(() => {
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
      setIsPlaying(false);
    }
  }, [audioElement]);

  return { speak, stop, isPlaying };
};
