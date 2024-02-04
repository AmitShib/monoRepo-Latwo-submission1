import React, { useState, useContext, useEffect } from "react";
import { Pressable, SafeAreaView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Divider } from 'react-native-elements';
import ThemeContext from "../../ThemeContext";
import Colors from "../ThemeConsts/colors";
import SPACING from "../ThemeConsts/SPACING";
import CheckboxWithLimit from "./CheckboxWithLimit";
import { CustomDivider } from "./CustomDivider";
import alert from "./Alert";
import languagekeys from "../../Screens/Identidication/Login/localization/Languagekeys";
import LanguageUtils from "../../Screens/Identidication/Login/localization/LanguageUtils";
import colors from "../ThemeConsts/colors";
import CustomizeOption from "./CustomizeOption";
import { useLanguage } from "../../LanguageContext";

const Customize = (props) => {
  const { mode, COLORS } = useContext(ThemeContext);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [atLeastOneSelectedCount, setAtLeastOneSelectedCount] = useState(0);
  const [prevSelectedCount, setPrevSelectedCount] = useState(0);
  const { customizeName, customizeOptions, align, limitOfChoose, updateSelectedOptions } = props;
  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  const [align_dir, set_align_dir] = useState(selectedLanguage === "hebrew" ? 'right' : 'left');
  //console.log(limitOfChoose);
  //useEffect(() => {
  //  console.log('Customize Options:', customizeOptions); // Check the options being passed in
  //}, [customizeOptions]);

  useEffect(() => {
    // Actions to take when selectedLanguage changes
    // For example, updating states or re-initializing component data
    set_align_dir(selectedLanguage === "hebrew" ? 'right' : 'left');
  }, [selectedLanguage]);
  
  const handleOptionSelect = (option) => {
    const isCurrentlySelected = selectedOptions.includes(option);
    let newSelectedOptions = [];

    if (isCurrentlySelected) {
      // If the option is already selected, remove it from the selection
      newSelectedOptions = selectedOptions.filter(selectedOption => selectedOption !== option);
    } else {
      // If the option is not selected and we haven't reached the limit, add it to the selection
      if (selectedOptions.length < limitOfChoose) {
        newSelectedOptions = [...selectedOptions, option];
      } else {
        // If we've reached the limit, you might want to alert the user
        alert(`You can only select up to ${limitOfChoose} options.`);
        return; // Early return to prevent state update if the limit is reached
      }
    }
    setSelectedOptions(newSelectedOptions);
    updateSelectedOptions(newSelectedOptions);
  };


  useEffect(() => {
    // Notify the parent component (DishPage) about the selected options
    props.updateSelectedOptions(selectedOptions);
  }, [selectedOptions]);

  useEffect(() => {
    // Calculate the new count of checked items after the toggle
    const newCount = selectedOptions.length;

    // Determine the value to be sent back based on the current count and the new count
    let valueToSendBack;
    if (prevSelectedCount === 0 && newCount > 0) {
      // If the previous count was 0 and the new count is greater than 0, send back 1
      valueToSendBack = 1;
    } else if (prevSelectedCount > 0 && newCount === 0) {
      // If the previous count was greater than 0 and the new count is 0, send back -1
      valueToSendBack = -1;
    } else {
      // For any other cases, no change needed
      return;
    }

    // Call the updateAtLeastOneSelectedCount function from DishPage with the calculated value
    props.updateAtLeastOneSelectedCount(valueToSendBack);

    // Update the state with the new count
    setPrevSelectedCount(newCount);
  }, [selectedOptions]);

  const isAllMandatoryOptionsSelected =
    props.item.isMandatory === 0 ? true : selectedOptions.length > 0;

  return (
    <View style={[styles.optionContainer, { alignSelf: align_dir === 'right' ? 'flex-end' : 'flex-start' }]}>
      <Text style={[styles.title, { color: COLORS[mode].primary, fontSize: SPACING * 2 },]}>
        {props.customizeName}
      </Text>

      <Text style={[styles.description, { color: COLORS[mode].lightGray6, fontSize: SPACING * 1.4 }]}>
        {LanguageUtils.getLangText(languagekeys.must_choose_at_least)}
      </Text>
      {/* justifyContent: 'flex-end', */}
      <View style={[styles.choicesContainer, align_dir === 'right' ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }]}>
        {props.customizeOptions.map((option, index) => (
          <CustomizeOption
            key={index}
            option={option}
            isSelected={selectedOptions.includes(option)}
            onSelect={handleOptionSelect}
            COLORS={COLORS}
            mode={mode}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginVertical: 4,
  },
  choicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
});

export default Customize;
