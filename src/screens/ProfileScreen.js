import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

function ProfileScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text testID='profile'>Profile screen</Text>
            <Button
                title="Go to Notifications"
                onPress={() => navigation.navigate('Notifications')}
            />
            <Button title="Go back" onPress={() => navigation.goBack()} />
            <Button title="Login" testID='login' onPress={() => navigation.navigate('Login')} />
        </View>
    );
}

export default ProfileScreen

const styles = StyleSheet.create({})
