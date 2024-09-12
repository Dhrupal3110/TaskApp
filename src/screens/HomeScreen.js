import React, { useEffect, useState } from 'react'
import { Alert, Button, StyleSheet, Text, View } from 'react-native'
import { petApi } from '../api';
import { ScrollView } from 'react-native-gesture-handler';
import PetCard from '../components/PetCard';

const HomeScreen = ({ navigation }) => {
  const [pets, setPets] = useState(null);

  const getPet = async () => {
    try {
      const response = await petApi.findPetsByStatus(['available', 'pending', 'sold']);
      console.log(response.data[0], "response.data")
      setPets(response.data.splice(0, 100));
    } catch (error) {
      console.warn(error)
      Alert.alert('An error occurred');
    }
  };


  useEffect(() => {
    getPet();
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        {
          pets && pets.length > 0 && pets.map((pet) => <PetCard key={pet.id} pet={pet} />)
        }
      </View>
    </ScrollView>
  );
};

export default HomeScreen

const styles = StyleSheet.create({})
