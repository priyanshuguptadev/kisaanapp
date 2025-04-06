import { ScrollView, TextInput, View, Text, ActivityIndicator } from "react-native";
import IconButton from "@/components/IconButton";
import RecieveBubble from "@/components/RecieveBubble";
import SendBubble from "@/components/SendBubble";
import { useEffect, useRef, useState } from "react";
import { collection, addDoc, onSnapshot, serverTimestamp, query, orderBy } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export default function Forum() {
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true)
  const scrollRef = useRef<ScrollView | null>(null)
  const [msgData,setMsgData] = useState([{
    id: "",
    user: "",
    msg: ""
  }]);
  useEffect(()=>{
    const unsubscribe = onSnapshot(query(collection(db, 'chat'), orderBy("sendAt", "asc")), (snapshot)=>{
      const chats = snapshot.docs.map((chat)=>({id: chat.id, user: chat.data().user, msg: chat.data().msg}))
      setMsgData(chats)
      setLoading(false)
    })
    return unsubscribe
  }, [])
  const sendMsg = async () => {
    try {
      await addDoc(collection(db, "chat"), {
        user: "me",
        msg: msg,
        sendAt: serverTimestamp()
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ padding: 10, marginBottom: 50 }} ref={scrollRef} onContentSizeChange={()=>scrollRef.current?.scrollToEnd({animated: true})}>
        <View style={{marginBottom: 30}}>
        {loading? <Text style={{textAlign: "center", marginTop: 20}}><ActivityIndicator /></Text>: msgData.map((msg)=>msg.user==="me"?<SendBubble key={msg.id} message={msg.msg} color="steelblue"/>:<RecieveBubble key={msg.id} message={msg.msg}/>)}
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
        <IconButton color="steelblue" onPress={()=>{
           sendMsg(),
          setMsg("")
        }} />
      </View>
    </View>
  );
}
