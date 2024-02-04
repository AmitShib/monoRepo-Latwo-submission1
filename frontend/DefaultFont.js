import React, { useContext } from "react";
import { Text as RNText } from 'react-native';
import { ThemeContext } from "./ThemeContext";

export const Text = ({ style, ...props }) => {

  const { mode, COLORS } = useContext(ThemeContext);
  const defaultFontFamily = "Rubik-Regular"
  const defaultColor = COLORS[mode].text

  return <RNText style={[{ fontFamily: defaultFontFamily, color: defaultColor }, style]} {...props} />;
};

Text.defaultProps = RNText.defaultProps;
