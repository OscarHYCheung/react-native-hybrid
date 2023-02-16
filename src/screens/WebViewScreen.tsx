import React from 'react';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import WebView from 'react-native-webview';

const WebViewScreen = (): JSX.Element => {
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

export default WebViewScreen;
