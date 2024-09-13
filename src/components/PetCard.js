import React from 'react';
import { Card, Title, Paragraph, Chip } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getRandomLightColor } from '../utils/functions';

// Card component to display pet details using React Native Paper
const PetCard = ({ pet }) => {
  // Get navigation object
  const navigation = useNavigation();

  
  return (
    <Card style={styles.card} onPress={() => navigation.navigate('PetDetail', { id: pet.id })}>
        <Title variant="titleLarge">name: {pet.name}</Title>
        <Paragraph>Status: {pet.status}</Paragraph>
        <Paragraph>Category: {pet.category?.name}</Paragraph>
        {pet.tags && pet.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {pet.tags.map((tag) => (
              <Chip key={tag.id} style={[styles.tagChip,{backgroundColor: tag.color||getRandomLightColor()}]}>
                {tag.name}
              </Chip>
            ))}
          </View>
        )}

    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 10,
  },
  cover: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tagChip: {
    marginRight: 5,
    marginBottom: 5,
    backgroundColor: '#f0f0f0',
  },
});

export default PetCard;
