import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const Sign = ({ route, navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [copassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (route.params?.newpassword) {
      setPassword(route.params.newpassword);
      setConfirmPassword(route.params.newpassword);
    }
  }, [route.params?.newpassword]);

  const handleSignup = () => {
    console.log('username:', username);
    console.log('password:', password);
    if (password === copassword) {
      console.warn("Password set successfully");
      navigation.navigate('Login', { username, password });
    } else {
      console.warn("Passwords do not match");
    }
  };

  return (
    <ImageBackground source={require('../DishImages/signup.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subTitle}>Few ingredients for account</Text>
        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholder=" Username"
              placeholderTextColor="#888"
              style={styles.input}
            />
            <TextInput
              placeholder=" Set password"
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#888"
              secureTextEntry
              style={styles.input}
            />
            <TextInput
              value={copassword}
              onChangeText={setConfirmPassword}
              placeholder=" Confirm Password"
              placeholderTextColor="#888"
              secureTextEntry
              style={styles.input}
            />
          </View>
          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    color: 'white',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subTitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
    color: '#333',
    marginBottom: 10,
    borderRadius: 15,
  },
  signupButton: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Sign;
