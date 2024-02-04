import React, { useContext } from "react";
import SPACING from "../ThemeConsts/SPACING";
import { ThemeContext } from "../../ThemeContext";
import { Text } from "../../DefaultFont";
import { useLanguage } from "../../LanguageContext";


const Heading = (props) => {
  const { mode, COLORS } = useContext(ThemeContext);
  const { selectedLanguage, languageRenderCount } = useLanguage();

  // Set the default alignment to "left"
  const defaultAlignment = props.align || "left";

  // Set the default font size to 30 if not provided
  const defaultFontSize = props.size || 30;
  const defaultColor = props.color || COLORS[mode].text;


  const defaultStyle = {
    marginBottom: SPACING,
    fontFamily: "Rubik-Bold",
    fontSize: defaultFontSize,
    color: defaultColor,
    textAlign: defaultAlignment, // Apply the default alignment
  };

  // Merge the defaultStyle with the provided style prop
  const mergedStyle = { ...defaultStyle, ...props.style };

  return <Text style={mergedStyle}>{props.text}</Text>;
};

export default Heading;
