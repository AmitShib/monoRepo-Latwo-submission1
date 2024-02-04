import React, { useContext,useState } from "react";
import { SafeAreaView, TextInput, View, Dimensions, ScrollView, Platfrom} from "react-native";
import { ThemeContext } from "../../../ThemeContext";
import { useNavigation } from "@react-navigation/native";
import Heading from "../../../Tools/Components/Heading";
import NextButton from "../../../Tools/Components/NextButton";
import BackButton from "../../../Tools/Components/BackButton";
import SPACING from "../../../Tools/ThemeConsts/SPACING";
import { Text } from "../../../DefaultFont";
import Alert from "../../../Tools/Components/Alert";
import languagekeys from "./localization/Languagekeys";
import LanguageUtils from "./localization/LanguageUtils";
import { useLanguage } from "../../../LanguageContext";
import { useUserContext } from "../../../UserContext";
import {Auth} from 'aws-amplify';

const CollectingPhone = ({}) => {

  const navigation = useNavigation();
  const { mode, COLORS } = useContext(ThemeContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isNavigating, setIsNavigating] = useState(false);
  const { user, setUser } = useUserContext(); // Use the user context
  const [zoneCode,setZoneCode] = useState("+972");
  const { selectedLanguage, languageRenderCount } = useLanguage();


  const handlePhoneNumberChange = (text) => {
    setPhoneNumber(text); // Update phone number state
    setIsNavigating(text.length >= 9);
  };
  const password = Math.random().toString(10)+ 'Abc#';
  const handleNextButtonPress = () => {

    
    const updatedUser = {
      ...user,
      phonenumber: zoneCode+phoneNumber,
      username:zoneCode+phoneNumber,
    };
    console.log(zoneCode+phoneNumber);
    setUser(updatedUser);
    onRegisterPressed(user);
    if (!phoneNumber || isNavigating) {
      return; // Don't proceed if phone number is empty or navigation is in progress
    }
  };
  const onRegisterPressed = async (user) => {
    try {
      await Auth.signUp({
        username:  zoneCode+phoneNumber,
        phone_number:  zoneCode+phoneNumber,
        //password:user.password,
        password:password,
        attributes: {  gender: user.gender,email: user.email,birthdate: user.birthdate, family_name: user.lastname,name: user.firstname,},
        
      });
      //setUser(updatedUser);

      navigation.navigate('CollectingPhoneCode', {
        actionType: "signup",
        sendVerificationCode: false, // Set sendVerificationCode to true
      });
      
    } catch (e) {
      alert(e.message);
    }
  };
  
  return (
    <ScrollView
    contentContainerStyle={{ position: "absolute", height: "100%", width: "100%", backgroundColor: COLORS[mode].background }}>


    <View style={{ marginTop: 80, marginRight: 30, marginLeft: 30 }} >
       <View style={styles.backButtonContainer}>
          <BackButton navigation={navigation} />
        </View>
      <Heading text={LanguageUtils.getLangText(languagekeys.may_we_get_your_number)}/>
      <View style={{ height: 5 * SPACING }}></View>
      <SafeAreaView
        style={{
          flexDirection: "row-reverse",
          justifyContent: "center"          
        }}
      >
<TextInput
  value={zoneCode}//"+972"
  style={[
    styles.countryCodeInput,
    { borderBottomColor: COLORS[mode].border, color: COLORS[mode].text },
  ]}
  editable={false}
/>

<TextInput
  keyboardType="numeric"
  placeholder={LanguageUtils.getLangText(languagekeys.enter_phone_number)}
  placeholderTextColor= {COLORS[mode].text}
  style={[
    styles.phoneNumberInput,
    { borderBottomColor: COLORS[mode].border, color: COLORS[mode].text },
  ]}
  onChangeText={handlePhoneNumberChange}
/>

      </SafeAreaView>

      <View style={{ height: 5 * SPACING }}></View>
      <Text style={{ textAlign: "left", color: COLORS[mode].text }}>
        {LanguageUtils.getLangText(languagekeys.we_will_msg_you)}
      </Text>

      <View style={{ height: 5 * SPACING }}></View>


      <NextButton
          buttonText={LanguageUtils.getLangText(languagekeys.next)}
          customOnPress={handleNextButtonPress}
          disabled={!phoneNumber || !isNavigating} // Disable if phone number is empty or navigation is in progress
        />


      {/* this is for testing onlyyyyy delete someday */}
      {/* <NextButton
        buttonText={LanguageUtils.getLangText(languagekeys.next)}
        navigation={navigation}
        nextScreen="CollectingPhoneCode"
      /> */}
    </View>
    </ScrollView>
  );
};

const styles = {
  countryCodeInput: {
    height: 50,
    width: 120,
    padding: 10,
    fontSize: 20,
    textAlign: "center",
    marginLeft: 15,
    borderBottomWidth: 3,
    marginBottom: SPACING * 2,
  },
  title: {
    fontWeight: "900",
    fontSize: SPACING * 2.5,
    textAlign: "right",
    marginBottom: SPACING * 2,
  },
  phoneNumberInput: {
    height: 50,
    width: 170,
    padding: 10,
    fontSize: 20,
    textAlign: "center",
    borderBottomWidth: 3,
    marginBottom: SPACING * 2,
  },
  backButtonContainer: {
    position: "absolute",
    right: 0,
    zIndex: 1
  },
};

export default CollectingPhone;
