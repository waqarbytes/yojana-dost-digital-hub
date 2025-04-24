
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
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Voice Assistant</CardTitle>
        <CardDescription>
          Enter your ElevenLabs API key to enable voice assistance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input
          type="password"
          placeholder="Enter your ElevenLabs API key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => handleSpeak("Welcome to Yojana Dost. I'm here to help you navigate through government schemes and services. What would you like to know about?")}
          >
            {isPlaying ? <VolumeX className="mr-2" /> : <Volume className="mr-2" />}
            {isPlaying ? 'Stop Speaking' : 'Start Speaking'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
