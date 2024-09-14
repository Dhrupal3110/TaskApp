import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import theme from './theme/ThemeConfig';
import { persistor, store } from './src/redux';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import * as Network from 'expo-network';
import Toast from 'react-native-root-toast';
import MainNavigator from './src/navigations/MainNavigator';

export default function App() {


  const [isConnected, setIsConnected] = React.useState(true); // Manage network connectivity state

  React.useEffect(() => {
    const checkConnectivity = async () => {
      try {
        const networkState = await Network.getNetworkStateAsync();
        if (!networkState.isConnected) {
          Toast.show('Internet is not available', {
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 300,
            opacity: 0.9,
          });
        }
        setIsConnected(networkState.isConnected);
      } catch (error) {
        console.error('Error checking network status:', error);
      }
    };

    // Check connectivity initially and every 5 seconds thereafter
    checkConnectivity();
    const interval = setInterval(checkConnectivity, 5000);

    return () => {
      clearInterval(interval); // Cleanup on unmount
    };
  }, []);


  // Main app render
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <PaperProvider theme={theme}>
            <MainNavigator />
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
