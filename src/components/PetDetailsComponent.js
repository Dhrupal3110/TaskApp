import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import theme from '../../theme/ThemeConfig';

const PetDetails = ({ pet }) => {
  const [imageErrors, setImageErrors] = useState([]);

  const handleImageError = (url) => {
    setImageErrors((prevErrors) => [...prevErrors, url]);
    console.log(`Failed to load image: ${url}`);
  };

  // Use optional chaining and nullish coalescing to handle missing data
  const category = pet?.category?.name ?? 'Unknown Category';
  const status = pet?.status ?? 'Unknown Status';
  const photoUrls = pet?.photoUrls ?? [];
  const tags = pet?.tags ?? [];

  const placeholderUrl = 'https://via.placeholder.com/100'; // Placeholder image URL

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{pet?.name ?? 'No Name'}</Text>

      <Text style={styles.category}>Category: {category}</Text>
      <Text style={styles.status}>Status: {status}</Text>

      {photoUrls.length > 0 ? (
        <View style={styles.imageContainer}>
          {photoUrls.map((url, index) => (
            <Image
              key={index}
              source={imageErrors.includes(url) ? { uri: placeholderUrl } : { uri: url }}
              style={styles.image}
              resizeMode="cover"
              onError={() => handleImageError(url)}
            />
          ))}
        </View>
      ) : (
        <Text style={{ color: theme.colors.accent }}>No photos available</Text>
      )}

      {tags.length > 0 ? (
        <>
          <Text style={styles.tagsTitle}>Tags:</Text>
          {tags.map((tag, index) => (
            <Text key={index} style={styles.tag}>{tag?.name ?? 'Unnamed Tag'}</Text>
          ))}
        </>
      ) : (
        <Text style={{ color: theme.colors.accent }}>No tags available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  category: {
    fontSize: 18,
    marginBottom: 4,
  },
  status: {
    fontSize: 18,
    marginBottom: 16,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  tagsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tag: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default PetDetails;
