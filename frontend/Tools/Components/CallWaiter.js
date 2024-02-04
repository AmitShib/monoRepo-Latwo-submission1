import React, { useContext } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { images } from '../ThemeConsts';
import LanguageUtils from '../../Screens/Identidication/Login/localization/LanguageUtils';
import { Text } from '../../DefaultFont';
import languagekeys from '../../Screens/Identidication/Login/localization/Languagekeys';
import colors from "../../Tools/ThemeConsts/colors";
import ThemeContext from '../../ThemeContext';


const CallWaiter = () => {
  // Placeholder function for the buttons
  const { mode, COLORS } = useContext(ThemeContext);
  const dynamicStyles = getStyles(COLORS, mode);
  const waiterName = "John Doe"

  const onButtonPress = (buttonName) => {
    console.log(`${buttonName} button pressed`);
  };

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.buttonContainer}>
        {/* List of buttons */}
        <TouchableOpacity
          style={dynamicStyles.button}
          onPress={() => onButtonPress(LanguageUtils.getLangText(languagekeys.call_a_waiter))}
        >
          <Text style={dynamicStyles.buttonText}>
            {LanguageUtils.getLangText(languagekeys.call_a_waiter)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={dynamicStyles.button}
          onPress={() => onButtonPress(LanguageUtils.getLangText(languagekeys.ask_to_clear_plates))}
        >
          <Text style={dynamicStyles.buttonText}>
            {LanguageUtils.getLangText(languagekeys.ask_to_clear_plates)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={dynamicStyles.button}
          onPress={() => onButtonPress(LanguageUtils.getLangText(languagekeys.ask_for_napkins))}
        >
          <Text style={dynamicStyles.buttonText}>
            {LanguageUtils.getLangText(languagekeys.ask_for_napkins)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={dynamicStyles.button}
          onPress={() => onButtonPress(LanguageUtils.getLangText(languagekeys.i_got_a_problem))}
        >
          <Text style={dynamicStyles.buttonText}>
            {LanguageUtils.getLangText(languagekeys.i_got_a_problem)}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={dynamicStyles.imageContainer}>
        <Text>
          {LanguageUtils.getLangText(languagekeys.your_waiter)}
        </Text>
        {/* Circular image */}
        <Image
          source={images.avatar_3}
          resizeMode="contain"
          style={dynamicStyles.profileImage}
        />
        <Text>
          {waiterName}
        </Text>
      </View>
    </View>
  );
};

const getStyles = (COLORS, mode) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonContainer: {
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: COLORS[mode].primary,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginVertical: 3,
    borderRadius: 20, // Rounded corners for buttons
  },
  buttonText: {
    color: COLORS[mode].text, // Text color for buttons
    textAlign: 'center',
    fontWeight: 'bold',
  },
  imageContainer: {
    marginLeft: 10, // Space between buttons and image
    alignItems: 'center',
  },
  image: {
    width: 70, // Set the width of the image
    height: 70, // Set the height of the image
    borderRadius: 35, // Make the image circular
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    //marginLeft: -20, // Adjust the negative margin for overlap
  },
  waiterTitleText: {
    fontSize: 16, // Choose an appropriate font size
    color: COLORS[mode].text,
    marginBottom: 4, // Space between title and image
    fontWeight: 'bold', // If you want the title to be bold
    textAlign: 'center', // Center the text
  },
  waiterNameText: {
    fontSize: 16, // Choose an appropriate font size
    color: COLORS[mode].text,
    marginTop: 4, // Space between image and name
    fontWeight: 'bold', // If you want the name to be bold
    textAlign: 'center', // Center the text
  },
});

export default CallWaiter;
