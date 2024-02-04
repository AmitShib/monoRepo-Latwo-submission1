import React, { useContext, useState } from "react";
import { Dimensions, StyleSheet, TextInput, View, TouchableOpacity, Image, ScrollView } from "react-native";
import { ThemeContext } from "../../../../ThemeContext";
import NextButton from "../../../../Tools/Components/NextButton";
import BackButton from "../../../../Tools/Components/BackButton";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../../../../DefaultFont";
import Heading from "../../../../Tools/Components/Heading";
import { icons } from "../../../../Tools/ThemeConsts";
import { useUserContext } from "../../../../UserContext";

import languagekeys from "../../Login/localization/Languagekeys";
import LanguageUtils from "../../Login/localization/LanguageUtils";
import { useLanguage } from "../../../../LanguageContext";
import {Auth} from 'aws-amplify';
import AsyncStorage from "@react-native-async-storage/async-storage";
const { height } = Dimensions.get("window");


const RegviaMailScreenNextStep = (props) => {



  const navigation = useNavigation();
  const { mode, COLORS } = useContext(ThemeContext);
  const { user, setUser } = useUserContext(); // Use the user context
  const [firstName, setFirstName] = useState(LanguageUtils.getLangText(languagekeys.first_name));
  const [isFirstNameValid, setIsFirstNameValid] = useState(false);
  const [lastName, setLastName] = useState(LanguageUtils.getLangText(languagekeys.last_name));
  const [isLastNameValid, setIsLastNameValid] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState();
  const [selectedGender, setSelectedGender] = useState("");
  const [isSelectedGender, setIsSelectedGender] = useState(false);//make gender mandatory
  const [isBirthdateValid, setIsBirthdateValid] = useState(false);
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { selectedLanguage, languageRenderCount } = useLanguage();
  const [zoneCode,setZoneCode] = useState("+972");


// console.log('isSelectedGender:', isSelectedGender);
// console.log('isLastNameValid:', isLastNameValid);
// console.log('isFirstNameValid:', isFirstNameValid);
// console.log('isBirthdateValid:', isBirthdateValid);
// console.log('isPhoneNumberValid:', isPhoneNumberValid);


  const handleFirstNameChange = (text) => {
    setFirstName(text);
    setIsFirstNameValid(text.length >= 2); //to change?    
  };

  const handleBirthdateChange = (text) => {
    // Remove non-numeric characters from input
    const cleanedText = text.replace(/[^\d]/g, '');

    // Apply formatting based on input length
    if (cleanedText.length <= 2) {
      setBirthdate(cleanedText);
    } else if (cleanedText.length <= 4) {
      setBirthdate(cleanedText.substring(0, 2) + "/" + cleanedText.substring(2));
    } else if (cleanedText.length <= 6) {
      setBirthdate(cleanedText.substring(0, 2) + "/" + cleanedText.substring(2, 4) + "/" + cleanedText.substring(4));
    } else {
      setBirthdate(cleanedText.substring(0, 2) + "/" + cleanedText.substring(2, 4) + "/" + cleanedText.substring(4, 8));
    }

    // Validate the birthdate format
    const validFormat = cleanedText.length === 8 && isBirthdateValidFormat(cleanedText);
    setIsBirthdateValid(validFormat);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setIsPasswordValid(text.length >= 8);
  };
  const isBirthdateValidFormat = (input) => {
    console.log("Input:", input);
    const dateFormat = /^(0?[1-9]|[12][0-9]|3[01])(0?[1-9]|1[012])\d{4}$/;
    const isValidFormat = dateFormat.test(input);

    if (!isValidFormat) {
      return false; // Return false if the format is not valid
    }

    // Parse the input into day, month, and year components
    const day = parseInt(input.substring(0, 2), 10);
    const month = parseInt(input.substring(2, 4), 10);
    const year = parseInt(input.substring(4), 10);

    // Get the current date
    const currentDate = new Date();

    // Compare birthdate with current date
    const birthdate = new Date(year, month - 1, day); // Note: Months are 0-indexed
    const isBirthdateValid = birthdate <= currentDate;

    console.log("isBirthdateValid:", isBirthdateValid);
    return isBirthdateValid;
  };



  const handleLastNameChange = (text) => {
    setLastName(text);
    setIsLastNameValid(text.length >= 2);
  };

  const handlePhoneChange = (text) => {
    setPhoneNumber(text);
    setIsPhoneNumberValid(text.length === 10);
};



  const handleNextButtonPress = () => {
    const fullNumber = "+972" + phoneNumber;
    let adjustedPhoneNumber;
    // 054
    // 54
    // +972054408826
    // +972544408826
    // 05044408826
    // +972544408826
    // 544408826
    // +97254408826
    // 
    if (fullNumber.startsWith('+9720')) {
        adjustedPhoneNumber = fullNumber.replace('+9720', '+972');
    } else if (fullNumber.startsWith('+9725')) { // Adjusting for already having the +972 prefix
        adjustedPhoneNumber = '+972' + fullNumber.substring(5); 
    } else if (fullNumber.startsWith('+972')) {
        adjustedPhoneNumber = '+972' + fullNumber.substring(4);
    } else if (phoneNumber.startsWith('05')) {  // without the zoneCode
        adjustedPhoneNumber = '+972' + phoneNumber.substring(1);
    } else if (phoneNumber.startsWith('5')) {  // without the zoneCode
        adjustedPhoneNumber = '+972' + phoneNumber;
    } else {
        adjustedPhoneNumber = fullNumber; // default case, no adjustments
    }

    const updatedUser = {
        ...user,
        gender: selectedGender,
        firstname: firstName,
        lastname: lastName,
        birthdate: birthdate,
        password: password,
        phonenumber: adjustedPhoneNumber,  // Use adjustedPhoneNumber here
        username:adjustedPhoneNumber,
    };
    setUser(updatedUser);
    onRegisterPressed(updatedUser);
    AsyncStorage.setItem("itsauthsignup", "true");

};
const onRegisterPressed = async (user) => {
  const password = Math.random().toString(10)+ 'Abc#';

  try {
    await Auth.signUp({
      username:  user.phonenumber,
      phone_number:  user.phonenumber,
      //password:user.password,
      password:password,
      attributes: {  gender: user.gender,email: user.email,birthdate: user.birthdate, family_name: user.lastname,name: user.firstname,},
      
    });
    //setUser(user);

    navigation.navigate('CollectingPhoneCode', {
      actionType: "signup",
      sendVerificationCode: false, // Set sendVerificationCode to true
    });
    
  } catch (e) {
    alert(e.message);
  }
};


  const handleGenderSelection = (gender) => {
    setSelectedGender(gender);
    setIsSelectedGender(true);
  };

  return (
    <ScrollView
      contentContainerStyle={{ backgroundColor: COLORS[mode].background, position: "absolute", height: "100%", width: "100%" }} >
      <View style={{ marginTop: 80, marginLeft: 30, marginRight: 30 }}>

        <Heading text={LanguageUtils.getLangText(languagekeys.a_little_info_then_)} />



        <View style={styles.backButtonContainer}>
          <BackButton navigation={navigation} />
        </View>

        <View style={{ marginTop: 20 }} />
        
        <View style={{ flexDirection: 'row', backgroundColor: COLORS[mode].background }}>
          <View style={[styles.inputContainer, { flex: 1, backgroundColor: COLORS[mode].background }]}>
            <TextInput
              editable
              numberOfLines={1}
              maxLength={40}
              onChangeText={handleFirstNameChange}
              //value={firstName}
              placeholder={LanguageUtils.getLangText(languagekeys.first_name)}
              placeholderTextColor={COLORS[mode].text}
              style={[
                styles.input,
                { color: COLORS[mode].text, shadowColor: COLORS[mode].shadow },
              ]}
            />
          </View>

          <View style={[styles.inputContainer, { flex: 1, backgroundColor: COLORS[mode].background, marginLeft: 10 }]}>
            <TextInput
              editable
              numberOfLines={1}
              maxLength={40}
              onChangeText={handleLastNameChange}
              //value={lastName}
              placeholder={LanguageUtils.getLangText(languagekeys.last_name)}
              placeholderTextColor={COLORS[mode].text}
              style={[
                styles.input,
                { color: COLORS[mode].text, shadowColor: COLORS[mode].shadow, height: 40 },
              ]}
            />
          </View>
        </View>



        <View style={[styles.inputContainer, { backgroundColor: COLORS[mode].background }]}>
          <TextInput
            editable

            numberOfLines={1}
            maxLength={40}
            onChangeText={handlePhoneChange}
            //value={lastName}
            placeholder={LanguageUtils.getLangText(languagekeys.phone_number)}
            placeholderTextColor={COLORS[mode].text}
            style={[
              styles.input,
              { color: COLORS[mode].text, shadowColor: COLORS[mode].shadow },
            ]}
          />
        </View>

        <View style={[styles.inputContainer, { backgroundColor: COLORS[mode].background }]}>
          <TextInput
            keyboardType="numeric"
            maxLength={10}
            value={birthdate} // Display the formatted birthdate
            onChangeText={handleBirthdateChange}
            placeholder="DD/MM/YYYY"
            placeholderTextColor={COLORS[mode].text}
            style={[
              styles.input,
              { color: COLORS[mode].text, shadowColor: COLORS[mode].shadow },
            ]}
          />
        </View>


        <View style={styles.genderContainer}>
          <TouchableOpacity onPress={() => handleGenderSelection("female")} style={[styles.genderIcon]}>
            <Image source={selectedGender === "female" ? icons.selected_female : icons.female} style={styles.genderIconImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleGenderSelection("non-binary")} style={[styles.genderIcon]}>
            <Image source={selectedGender === "non-binary" ? icons.selected_non_binary : icons.nonbinary} style={styles.genderIconImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleGenderSelection("male")} style={[styles.genderIcon]}>
            <Image source={selectedGender === "male" ? icons.selected_male : icons.male} style={styles.genderIconImage} />
          </TouchableOpacity>


        </View>
        {/* password section */}
        {/* <View style={[styles.inputContainer, { backgroundColor: COLORS[mode].background }]}>
          <TextInput
            secureTextEntry={!showPassword} // Show/hide password based on the state
            maxLength={40}
            value={password}
            onChangeText={handlePasswordChange}
            placeholder={LanguageUtils.getLangText(languagekeys.password)}
            placeholderTextColor={COLORS[mode].text}
            style={[
              styles.input,
              { color: COLORS[mode].text, shadowColor: COLORS[mode].shadow },
            ]}
          />
          <TouchableOpacity
            style={{ position: "absolute", right: 10, top: 10 }}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={{ color: COLORS[mode].text }}>
              {showPassword ? "Hide" : "Show"}
            </Text>
          </TouchableOpacity>
    </View> */}
    
        <View style={{ height: 20 }} />

        <NextButton
          buttonText={LanguageUtils.getLangText(languagekeys.next)}
          customOnPress={handleNextButtonPress}
          disabled={
            !isSelectedGender ||
            !isLastNameValid  ||
            !isFirstNameValid ||
            !isBirthdateValid ||
            !isPhoneNumberValid
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: "100%",
    zIndex: 2,
    width: "100%",
    // justifyContent: "flex-end",
    // paddingHorizontal: 20,
    // paddingBottom: 40,
  },
  title: {
    fontWeight: "900",
    fontSize: 30,
    textAlign: "right",
    bottom: 265.7,
    right: 20,
    paddingHorizontal: 30,
  },
  backButtonContainer: {
    bottom: 110,
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderBottomColor: "#EFB60E",
    borderBottomWidth: 2,
    marginBottom: 30
  },
  input: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    opacity: 1,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  genderIcon: {
    width: 75,
    height: 75,


    justifyContent: "center",
    alignItems: "center",
  },

  selectedGenderIcon: {
    backgroundColor: "#EFB60E",
  },

  genderIconImage: {
    width: 75,
    height: 75,
  },
  selectedMale: {
    backgroundColor: "#2451C6", // Replace with your desired color
  },

  selectedFemale: {
    backgroundColor: "#C33E7E", // Replace with your desired color
  },

  selectedNonBinary: {
    backgroundColor: "#0C8526", // Replace with your desired color
  },
});

export default RegviaMailScreenNextStep;
