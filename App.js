import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import StackNavigation from './src/navigations/StackNavigation';
import { useFonts } from 'expo-font';
import { ImageBackground, View, ActivityIndicator, StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import theme from './theme/ThemeConfig';
import { persistor, store } from './src/redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  // Load fonts
  const [fontsLoaded] = useFonts({
    MontserratBold: require('./assets/fonts/Montserrat-Bold.ttf'),
    MontserratRegular: require('./assets/fonts/Montserrat-Regular.ttf'),
    MontserratBlack: require('./assets/fonts/Montserrat-Black.ttf'),
    Monospace: require('./assets/fonts/Monospace.ttf'),
    MonospaceBold: require('./assets/fonts/MonospaceBold.ttf'),
    MonospaceOblique: require('./assets/fonts/MonospaceOblique.ttf'),
    QuicksandBold: require('./assets/fonts/Quicksand-Bold.ttf'),
    QuicksandLight: require('./assets/fonts/Quicksand-Light.ttf'),
    QuicksandMedium: require('./assets/fonts/Quicksand-Medium.ttf'),
    QuicksandRegular: require('./assets/fonts/Quicksand-Regular.ttf'),
    QuicksandSemiBold: require('./assets/fonts/Quicksand-SemiBold.ttf'),
  });

  // If fonts are not loaded, display splash screen
  if (!fontsLoaded) {
    return (
      <View style={styles.loaderContainer}>
        <ImageBackground
          source={require('./assets/splash.png')}
          style={styles.splashImage}
        >
          <ActivityIndicator size="large" color="#ffffff" />
        </ImageBackground>
      </View>
    );
  }

  // Main app render
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <PaperProvider theme={theme}>
            <NavigationContainer>
              <StackNavigation />
            </NavigationContainer>
          </PaperProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

// Stylesheet for the loader and splash screen
const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
  },
});
