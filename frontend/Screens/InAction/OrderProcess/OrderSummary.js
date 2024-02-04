import { Image, SafeAreaView, Dimensions, View, ScrollView } from "react-native";
import React, { useState,useContext, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import YellowHeading from "../../../Tools/Components/YellowHeading";
import Colors from "../../../Tools/ThemeConsts/colors";
import CartItem from "../../../Tools/Components/CartItem";
import NextButton from "../../../Tools/Components/NextButton";
import { ThemeContext } from "../../../ThemeContext";
import { Text } from "../../../DefaultFont";
import BackButton from "../../../Tools/Components/BackButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useOrderedItems } from "../../../OrderedItemsProvider";
import NewComplaint from "../../../Tools/Components/Newcomplaint";

import languagekeys from "../../Identidication/Login/localization/Languagekeys";
import LanguageUtils from "../../Identidication/Login/localization/LanguageUtils";
import { useLanguage } from "../../../LanguageContext";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const OrderSummary = ({ route }) => {
  const { item, count, customizeNames, selectedOptionsArr } = route.params;
  const dish_Item = item;
  const { mode, COLORS } = useContext(ThemeContext);
  const navigation = useNavigation();
  const { orderedItems, addOrderedItem, removeOrderedItem, checkedItems, addCheckedItem, removeCheckedItem, setOrderedItems } = useOrderedItems();
  const { selectedLanguage, languageRenderCount } = useLanguage();



  //console.log(count);
  console.log(route.params.parentNumber);

  const customOnPress = () => {
    const wrappedItem = { items: item, ordered: false, paid: false, checked: false };
    for (let i = 0; i < route.params.parentNumber; i++) {
      addCheckedItem(wrappedItem); // Add the wrapped item to checkedItems
      addOrderedItem(wrappedItem); // Add the wrapped item to orderedItems
      console.log("kululu");
    }
    console.log("Checked items:", checkedItems);
    console.log("Ordered items:", orderedItems);
    navigation.navigate('Home');
  };
  
  const handleNextButtonPress = () => {
    navigation.navigate("Table", {
      item: item,
    });
  };

  return (
    <ScrollView
      style={{
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundColor: COLORS[mode].background,
      }}
    >
      <View
        style={{
          marginTop: 80,
          marginRight: 30,
          marginLeft: 30,
        }}
      >
        <SafeAreaView style={{ height: 2 * 10 }}></SafeAreaView>
        <BackButton navigation={navigation} />
        <YellowHeading text={LanguageUtils.getLangText(languagekeys.my_order)} />

        <NewComplaint
            navigation={navigation}
            screenName={"OrderSummary"}
            nextScreen={"Home"}
            CustomOnPressHandle={() => {
              handleAddToTable(false);
            }}
            item={item}
            parentNumber= {route.params.parentNumber}    
            customizeNames= {customizeNames}
            selectedOptionsArr= {selectedOptionsArr}
            isordersummary={true}
        />
        <CartItem
          item={item}
          customizeNames={customizeNames}
          selectedOptionsArr={selectedOptionsArr}
          parentNumber={route.params.parentNumber} // Pass the parentNumber prop
        />
        <NextButton
          buttonText={LanguageUtils.getLangText(languagekeys.got_it_go_for_it)}
          navigation={navigation}
          nextScreen="Home"
          customOnPress={() => {
            const wrappedItem = { items: item ,ordered:false,paid:false,checked:false};
            for (let i = 0; i < route.params.parentNumber; i++) {
              addOrderedItem(wrappedItem);              
            }
            console.log("Ordered items:", orderedItems);
            navigation.navigate('Home', {
              //items: item,
            });
          }}
        />
      </View>
    </ScrollView>
  );
}

export default OrderSummary;
