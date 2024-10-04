/*import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import MasonryList from 'react-native-masonry-list';

const Recipes = ({ categories }) => {
  return (
    <View style={{ marginHorizontal: 4 }}>
      <Text style={{ color: 'grey', fontSize: 25, fontWeight: 'bold', marginLeft: 13, marginTop: 8 }}>
        Recipes
      </Text>
      <View>
        {
          categories.length==0? null:(
            <MasonryList
        data={categories.map(category => ({
          name: category.strCategory,
          image: category.strCategoryThumb,
        }))}
        keyExtractor={(item) => item.name}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => <RecipeCard item={item} index={index} />}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          console.log('Fetching more recipes...');
        }}
      />
          )
        }
      </View>
    </View>
  );
};

const RecipeCard = ({ item, index }) => {
  const imageVariations = [90, 120, 150]; 
  const imageHeight = imageVariations[index % imageVariations.length];

  return (
    <View style={{ margin: 4, backgroundColor: 'white', borderRadius: 8, overflow: 'hidden' }}>
      <Pressable style={{ width: '100%', justifyContent: 'center', marginBottom: 4 }}>
        <Image 
          source={{ uri: item.image }} 
          style={{ width: '100%', height: imageHeight, borderRadius: 25, resizeMode: 'cover' }} 
        />
        <Text style={{ padding: 8, fontSize: 16, fontWeight: 'bold', color: 'grey' }}>
          {item.name.length > 20 ? item.name.slice(0, 20) + '...' : item.name}
        </Text>
      </Pressable>
    </View>
  );
};

export default Recipes;
const staticRecipes =
{
  "meals": [
    {
      "strMeal": "Baked salmon with fennel & tomatoes",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/1548772327.jpg",
      "idMeal": "52959"
    },
    {
      "strMeal": "Cajun spiced fish tacos",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/uvuyxu1503067369.jpg",
      "idMeal": "52819"
    },
    {
      "strMeal": "Escovitch Fish",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/1520084413.jpg",
      "idMeal": "52944"
    },
    {
      "strMeal": "Fish fofos",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/a15wsa1614349126.jpg",
      "idMeal": "53043"
    },
    {
      "strMeal": "Fish pie",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg",
      "idMeal": "52802"
    },
    {
      "strMeal": "Fish Soup (Ukha)",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/7n8su21699013057.jpg",
      "idMeal": "53079"
    },
    {
      "strMeal": "Fish Stew with Rouille",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/vptqpw1511798500.jpg",
      "idMeal": "52918"
    },
    {
      "strMeal": "Garides Saganaki",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/wuvryu1468232995.jpg",
      "idMeal": "52764"
    },
    {
      "strMeal": "Grilled Portuguese sardines",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/lpd4wy1614347943.jpg",
      "idMeal": "53041"
    },
    {
      "strMeal": "Honey Teriyaki Salmon",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/xxyupu1468262513.jpg",
      "idMeal": "52773"
    },
    {
      "strMeal": "Kedgeree",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/utxqpt1511639216.jpg",
      "idMeal": "52887"
    },
    {
      "strMeal": "Kung Po Prawns",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/1525873040.jpg",
      "idMeal": "52946"
    },
    {
      "strMeal": "Laksa King Prawn Noodles",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/rvypwy1503069308.jpg",
      "idMeal": "52821"
    },
    {
      "strMeal": "Mediterranean Pasta Salad",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/wvqpwt1468339226.jpg",
      "idMeal": "52777"
    },
    {
      "strMeal": "Mee goreng mamak",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/xquakq1619787532.jpg",
      "idMeal": "53048"
    },
    {
      "strMeal": "Nasi lemak",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/wai9bw1619788844.jpg",
      "idMeal": "53051"
    },
    {
      "strMeal": "Portuguese fish stew (Caldeirada de peixe)",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/do7zps1614349775.jpg",
      "idMeal": "53045"
    },
    {
      "strMeal": "Recheado Masala Fish",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/uwxusv1487344500.jpg",
      "idMeal": "52809"
    },
    {
      "strMeal": "Salmon Avocado Salad",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/1549542994.jpg",
      "idMeal": "52960"
    },
    {
      "strMeal": "Salmon Prawn Risotto",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/xxrxux1503070723.jpg",
      "idMeal": "52823"
    },
    {
      "strMeal": "Saltfish and Ackee",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/vytypy1511883765.jpg",
      "idMeal": "52936"
    },
    {
      "strMeal": "Seafood fideuà",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/wqqvyq1511179730.jpg",
      "idMeal": "52836"
    },
    {
      "strMeal": "Shrimp Chow Fun",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/1529445434.jpg",
      "idMeal": "52953"
    },
    {
      "strMeal": "Sledz w Oleju (Polish Herrings)",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/7ttta31593350374.jpg",
      "idMeal": "53023"
    },
    {
      "strMeal": "Spring onion and prawn empanadas",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/1c5oso1614347493.jpg",
      "idMeal": "53040"
    },
    {
      "strMeal": "Sushi",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg",
      "idMeal": "53065"
    },
    {
      "strMeal": "Three Fish Pie",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/spswqs1511558697.jpg",
      "idMeal": "52882"
    },
    {
      "strMeal": "Tuna and Egg Briks",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/2dsltq1560461468.jpg",
      "idMeal": "52975"
    },
    {
      "strMeal": "Tuna Nicoise",
      "strMealThumb": "https://www.themealdb.com/images/media/meals/yypwwq1511304979.jpg",
      "idMeal": "52852"
    }
  ]
}
export default staticRecipes;*/