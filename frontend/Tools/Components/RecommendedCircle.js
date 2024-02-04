// RecommendedCircle.js
import { Image, View, TouchableOpacity, ScrollView, Modal } from "react-native";
import React, { useContext, useState, useRef, useEffect } from 'react';
import ThemeContext from "../../ThemeContext";
import Heading from "./Heading";
import languagekeys from "../../Screens/Identidication/Login/localization/Languagekeys";
import LanguageUtils from "../../Screens/Identidication/Login/localization/LanguageUtils";
import restaurantData from "../ThemeConsts/restaurantData";
import DishStory from "./DishStory";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../../DefaultFont";
import DishPage from "../../Screens/InAction/OrderProcess/DishPage";
import { CustomDivider } from "./CustomDivider";
import { useLanguage } from "../../LanguageContext";

const RecommendedCircle = () => {
  const { mode, COLORS } = useContext(ThemeContext);
  const navigation = useNavigation();
  const [showDishModal, setShowDishModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedDishIndex, setSelectedDishIndex] = useState(null); // Store the index of the selected dish
  const [isStoryVisible, setIsStoryVisible] = useState(false);
  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  const [align_dir, set_align_dir] = useState(selectedLanguage === "hebrew" ? 'right' : 'left');

  const displayedRestaurants = selectedLanguage === "hebrew"
    ? restaurantData
    : [...restaurantData].reverse();

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

  const handleDishPress = (dish) => {
    setSelectedItem(dish); // Set the selected dish object
    setShowDishModal(true); // Open the modal
  };

  const scrollViewRef = useRef(null);

  const handleContentSizeChange = () => {
    if (scrollViewRef.current) {
      if (align_dir === 'right') {
        scrollViewRef.current.scrollToEnd({ animated: false });
      } else if (align_dir === 'left') {
        scrollViewRef.current.scrollTo({ x: 0, animated: false });
      }
    }
  };

  const circleStyles = {
    backgroundColor: COLORS[mode].dishcardcon,
    borderRadius: 8,
    marginVertical: 10,
    marginHorizontal: 10,
    width: 160, // Fixed width for the card
    height: 250, // Fixed total height for the card
    shadowColor: "#333",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  };

  return (
    <>
      <View style={{ flex: 1, top: 1 }}>
        <Text style={[{ color: COLORS[mode].headermenu, fontSize: 16, fontWeight: '900', paddingBottom: 5, marginHorizontal: 15 }]}>
          {LanguageUtils.getLangText(languagekeys.recommended_for_you)}
        </Text>
        <CustomDivider borderColor='#FFA500' borderBottomWidth={2} />
      </View>

      <ScrollView
        ref={scrollViewRef} // Assign the ref to your ScrollView
        horizontal
        //inverted
        showsHorizontalScrollIndicator={true}
        onContentSizeChange={handleContentSizeChange}
      >
        <View style={{ flexDirection: 'row-reverse', borderWidth: 8, borderColor: 'transparent', borderRadius: 10 }}>
          {displayedRestaurants.map((dish, index) => (
            <TouchableOpacity onPress={() => handleDishPress(dish)} key={index}>
              <View style={circleStyles}>
                {/* Wrap Image and Text inside a View */}
                <View style={{ position: 'relative', alignItems: 'center', }}>
                  <Image
                    source={dish.photo}
                    resizeMode="cover"
                    style={{
                      width: '100%',
                      borderColor: COLORS[mode].text, // Add a border color
                      height: 120,
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                    }}
                  />
                  <View style={{ padding: 10 }}>
                    <Text numberOfLines={2} style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 5 }}>
                      {dish.name}
                    </Text>
                    <Text>
                      ₪{dish.price.toFixed(2)}
                    </Text>
                    <Text numberOfLines={2} style={{ color: 'grey' }}>
                      {dish.description}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>


      {showDishModal && selectedItem && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showDishModal}
          onRequestClose={() => {
            setShowDishModal(false);
            setSelectedItem(null);
          }}
        >
          <DishPage
            item={selectedItem}
            closeModal={() => {
              setShowDishModal(false);
              setSelectedItem(null);
            }}
            navigation={navigation}
          />
        </Modal>
      )}

    </>
  );
}

export default RecommendedCircle;
