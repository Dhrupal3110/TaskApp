import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { validationMessages } from '../constants/ValidationMessages';
import { registerUser } from '../redux/reducer/authSlice';
import theme from '../../theme/ThemeConfig';
import Toast from 'react-native-root-toast';
import { ActivityIndicator } from 'react-native-paper';

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const {loading} = useSelector((state) => state.user);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(validationMessages.nameRequired),
    email: Yup.string().email(validationMessages.invalidEmail).required(validationMessages.emailRequired),
    password: Yup.string().min(6, validationMessages.passwordTooShort).required(validationMessages.passwordRequired),
  });

  
  const handleRegister = async (values) => {
    dispatch(registerUser(values))
      .unwrap()
      .then(() => {
        navigation.navigate('Login');
        Toast.show('Registration successful', {
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
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>

      <Formik
        initialValues={{ name: '', email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                testID="name-input"
              />
              {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
                autoCapitalize="none"
                testID="email-input"
              />
              {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry
                testID="password-input"
              />
              {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>

            <TouchableOpacity style={[styles.registerButton,{backgroundColor:loading?theme.colors.disabled:theme.colors.primary}]} onPress={handleSubmit} testID="register-button">
            {loading?<ActivityIndicator color={theme.colors.primary}/>:null}<Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.loginLink}>
              <Text style={styles.loginText}>Already have an account? Login</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  inputContainer: {
    width: '85%',
    marginBottom: 16,
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  registerButton: {
    width: '85%',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    flexDirection:'row',
    justifyContent:'center',
    gap:6
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  loginLink: {
    marginTop: 16,
  },
  loginText: {
    color: '#007BFF',
    fontSize: 16,
  },
});

export default RegisterScreen;
