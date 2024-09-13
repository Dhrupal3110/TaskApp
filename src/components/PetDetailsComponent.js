import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const PetDetails = ({ pet }) => {
  if (!pet) {
    return <Text>No pet details available</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{pet.name}</Text>
      <Text>Status: {pet.status}</Text>
      <Text>Category: {pet.category?.name}</Text>
      {/* Add more pet details here as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default PetDetails;
