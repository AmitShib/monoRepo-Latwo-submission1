import React, { useContext, useState } from 'react';
import { View, ScrollView, SafeAreaView, TouchableOpacity, Image, TextInput, FlatList, StyleSheet, Platform, SectionList, Modal } from 'react-native';

import { ThemeContext } from "../../../ThemeContext";
import COLORS from '../../../Tools/ThemeConsts/colors';
import FONTS from '../../../Tools/ThemeConsts/Font';
import SIZES from '../../../Tools/ThemeConsts/theme';
import images from "../../../Tools/ThemeConsts/images";
import SPACING from "../../../Tools/ThemeConsts/SPACING";
import restaurantData from '../../../Tools/ThemeConsts/restaurantData';
import categoryData from '../../../Tools/ThemeConsts/categoryData';
import { icons } from "../../../Tools/ThemeConsts";
import { Text } from "../../../DefaultFont";
import RecommendedCircle from '../../../Tools/Components/RecommendedCircle';
import BirdChat from '../../../Tools/Components/BirdChat';
import LikedDishesContext from '../../../LikedDishesContext';
import languagekeys from '../../Identidication/Login/localization/Languagekeys';
import LanguageUtils from '../../Identidication/Login/localization/LanguageUtils';
import { useLanguage } from '../../../LanguageContext';
import DrawerIconToggle from '../../../Tools/Components/DrawerIconToggle';
import DishPage from './DishPage';
import { CustomDivider } from '../../../Tools/Components/CustomDivider';
import { useUserContext } from '../../../UserContext';



const Home = ({ navigation }) => {
  const { user } = useUserContext();
  const [showDishModal, setShowDishModal] = useState(false);
  const { mode, COLORS } = useContext(ThemeContext);
  const { likedDishes, addLikedDish, removeLikedDish } = useContext(LikedDishesContext);
  const handleFloatingActionButtonPress = () => {
        // Add your logic for the floating action button press here
        navigation.navigate('Chat');
     };

     const handleDrawerToggle = () => {
      navigation.openDrawer(); // Handle the drawer toggle action
    };
  const [categories, setCategories] = React.useState(categoryData);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [restaurants, setRestaurants] = React.useState(restaurantData);
  const [searchText, setSearchText] = React.useState('');
  const { selectedLanguage, languageRenderCount } = useLanguage();
  const [selectedItem, setSelectedItem] = useState(null);
  // Function to handle like button press
  const handleLikeDish = (item) => {
    const isLiked = likedDishes.some((dish) => dish.id === item.id);
  
    if (isLiked) {
      // If the dish is already liked, remove it from the likedDishes array
      removeLikedDish(item);
    } else {
      // If the dish is not liked, add it to the likedDishes array
      addLikedDish(item);
    }
  };
  
  const handleCloseDishModal = () => {
    setShowDishModal(false);
  };
  

  const onSelectCategory = (category) => {
    if (selectedCategory?.id === category.id) {
      setRestaurants(restaurantData);
      setSelectedCategory(null);
    } else {
      const restaurantList = restaurantData.filter((a) =>
        a.categories.includes(category.id)
      );
  
      setRestaurants(restaurantList);
      setSelectedCategory(category);
    }
  };

  const getCategoryNameById = (id) => {
    const category = categories.filter((a) => a.id === id);

    if (category.length > 0) {
      return category[0].name;
    }

    return '';
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filteredRestaurants = restaurantData.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(text.toLowerCase())
    );
    setRestaurants(filteredRestaurants);
  };

  const renderMainCategories = () => {
    const renderItem = ({ item }) => {
      return (
        
        <TouchableOpacity
          style={[
            styles.categoryItem,
            {
              backgroundColor:
                selectedCategory?.id === item.id
                  ? COLORS[mode].tabsbackground
                  : COLORS[mode].primary,
            },
          ]}
          onPress={() => onSelectCategory(item)}
        >
          <View style={styles.categoryIndicator}></View>
  
          <Text
            style={[
              styles.categoryName,
              {
                color:
                  selectedCategory?.id === item.id ? COLORS[mode].text : COLORS[mode].black,
              },
            ]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };
  
    return (
      <View  style={[
        { backgroundColor: COLORS[mode].background },
      ]}>
        <Image
          source={images.greg}
          resizeMode="cover"
          width="100%"
          style={styles.headerImage}
        />
  
        <Text style={[styles.mainCategoriesTitle, {color: COLORS[mode].headermenu}]}>{LanguageUtils.getLangText(languagekeys.greg_jerusalem)}</Text>
  
        <View style={[styles.searchBarContainer, { backgroundColor: COLORS[mode].black }]}>
        <View style={{
          flexDirection: 'row', 
          alignItems: 'center',
          borderColor: COLORS[mode].white,
          borderWidth: 1, 
          borderRadius :5,
          backgroundColor: COLORS[mode].background,
        }}>

          <Image 
            source={icons.search} 
            style={{tintColor: COLORS[mode].white, marginLeft: 5, width: 20, height: 20 }} 
          />

          <TextInput
            style={[
              styles.searchInput,
              {
                flex: 1,
                color: COLORS[mode].text,
                borderWidth: 0,  
                paddingLeft: 30,  
              },
            ]}
            placeholderTextColor={COLORS[mode].text}
            placeholder={LanguageUtils.getLangText(languagekeys.search)}
            value={searchText}
            onChangeText={handleSearch}
            textAlign="right"
            textAlignVertical="center"
          />
        </View>
      </View>
  
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={styles.categoryList}
        />
      </View>
    );
  };
  
  const renderRestaurantList = () => {
    const dataWithRecommendedCircle = [
      { type: 'recommended' }, 
      ...restaurants,
    ];
  
     // Filter out empty categories
  const filteredCategories = categories.filter(category => {
    const restaurantsInCategory = restaurants.filter(restaurant => restaurant.categories.includes(category.id));
    return restaurantsInCategory.length > 0;
  });

    const renderItem = ({ item }) => 
    {
      if (item.type === 'circle') {
        return <RecommendedCircle style={styles.recommendedCircle} />;
      }
      const isLiked = likedDishes.some((dish) => dish.id === item.id);      
      //Tomer when usercontext has picure pull data from there
      //Table provider 
      //Problem: we need to save new users picture right now the picture defaults to avar_5
      //console.log(user);
      const user_to_add =  user.phonenumber!="" ? //not the most elegant but the idea is to say that we arent logged in
            { id: user.phonenumber, name: user.firstname+" "+user.lastname, image: images.avatar_5 } :
            { id: '0', name: "Guest", image: images.avatar_5 };
        
      const updateItem = {        
        ...item,
        users: [
          user.phonenumber!="" ? //not the most elegant but the idea is to say that we arent logged in
            { id: user.phonenumber, name: user.firstname+" "+user.lastname, image: images.avatar_5 } :
            { id: '0', name: "Guest", image: images.avatar_5 },                
        ],
      };
      // console.log("Home --->");
      // console.log(item.users);
      // ^^^ Tomer when usercontext has picure pull data from there

      return (
        <View style={{ backgroundColor: COLORS[mode].menubackground }}>
                

          <TouchableOpacity
            style={[
              styles.restaurantItem,
              { backgroundColor: COLORS[mode].menubackground },
              Platform.OS === 'web' && styles.webImageContainer,
            ]}
            onPress={() => {
              setSelectedItem(updateItem);
              setShowDishModal(true);
          }}
          
>
      
            <View style={[
              styles.restaurantItemContainer,
              { backgroundColor: COLORS[mode].menubackground },
              ]}>
              <View style={styles.imageContainer}>
                <Image
                  source={item.photo}
                  style={styles.restaurantImage}
                />
                <TouchableOpacity
                  style={[
                    styles.likeButton,
                  ]}
                  onPress={() => handleLikeDish(item)}
                >
 
                    <Image
                      source={isLiked ? icons.liked : icons.like2}
                      style={[
                        styles.likeIcon,
                      ]}
                    />
                  <Text
                    style={[
                      styles.likeCount,
                      {
                        color: isLiked ? COLORS[mode].primary : COLORS.primary,
                      },
                    ]}
                  >
                    {item.like}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.itemContainer, {backgroundColor: COLORS[mode].menubackground,}]}>
                <Text style={[styles.restaurantName, { color: COLORS[mode].text }]}>{item.name}</Text>
                <Text numberOfLines={3} style={[styles.restaurantDescription, { color: COLORS[mode].text }]}>
                  {item.description}
                </Text>
                <View style={[styles.restaurantInfo, { color: COLORS[mode].text, right: 45 }]}>
                  <Text style={styles.infoText}>{item.duration}</Text>
                  <Text style={styles.infoText}> • </Text>
                  <Text style={styles.infoText}>{item.price} ₪</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    };
  
    const renderCategoryHeader = ({ section: { category } }) => (
    <Text style={[styles.categoryHeader, { color: COLORS[mode].primary }]}>{getCategoryNameById(category)}</Text>
  );

  return (
    <View style={{ flex: 1, backgroundColor: COLORS[mode].menubackground, borderRadius: 10, borderWidth: 10, borderColor: COLORS[mode].menubackground, width: '95%', alignSelf: 'center' }}>
      <SectionList
        sections={[
          { data: [{ type: 'recommended' }], title: LanguageUtils.getLangText(languagekeys.recommended_for_you), renderItem: () => <RecommendedCircle /> },
          ...filteredCategories.map(category => ({
            title: category.name,
            data: restaurants.filter(restaurant => restaurant.categories.includes(category.id)),
          })),
        ]}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        renderSectionHeader={({ section }) => (
          <View>
          <Text style={styles.categoryHeaderText}>{section.title}</Text>
          {section.title !== LanguageUtils.getLangText(languagekeys.recommended_for_you) && <CustomDivider borderColor={COLORS[mode].primary} borderBottomWidth={0.5} />}
          </View>
        )}
        contentContainerStyle={styles.restaurantList}
      />

    {showDishModal && selectedItem && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showDishModal}
          onRequestClose={handleCloseDishModal}
        >
          <DishPage
            item={selectedItem}
            closeModal={() => {
              setShowDishModal(false);
              setSelectedItem(null); // Clear the selected item when closing the modal
            }}
            navigation={navigation} 
          />
        </Modal>
    )}

    </View>
  );

    
  };
  
  
  

  

  return (
    <ScrollView style ={{backgroundColor: COLORS[mode].background, padding:0}}>
    <View style={[styles.container, {backgroundColor: COLORS[mode].background, }]}>

      {renderMainCategories() }
      {renderRestaurantList()}
      {/* <DrawerIconToggle onPress={handleDrawerToggle} /> */}

    </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  recommendedCircle: {
    marginTop: 0, 
  },
  categoryHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 0,
  },

    container: {
      flex: 1,
      paddingTop: 0,
    },

    headerImage: {
      width: '100%',
      height: 200,
    },
    mainCategoriesTitle: {
      ...FONTS.h1,
      fontWeight: '900',
      color: COLORS.primary,
      paddingHorizontal: 10,
      paddingVertical: 10,
      fontSize: 30,
    },
    likeButton: {
      position: 'absolute',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      bottom:0,
      top:0,
      left:0,
      paddingHorizontal:10,
      // Need to Add IsRTL here and change Top Right Bottom A
      
    },
    likeIcon: {
      height: 20,
      width: 20,
      marginLeft: 5,
      // marginRight: 10,
      
    },
    likeCount: {
      ...FONTS.h4,
    },
    searchBarContainer: {
      paddingHorizontal: 20,
      marginTop: 2,
      marginBottom: 2,
      left:10,
    },
    searchInput: {
      height: 40,
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 10,
    },
    categoryList: {
      paddingVertical: 20,
    },
    categoryItem: {
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 5,
      paddingHorizontal: 10,
      height:25,
    },
    categoryIndicator: {
      width: 80,
    },
    categoryName: {
      fontWeight: 'bold',
      fontSize:15,

    },
    restaurantList: {
      // paddingHorizontal: 10,
      paddingBottom: 20,
    },
    restaurantItem: {
      marginBottom: 5,
      justifyContent:'space-around'
    },
    restaurantItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      // paddingHorizontal: 0,
      paddingVertical: 10,
      borderRadius: 10,
    },
    imageContainer: {
      marginRight: 15,
      
    },
    restaurantImage: {
      width: 104,
      height: 90,
      paddingHorizontal: 10,
      left:10,
      borderRadius: Platform.OS === 'web' ? 15 : 12,
      resizeMode: Platform.OS === 'web' ? 'cover' : 'cover',
    },
    webImageContainer: {
      display: 'flex', 
      justifyContent: 'center',
      maxWidth: "100%",
      height: 'auto',
      resizeMode: Platform.OS === 'web' ? 'cover' : 'cover',
    },
    itemContainer: {
      flex: 1,
    },
    restaurantName: {
      fontWeight: 'bold',
      fontSize: 15,
      paddingBottom: 5,
    },
    restaurantInfo: {
      flexDirection: 'row',
      marginTop: 5,
      margin:0,
      marginLeft:'auto'

    },
    infoText: {
      margin:0,
      fontWeight: 'bold',
      color: COLORS.yellow,
      ...FONTS.body5,
    },
    restaurantDescription: {
      ...FONTS.body5,
    },
    floatingActionButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        backgroundColor: COLORS.yellow,

      },
      floatingActionButtonIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        backgroundColor: COLORS.yellow,

      },
      
  });
  
export default Home;