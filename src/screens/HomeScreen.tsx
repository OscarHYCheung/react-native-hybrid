import React, { useEffect } from 'react';

import type { PropsWithChildren } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-splash-screen';

import type RootStackParamList from '../types/RootStackParamList';
import GoToWebViewScreenButton from '../components/GoToWebViewScreenButton';


type SectionProps = PropsWithChildren<{
  title: string;
}>

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  linkText: {
    color: '#53C1DE',
  },
  buttonWrapper: {
    paddingTop: 8,
  },
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

const Section = ({ children, title }: SectionProps): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

type Props = NativeStackScreenProps<RootStackParamList>;
const HomeScreen = ({ navigation }: Props): JSX.Element => {
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
          <Section title="Go to WebView Screen">
            <GoToWebViewScreenButton />
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
