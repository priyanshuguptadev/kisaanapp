import { ScrollView, TextInput, View, Text } from "react-native";
import IconButton from "@/components/IconButton";
import RecieveBubble from "@/components/RecieveBubble";
import SendBubble from "@/components/SendBubble";
import { useRef, useState } from "react";
import { GoogleGenAI } from "@google/genai";
import { SignedIn } from "@clerk/clerk-expo";

const ai = new GoogleGenAI({
  apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY,
});
let id = 0
interface Message {
  role: string;
  parts: { text: string }[];
}
const contents: Message[] = [];
export default function Chatbot() {
  const [msg, setMsg] = useState("");
  const [botMsg, setBotMsg] = useState("")
  const scrollRef = useRef<ScrollView | null>(null);
  async function send() {
    contents.push({
      role: "user",
      parts: [{ text: msg }],
    });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: contents,
      config: {
        systemInstruction:
          "You are Chintak, a helpful ai assistant for farmers. Your answers should be genuine and correct. Don't go out of farming and tell user to ask questions about farming only.",
      },
    });
    if (response.text) {
      contents.push({
        role: "model",
        parts: [{ text: response.text }],
      })
      setBotMsg(response.text)
    }
  }
  return (
    
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{ padding: 10, marginBottom: 50 }}
        ref={scrollRef}
        onContentSizeChange={() =>
          scrollRef.current?.scrollToEnd({ animated: true })
        }
      >
        <View style={{ marginBottom: 30 }}>
          {contents.map((msg) =>
            msg.role === "user" ? (
              <SendBubble
                color="green"
                key={++id}
                message={msg.parts.at(0)?.text || ""}
              />
            ) : (
              <RecieveBubble
                key={++id}
                message={msg.parts.at(0)?.text || ""}
              />
            )
          )}
        </View>
      </ScrollView>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          position: "absolute",
          bottom: 0,
          margin: 10,
        }}
      >
        <TextInput
          value={msg}
          onChangeText={(txt) => setMsg(txt)}
          placeholder="Enter your message..."
          style={{
            width: "90%",
            backgroundColor: "#fff",
            padding: 10,
            borderRadius: 10,
          }}
        />
        <IconButton color="green" onPress={()=>{
          send(),
          setMsg("")
        }} />
      </View>
    </View>
  );
}
