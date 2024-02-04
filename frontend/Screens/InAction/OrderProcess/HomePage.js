import React, { useState, useContext, useRef } from 'react';
import { View, Image, StyleSheet, FlatList, SectionList, TouchableOpacity, ScrollView, Modal, Animated } from 'react-native';
import { Text } from '../../../DefaultFont';
import { Ionicons } from '@expo/vector-icons';
import restaurantData from '../../../Tools/ThemeConsts/restaurantData';
import categoryData from '../../../Tools/ThemeConsts/categoryData';
import LikedDishesContext from '../../../LikedDishesContext';
import DishPage from './DishPage';
import SearchBar from '../../../Tools/Components/Searchbar';
import Categories from '../../../Tools/Components/Categories';
import DishCard from '../../../Tools/Components/DishCard';
import { images } from '../../../Tools/ThemeConsts';
import { CustomDivider } from '../../../Tools/Components/CustomDivider';
import CategoryHeader from '../../../Tools/Components/CategoryHeader';
import RecommendedCircle from '../../../Tools/Components/RecommendedCircle';
import { useUserContext } from '../../../UserContext';
import StickyHeader from '../../../Tools/Components/StickyHeader';
import languagekeys from '../../Identidication/Login/localization/Languagekeys';
import LanguageUtils from '../../Identidication/Login/localization/LanguageUtils';
import { useLanguage } from '../../../LanguageContext';
import ThemeContext from '../../../ThemeContext';
import CategoryDishes from '../../../Tools/Components/CategoryDishes ';

const HomePage = () => {
  const { mode, COLORS } = useContext(ThemeContext);
  const dynamicStyles = getStyles(COLORS, mode);
  const { selectedLanguage, languageRenderCount } = useLanguage();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [showDishModal, setShowDishModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { likedDishes, addLikedDish, removeLikedDish } = useContext(LikedDishesContext);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [headerVisible, setHeaderVisible] = useState(true);
  const headerHeight = useRef(new Animated.Value(0)).current; // Initial header height
  const { user } = useUserContext();

  // Filter dishes based on search text or selected category
  const filteredDishes = searchText
    ? restaurantData.filter(dish => dish.name.toLowerCase().includes(searchText.toLowerCase()))
    : selectedCategoryId
      ? restaurantData.filter(dish => dish.categories.includes(selectedCategoryId))
      : restaurantData;

  const toggleSearchBar = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };
  // Handlers for various actions
  const handleSelectDish = (item) => {
    setSelectedItem(item);
    setShowDishModal(true);
  };

  const handleCloseDishModal = () => {
    setShowDishModal(false);
    setSelectedItem(null);
  };

  const handleLikeDish = (item) => {
    const isLiked = likedDishes.some(dish => dish.id === item.id);
    if (isLiked) {
      removeLikedDish(item);
    } else {
      addLikedDish(item);
    }
  };
  // Animated styles for header
  // Scroll event handler for animated header
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: headerHeight } } }],
    { useNativeDriver: false }
  );
  // Animated styles for header
  const headerStyle = {
    height: headerHeight.interpolate({
      inputRange: [0, 100], // Start fading out after 100 pixels of scroll
      outputRange: [200, 0], // Header height shrinks from 200 to 0
      extrapolate: 'clamp', // Clamp so height doesn't go below 0
    }),
    opacity: headerHeight.interpolate({
      inputRange: [0, 100], // Start fading out after 100 pixels of scroll
      outputRange: [1, 0], // Opacity goes from 1 (fully visible) to 0 (invisible)
      extrapolate: 'clamp',
    }),
    overflow: 'hidden',
  };


  return (
    <View style={dynamicStyles.container}>
      {/* Header with image and search icon */}
      <View style={dynamicStyles.header}>
        <Animated.View style={headerStyle}>
          <Image
            source={images.greg}
            resizeMode="cover"
            style={dynamicStyles.headerImage}
          />
        </Animated.View>

        <View style={dynamicStyles.headerContent}>
          <Text style={dynamicStyles.titleStyle}>{LanguageUtils.getLangText(languagekeys.greg_jerusalem)}</Text>
          <TouchableOpacity onPress={toggleSearchBar} style={dynamicStyles.searchIcon}>
            <Ionicons name="search" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search bar component, shown conditionally and outside the ScrollView */}
      {isSearchBarVisible && (
        <SearchBar searchText={searchText} setSearchText={setSearchText} />
      )}


      {/* Main content area */}
      <ScrollView
        style={dynamicStyles.mainContent}
        stickyHeaderIndices={[0]}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: headerHeight } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={2}
      >
        {/* Search bar component 
        <SearchBar searchText={searchText} setSearchText={setSearchText} />*/}

        {/* Render categories */}
        <View style={dynamicStyles.categoryContainer}>
          <Categories
            categories={categoryData}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={setSelectedCategoryId}
          />
        </View>
        {/* Hide RecommendedCircle if searchText is not empty */}
        {searchText === '' && selectedCategoryId === null && (
          <RecommendedCircle style={dynamicStyles.recommendedCircle} />
        )}
        {/* List of dishes */}
        {categoryData.map((category) => {
          const dishesInCategory = filteredDishes.filter(dish =>
            dish.categories.includes(category.id)
          );
          return (
            dishesInCategory.length > 0 && (
              <CategoryDishes
                key={category.id}
                category={category}
                dishes={dishesInCategory}
                onLikeDish={handleLikeDish}
                onSelectDish={handleSelectDish}
                likedDishes={likedDishes}
                user={user}
              />
            )
          );
        })}
      </ScrollView>

      {/* Modal for detailed dish view */}
      {showDishModal && selectedItem && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showDishModal}
          onRequestClose={handleCloseDishModal}
        >
          <DishPage
            item={selectedItem}
            user={user}
            closeModal={handleCloseDishModal}
          />
        </Modal>
      )}
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
  titleStyle: {
    fontSize:20,
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

export default HomePage;
