import React from "react";
import { Pressable } from "react-native";
import Color from "../ThemeConsts/colors";
import { Text } from "../../DefaultFont";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useLanguage } from "../../LanguageContext";


const NextButton = ({ buttonText, navigation, nextScreen, customOnPress, CustomRadius, disabled ,marginBot}) => {
  const { selectedLanguage, languageRenderCount } = useLanguage();

  const handleButtonPress = () => {
    if (navigation) {
      navigation.navigate(nextScreen);
    }
  };

  const combinedOnPress = () => {
    handleButtonPress(); // Call the original handleButtonPress
    if (customOnPress) {
      customOnPress(); // Call the custom onPress if provided
    }
  };

  return (
    <Pressable
      onPress={combinedOnPress} // Use the combined onPress function
      android_ripple={{ color: Color.lightYellow, foreground: false }}
      style={({ pressed }) => ({
        backgroundColor: disabled ? Color.gray : Color.yellow,
        borderRadius: CustomRadius || 150,
        width: "100%",
        height: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: marginBot || 20,
      })}
      disabled={disabled} // Set the disabled prop of the Pressable
    >
      <Text style={{ fontSize: 25, fontFamily: "Rubik-Bold", textAlign: "center", color: "black" }}>
        {buttonText}
      </Text>
    </Pressable>
  );
};

export default NextButton;
