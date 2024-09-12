import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { petApi } from '../api';
import { useRoute } from '@react-navigation/native';

const PetDetailScreen = () => {
    const [pet, setPet] = useState(null);
    const route = useRoute();
    const { id } = route.params;
    const getThePet = async (id) => {
        try {
          const fetchedPet = await petApi.getPetById(id);
          setPet(fetchedPet.data);
        } catch (error) {
          console.warn(error)
          Alert.alert('An error occurred');
        }
      };

      useEffect(() => {
        getThePet(id);
      }, []);

// render
    return (
        <View>
            <Text>{JSON.stringify(pet)}</Text>
        </View>
    )
}

export default PetDetailScreen

const styles = StyleSheet.create({})
