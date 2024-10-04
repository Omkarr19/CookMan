import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';

const Login = ({ route, navigation }) => {
  const [lusername, setUsername] = useState('');
  const [lpassword, setPassword] = useState('');
  const susername = route.params?.username || 'Batman';
  const spassword = route.params?.password || route.params?.newpassword || 'imbatman';

  const handleLogin = () => {
    console.log('username:', lusername);
    console.log('password:', lpassword);
    if (lusername === susername && lpassword === spassword) {
      navigation.navigate('Home', { username: lusername });
    } else {
      Alert.alert("Invalid credentials", "The username or password you entered is incorrect.");
    }
  };

  return (
    <ImageBackground source={require('../DishImages/login.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome <Text style={{ color: 'orange' }}>Chef!</Text></Text>
        <Text style={styles.subTitle}>Keep your recipe a secret</Text>
        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <TextInput
              value={lusername}
              onChangeText={setUsername}
              placeholder=" Username"
              placeholderTextColor="#888"
              style={styles.input}
            />
            <TextInput
              value={lpassword}
              onChangeText={setPassword}
              placeholder=" Password"
              placeholderTextColor="#888"
              secureTextEntry={true}
              style={styles.input}
            />
          </View>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupButton}>Sign Up</Text>
            </TouchableOpacity>
          </View>
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
  loginButton: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 15,
    marginVertical: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
  signupText: {
    color: '#888',
  },
  signupButton: {
    color: '#FF6A00',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default Login;