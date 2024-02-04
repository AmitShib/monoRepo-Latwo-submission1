import React, { useContext } from "react";
import { Pressable } from "react-native";
import Color from "../../../../Tools/ThemeConsts/colors";
import SPACING from "../../../../Tools/ThemeConsts/SPACING";
import { ThemeContext } from "../../../../ThemeContext";
import { Text } from "../../../../DefaultFont";

const ComplainButton = ({ buttonText, navigation, screenName, nextScreen }) => {
    const handleButtonPress = () => {
      navigation.navigate("Oops", { screenName, nextScreen });
    };
    const { mode, COLORS } = useContext(ThemeContext);

    return (
      <Pressable
        onPress={handleButtonPress}
        style={({ pressed }) => ({
            width: "100%",
            height: 25,
            marginBottom: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 4 * SPACING,
            marginBottom: 3 * SPACING,
            color: COLORS[mode].text,
            })}>
        <Text style={{ fontSize: 18, textAlign: "center", color: COLORS[mode].text }}>{buttonText}</Text>
      </Pressable>
    );
};

export default ComplainButton;
