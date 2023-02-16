import React, { useState } from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

import parseQueryString from '../utils/parseQueryString';
import BaseScreenProps from '../types/BaseScreenProps';

import type { WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes';


const WebViewScreen = ({ navigation }: BaseScreenProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const insets = useSafeAreaInsets()

  const webViewContentUrl = 'https://oscarhycheung.github.io/react-native-hybrid-webview-content/';

  const handleOnMessage = (event: WebViewMessageEvent) => {
    const messageStr = event?.nativeEvent?.data || '';
    console.log(messageStr);
    const parts = messageStr.split('|');
    if (parts.length < 1) {
      return;
    }

    const action = parts[0];
    const params = parseQueryString(parts[1]);

    switch (action) {
      case 'openUrl': {
        if (!params.url) {
          break;
        }
        Linking.openURL(params.url);
        break;
      }
      case 'goBack': {
        navigation.goBack();
        break;
      }
      default: {
        break;
      }
    }
  }

  const injectScript = `
    window.mobileApp = { version: '1.0.0' };
  `;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingTop: insets.top,
      // paddingBottom: insets.bottom,
      // Can directly set as paddings, or pass to components / WebView content if needed
    },
    loading: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      textAlign: 'center',
      backgroundColor: '#FFFFFF',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
  return (
    <View style={styles.container}>
      <View style={[
        styles.loading,
        { display: isLoading ? 'flex' : 'none' },
      ]}>
        <Text>Loading WebView Content...</Text>
      </View>
      <WebView
        source={{ uri: webViewContentUrl }}
        onMessage={handleOnMessage}
        injectedJavaScriptBeforeContentLoaded={injectScript}
        onLoadEnd={() => setIsLoading(false)} />
    </View>
  );
}

export default WebViewScreen;
