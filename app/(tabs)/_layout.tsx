import { Redirect, Tabs } from 'expo-router';
import AntIcon from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useAuth } from '@clerk/clerk-expo';

export default function TabLayout() {
  const { isSignedIn } = useAuth()
      
      if (!isSignedIn) {
        return <Redirect href={'/signin'} />
      }
    
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <AntIcon size={24} name='home' color={color} />,
        }}
      />
      <Tabs.Screen
        name="forum"
        options={{
          title: 'Forum',
          tabBarIcon: ({ color }) => <AntIcon size={24} name='message1' color={color} />,
        }}
      />
      <Tabs.Screen
        name="chatbot"
        options={{
          title: 'Chintak AI',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="robot-happy-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <AntIcon size={24} name='setting' color={color} />,
        }}
      />
      
    </Tabs>
  );
}
