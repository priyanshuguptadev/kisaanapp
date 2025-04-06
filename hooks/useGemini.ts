import { GoogleGenAI } from "@google/genai";
import { useState } from "react";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDMTjiE8tKrSOvWdEOja8bJkDVl4WOHpsQ",
});

interface Message {
  role: string;
  parts: { text: string  }[];
}

const contents: Message[] = [];

async function main(userMsg: string) {
  const [aiResponse, setAiResponse] = useState<Message>();
  
  contents.push({
    role: "user",
    parts: [{ text: userMsg }]
  });
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: contents,
    config: {
      systemInstruction:
        "You are Chintak, a helpful ai assistant for farmers. Your answers should be genuine and correct. Don't go out of farming and tell user to ask questions about farming only.",
    },
  });
  if(response.text){
    setAiResponse({
      role: "model",
      parts: [{ text: response.text }],
    });
  }
  
  if (aiResponse) {
    contents.push(aiResponse);
  }
}
