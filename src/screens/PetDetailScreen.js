import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPetById } from '../redux/reducer/petDetailSlice';
import PetDetails from '../components/PetDetailsComponent';
import ErrorDisplay from '../components/ErrorDisplay';
import LoadingIndicator from '../components/LoadingIndicator';

const PetDetailScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const { id } = route.params;

  const { pet, loading, error } = useSelector((state) => state.petDetail);

  useEffect(() => {
    if (id) {
      dispatch(fetchPetById(id));
    } else {
      Alert.alert('No pet ID provided');
    }
  }, [dispatch, id]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorDisplay message={error} />;
  }

  return <PetDetails pet={pet} />;
};

export default PetDetailScreen;
