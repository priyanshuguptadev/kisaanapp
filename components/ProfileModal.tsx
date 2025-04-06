import { View } from "react-native";
import Dialog from "react-native-dialog";
import InputBox from "./InputBox";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileModal({visible, setVisible}: {visible: boolean, setVisible: (val: boolean)=>void}) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  async function setValue() {
    try {
      await AsyncStorage.setItem("name", firstName + " " + lastName)
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <View style={{backgroundColor: "green"}}>
      <Dialog.Container visible={visible}>
        <Dialog.Title>Edit Profile</Dialog.Title>
        <Dialog.Description>
          <InputBox placeholder="firstname" onChangeText={(txt)=>setFirstName(txt)}/>
          <InputBox placeholder="lastname" onChangeText={(txt)=>setLastName(txt)}/>
        </Dialog.Description>
        <Dialog.Button label="Cancel" onPress={()=>{
          setVisible(false)
        }}/>
        <Dialog.Button label="Update" onPress={async ()=>{
          await setValue()
          setVisible(false)
        }}/>
      </Dialog.Container>
    </View>
  );
}