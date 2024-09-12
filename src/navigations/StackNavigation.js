import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { StyleSheet } from 'react-native'
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';

const StackNavigation = () => {
    const Stack = createNativeStackNavigator();
    // render
    return (
        <>
            <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </>
    )
}

export default StackNavigation

const styles = StyleSheet.create({})
