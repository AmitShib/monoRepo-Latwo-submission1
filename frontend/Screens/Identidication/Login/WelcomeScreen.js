import React, { useContext, useState, useEffect } from "react";
import { View, TouchableOpacity, Image, StyleSheet, ScrollView, Pressable, Platform } from "react-native";
import Modal from "react-native-modal";
import { ThemeContext } from "../../../ThemeContext";
import images from "../../../Tools/ThemeConsts/images";
import { icons } from "../../../Tools/ThemeConsts";
import NextButton from "../../../Tools/Components/NextButton";
import SPACING from "../../../Tools/ThemeConsts/SPACING";
import { Text } from '../../../DefaultFont';
//import { Auth } from 'aws-amplify';
import Checkbox from "../../../Tools/Components/Checkbox";
import alert from "../../../Tools/Components/Alert";


import languagekeys from "./localization/Languagekeys";
import LanguageUtils from "./localization/LanguageUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLanguage } from "../../../LanguageContext";
import { useUserContext } from "../../../UserContext";
import { Auth } from "aws-amplify";
//Amplify Imports
//import { useAuthenticator } from "@aws-amplify/ui-react-native";



const WelcomeScreen = ({ navigation }) => {
  //const { signOut } = useAuthenticator();
  const { mode, COLORS } = useContext(ThemeContext);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isVisible, set_isVisible] = useState(true);
  const { selectedLanguage, languageRenderCount } = useLanguage();
  const { actionType } = useUserContext();
  // const itsauth = AsyncStorage.getItem('authenticated');
  // const itsauthsignup = AsyncStorage.getItem('itsauthsignup');


  useEffect(() => {
  // Fetch the values from AsyncStorage and provide default values
  AsyncStorage.getItem('authenticated')
    .then(authenticated => {
      if (actionType === 'signin' && authenticated === 'true') {
        Auth.currentAuthenticatedUser()
          .then(() => {
            navigation.navigate("Home");
          })
          .catch(error => {
            console.log("Error checking authentication status:", error);
          });
      }
    })
    .catch(error => {
      console.log("Error fetching authenticated from AsyncStorage:", error);
    });

  AsyncStorage.getItem('itsauthsignup')
    .then(authSignup => {
      if (actionType === 'signup' && authSignup === 'true') {
        Auth.currentAuthenticatedUser()
          .then(() => {
            navigation.navigate("Hey");
          })
          .catch(error => {
            console.log("Error checking authentication status:", error);
          });
      }
    })
    .catch(error => {
      console.log("Error fetching itsauthsignup from AsyncStorage:", error);
    });
  
  }, []);


  // const handleCheckboxPress = () => {
  //   setTermsAccepted(true);
  //   setModalVisible(false);
  //   set_isVisible(false);
  //   // Store the user's choice in AsyncStorage
  //   AsyncStorage.setItem("termsAccepted", "true")
  //     .then(() => {
  //       console.log("User's choice stored in AsyncStorage.");
  //     })
  //     .catch((error) => {
  //       console.log("Error storing termsAccepted in AsyncStorage:", error);
  //     });
  // };



  // const [toggleText, setToggleText] = useState(mode === "light" ? "Dark" : "Light");

  // const handleToggleMode = () => {
  //   toggleMode();
  //   setToggleText(prevText => (prevText === "Light" ? "Dark" : "Light"));
  // };
  //  const handleLogoutPress = async () => {
  //   try {
  //     await Auth.signOut();
  //     // Perform any other actions after successful sign-out, such as navigating to another screen
  //     navigation.navigate("LoginScreen"); // Replace 'LoginScreen' with your desired destination
  //   } catch (error) {
  //     console.error('Error signing out:', error);
  //   }
  const handleCheckboxPress = () => {
    setTermsAccepted(prevState => !prevState); // Toggle the state based on previous state
  };
  const handleNextButtonPress = () => {
    navigation.navigate("RegViaMailScreen");
  };

  const handleLoginPress = () => {
    navigation.navigate("SignInScreen");
    //Auth.signOut()
    // navigation.navigate("LoginScreen");
  };

  const handleLoginPress4 = () => {
    navigation.navigate("CollectingPhoneCode");
    //Auth.signOut()
    // navigation.navigate("LoginScreen");
  };

  const handleTest = () => {
    navigation.navigate("Prefrences");
    //Auth.signOut()
    // navigation.navigate("LoginScreen");
  };

  const handleLoginPress2 = () => {
    navigation.navigate("DishPage");
    // navigation.navigate("LoginScreen");
  };


  const handleLoginPress3 = () => {
    navigation.navigate("Home");
  };
  const handleLogoutPress = async () => {
    //await Auth.signOut();
    console.log("logout");
  }

  const handleConditionalNavigation = (nextScreen,can_navigate) => {
    if (can_navigate) {
      navigation.navigate(nextScreen);
    } else {
      alert("Please accept the terms and conditions.");
    }
  };


  const handleCheckboxChange = (newState) => {
    setTermsAccepted(newState);
    setModalVisible(false);
    set_isVisible(false);
    // Store the user's choice in AsyncStorage
    AsyncStorage.setItem("termsAccepted", "true")
      .then(() => {
        console.log("User's choice stored in AsyncStorage.");
      })
      .catch((error) => {
        console.log("Error storing termsAccepted in AsyncStorage:", error);
      });
  };


  return (
    <ScrollView contentContainerStyle={{...styles.container, paddingTop: 0,backgroundColor: COLORS[mode].background}} keyboardShouldPersistTaps="handled">





      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={icons.belleaticon} resizeMode="contain" style={styles.logo} />
      </View>
  
      {/* Text components */}
      <Text style={styles.title}>{LanguageUtils.getLangText(languagekeys.hey)}</Text>
      <Text style={styles.title}>{LanguageUtils.getLangText(languagekeys.welcome_screen_1)}</Text>
      <Text style={styles.subtitle}>{LanguageUtils.getLangText(languagekeys.im_johny_your_personal)}</Text>
  
      {/* Image */}
      <Image source={images.imjony} resizeMode="contain" style={styles.centeredImage} />
  
      {/* Buttons and Texts */}
      <NextButton 
        buttonText={LanguageUtils.getLangText(languagekeys.sign_up)} 
        // navigation={navigation} 
        // nextScreen="RegviaMailScreenNextStep" 
        customOnPress={() => handleConditionalNavigation("RegviaMailScreenNextStep",termsAccepted)}
        />
      <NextButton buttonText={LanguageUtils.getLangText(languagekeys.skip_to_menu)} navigation={navigation} nextScreen="Home" />
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>{LanguageUtils.getLangText(languagekeys.i_have_an_account)}</Text>
      </TouchableOpacity>
      <Text style={styles.termsText}>{LanguageUtils.getLangText(languagekeys.welcome_notice)}</Text>

        {/* Terms Accepted Content */}
        
        <Pressable style={styles.termsContainer}>
        <ScrollView style={styles.termsScroll}>
        </ScrollView>
        
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  
          <View style={{ marginRight: 10 }}> 
            <Checkbox
              style={{ marginTop:30 }}  // Align self at center
              buttonState={termsAccepted}
              //onPress={handleCheckboxPress}            
              onChange={handleCheckboxChange}
            />
          </View>
          
          <View>
            <TouchableOpacity 
              style={{ marginLeft:30 }}  // Align self at center
              onPress={() => navigation.navigate("TermsAndConditions")}
            >
              <Text style={{
                color: COLORS[mode].primary,
                textDecorationLine: 'underline', 
                fontSize: 16,
                marginBottom:30,
              }}>
                {LanguageUtils.getLangText(languagekeys.i_have_read_the)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      </Pressable>

      
    </ScrollView>
  );
};
  
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20, // Adjust as needed
    },
    logoContainer: {
      marginBottom: 0,  // Margin right below the logo
    },
    logo: {
      width: 300, // Adjust the size as needed
      height: 180, // Adjust the size as needed
      resizeMode: "contain"
      
    },
    title: {
      fontWeight: "900",
      fontSize: 30,  // Adjust the size as needed
      textAlign: "center",
    },
    subtitle: {
      fontWeight: "400",
      fontSize: 20,  // Adjust the size as needed
      textAlign: "center",
      marginBottom: -55,  // Space before the centered image
    },
    centeredImage: {
      width: 195,  // Adjust the size as needed
      height: 290,  // Adjust the size as needed
      resizeMode: "contain",
      marginBottom: 0,  // Space before the buttons
    },
    button: {
      alignItems: "center",
      marginBottom:5,  // Minimal margin between buttons
    },
    buttonText: {
      fontSize: 16,  // Adjust the size as needed
      fontWeight: "900",
      textDecorationLine: "underline",
    },
    termsText: {
      fontWeight: "600",
      fontSize: 10,  // Adjust the size as needed
      textAlign: "center",
    },
    termsContainer: {
      width: '100%', // Or adjust as needed
    },
    termsScroll: {
      maxHeight: 200,  // Adjust as needed
    }
  });
  
  export default WelcomeScreen;
  