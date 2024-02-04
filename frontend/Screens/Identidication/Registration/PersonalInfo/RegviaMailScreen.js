import React, { useContext, useState } from "react";
import { View, TouchableOpacity, TextInput, StyleSheet, ScrollView } from "react-native";
import { ThemeContext } from "../../../../ThemeContext";
import NextButton from "../../../../Tools/Components/NextButton";
import BackButton from "../../../../Tools/Components/BackButton";
import SPACING from "../../../../Tools/ThemeConsts/SPACING";
import icons from "../../../../Tools/ThemeConsts/icons"
import { useNavigation } from "@react-navigation/native";
import { Text } from "../../../../DefaultFont";
import Heading from "../../../../Tools/Components/Heading";

import languagekeys from "../../Login/localization/Languagekeys";
import LanguageUtils from "../../Login/localization/LanguageUtils";
import { useUserContext } from "../../../../UserContext";
import { useLanguage } from "../../../../LanguageContext";

const RegViaMailScreen = ({  }) => {
  const navigation = useNavigation();
  const { user, setUser } = useUserContext(); // Use the user context
  const { mode, COLORS } = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isfocused,SetIsFocused]=useState(false);
  const EMAIL_REGEX = /\S+@\S+\.\S+/;
  const { selectedLanguage, languageRenderCount } = useLanguage();


  const validateEmail = (email) => {
    return EMAIL_REGEX.test(email);
  };

  const handleEmailChange = (text) => {
    setEmail(text); // Update email state
    setIsValidEmail(validateEmail(text)); // Update validity state
  };

  const handleNextButtonPress = () => {
    if (!isValidEmail || isNavigating) {
      return; // Don't proceed if email is invalid or navigation is in progress
    }
    const updatedUser = { ...user, email /* other data */ };
    setUser(updatedUser);

    setIsNavigating(true); // Set navigation flag

    // Reset the navigation flag after a short delay to prevent consecutive navigation
    setTimeout(() => {
      setIsNavigating(false);
    }, 1000);
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: COLORS[mode].background }]}>
      <View style={{ marginHorizontal: 30, marginTop: 80 }}>
        <BackButton navigation={navigation} />
        <Heading text={LanguageUtils.getLangText(languagekeys.mail_address)} />
        <Text style={[styles.subtitle, { color: COLORS[mode].text }]}>
          {LanguageUtils.getLangText(languagekeys.if_you_ever_forget_password)}
        </Text>

        <View style={[styles.inputContainer, { backgroundColor: COLORS[mode].background }]}>
          <TextInput
            style={{ ...styles.input, color: COLORS[mode].text }}
            placeholder={LanguageUtils.getLangText(languagekeys.you_need_to_input_email)}
            placeholderTextColor={COLORS[mode].text}
            value={email}
            onChangeText={handleEmailChange}
          />
        </View>

        {email.length > 0 && !isValidEmail && (
          <Text style={{ color: 'red' }}>{LanguageUtils.getLangText(languagekeys.Invalid_email_address)}</Text>
        )}

        <NextButton
          buttonText={LanguageUtils.getLangText(languagekeys.next)}
          navigation={navigation}
          nextScreen="RegviaMailScreenNextStep"
          customOnPress={handleNextButtonPress}
          disabled={!isValidEmail || isNavigating || email.length === 0}
          mode={mode} // Pass the mode prop to match your implementation
        />

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  backButtonContainer: {
    position: "absolute",
    top: SPACING * 20,
    left: SPACING * 4,
  },
  contentContainer: {
    borderRadius: SPACING,
    padding: SPACING * 2,
  },
  title: {
    fontWeight: "900",
    fontSize: SPACING * 2.5,
    textAlign: "right",
    marginBottom: SPACING * 2,
  },
  subtitle: {
    fontWeight: "500",
    fontSize: SPACING * 1,
    textAlign: "left",
    marginBottom: SPACING * 2,
    marginTop: 15,
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderBottomWidth: 2,
    borderBottomColor: "#EFB60E",
    marginBottom: SPACING * 2,
  },
  input: {
    color: "#000",
    paddingHorizontal: SPACING,
    paddingVertical: SPACING,
  },
});

export default RegViaMailScreen;
