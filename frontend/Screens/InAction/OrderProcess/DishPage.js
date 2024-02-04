import { Image, SafeAreaView, Dimensions, ScrollView, View, Modal, PanResponder, StyleSheet } from "react-native";
import React, { useState, useContext, useEffect, useRef } from "react";
import SPACING from "../../../Tools/ThemeConsts/SPACING";
import Heading from "../../../Tools/Components/Heading";
import Colors from "../../../Tools/ThemeConsts/colors";
import Dishes from "../../../Tools/ThemeConsts/Dishes";
import Customize from "../../../Tools/Components/Customize";
import ThemeContext from "../../../ThemeContext";
import { Text } from "../../../DefaultFont";
import { images } from "../../../Tools/ThemeConsts";
import AddToTableBtn from "../../../Tools/Components/AddToTableBtn";
import IncreaseDecrease from "../../../Tools/Components/IncreseDecreaseBtn";
import { TouchableOpacity } from "react-native-gesture-handler";
import BackButton from "../../../Tools/Components/BackButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import languagekeys from "../../Identidication/Login/localization/Languagekeys";
import LanguageUtils from "../../Identidication/Login/localization/LanguageUtils";
import ComplainButton from "../../Identidication/Registration/Prefrences/ComplainButton";
import NextButton from "../../../Tools/Components/NextButton";
import NewComplaint from "../../../Tools/Components/Newcomplaint";
import AuthModal from "../../../Tools/Components/AuthModal";
import { useUserContext } from "../../../UserContext";
import { useNavigation } from "@react-navigation/native";
import { useOrderedItems } from "../../../OrderedItemsProvider";
import { useTable } from "../../../TableProvider ";
import { useLanguage } from "../../../LanguageContext";


const DishPage = ({ closeModal, route, ...props }) => {
  const { item } = props;
  const navigation = useNavigation();
  const [isInfoModalVisible, setInfoModalVisible] = useState(false);
  const [parentNumber, setParentNumber] = useState(1);
  const { mode, COLORS } = useContext(ThemeContext);
  const [atLeastOneSelectedCount, setAtLeastOneSelectedCount] = useState(0);
  const count_customize = item.dishCustomizes.length;
  const [selectedOptions, setSelectedOptions] = useState({});
  const [Finalselectedoptions, setFinalselectedoptions] = useState([])
  const [FinalcustomizeNames, setFinalcustomizeNames] = useState([])
  const [customizeNames, setCustomizeNames] = useState([]);
  const [selectedOptionsArr, setSelectedOptionsArr] = useState([]);
  const { orderedItems, addOrderedItem, removeOrderedItem, checkedItems, addCheckedItem, removeCheckedItem, setOrderedItems } = useOrderedItems();
  const { people, addPerson, removePerson } = useTable();
  const { user } = useUserContext();
  const [too_add_user,set_too_add_user] = useState(false);
  const [hasAddedToTable, setHasAddedToTable] = useState(false);
  const { selectedLanguage, setSelectedLanguage } = useLanguage();

  const [showAuthModal, setShowAuthModal] = useState(false);

  //const align = selectedLanguage === "hebrew" ? 'right' : 'left';
  const [align,set_align] =useState(selectedLanguage === "hebrew" ? 'right' : 'left');

  // console.log("Dishpage start --->");
  // console.log(item.users);
  useEffect(() => {
    // Actions to take when selectedLanguage changes
    // For example, updating states or re-initializing component data
    set_align(selectedLanguage === "hebrew" ? 'right' : 'left');
  }, [selectedLanguage]);

  const generateId = () => {
    return `${new Date().getTime()}${Math.floor(Math.random() * 1000)}`;
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        if (gestureState.dy > 150) {
          if (typeof closeModal === 'function') {
            closeModal();
          }
        }
      }
    })
  ).current;



  const updateAtLeastOneSelectedCount = (value) => {
    setAtLeastOneSelectedCount(atLeastOneSelectedCount + value);
  };

  const handleNumberChange = (newNumber) => {
    setParentNumber(newNumber);
 //   console.log(newNumber);
  };

  // useEffect(() => {
  //   handleAddToTable(false);
  // }, [selectedOptions]);

  const handleAddToTable = (to_navigate) => {
//   console.log("added to table");

    const customizeNamesArray = [];
    const selectedOptionsArray = [];

    item.dishCustomizes.forEach((Custom) => {
      customizeNamesArray.push(Custom.customizeName);
      selectedOptionsArray.push(selectedOptions[Custom.customizeName] || []);
      console.log(selectedOptionsArray);
    });

    const flattenedSelectedOptions = selectedOptionsArray.flat();
    console.log(flattenedSelectedOptions);
    if (to_navigate) {
      setFinalselectedoptions([...selectedOptionsArray]);
      setFinalcustomizeNames([...customizeNamesArray]);
      navigation.navigate("Home");
      closeModal();
    }

    for (let i = 0; i < parentNumber; i++) {
        const uniqueItem = JSON.parse(JSON.stringify(item)); // Deep copy the item for unique references
        uniqueItem.selectedOptions = flattenedSelectedOptions;
        const wrappedItem = {
            key_id: generateId(),
            items: uniqueItem,
            ordered: false,
            paid: false,
            checked: false,
        };
        //console.log("AAAAAAAAAAAAAAA");
        console.log(wrappedItem.items.users);
        addOrderedItem(wrappedItem);
    }
  };



  useEffect(() => {
    const checkIfFirstTime = async () => {
      const hasShownModal = await AsyncStorage.getItem('hasShownInfoModal');

      if (!hasShownModal) {
        setInfoModalVisible(true);
        await AsyncStorage.setItem('hasShownInfoModal', 'true');
      }
    };

    checkIfFirstTime();
  }, []);

  const handleToggleModal = () => {
    setInfoModalVisible(!isInfoModalVisible);
  };



  return (
    <>
      <View style={{ alignItems: 'center', paddingVertical: 8 }} {...panResponder.panHandlers}>
        <View style={{ width: 40, height: 5, borderRadius: 2.5, backgroundColor: '#CCC' }} />
      </View>

      <ScrollView contentContainerStyle={{ backgroundColor: COLORS[mode].background }}>

        <BackButton onPress={closeModal} height={30} />

        <Image source={item.photo} style={{ height: 200, resizeMode: 'cover', width: '100%' }} />

        <SafeAreaView style={{ margin: 10, backgroundColor: COLORS[mode].background }}>

          <Heading text={item.name} align={align} style={{ color: COLORS[mode].text }} />

          <Text style={{ textAlign: align, fontSize: SPACING * 2, color: COLORS[mode].primary, marginBottom: SPACING }}>
            {item.price}{"₪"}
          </Text>

          <Text style={{ textAlign: align, marginBottom: 2 * SPACING, lineHeight: 15, color: COLORS[mode].text }}>
            {item.description}
          </Text>

          {item.dishCustomizes.map((Custom, index) => (
            <Customize
              key={index}
              item={Custom}
              mode={mode}
              updateAtLeastOneSelectedCount={updateAtLeastOneSelectedCount}
              customizeName={Custom.customizeName}
              customizeOptions={Custom.customizeOptions}
              updateSelectedOptions={(options) => setSelectedOptions({
                ...selectedOptions,
                [Custom.customizeName]: options,
              })}
              selectedOptions={selectedOptions[Custom.customizeName] || []}
              align={align}
              limitOfChoose={Custom.limitOfChoose}
            />
          ))}

        </SafeAreaView>



        {atLeastOneSelectedCount >= count_customize && (
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: COLORS[mode].background, marginHorizontal: 20 }}>
            <NewComplaint
              navigation={navigation}
              screenName={"DishPage"}
              nextScreen={"Home"}
              CustomOnPressHandle={() => { handleAddToTable(false); }}
              item={item}
              parentNumber={parentNumber}
              customizeNames={customizeNames}
              selectedOptionsArr={selectedOptionsArr}
              title={"איך אפשר לעזור?"} //to translate
            />
          </View>
        )}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS[mode].background,
            marginBottom: 20,
            marginLeft: 20,
            marginRight: 20,
          }}>

          <AddToTableBtn
            buttonText={LanguageUtils.getLangText(languagekeys.add_items)}
            onPress={() => {
              if (!hasAddedToTable) {
                handleAddToTable(true);
                setHasAddedToTable(true);
              }
              // add users from here?

              let userExists = false;
              if(user.phonenumber!="")
              {
                removePerson('0');
              }
              
              for (let i = 0; i < people.length; i++) {
                  if (people[i].id === user.phonenumber) {
                    // console.log(people[i].id);
                    // console.log(`Found *** with ID: ${people[i].id}`);
                    userExists = true;                    
                    break;
                  }
              }

              if (!userExists && user && user.phonenumber != "") {                  
                  addPerson({ id: user.phonenumber, name: user.firstname + " " + user.lastname, image: images.avatar_1 });
                  //removePerson('0');
                  console.log(people);
                  console.log("added userrrrrr to table and removed guest");
              }


              //console.log("Ordered items:", orderedItems);
              navigation.navigate('Home');
            }}
            disabled={atLeastOneSelectedCount < count_customize}
          />

          <IncreaseDecrease onNumberChange={handleNumberChange} />


          
        </View>
      </ScrollView>
    </>
  );
};

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  imageContainer: {
    height: screenHeight * 0.3,
    width: '100%',
    resizeMode: 'cover'
  },
  safeAreaView: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  generalDetailsText: {
    textAlign: 'left', // consider passing align from props if it's dynamic
    marginBottom: 2 * SPACING,
    lineHeight: 15,
  },
  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  }
});

export default DishPage;