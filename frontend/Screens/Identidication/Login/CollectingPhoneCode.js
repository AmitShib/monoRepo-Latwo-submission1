import React, { useState, useContext, useEffect, useRef } from "react";
import { SafeAreaView, TextInput, View, ScrollView, Platform,I18nManager  } from "react-native";
import { ThemeContext } from "../../../ThemeContext";
import NextButton from "../../../Tools/Components/NextButton";
import BackButton from "../../../Tools/Components/BackButton";
import images from "../../../Tools/ThemeConsts/images";
import SPACING from "../../../Tools/ThemeConsts/SPACING";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../../../DefaultFont";
import languagekeys from "./localization/Languagekeys";
import LanguageUtils from "./localization/LanguageUtils";
import Heading from "../../../Tools/Components/Heading";
import { useUserContext } from "../../../UserContext";
import alert from "../../../Tools/Components/Alert";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLanguage } from "../../../LanguageContext";
import { Auth } from 'aws-amplify';
import { useRoute } from '@react-navigation/native';
import { useTable } from "../../../TableProvider ";



const CollectingPhoneCode = (props) => {
  const { addPerson } = useTable();
  const route = useRoute();
  const { actionType, sendVerificationCode } = route.params;
  const navigation = useNavigation();
  const { mode, COLORS } = useContext(ThemeContext);
  const refs = Array.from({ length: 6 }).map(() => useRef());
  const { user, setUser,setSignupActionType, setSigninActionType } = useUserContext();
  const [digitValues, setDigitValues] = useState(Array.from({ length: 6 }, () => ""));
  const [inputCompletion, setInputCompletion] = useState(Array.from({ length: 6 }, () => false));
  const [is_auth, setIsAuth] = useState(false);
  const { selectedLanguage, languageRenderCount } = useLanguage();
  const [session, setSession] = useState(null);


  useEffect(() => {
    if (I18nManager.isRTL) {  // Ensure the current setting is not LTR
      //I18nManager.forceRTL(false);
      //I18nManager.allowRTL(false);
      navigation.navigate('RefreshScreen', { key: Date.now(), nextScreen: 'CollectingPhoneCode' });
    }
}, []);

  
  useEffect(() => {
    // Check if all input fields are filled and update inputCompletion
    const allInputsFilled = digitValues.every((value) => value !== "");
    setInputCompletion(Array.from({ length: 6 }, () => allInputsFilled));

  }, [digitValues]);

  // Trigger the confirmation code sending with useEffect
  useEffect(() => {
    if (actionType === 'signin' && sendVerificationCode) {
      const sendCode = async () => {
        try {
          const response = await Auth.signIn(user.username);// Send the verification code
          setSession(response);
        } catch (error) {
          console.error("Error sending verification code:", error);
        }
      };

      sendCode();
    }
  }, [actionType, sendVerificationCode, user.username]);

  const handleNumberChange = (index, text) => {
    if (text.length === 1) {
      const newDigitValues = [...digitValues];
      newDigitValues[index] = text;
      setDigitValues(newDigitValues);

      if (index < digitValues.length - 1) {
        refs[index + 1].current.focus(); // Move focus to the next input
      }
    } else if (text.length === 0) {
      const newDigitValues = [...digitValues];
      newDigitValues[index] = "";
      setDigitValues(newDigitValues);

      if (index > 0) {
        refs[index - 1].current.focus(); // Move focus to the previous input
      }
    }
  };

  const calculateCombinedNumber = () => {
    let combinedNumber = 0;
    digitValues.forEach((value, index) => {
      combinedNumber += parseInt(value, 10) * Math.pow(10, digitValues.length - index - 1);
    });
    return combinedNumber;
  };

  const handleNextButtonPress = async () => {
    const username = user.username;
    const code = calculateCombinedNumber().toString();
    try {
      if (actionType === 'signup') {
        await Auth.confirmSignUp(username, code);
        console.log("Signup code confirmation successful");
        setIsAuth(true);
        await AsyncStorage.setItem("itsauthsignup", "true");
        setSignupActionType();
        //addPerson({ id: user.phonenumber, name: user.firstname+" "+user.lastname, image: images.avatar_5 });
        addPerson({ id: "12", name: "GORGE", image: images.avatar_5 });
        navigation.navigate("Hey"); // Navigate to the "Hey" screen for sign-up
      } else if (actionType === 'signin') {
        const user = await Auth.sendCustomChallengeAnswer(session, code);
        setUser(user);
        await AsyncStorage.setItem("authenticated", "true");
        setSigninActionType();
        navigation.navigate("Home"); // Navigate to the "Home" screen for sign-in
      }
    } catch (e) {
      setIsAuth(false);
      console.log("Code confirmation failed:", e);
      alert(e.message);
    }
  };


  return (
    <ScrollView
      contentContainerStyle={{
        position: "absolute",
        height: "100%",
        width: "100%",
        backgroundColor: COLORS[mode].background,
      }}
    >
      <View style={{ marginTop: 80, marginRight: 30, marginLeft: 30 }}>
        <View style={{ position: "absolute", paddingLeft: 350 }}>
          <BackButton navigation={navigation} />
        </View>
        <Heading
          text={LanguageUtils.getLangText(languagekeys.what_code_did_you_get)}
          color={COLORS[mode].text}
        />
        <Text style={{ textAlign: "left", color: COLORS[mode].gray }}>
          {user.phonenumber}
        </Text>
        <View style={{ height: 5 * SPACING }}></View>

        <SafeAreaView
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <TextInput
              key={index}
              ref={refs[index]}
              style={[
                styles.codeInput,
                { borderBottomColor: COLORS[mode].border, color: COLORS[mode].text },
              ]}
              keyboardType="numeric"
              maxLength={1}
              value={digitValues[index]}
              onChangeText={(text) => handleNumberChange(index, text)}
            />
          ))}
        </SafeAreaView>
        <View style={{ height: 5 * SPACING }}></View>

        <NextButton
          buttonText={LanguageUtils.getLangText(languagekeys.next)}
          customOnPress={handleNextButtonPress}
          disabled={!inputCompletion.every(value => value)} // Disable if not all input fields are filled
        />
      </View>
    </ScrollView>
  );
};

const styles = {
  codeInput: {
    ...Platform.select({
      web: {
      },
    }),
    height: 50,
    width: 50, // Adjust the width according to your design
    padding: 10,
    fontSize: 20,
    textAlign: "center",
    margin: 7.5,
    borderBottomWidth: 3,
  },
};

export default CollectingPhoneCode;
