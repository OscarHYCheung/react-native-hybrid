import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';

import type Navigation from '../types/Navigation';


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#53C1DE',
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 16,
    lineHeight: 1,
  },
  buttonFont: {
    color: '#FFFFFF',
  },
});

// Can also use <Link> ie. <Link to="/Home">...</Link> 
const GoToWebViewScreenButton = () => {
  const navigation: Navigation = useNavigation();
  return (
    <Pressable onPress={() => { navigation.navigate('WebView') }} style={styles.button}>
      <Text style={styles.buttonFont}>Click Here</Text>
    </Pressable>
  );
};

export default GoToWebViewScreenButton;
