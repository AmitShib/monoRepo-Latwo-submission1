import React, { useContext, useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import ThemeContext from '../../ThemeContext';
import { useLanguage } from '../../LanguageContext';

const Categories = ({ categories, selectedCategoryId, onSelectCategory }) => {
  const { mode, COLORS } = useContext(ThemeContext);
  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  const [align_dir, set_align_dir] = useState(selectedLanguage === "hebrew" ? 'right' : 'left');
  const scrollViewRef = useRef(null);

  const displayedCategories = selectedLanguage === "hebrew"
    ? [...categories].reverse()
    : categories;

  useEffect(() => {
    set_align_dir(selectedLanguage === "hebrew" ? 'right' : 'left');
  }, [selectedLanguage]);

  useEffect(() => {
    // Directly check the language and adjust the scroll position
    if (scrollViewRef.current) {
      if (selectedLanguage === "hebrew") {
        scrollViewRef.current.scrollToEnd({ animated: false });
      } else {
        scrollViewRef.current.scrollTo({ x: 0, animated: false });
      }
    }
  }, [selectedLanguage]); // Depend directly on selectedLanguage


  // Function to handle category selection
  const handleSelectCategory = (id) => {
    // If the current selected category is clicked again, deselect it
    if (selectedCategoryId === id) {
      onSelectCategory(null);
    } else {
      onSelectCategory(id);
    }
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoryContainer}
    >
      {displayedCategories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryItem,
            selectedCategoryId === category.id && styles.categoryItemSelected,
          ]}
          onPress={() => handleSelectCategory(category.id)}
        >
          <Text style={[styles.categoryItemText, { color: COLORS[mode].text, }]}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Styles for your Categories
  categoryContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFA500',
    //marginHorizontal:15,
    paddingHorizontal: 10,

  },
  categoryItem: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  categoryItemSelected: {
    borderBottomWidth: 3,
    borderBottomColor: '#FFA500',
  },
  categoryItemText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Categories;
