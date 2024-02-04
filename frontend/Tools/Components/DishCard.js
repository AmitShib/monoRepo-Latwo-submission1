import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ThemeContext from '../../ThemeContext';
const DishCard = ({ item, id, name, price, description, photo, isLiked, onLike, onSelect }) => {
  const { mode, COLORS } = useContext(ThemeContext);
  const dynamicStyles = getStyles(COLORS, mode);

  return (
    <View style={dynamicStyles.card}>
      <TouchableOpacity style={dynamicStyles.likeButton} onPress={() => onLike(item.id)}>
        <Ionicons name={isLiked ? "heart" : "heart-outline"} size={24} color={isLiked ? "red" : "white"} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onSelect(item.id)}>
        <Image source={item.photo} style={dynamicStyles.cardImage} />
        <View style={dynamicStyles.cardContent}>
          <Text style={dynamicStyles.cardTitle}>{item.name}</Text>
          <Text style={dynamicStyles.cardPrice}>₪{item.price.toFixed(2)}</Text>
          <Text numberOfLines={3} style={dynamicStyles.cardDescription}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (COLORS, mode) => StyleSheet.create({
  // Styles for your DishCard
  container: {
    flex: 1,
    backgroundColor: COLORS[mode].dishcardcon,
  },
  grid: {
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },

  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: COLORS[mode].dishcardcon,
    borderRadius: 8,
    marginVertical: 10,
    marginHorizontal: 10, // Adjusted for spacing between cards
    width: 160, // Fixed width for consistent sizing
    shadowColor: "#333",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  cardImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    color: COLORS[mode].text,
    fontSize: 16, // Adjusted for potentially smaller card size
    fontWeight: 'bold',
  },
  cardPrice: {
    color:  COLORS[mode].text,
    fontSize: 14, // Adjusted for potentially smaller card size
    fontWeight: '600',
  },
  cardDescription: {
    color:COLORS[mode].text,
    fontSize: 12, // Adjusted for potentially smaller card size
  },
  likeButton: {
    position: 'absolute',
    top: 10,
    right: 10, // Moved to the right for better visibility
    zIndex: 1,
  },
});

export default DishCard;
