import React, { useEffect } from 'react';

import { SafeAreaView } from 'react-native';
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
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView source={{ uri: webViewContentUrl }} onMessage={() => { }} />
    </SafeAreaView>
  );
}

export default HomeScreen;
