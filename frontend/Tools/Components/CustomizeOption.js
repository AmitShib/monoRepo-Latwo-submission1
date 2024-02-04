import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../ThemeConsts/colors';

const CustomizeOption = ({ option, isSelected, onSelect, COLORS, mode }) => {  
  return (
    <TouchableOpacity 
      style={[styles.choice, isSelected ? styles.choiceSelected : {}]}
      onPress={() => onSelect(option)}
    >
      <Text style={{ color: COLORS[mode].text }}>{option}</Text> 
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  choice: {
    padding: 8,
    margin: 4,
    borderRadius: 4,
    backgroundColor: '#1A1A1A', // Replace with theme color if needed
  },
  choiceSelected: {
    backgroundColor: colors.yellow, 
  },
});

export default CustomizeOption;