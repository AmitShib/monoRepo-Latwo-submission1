import React, { useEffect, useContext } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View, ScrollView , Image} from "react-native";
import { ThemeContext } from "../../../../ThemeContext";
import NextButton from "../../../../Tools/Components/NextButton";
import SPACING from "../../../../Tools/ThemeConsts/SPACING";
import BackButton from "../../../../Tools/Components/BackButton";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../../../../DefaultFont";
import Heading from "../../../../Tools/Components/Heading";
import { Auth } from 'aws-amplify'; // Import Auth from AWS Amplify
import { useUserContext } from "../../../../UserContext";
import { images } from "../../../../Tools/ThemeConsts";
import languagekeys from "../../Login/localization/Languagekeys";
import LanguageUtils from "../../Login/localization/LanguageUtils";
import { useLanguage } from "../../../../LanguageContext";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Hey = () => {
  const { mode, COLORS } = useContext(ThemeContext);
  const navigation = useNavigation();
  const { user, setUser, setSignupActionType, setSigninActionType } = useUserContext(); // Use the user context
  const { selectedLanguage, languageRenderCount } = useLanguage();
  
  

  useEffect(async() => {
    checkAuthentication();
    await AsyncStorage.setItem("itsauthsignup", "false");
  }, []);

  const checkAuthentication = async () => {
    try {
      await Auth.currentAuthenticatedUser();
    } catch (error) {
      // User is not authenticated, navigate to welcome screen or login screen
      navigation.navigate('WelcomeScreen'); // Change to your desired screen
    }
  };

  const handleNextButtonPress = () => {
    navigation.navigate("Prefrences");
  };

  const handlePermalinkPress = () => {
    setSigninActionType();
    navigation.navigate("Home");
  };

  const handleLoginPress = async () => {
    try {
      await Auth.federatedSignIn(); // Perform authentication
      navigation.goBack(); // Navigate back to the Hey screen
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1 }}>
      <SafeAreaView style={[styles.container, { backgroundColor: COLORS[mode].background }]}>
        <View style={styles.contentContainer}>

          <Heading text={LanguageUtils.getLangText(languagekeys.Hey)} />
          <View style={styles.backButtonContainer}>
            <BackButton navigation={navigation} />
          </View>
          <View style={styles.userInfoContainer}>
             <Image source={images.jony} resizeMode="contain" style={styles.logo} />
          <View style={styles.userInfoText}>
            <Text style={[styles.userName, { color: COLORS[mode].text, fontSize: 30, fontWeight: 700 }]}>
              {user.firstname}
            </Text>
            <Text style={[styles.subtitle, { color: COLORS[mode].text, fontSize: 30, fontWeight: 700 }]}>
              {LanguageUtils.getLangText(languagekeys.its_good_2_c_u)}
            </Text>
          </View>
        </View>
          <Text style={[styles.subtitle2, { color: COLORS[mode].text,fontSize:20,fontWeight:700 }]}> {LanguageUtils.getLangText(languagekeys.wed_like_to_get_)}  </Text>
          <Text style={[styles.subtitle2, styles.paragraph, { color: COLORS[mode].text,fontSize:20,fontWeight:700 }]}>{LanguageUtils.getLangText(languagekeys.may_we)}</Text>
          <Text style={[styles.subtitle1, styles.paragraph, { color: COLORS[mode].text,fontSize:20,fontWeight:500 }]}>
            {LanguageUtils.getLangText(languagekeys.we_will_always_priorotize_)}
          </Text>
          <Text style={[styles.subtitle1, styles.paragraph, { color: COLORS[mode].text,fontSize:20,fontWeight:500 }]}>
            {LanguageUtils.getLangText(languagekeys.for_that_reason_we_made_)}
          </Text>
          <Text style={[styles.subtitle1, styles.paragraph, { color: COLORS[mode].text,fontSize:20,fontWeight:500 }]}>
            {LanguageUtils.getLangText(languagekeys.in_terms_of_)}
          </Text>
          <Text style={[styles.subtitle1, { color: COLORS[mode].text,fontSize:20,fontWeight:500 }]}>
            {LanguageUtils.getLangText(languagekeys.and_dont_worry)}
          </Text>
        </View>
     
      </SafeAreaView>
      <View style={[styles.container1, { backgroundColor: COLORS[mode].background }]}>
        
        {/* <TouchableOpacity onPress={handleLoginPress}>
          <Text style={styles.loginText}>Log In to Continue</Text>
        </TouchableOpacity> */}
        <NextButton buttonText={LanguageUtils.getLangText(languagekeys.got_it_go_for_it)} navigation={navigation} nextScreen="Prefrences" />

        <TouchableOpacity onPress={handlePermalinkPress}>
          <Text style={{...styles.permalink,paddingVertical:2}}> {LanguageUtils.getLangText(languagekeys.skip_to_menu)}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 10,
    justifyContent: "center",
    width: "100%",
  },
  container1: {
    flex: 1,
    paddingHorizontal: SPACING * 2,
    paddingVertical: SPACING * 10,
    justifyContent: "center",

  },
  backButtonContainer: {
    position: "absolute",
    top: 80,
    right: 0
  },
  subtitle: {
    fontWeight: "400",
    fontSize: SPACING * 2,
    textAlign: "left",
    marginBottom: SPACING * 0.5,
  },
  subtitle2: {
    fontWeight: "400",
    fontSize: SPACING * 2,
    textAlign: "left",
  },
  subtitle1: {
    fontWeight: "400",
    fontSize: SPACING * 1.2,
    textAlign: "left",
    marginBottom: SPACING * 0.5,
  },
  paragraph: {
    marginBottom: SPACING * 0.5,
  },
  permalink: {
    fontWeight: "400",
    fontSize: 15,
    lineHeight: SPACING * 1.2,
    color: "#EFB60E",
    marginTop: SPACING * 1,
    alignSelf: "center",
  },
  loginText: {
    fontWeight: "400",
    fontSize: SPACING * 1,
    lineHeight: SPACING * 1.2,
    color: "#EFB60E",
    marginTop: SPACING * 1,
    alignSelf: "center",
  },
  nextButtonContainer: {
    position: "absolute",
    paddingHorizontal: SPACING * 4,
    paddingVertical: SPACING * 4,
  },
  logo: {
    width: 50, // Set a specific width for the image
    height: 50, // Set a specific height for the image
    marginRight: SPACING, // Add spacing between image and text
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: SPACING * 4,
    paddingVertical: SPACING * 4,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING * 2,
  },

  userInfoText: {
    marginLeft: SPACING, // Add spacing between image and text
  },

  userName: {
    fontSize: 30,
    fontWeight: 700,
    marginBottom: -8, // Adjust as needed to align the two lines
  },
});

export default Hey;
