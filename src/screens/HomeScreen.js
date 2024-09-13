// Import necessary libraries and components
import React, { useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import PetCard from '../components/PetCard'; // Custom component to display pet details
import { fetchPets } from '../redux/reducer/petSlice'; // Redux action to fetch pet data
import LoadingIndicator from '../components/LoadingIndicator';

// HomeScreen Component
const HomeScreen = () => {
  const dispatch = useDispatch(); // Initialize Redux dispatch
  // Select state data from Redux store: pets, loading status, and error message
  const { pets, loading, error } = useSelector((state) => state.pets);

  // Fetch pets data when the component is mounted
  useEffect(() => {
    dispatch(fetchPets());
  }, [dispatch]);

  // Show an alert if there's an error
  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred', error);
    }
  }, [error]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {loading ? (
          // Display loading component while fetching data
          <LoadingIndicator />
        ) : (
          // Render PetCard components for each pet in the list
          pets && pets.length > 0 && pets.map((pet) => <PetCard key={pet.id} pet={pet} />)
        )}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

// Styles for HomeScreen component
const styles = StyleSheet.create({
  container: {
    padding: 8, // Add padding to avoid content touching screen edges
  },
});
