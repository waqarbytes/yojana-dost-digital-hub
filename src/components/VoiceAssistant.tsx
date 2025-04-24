
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Volume, VolumeX } from "lucide-react";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";

export const VoiceAssistant = () => {
  const { speak, stop, isPlaying } = useTextToSpeech();
  
  const handleSpeak = async () => {
    if (isPlaying) {
      stop();
    } else {
      await speak("Welcome to Yojana Dost. I'm here to help you navigate through government schemes and services. What would you like to know about?");
    }
  };

  return (
    <Card className="w-[300px] shadow-lg">
      <CardContent className="pt-4">
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={handleSpeak}
        >
          {isPlaying ? <VolumeX className="mr-2 h-4 w-4" /> : <Volume className="mr-2 h-4 w-4" />}
          {isPlaying ? 'Stop Speaking' : 'Start Speaking'}
        </Button>
      </CardContent>
    </Card>
  );
};
