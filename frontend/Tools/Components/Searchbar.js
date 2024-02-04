import React, { useContext, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import languagekeys from '../../Screens/Identidication/Login/localization/Languagekeys';
import LanguageUtils from '../../Screens/Identidication/Login/localization/LanguageUtils';
import { useLanguage } from '../../LanguageContext';

const SearchBar = ({ searchText, setSearchText }) => {
  const { selectedLanguage, languageRenderCount } = useLanguage();
  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder={LanguageUtils.getLangText(languagekeys.search)}
        placeholderTextColor="#fff" // Optional: Placeholder text color
        value={searchText}
        onChangeText={(text) => setSearchText(text)} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    // Keep flexDirection 'row' if you want to add an icon inside the search bar
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 15,
    marginBottom: 10, // Adjust as needed
    borderBottomWidth: 2, // Set bottom border width
    borderColor: '#FFA500', // Border color for the bottom border
  },
  searchInput: {
    flex: 1,
    paddingVertical: 5, // Padding for top and bottom inside the search bar
    paddingHorizontal: 10, // Padding for left and right inside the search bar
    fontSize: 16, // Optional: Font size for the input text
    color: '#fff', // Optional: Text color
    borderBottomColor: '#FFA500', // Bottom border color
  },
  
});

export default SearchBar;
