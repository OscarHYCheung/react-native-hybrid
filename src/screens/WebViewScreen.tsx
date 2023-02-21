import React, { useEffect, useState } from 'react';
import { Linking, NativeEventEmitter, Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';
import WebView from 'react-native-webview';

import BaseScreenProps from '../types/BaseScreenProps';

import type { WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes';

import LoggerModule from '../react-native-modules/LoggerModule';
import RandomModule from '../react-native-modules/RandomModule';
import EventModule from '../react-native-modules/EventModule';

const WebViewScreen = ({ navigation }: BaseScreenProps): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [webViewUrl, setWebViewUrl] = useState('');
  const insets = useSafeAreaInsets()

  useEffect(() => {
    DeviceInfo.isEmulator().then((isInEmulator) => {
      let url;
      if (isInEmulator) {
        const host = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
        url = `http://${host}:8080/`;
      } else {
        url = 'https://oscarhycheung.github.io/react-native-hybrid-webview-content/';
      }
      setWebViewUrl(url);
    });

    const eventEmitter = new NativeEventEmitter(EventModule)
    const { EVENT_NAME } = EventModule.getConstants();
    const eventListener = eventEmitter.addListener(EVENT_NAME, (event) => {
      console.log(event);
    });
    return () => {
      eventListener.remove();
    }
  }, []);

  const handleOnMessage = async (event: WebViewMessageEvent) => {
    const messageStr = event?.nativeEvent?.data || '';

    let action;
    let params;
    try {
      const message = JSON.parse(messageStr)
      action = message.action;
      params = message.params || {};
    } catch (error) {
      console.error('Cannot parse message', error);
    }

    if (!action) {
      return;
    }

    switch (action) {
      case 'open-url': {
        if (!params.url) {
          break;
        }
        try {
          await Linking.openURL(params.url);
        } catch (error) {
          console.error('Error occurred in openUrl:', error);
        }
        break;
      }
      case 'go-back': {
        navigation.goBack();
        break;
      }
      case 'log-to-native': {
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
      case 'rand-sync': {
        const randFloat = RandomModule.randSync();
        console.log(`randSync returned: ${randFloat}`);
        break;
      }
      case 'rand-async': {
        try {
          const randFloat = await RandomModule.rand();
          console.log(`rand returned: ${randFloat}`);
        } catch (error) {
          console.error('Error occurred in rand:', error);
        }
        break;
      }
      case 'trigger-event': {
        EventModule.triggerEvent();
        break;
      }
      default: {
        console.error(`Unknown message: ${messageStr}`);
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
      {
        webViewUrl && <WebView
          source={{ uri: webViewUrl }}
          onMessage={handleOnMessage}
          injectedJavaScriptBeforeContentLoaded={injectScript}
          onLoadEnd={() => setIsLoading(false)} />
      }
    </View>
  );
}

export default WebViewScreen;
