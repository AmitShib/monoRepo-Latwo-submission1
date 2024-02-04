import React, { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { ThemeContext } from "../../../ThemeContext";
import { useLanguage } from "../../../LanguageContext";
import BackButton from "../../../Tools/Components/BackButton";
import { useNavigation } from "@react-navigation/native";


const TermsAndConditions = () => {
  const { mode, COLORS } = useContext(ThemeContext);
  const { selectedLanguage, languageRenderCount } = useLanguage();
  const navigation = useNavigation();

  const handleBackPress = () => {    
    navigation.goBack();
  };


  return (
    <View style={{...styles.container, backgroundColor: COLORS[mode].background}}>
      <Text style={{...styles.title, color: COLORS[mode].text}}>
        Terms and Conditions
      </Text>

      <Text style={styles.content}>
        This is where you would put your terms and conditions content. You would typically have quite a bit of text here explaining all the legal jargon associated with using your app.
      </Text>

      <BackButton onPress={handleBackPress} height={60} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "900",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 20,
  },
  content: {
    fontWeight: "400",
    fontSize: 16,
    textAlign: "left",
    marginBottom: 50,
  },
});

export default TermsAndConditions;
