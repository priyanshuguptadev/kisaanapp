import { StatusBar } from "expo-status-bar";
import {  ActivityIndicator, StyleSheet, Text, View } from "react-native";
import * as Linking from 'expo-linking'
import SettingCard from "@/components/SettingCard";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useLocation } from "@/hooks/useLocation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import ProfileModal from "@/components/ProfileModal";
import { useClerk } from "@clerk/clerk-expo";


export default function Settings() {
  const {signOut} = useClerk()
  const router = useRouter()
  const [name, setName] = useState<string | null>(null)
  const [dialogVisible, setDialogVisible] = useState<boolean>(false)
  const {city, loading} = useLocation()
  const logout = async () => {
    
    try {
      await signOut()
      Linking.openURL(Linking.createURL('/signin'))
    } catch (e) {
      console.log(e)
    }
  }
    async function getName() {
      try {
        const name = await AsyncStorage.getItem("name")
        setName(name)
      } catch (e) {
        console.log(e)
      }
      
    }
    getName()
  return (
    <View style={styles.container}>
      <View style={{display: "flex", flexDirection: "column", columnGap: 8, backgroundColor: "#fff", padding: 10, borderRadius: 10, width: '100%', alignItems: 'center'}}>
        <Ionicons name="person-outline" size={48} color={'gray'}/>
        <View>
          <Text
            style={{ fontSize: 18, fontWeight: "500", color: "steelblue", textAlign: 'center' }}
          >
            {name || 'NA'}
          </Text>
          <Text style={{ color: "gray", textAlign: "center"}}>
            Farmer{" "}
            <Text style={{ color: "gray", fontWeight: "700", display: "flex", justifyContent: "center", alignItems: "center" }}>@{loading ? <ActivityIndicator size={12} color={'steelblue'} /> : <Text>{city}</Text>}</Text>
          </Text>
        </View>
      </View>
      <View style={{width: '100%'}}>
        <ProfileModal visible={dialogVisible} setVisible={setDialogVisible} />
        <SettingCard label="Edit profile" icon={<Feather size={18} name="edit-2" color={'gray'}/>} onPress={()=>setDialogVisible(true)}/>
        <SettingCard label="Location" icon={<Feather size={18} name="map-pin" color={'gray'}/>} onPress={()=>{
          router.navigate('/location')
        }}/>
        <SettingCard label="Farm Info" icon={<Feather name="info" size={18} color="gray" />} onPress={()=>router.navigate('/cropdetails')}/>
        <SettingCard label="Log Out" icon={<Feather size={18} name="log-out" color={'gray'}/>} onPress={logout}/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
});
