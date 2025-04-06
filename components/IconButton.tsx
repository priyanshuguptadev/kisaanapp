import React from 'react';
import { View, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

export default function IconButton({onPress, color}:{onPress: ()=>void, color: string}) {

  return (
    <TouchableOpacity onPress={onPress}>
        <Feather  name='send' size={22} color={color}/>
    </TouchableOpacity>
        
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
