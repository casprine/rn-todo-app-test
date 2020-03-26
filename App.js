import * as React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
// import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';
import { AppearanceProvider } from 'react-native-appearance';

// Root Navigator
import RootNavigator from './navigation';

// theme
import theme from '~/theme';

// context
import { ThemeContext } from '~/context';

// components
import { StatusBar } from '~/components';

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const containerRef = React.useRef();

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load fonts
        await Font.loadAsync({
          // ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
          Inter: require('./assets/fonts/Inter-Regular.ttf'),
          Karla: require('./assets/fonts/Karla-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return null;
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer ref={containerRef}>
          <ThemeProvider theme={theme}>
            <ThemeContext.ProviderWrapper>
              <AppearanceProvider>
                <StatusBar />
                <RootNavigator />
              </AppearanceProvider>
            </ThemeContext.ProviderWrapper>
          </ThemeProvider>
        </NavigationContainer>
      </SafeAreaView>
    );
  }
}
