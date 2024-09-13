import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { performLogout } from '../redux/reducer/authSlice';
import Toast from 'react-native-root-toast';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  // Function to handle the "Edit Profile" button press
  const handleEditProfile = () => {
    Alert.alert('Coming Soon', 'The Edit Profile feature will be available soon!');
  };
  const handleLogout = () => {
    dispatch(performLogout())
      .then(() => {
        Toast.show('Logout successful', {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 300,
          opacity: 0.9,
        })
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };
  return (
    <View style={styles.container}>
      {/* Avatar and Name */}
      <View style={styles.avatarContainer}>
        <Avatar.Image
          size={100}
          source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
          style={styles.avatar}
        />
        {user && (
          <Text style={styles.userInfo}>Logged in as {user.email}</Text>
        )}
      </View>

      {/* User Information */}
      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            label="Email"
            value={user?.email ? user.email : "john.doe@example.com"}
            style={styles.input}
            mode="outlined"
            disabled
          />
          <TextInput
            label="Bio"
            value="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
            style={styles.input}
            mode="outlined"
            multiline
            numberOfLines={4}
            disabled
          />
        </Card.Content>
      </Card>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={handleEditProfile}
        >
          Edit Profile
        </Button>
        <Button
          mode="outlined"
          style={styles.button}
          onPress={handleLogout}
        >
          Logout
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    backgroundColor: '#e0e0e0',
  },
  userName: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default ProfileScreen;
