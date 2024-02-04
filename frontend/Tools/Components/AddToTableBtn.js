import React, { useContext } from "react";
import { Pressable, SafeAreaView } from "react-native";
import Color from "../ThemeConsts/colors";
import { Text } from "../../DefaultFont";
import ThemeContext from "../../ThemeContext";

const AddToTableBtn = ({ buttonText, onPress, disabled }) => {
  const { mode, COLORS } = useContext(ThemeContext);

  const handleButtonPress = () => {
    if (!disabled) {
      onPress();
    }
  };

  const buttonStyle = disabled 
    ? { backgroundColor: Color.gray } 
    : { backgroundColor: Color.yellow };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS[mode].lightGray1 }}>
      <SafeAreaView
        style={{
          backgroundColor: COLORS[mode].background,
          marginBottom: 15,
          marginTop: 15,
        }}
      >
        <Pressable
          onPress={handleButtonPress}
          android_ripple={{ color: COLORS[mode].primary, foreground: false }}
          style={({ pressed }) => ([
            buttonStyle,
            {
              borderRadius: 15,
              marginLeft: 10,
              marginRight: 40,
              width: 210,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }
          ])}
        >
          <Text style={{ fontSize: 16, fontFamily: "Rubik-Bold", textAlign: "center", color: "black" }}>
            {buttonText}
          </Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default AddToTableBtn;
