import React, { useContext } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import SPACING from "../ThemeConsts/SPACING";
import { ThemeContext } from "../../ThemeContext";
import { Text } from "../../DefaultFont";

const BackButton = ({ onPress,height = 5 }) => {
  const { mode, COLORS } = useContext(ThemeContext);
  const navigation = useNavigation();

  const handleGoBack = () => {
    if(onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };
  

  const iconSize = SPACING * 2.5;
  const touchableSize = iconSize + SPACING; // Adding some padding around the icon

  return (
    <TouchableWithoutFeedback onPress={handleGoBack}>
      <View style={{ position: "absolute", right: 0, top: height, width: touchableSize,  zIndex: 1, backgroundColor:COLORS[mode].tabsbackground, borderRadius:2, borderWidth:5, borderColor:COLORS[mode].tabsbackground, marginHorizontal:10 }}>
        <Ionicons name="chevron-forward-outline" size={iconSize} color={COLORS[mode].text} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default BackButton;
