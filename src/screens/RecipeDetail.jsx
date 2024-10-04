import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, StatusBar, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import Svg, { Path } from 'react-native-svg';
import axios from 'axios';
import YoutubeIframe from 'react-native-youtube-iframe';

const RecipeDetail = ({ route, navigation }) => {
  const { recipe } = route.params;
  const [isFavourite, setFavourite] = useState(false);
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true);

  useEffect(() => {
    getMealData(recipe.id);
  }, []);

  const getMealData = async (id) => {
    try {
      const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      if (response && response.data && response.data.meals) {
        setMeal(response.data.meals[0]);
      } else {
        setMeal(null);
      }
    } catch (err) {
      console.error('Error fetching recipe:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const ingredientsIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal['strIngredient' + i]) {
        indexes.push(i);
      }
    }
    return indexes;
  };

  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
      <StatusBar style="light" />
      <View style={styles.imageContainer}>
        <FastImage source={{ uri: recipe.uri }} style={styles.image} resizeMode={FastImage.resizeMode.cover} />
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <View style={styles.iconBackground}>
            <Svg height="36" width="36" viewBox="0 0 24 24" fill="orange">
              <Path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </Svg>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setFavourite(!isFavourite)}>
          <View style={styles.iconBackground}>
            <Svg height="34" width="34" viewBox="0 0 24 24" fill={isFavourite ? "orange" : "grey"}>
              <Path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </Svg>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        {loading ? (
          <ActivityIndicator size="large" color="orange" />
        ) : (
          <View style={{ paddingHorizontal: 4, flex: 1, justifyContent: 'space-between' }}>
            <View style={{ marginVertical: 1 }}>
              <Text style={{ color: 'black', fontSize: 30, fontWeight: 'bold', flex: 1, marginLeft: 15 }}>
                {meal?.strMeal}
              </Text>
              <Text style={{ color: 'grey', fontSize: 20, fontWeight: '500', flex: 1, marginLeft: 15 }}>
                {meal?.strArea}
              </Text>
              <View style={styles.iconRow}>
                <View style={styles.infoIcon}>
                  <View style={styles.iconBackgroundWithBorder}>
                    <Svg height="30" width="30" viewBox="0 0 24 24" fill="grey">
                      <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 13h-2V7h2v6h3v2h-3z" />
                    </Svg>
                  </View>
                  <View style={styles.iconTextBackground}>
                    <Text style={styles.iconText}>35 Mins</Text>
                  </View>
                </View>
                <View style={styles.infoIcon}>
                  <View style={styles.iconBackgroundWithBorder}>
                    <Svg height="30" width="30" viewBox="0 0 24 24" fill="grey">
                      <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h3v2h-5V7z" />
                    </Svg>
                  </View>
                  <View style={styles.iconTextBackground}>
                    <Text style={styles.iconText}>03 Servings</Text>
                  </View>
                </View>
                <View style={styles.infoIcon}>
                  <View style={styles.iconBackgroundWithBorder}>
                    <Svg height="30" width="30" viewBox="0 0 24 24" fill="grey">
                      <Path d="M21 11h-1.17l.57-2.27A1 1 0 0 0 19.43 7H16V6a4 4 0 0 0-4-4H8.43c-.74 0-1.4.4-1.74 1.03L2 12v8a2 2 0 0 0 2 2h4v-6h4v6h4.7c1.16 0 2.14-.89 2.3-2.03l1.65-8.25A2 2 0 0 0 21 11zm-9-7a2 2 0 0 1 2 2v1h-4V6a2 2 0 0 1 2-2zm-4.3 4h8.6l-1.2 5H7.1L5.7 8zm-1.4 11H4v-5h2v5zm11 0h-4v-5h4v5zm1.7-7H17v-2h1.7l-1.2 5z" />
                    </Svg>
                  </View>
                  <View style={styles.iconTextBackground}>
                    <Text style={styles.iconText}>103 Cal</Text>
                  </View>
                </View>
                <View style={styles.infoIcon}>
                  <View style={styles.iconBackgroundWithBorder}>
                    <Svg height="30" width="30" viewBox="0 0 24 24" fill="grey">
                      <Path d="M11.99 2L3 13h6v7h6v-7h6L11.99 2zm0 1.5l5.25 6.75h-3.75v6h-3v-6H6.74L11.99 3.5z" />
                    </Svg>
                  </View>
                  <View style={styles.iconTextBackground}>
                    <Text style={styles.iconText}>Easy</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{marginVertical: 4, marginLeft:16, marginTop:9}}>
              <Text style={{fontSize: 30, fontWeight:'bold',flex:1,color:'black'}}>
                Ingredients
              </Text>
              <View style={{marginVertical: 8}}>
                {ingredientsIndexes(meal).map(i => (
                  <View key={i} style={{flexDirection: 'row', alignItems: 'center', marginVertical: 4}}>
                    <View style={{height: 8, width: 8, borderRadius: 4, backgroundColor: 'orange', marginRight: 8}} />
                    <Text style={{color:'black', fontWeight:'700'}}>{meal['strIngredient' + i]} - </Text>
                    <Text style={{color:'black', fontWeight: '500'}}>{meal['strMeasure' + i]}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={{marginVertical: 4, marginLeft:16, marginTop:9}}>
              <Text style={{fontSize: 30, fontWeight:'bold',flex:1,color:'black'}}>
                Instructions
              </Text>
              <Text style={{fontSize: 15, color:'black'}}>
                {
                  meal?.strInstructions
                }
              </Text>
            </View>

            {
              meal?.strYoutube && (
                <View style={{marginVertical: 4}}>
                  <Text style={{fontSize: 30, fontWeight:'bold',flex:1,color:'black', marginLeft:15}}>
                    Recipe Video
                  </Text>
                  <View>
                    {videoLoading && <ActivityIndicator size="large" color="orange" />}
                    <YoutubeIframe
                      videoId={getYouTubeVideoId(meal.strYoutube)}
                      height={230}
                      onReady={() => setVideoLoading(false)}
                    />
                  </View>
                </View>
              )
            }
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  image: {
    width: 370,
    height: 350,
    borderRadius: 35,
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 25,
    marginHorizontal: 10,
  },
  iconBackground: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 8,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  infoIcon: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  iconBackgroundWithBorder: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 8,
    borderWidth: 2,
    borderColor: 'orange',
  },
  iconTextBackground: {
    backgroundColor: 'orange',
    borderRadius: 15,
    marginTop: -10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  iconText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RecipeDetail;
