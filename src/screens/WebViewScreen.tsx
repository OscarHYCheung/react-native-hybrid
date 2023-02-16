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
  const injectScript = `
    window.mobileApp = { version: '1.0.0' };
  `;
  return (
    <View style={wrapperStyle}>
      <WebView
        source={{ uri: webViewContentUrl }}
        onMessage={() => { }}
        injectedJavaScriptBeforeContentLoaded={injectScript} />
    </View>
  );
}

export default WebViewScreen;
