import React, { useRef, useEffect, useContext } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import CategoryHeader from './CategoryHeader';
import { CustomDivider } from './CustomDivider';
import DishCard from './DishCard';
import ThemeContext from '../../ThemeContext';
import { images } from '../ThemeConsts';
import { useLanguage } from '../../LanguageContext';



const CategoryDishes = ({ category, dishes, onLikeDish, onSelectDish, likedDishes, user }) => {

  const { mode, COLORS } = useContext(ThemeContext);
  const dynamicStyles = getStyles(COLORS, mode);
  const { selectedLanguage } = useLanguage();
  const flatListRef = useRef(null);
  const displayedDishes = selectedLanguage === "hebrew" ? [...dishes].reverse() : dishes;


useEffect(() => {
    if (flatListRef.current) {
      if (selectedLanguage === 'hebrew') {
        // For Hebrew, scroll to the end
        flatListRef.current.scrollToEnd({ animated: false });
      } else {
        // For other languages, start from the beginning
        flatListRef.current.scrollToOffset({ animated: false, offset: 0 });
      }
    }
  }, [selectedLanguage]);


  return (
    <View key={category.id} style={dynamicStyles.categoryDishesContainer}>
      <CategoryHeader title={category.name} />
      <CustomDivider borderColor='#FFA500' borderBottomWidth={2} />
      <FlatList
        ref={flatListRef}
        data={displayedDishes}
        renderItem={({ item }) => {
          const userToAdd = user.phonenumber !== ""
            ? { id: user.phonenumber, name: user.firstname + " " + user.lastname, image: images.avatar_5 }
            : { id: '0', name: "Guest", image: images.avatar_5 };

          const updateItem = { ...item, users: [userToAdd] };

          return (
            <DishCard
              item={updateItem}
              onLike={() => onLikeDish(updateItem)}
              onSelect={() => onSelectDish(updateItem)}
              isLiked={likedDishes.some(dish => dish.id === updateItem.id)}
            />
          );
        }}
        keyExtractor={item => item.id.toString()}
        horizontal={true}
        contentContainerStyle={dynamicStyles.horizontalList}
      />
    </View>
  );
};

const getStyles = (COLORS, mode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS[mode].newhomepagebackground,
  },
  mainContent: {
    flex: 1,
  },
  categoryContainer: {
    backgroundColor: COLORS[mode].newhomepagebackground,
    paddingVertical: 18,
    paddingHorizontal: 5,
  },
  headerImage: {
    width: '100%',
    height: 200,
  },
  horizontalList: {
    paddingHorizontal: 10,
  },
  header: {
    backgroundColor: COLORS[mode].newhomepagebackground,
    paddingTop: 0, // Adjust this value to match the status bar height
  },
  headerImage: {
    width: '100%',
    height: 200, // Adjust as needed
    opacity: 0.7, // Adjust the opacity so the title and icon are visible
  },
  headerContent: {
    top: 10, // This should be adjusted to match the status bar height
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  searchIcon: {
    marginRight: 10, // Adjust the margin as needed
  },
});

export default CategoryDishes;
