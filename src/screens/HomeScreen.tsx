import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
} from 'react-native';
import {
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-splash-screen';

import GoToWebViewScreenButton from '../components/GoToWebViewScreenButton';
import HomePageSection from '../components/HomeScreenSection';


const HomeScreen = (): JSX.Element => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    return () => {
      clearTimeout(timeoutId);
    }
  });

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header />
        <View>
          <HomePageSection title="Go to WebView Screen">
            <GoToWebViewScreenButton />
          </HomePageSection>
          <HomePageSection title="See Your Changes">
            <ReloadInstructions />
          </HomePageSection>
          <HomePageSection title="Debug">
            <DebugInstructions />
          </HomePageSection>
          <HomePageSection title="Learn More">
            Read the docs to discover what to do next:
          </HomePageSection>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
