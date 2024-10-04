import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Categories = ({ categories, activeCategory, setActiveCategory }) => {
  if (!categories.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {categories.map((cat, index) => {
          const isActive = cat.strCategory === activeCategory;
          return (
            <View key={index} style={styles.categoryContainer}>
              <TouchableOpacity
                onPress={() => setActiveCategory(cat.strCategory)}
                style={[styles.button, isActive ? styles.activeButton : styles.inactiveButton]}
              >
                <Image source={{ uri: cat.strCategoryThumb }} style={styles.image} />
              </TouchableOpacity>
              <Text style={styles.text}>{cat.strCategory}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 4 },
  scrollContainer: { paddingHorizontal: 15, alignItems: 'center' },
  categoryContainer: { alignItems: 'center', marginRight: 15 },
  button: { alignItems: 'center', justifyContent: 'center', padding: 5, borderRadius: 30, height: 60, width: 60 },
  activeButton: { backgroundColor: 'orange' },
  inactiveButton: { backgroundColor: '#D3D3D3' },
  image: { height: 50, width: 50, borderRadius: 25 },
  text: { fontSize: 12, color: 'gray', marginTop: 5, textAlign: 'center', fontWeight: 'bold' },
});

export default Categories;
