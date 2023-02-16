import React, { useEffect } from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import WebView from 'react-native-webview';

const HomeScreen = (): JSX.Element => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    return () => {
      clearTimeout(timeoutId);
    }
  });

  const webViewContentUrl = 'https://oscarhycheung.github.io/react-native-hybrid-webview-content/';
  const insets = useSafeAreaInsets()
  const wrapperStyle = {
    flex: 1,
    paddingLeft: insets.left,
    paddingRight: insets.right,
    paddingTop: insets.top,
    // paddingBottom: insets.bottom,
    // Can directly set as paddings, or pass to components / WebView content if needed
  }
  return (
    <View style={wrapperStyle}>
      <WebView source={{ uri: webViewContentUrl }} onMessage={() => { }} />
    </View>
  );
}

export default HomeScreen;
