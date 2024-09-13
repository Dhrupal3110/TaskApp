import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import theme from '../../theme/ThemeConfig';

const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default LoadingIndicator;
