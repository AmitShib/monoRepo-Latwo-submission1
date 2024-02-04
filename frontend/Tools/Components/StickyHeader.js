import React, { useState, useContext, useRef } from 'react';
import { View, Image, StyleSheet, FlatList, SectionList, TouchableOpacity, ScrollView, Modal,Animated } from 'react-native';
import { Text } from '../../DefaultFont';
import { Ionicons } from '@expo/vector-icons';
// Define a separate component for StickyHeader for cleanliness
const StickyHeader = ({ toggleSearchBar, title }) => {
    return (
      <View style={styles.stickyHeader}>
        <Text style={styles.stickyHeaderTitle}>{title}</Text>
        <TouchableOpacity onPress={toggleSearchBar} style={styles.searchIcon}>
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    );
}; 
    const styles = StyleSheet.create({
  stickyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 10,
  },
  stickyHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
      });

  export default StickyHeader;  