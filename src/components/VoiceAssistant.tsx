
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Volume, VolumeX } from "lucide-react";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { toast } from 'sonner';

export const VoiceAssistant = () => {
  const [apiKey, setApiKey] = useState('');
  const { speak, stop, isPlaying } = useTextToSpeech();
  
  const handleSpeak = async (text: string) => {
    if (!apiKey) {
      toast.error("Please enter your ElevenLabs API key");
      return;
    }
    await speak(text, apiKey);
  };

  return (
    <Card className="w-[300px] shadow-lg">
      <CardHeader className="space-y-1 pb-2">
        <CardTitle className="text-lg">Voice Assistant</CardTitle>
        <CardDescription className="text-sm">
          Enter your ElevenLabs API key
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Input
          type="password"
          placeholder="Enter API key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className="text-sm"
        />
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => handleSpeak("Welcome to Yojana Dost. I'm here to help you navigate through government schemes and services. What would you like to know about?")}
        >
          {isPlaying ? <VolumeX className="mr-2 h-4 w-4" /> : <Volume className="mr-2 h-4 w-4" />}
          {isPlaying ? 'Stop Speaking' : 'Start Speaking'}
        </Button>
      </CardContent>
    </Card>
  );
};
