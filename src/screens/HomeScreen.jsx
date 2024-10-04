import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, StatusBar, ScrollView, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Categories from '../components/Categories';
import FastImage from 'react-native-fast-image';

const HomeScreen = ({ route, navigation }) => {
  const { username } = route.params;
  const [activeCategory, setActiveCategory] = useState('Vegetarian');
  const [categories, setCategories] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
        if (response && response.data) {
          setCategories(response.data.categories);
        }
      } catch (err) {
        console.error('Error fetching categories:', err.message);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getRecipes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${activeCategory}`);
        if (response && response.data) {
          setRecipes(response.data.meals.map(meal => ({
            id: meal.idMeal,
            name: meal.strMeal,
            uri: meal.strMealThumb,
          })));
        }
      } catch (err) {
        console.error('Error fetching recipes:', err.message);
      } finally {
        setLoading(false);
      }
    };
    getRecipes();
  }, [activeCategory]);

  useEffect(() => {
    const searchRecipes = async () => {
      if (searchQuery.trim() === '') return;
      setLoading(true);
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`);
        if (response && response.data) {
          setRecipes(response.data.meals.map(meal => ({
            id: meal.idMeal,
            name: meal.strMeal,
            uri: meal.strMealThumb,
          })));
        }
      } catch (err) {
        console.error('Error searching recipes:', err.message);
      } finally {
        setLoading(false);
      }
    };

    searchRecipes();
  }, [searchQuery]);

  const handleEndReached = () => {
    setPage(prevPage => prevPage + 1);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const renderRecipeItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
      style={styles.touchableOverlay}>
      <FastImage
        source={{ uri: item.uri }}
        style={styles.image}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text style={styles.imageTitle}>{truncateText(item.name, 20)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image source={require('../components/avatar.png')} style={styles.avatar} />
          <Image source={require('../components/bell.png')} style={styles.bell} />
        </View>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Hello, {username}...</Text>
          <Text style={styles.mainText}>Make your own food,</Text>
          <Text style={styles.mainText}>
            Stay at <Text style={styles.homeText}>Home!</Text>
          </Text>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search any recipe 😋"
            placeholderTextColor="#888"
            style={styles.searchInput}
            onChangeText={text => setSearchQuery(text)}
            value={searchQuery}
          />
        </View>
        <Categories categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        <Text style={styles.recipesHeading}>Recipes</Text>
        {loading ? (
          <ActivityIndicator size="large" color="orange" />
        ) : (
          <FlatList
            data={recipes}
            renderItem={renderRecipeItem}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.flatListContainer}
            columnWrapperStyle={styles.columnWrapper}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.5}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  scrollContainer: { paddingBottom: 50, paddingTop: 14 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 4, marginBottom: 2 },
  avatar: { height: 50, width: 50, borderRadius: 30 },
  bell: { height: 50, width: 50, borderRadius: 30 },
  greetingContainer: { marginHorizontal: 10, marginBottom: 2, paddingTop: 10 },
  greetingText: { fontSize: 18, color: 'grey' },
  mainText: { fontSize: 35, fontWeight: 'bold', color: 'black' },
  homeText: { color: 'orange' },
  searchContainer: { marginHorizontal: 5, flexDirection: 'row', justifyContent: 'center', backgroundColor: '#e0e0e0', borderRadius: 25, paddingHorizontal: 10, paddingVertical: 5, marginTop: 10, marginBottom: 15 },
  searchInput: { fontSize: 16, color: '#444', flex: 1 },
  recipesHeading: { fontSize: 24, fontWeight: 'bold', color: 'grey', marginLeft: 10, marginTop: 15, marginBottom: 10 },
  flatListContainer: { paddingHorizontal: 10 },
  columnWrapper: { justifyContent: 'space-between', marginBottom: 10 },
  image: { height: 250, borderRadius: 15, marginBottom: 10, width: '95%' },
  touchableOverlay: { flex: 1, alignItems: 'center' },
  imageTitle: { marginTop: 5, fontWeight: 'bold', fontSize: 16, color: 'black', textAlign: 'center' },
});

export default HomeScreen;
