import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import Login from './src/screens/Login';
import Sign from './src/screens/Signup';
import RecipeDetail from './src/screens/RecipeDetail';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Sign} />
                <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigation;