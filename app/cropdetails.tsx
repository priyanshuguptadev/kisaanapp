import { Alert, ScrollView, Switch, Text, View } from "react-native";
import InfoInput from "@/components/InfoInput";
import { useState } from "react";
import InfoDropDown from "@/components/InfoDropDown";
import PrimaryButton from "@/components/PrimaryButton";
import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const locdata = [
  { label: "Raipur Division", value: "Raipur Division" },
  { label: "Bilaspur Division", value: "Bilaspur Division" },
  {
    label: "Sarangarh-Bilaigarh Division",
    value: "Sarangarh-Bilaigarh Division",
  },
  { label: "Surguja Division", value: "Surguja Division" },
  { label: "Balod Division", value: "Balod Division" },
];
const cropdata = [
  { label: "Wheat", value: "Wheat" },
  { label: "Rice", value: "Rice" },
  { label: "Maize", value: "Maize" },
  { label: "Soybean", value: "Soybean" },
  { label: "Niger", value: "Niger" },
  { label: "Urd", value: "Urd" },
  { label: "kodo-kutki", value: "kodo-kutki" },
  { label: "summer paddy", value: "summer paddy" },
  { label: "Gram", value: "Gram" },
  { label: "Tiwra", value: "Tiwra" },
  { label: "other crops", value: "other crops" },
];

export default function CropDetails() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState("");
  const [prevCrop, setPrevCrop] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [organicMatter, setOrganicMatter] = useState("");
  const [fertilizerUse, setFertilizerUse] = useState("");
  const [prevYearYield, setPrevYearYield] = useState("");
  const [sowingToHarvestDays, setSowingToHarvestDays] = useState("");
  const [supplyTons, setSupplyTons] = useState("");
  const [exportTons, setExportTons] = useState("");
  const [importTons, setImportTons] = useState("");
  const date = new Date();
  const handleSubmit = async () => {
    setLoading(true)
    const data = {
      year: parseInt(year || date.getFullYear().toString()),
      month: parseInt(month || (date.getMonth() + 1).toString()),
      region: location,
      temperature: 40,
      rainfall: 87,
      humidity: 10,
      soil_pH: 5,
      soil_nitrogen: parseFloat(nitrogen || "34"),
      soil_phosphorus: parseFloat(phosphorus || "34"),
      soil_potassium: parseFloat(potassium || "34"),
      soil_organic_matter: parseFloat(organicMatter || "5"),
      fertilizer_use: parseFloat(fertilizerUse || "34"),
      pesticide_use: 34,
      previous_year_yield: parseFloat(prevYearYield || "34"),
      sowing_to_harvest_days: parseInt(sowingToHarvestDays || "34"),
      farm_size_acres: 89,
      irrigation_available: true,
      supply_tons: parseInt(supplyTons || "453"),
      import_tons: parseInt(importTons || "564"),
      export_tons: parseInt(exportTons || "768"),
      prev_crop: prevCrop,
      crops: [
        "Wheat",
        "Rice",
        "Maize",
        "Soybean",
        "Niger",
        "Urd",
        "kodo-kutki",
        "summer paddy",
        "Gram",
        "Tiwra",
        "other crops",
      ],
    };
    try {
      const response = await axios.post(
        "https://farmer-friend.onrender.com/recommend_crops",
        data
      );
      const jsonValue = JSON.stringify(response.data);
      await AsyncStorage.setItem("crop_recommendation", jsonValue);
      setLoading(false)
      router.replace('/(tabs)')
    } catch (error : unknown) {
      if(axios.isAxiosError(error)){
        Alert.alert('Error', error.message)
      }else{
        Alert.alert('Error', 'Unknown error. Try again')
      }
    } finally {
      setLoading(false)
    }
  };
  return (
    <ScrollView style={{ padding: 10 }}>
      <View style={{ marginBottom: 20 }}>
        <Text style={{ textAlign: "center", fontSize: 18 }}>Info</Text>
        <InfoInput
          placeholder={date.getFullYear().toString()}
          label="Year"
          onChangeText={(text) => setYear(text)}
        />
        <InfoInput
          placeholder={(date.getMonth() + 1).toString()}
          label="Month"
          onChangeText={(text) => setMonth(text)}
        />
        <InfoDropDown
          label="Select Location"
          data={locdata}
          onChange={(txt) => setLocation(txt["value"])}
        />
        <InfoInput
          placeholder="40.2"
          label="Soil Nitrogen"
          onChangeText={(text) => setNitrogen(text)}
        />
        <InfoInput
          placeholder="40.2"
          label="Soil Phosphorus"
          onChangeText={(text) => setPhosphorus(text)}
        />
        <InfoInput
          placeholder="40.2"
          label="Soil Potassium"
          onChangeText={(text) => setPotassium(text)}
        />
        <InfoInput
          placeholder="5"
          label="Soil Organic Matter"
          onChangeText={(text) => setOrganicMatter(text)}
        />
        <InfoInput
          placeholder="34"
          label="Fertilizer Use"
          onChangeText={(text) => setFertilizerUse(text)}
        />
        <InfoInput
          placeholder=""
          label="Previous Year Yield"
          onChangeText={(text) => setPrevYearYield(text)}
        />
        <InfoInput
          placeholder=""
          label="Sowing To Harvest Days"
          onChangeText={(text) => setSowingToHarvestDays(text)}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: 3,
          }}
        >
          <Text style={{ color: "gray" }}>Irrigation Available</Text>
          <Switch value={true} />
        </View>
        <InfoDropDown
          label="Previous Crop"
          data={cropdata}
          onChange={(txt) => setPrevCrop(txt["value"])}
        />
        <InfoInput
          placeholder="400"
          label="Supply Tons"
          onChangeText={(text) => setSupplyTons(text)}
        />
        <InfoInput
          placeholder="400"
          label="Export Tons"
          onChangeText={(text) => setExportTons(text)}
        />
        <InfoInput
          placeholder="400"
          label="Import Tons"
          onChangeText={(text) => setImportTons(text)}
        />
        {loading ? <PrimaryButton label="Fetching..." /> : <PrimaryButton label="Submit" onPress={handleSubmit} />}
      </View>
    </ScrollView>
  );
}
