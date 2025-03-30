import { Tabs } from 'expo-router';
import React from 'react';
import {Feather} from '@expo/vector-icons'


export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#000",
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Feather size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <Feather size={28} name="paperclip" color={color} />,
        }}
      />
    </Tabs>
  );
}
