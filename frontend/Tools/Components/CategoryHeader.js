import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { CustomDivider } from './CustomDivider';
import { Text } from '../../DefaultFont';
import ThemeContext from '../../ThemeContext';
import { useLanguage } from '../../LanguageContext';


const CategoryHeader = ({ title }) => {
  const { selectedLanguage } = useLanguage();
  const { mode, COLORS } = useContext(ThemeContext);
  const [align_dir, set_align_dir] = useState(selectedLanguage === "hebrew" ? 'right' : 'left');

  useEffect(() => {
    set_align_dir(selectedLanguage === "hebrew" ? 'right' : 'left');
  }, [selectedLanguage]);

    return (
      <View style={[styles.categoryHeaderContainer, { backgroundColor:  COLORS[mode].newhomepagebackground, }]}>
        <Text style={[styles.categoryHeaderText, { color: COLORS[mode].text, textAlign: align_dir }]}>{title}</Text>
      </View>
    );
  };

// Add styles for category header
const styles = StyleSheet.create({
  categoryHeaderContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  categoryHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CategoryHeader;
