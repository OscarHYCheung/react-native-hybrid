import React, { useState } from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

import parseQueryString from '../utils/parseQueryString';
import BaseScreenProps from '../types/BaseScreenProps';

import type { WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes';
import LoggerModule from '../react-native-modules/LoggerModule';
import RandomModule from '../react-native-modules/RandomModule';


const WebViewScreen = ({ navigation }: BaseScreenProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const insets = useSafeAreaInsets()

  const webViewContentUrl = 'https://oscarhycheung.github.io/react-native-hybrid-webview-content/';

  const handleOnMessage = async (event: WebViewMessageEvent) => {
    const messageStr = event?.nativeEvent?.data || '';
    const parts = messageStr.split('|');
    if (parts.length < 1) {
      return;
    }

    const action = parts[0];
    const params = parseQueryString(parts[1]);

    switch (action) {
      case 'openUrl': {
        // Usage: openUrl|url=https://www.google.com/
        if (!params.url) {
          break;
        }
        try {
          await Linking.openURL(params.url);
        } catch (error) {
          console.error('Error occured in openUrl:', error);
        }
        break;
      }
      case 'goBack': {
        // Usage: goBack
        navigation.goBack();
        break;
      }
      case 'logToNative': {
        // Usage: logToNative|message=TestingNativeLogger
        let message = params.message;
        if (typeof message !== 'string') {
          return;
        }

        message = message.trim();
        if (!message.length) {
          return;
        }

        LoggerModule.log(params.message);
        break;
      }
      case 'randSync': {
        // Usage: randSync
        const randFloat = RandomModule.randSync();
        console.log(`randSync returned: ${randFloat}`);
        break;
      }
      case 'rand': {
        // Usage: rand
        try {
          const randFloat = await RandomModule.rand();
          console.log(`rand returned: ${randFloat}`);
        } catch (error) {
          console.error('Error occured in rand:', error);
        }
        break;
      }
      default: {
        console.error(`Unknonw message: ${messageStr}`);
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
