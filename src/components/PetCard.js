import React from 'react';
import { Card, Title, Paragraph, Chip } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

// Card component to display pet details using React Native Paper
const PetCard = ({ pet }) => {
    console.log(pet)
  return (
    <Card style={styles.card}>
        {/* Display pet name */}
        <Title style={styles.title}>{pet.name}</Title>
        
        {/* Display pet status */}
        <Paragraph>Status: {pet.status}</Paragraph>

        {/* Display pet category */}
        <Paragraph>Category: {pet.category?.name}</Paragraph>
        
        {/* Display pet tags */}
        {pet.tags && pet.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {pet.tags.map((tag) => (
              <Chip key={tag.id} style={styles.tagChip}>
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
  },
  cover: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    marginTop: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  tagChip: {
    marginRight: 5,
    marginBottom: 5,
  },
});

export default PetCard;
