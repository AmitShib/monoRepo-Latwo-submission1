import React, { useEffect, useState, useContext } from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";
import { icons } from "../../../Tools/ThemeConsts";
import { useLanguage } from "../../../LanguageContext";
import {ThemeContext} from "../../../ThemeContext";

const CustomLanguageToggle = ({ isRTL, onPress }) => {

  const { selectedLanguage, setSelectedLanguage, toggleRender } = useLanguage();
  const [renderCount, setRenderCount] = useState(0);
  const { mode, toggleMode, COLORS } = useContext(ThemeContext);


  useEffect(() => {
    // This code will run when the component mounts (initial entry to the page)
    // Simulate toggle twice
    setRenderCount(prevRenderCount => prevRenderCount + 1);
    setRenderCount(prevRenderCount => prevRenderCount + 1);
  }, []); // Empty dependency array, runs only once on mount

  useEffect(() => {
    // This code will be executed whenever renderCount changes
    console.log("Component re-rendered.");
  }, [renderCount]); // Listens to changes in renderCount

  return (
<TouchableOpacity
  style={{
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingLeft: 20,
    color: COLORS[mode].text
  }}
  onPress={() => {
    const newLanguage = selectedLanguage === 'hebrew' ? 'english' : 'hebrew';
    setSelectedLanguage(newLanguage);
    onPress(); // Call the provided onPress function
  }}
>
      <View style={{ flexDirection: "row", alignItems: "center", color: COLORS[mode].text }}>
      {selectedLanguage === 'hebrew' ? (
  <Image
    source={icons.israel}
    style={{
      height: 20,
      width: 20,
      marginRight: 8,
    }}
  />
) : (
  <Image
    source={icons.usa}
    style={{
      height: 20,
      width: 20,
      marginRight: 8,
    }}
  />
)}


        <Image
          source={(icons.usa)}
          style={{
            height: 10,
            width: 10,
            marginRight: 3,
          }}
        />
        <Image
          source={(icons.israel)}
          style={{
            height: 10,
            width: 10,
            marginLeft: 3,
          }}
        />
      </View>
      <Text style={{ fontSize: 16, marginLeft: 10, color: COLORS[mode].text }}>
      {selectedLanguage === 'hebrew' ? 'עברית' : 'English'}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomLanguageToggle;
