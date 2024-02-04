import React, { useState, useContext } from "react";
import { SafeAreaView, TextInput, View, Dimensions } from "react-native";
import SPACING from "../../../../Tools/ThemeConsts/SPACING";
import Color from "../../../../Tools/ThemeConsts/colors";
import BackButton from "../../../../Tools/Components/BackButton";
import SendButton from "../../../../Tools/Components/SendButton";
import { Text } from "../../../../DefaultFont";
import { ThemeContext } from "../../../../ThemeContext";
import NextButton from "../../../../Tools/Components/NextButton";
import { useNavigation } from "@react-navigation/native";
import { useUserContext } from "../../../../UserContext";
import languagekeys from "../../Login/localization/Languagekeys";
import LanguageUtils from "../../Login/localization/LanguageUtils";
import { useOrderedItems } from "../../../../OrderedItemsProvider";

let lifestylesArray = ["צמחוני", "טבעוני", "רגיש לחלב", "פלאו", "פירותני"];

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Oops = (props) => {
    const { mode, COLORS } = useContext(ThemeContext);
    const navigation = useNavigation();
    const { user, setUser } = useUserContext();
    const [inputTextArray, setInputTextArray] = useState([]);
    const { orderedItems, addOrderedItem, removeOrderedItem, checkedItems, addCheckedItem, removeCheckedItem, setOrderedItems } = useOrderedItems();
    const screenName = props.route.params.screenName;
    const nextScreen = props.route.params.nextScreen;
    const parentNumber = props.route.params.parentNumber;
    const customizeNames = props.route.params.customizeNames;
    const selectedOptionsArr = props.route.params.selectedOptionsArr;
    const item = props.route.params.item;
    const isordersummary= props.route.params.isordersummary;
    const title =props.route.params.title;
    const final_title = title||LanguageUtils.getLangText(languagekeys.oops)
    // console.log("#############");
    // console.log("#############");
    // console.log("#############");
    // console.log("#############");
    // console.log("#############");
    // console.log("1111111111111");
    // console.log(props.route.params.item);
    // console.log(props.route.params.parentNumber);
    // console.log(props.route.params.customizeName);
    // console.log(props.route.params.selectedOptionsArr);


    const dynamicKey = `${screenName}_problems`;

    const handleTextInputChange = (index, text) => {
        const updatedArray = [...inputTextArray];
        updatedArray[index] = text;
        setInputTextArray(updatedArray);
      };
      
    const handleNextButtonPress = () => {
        // Update the user's array with the inputTextArray
        if(!props.route.params.item)
        {
        const updatedUser = { ...user, [dynamicKey]: inputTextArray };
        setUser(updatedUser);        
        console.log("Updated User:", updatedUser);
        }

        if(props.route.params.item && !isordersummary)
        {
          const updateditem= {...props.route.params.item,complaint:inputTextArray};
          navigation.navigate("OrderSummary", {
            parentNumber: parentNumber,
            item: item,      
            customizeNames: customizeNames,
            selectedOptionsArr: selectedOptionsArr,
            });      
          console.log(updateditem);
        }


        if(props.route.params.item && isordersummary)
        {
          //const updateditem= {...props.route.params.item,complaint:inputTextArray};

          const wrappedItem = { items: item ,complaint:inputTextArray ,ordered:false,paid:false,checked:false};
            for (let i = 0; i < parentNumber; i++) {
              addOrderedItem(wrappedItem);
              console.log("added item");
              console.log(wrappedItem);           
            }
            console.log("Ordered items:", orderedItems);
            navigation.navigate('Home', {
              //items: item,
            });


          // navigation.navigate("OrderSummary", {
          //   parentNumber: parentNumber,
          //   item: item,      
          //   customizeNames: customizeNames,
          //   selectedOptionsArr: selectedOptionsArr,
          //   });      
          //console.log(updateditem);
        }
      };
      


  return (
    <View
      style={{
        backgroundColor: COLORS[mode].background,
        flex: 1, // Added flex to ensure correct layout
        
      }}
    >
      <View
        style={{
          backgroundColor: COLORS[mode].background,
          flex: 1, // Added flex to ensure correct layout
          paddingTop: SPACING * 4,

        }}
      >
        <View
          style={{
            paddingTop: SPACING * 4,
            backgroundColor: COLORS[mode].background,
            marginHorizontal:10,
            marginVertical:50,
          }}
        >
         <BackButton  height={30} navigation={navigation} />
          <Text style={{  color: COLORS[mode].text, fontWeight: "800", fontSize: 40, textAlign: "right" , alignItems: "center",justifyContent: "center",}}>
            {/* {LanguageUtils.getLangText(languagekeys.oops)}... */}
            {final_title}
          </Text>
          <TextInput
            placeholder={LanguageUtils.getLangText(languagekeys.talk_to_me)}
            style={{
              fontSize: 18,
              color: COLORS[mode].text,
              width: "100%",
              height: 300,
              textAlignVertical: "top",
              borderWidth: 1,
              borderRadius: 15,
              paddingTop: SPACING * 2,
              paddingRight: SPACING * 2,
              paddingLeft: SPACING * 2,
              borderColor: Color.gray,
              textAlign: "right",
            }}
            onChangeText={(text) => handleTextInputChange(0, text)}
            value={inputTextArray[0]}
            multiline
          />
        </View>
      </View>
      <View
        style={{
          backgroundColor: COLORS[mode].background, alignItems: "center",justifyContent: "center", marginHorizontal:10, marginVertical:50,
        }}
      >
        {/* this is from preference page */}
        {!props.route.params.item &&(  
          <NextButton
          buttonText={LanguageUtils.getLangText(languagekeys.submit)}  
          navigation={navigation} 
          nextScreen={nextScreen} 
          customOnPress={handleNextButtonPress} 
          />
        )}


        {/* this is from dishpage page */}
        {props.route.params.item &&(  
          <NextButton
          buttonText={LanguageUtils.getLangText(languagekeys.submit)}   
          customOnPress={handleNextButtonPress} 
          />
        )}
      </View>


    </View>
    
  );
};

export default Oops;