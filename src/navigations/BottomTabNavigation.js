import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PetDetailScreen from '../screens/PetDetailScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Stack navigation for Home and PetDetail screens
const HomeStack = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="HomeStackHome" component={HomeScreen} options={{ title: 'Pets' }}/>
    <Stack.Screen name="PetDetail" component={PetDetailScreen} options={{ title: 'Pet Details' }}/>
  </Stack.Navigator>
);

// Stack navigation for Profile screen
const ProfileStack = () => (
  <Stack.Navigator initialRouteName="Profile">
    <Stack.Screen name="ProfileStackProfile" component={ProfileScreen} options={{ title: 'Profile' }}/>
  </Stack.Navigator>
);

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ headerShown: false, title: 'Pets' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{ headerShown: false, title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
