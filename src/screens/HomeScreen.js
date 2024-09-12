import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

const HomeScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text>Login successful!</Text>
      <Button title='Go to Details' onPress={() => navigation.navigate('Details')} testID="goto-details" />
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
        testID="goto-profile"
      />
    </View>
  );
};

export default HomeScreen

const styles = StyleSheet.create({})
