import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Text, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

const Stack = createNativeStackNavigator();

const WelcomeScreen = ({ navigation }) => {
  const bigCircleAnim = useRef(new Animated.Value(0)).current;
  const smallCircleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateCircles = () => {
      Animated.timing(bigCircleAnim, {
        toValue: 1,
        duration: 2500, 
        useNativeDriver: false,
      }).start();

      Animated.timing(smallCircleAnim, {
   
        toValue: 1,
        duration: 2500,
        useNativeDriver: false,
      }).start();
    };

    animateCircles();
    const timeout = setTimeout(() => navigation.navigate('Login'), 3000);

    return () => clearTimeout(timeout);
  }, [bigCircleAnim, smallCircleAnim, navigation]);

  const getCircleStyle = (anim, size) => ({
    width: anim.interpolate({ inputRange: [0, 1], outputRange: [0, size] }),
    height: anim.interpolate({ inputRange: [0, 1], outputRange: [0, size] }),
    borderRadius: anim.interpolate({ inputRange: [0, 1], outputRange: [0, size / 2] }),
    marginTop: anim.interpolate({ inputRange: [0, 1], outputRange: [0, -size / 2] }),
    marginLeft: anim.interpolate({ inputRange: [0, 1], outputRange: [0, -size / 2] }),
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Animated.View style={[styles.circle, styles.bigCircle, getCircleStyle(bigCircleAnim, 370)]} />
      <Animated.View style={[styles.circle, styles.smallCircle, getCircleStyle(smallCircleAnim, 270)]} />
      <Image source={require('../components/cookman.png')} style={styles.logo} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>CookMan</Text>
        <Text style={styles.punchline}>Your Culinary Superhero!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
  },
  circle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
  },
  bigCircle: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  smallCircle: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  logo: {
    width: 170,
    height: 170,
    resizeMode: 'contain',
    position: 'absolute',
    top: '52.5%',
    left: '52%',
    marginTop: -100,
    marginLeft: -100,
  },
  textContainer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  punchline: {
    fontSize: 18,
    color: 'white',
    marginTop: 10,
  },
});

export default WelcomeScreen;

