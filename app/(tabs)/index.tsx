import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import PrimaryButton from '@/components/PrimaryButton';
import { useRouter } from 'expo-router';

export default function Home() {
  const [crops, setCrops] = useState<any[] | null>(null);
  const router = useRouter()

  useEffect(() => {
    async function getCrop() {
      try {
        const cropData = await AsyncStorage.getItem('crop_recommendation');
        if (cropData) {
          const parsedData = JSON.parse(cropData);
          setCrops(parsedData.ranked_crops);
        }
      } catch (error) {
        console.error("Error fetching crop data:", error);
      }
    }
    getCrop();
  }, []);
  if(!crops) {
    return <View style={{flex: 1, justifyContent: 'center', padding: 20, alignItems: 'center'}}>
      <Text style={{color: 'orange', fontWeight: 'bold'}}>No Recommendations.</Text>
      <PrimaryButton label='Click here to fill details.' onPress={()=>router.push('/cropdetails')}/>
    </View>
  }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Recommended Crops</Text>
      {crops.map((item, index) => (
        <View key={index.toString()} style={styles.card}>
          <View>
          <Text style={styles.cropName}>{item.crop}</Text>
          <Text style={styles.cropScore}>Score: {item.score.toFixed(2)}</Text>
          </View>
          {index===0? <Feather name='award' size={40} color={'steelblue'}/> : null}
        </View>
      ))}
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'gray'
  },
  card: {
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent:"space-between",
    alignItems: "center"
  },
  cropName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'steelblue',
    marginBottom: 5,
  },
  cropScore: {
    fontSize: 16,
    color: 'gray',
  },
});