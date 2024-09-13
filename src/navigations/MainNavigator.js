import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigation from './BottomTabNavigation';
import AuthNavigator from './AuthNavigator';

const MainNavigator = () => {
  const {isLogin} = useSelector((state) => state.user);

  return (
    <NavigationContainer>
      {isLogin ? <BottomTabNavigation /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigator;
