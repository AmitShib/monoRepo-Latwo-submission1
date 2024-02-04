import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { images } from '../../../Tools/ThemeConsts';
import CustomInput from '../../../Tools/Components/CustomInput/CustomInput';
import CustomButton from '../../../Tools/Components/CustomButton/CustomButton';
import SocialSignInButtons from '../../../Tools/Components/SocialSignInButtons/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import { useUserContext } from '../../../UserContext';
import { ThemeContext } from '../../../ThemeContext';
import NextButton from '../../../Tools/Components/NextButton';

import languagekeys from './localization/Languagekeys';
import LanguageUtils from './localization/LanguageUtils';
import alert from '../../../Tools/Components/Alert';
const SignInScreen = () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { mode, COLORS } = useContext(ThemeContext);
  const [verificationCode, setVerificationCode] = useState('');
  const [session, setSession] = useState(null);
  const { user, setUser } = useUserContext(); // Use the user context
  const [username, setUsername] = useState('+972');

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const sendTempCode = async data => {
    setLoading(true);
    let adjustedPhoneNumber;

    if (data.username.startsWith('+9720')) {
        adjustedPhoneNumber = data.username.replace('+9720', '+972');
    } else if (data.username.startsWith('05')) {
        adjustedPhoneNumber = '+972' + data.username.substring(1); // remove the leading 0 and prepend +972
    } else if (data.username.startsWith('5')) {
        adjustedPhoneNumber = '+972' + data.username; // just prepend +972       
    }
    else {
        adjustedPhoneNumber = data.username; // default case, no adjustments
    } 
    try {
        // Use adjustedPhoneNumber instead of data.username

        const updatedUser = {
            ...user,
            phonenumber: adjustedPhoneNumber,
            username: adjustedPhoneNumber,
        };
        setUser(updatedUser);

        navigation.navigate('CollectingPhoneCode', {
            actionType: "signin",
            username: adjustedPhoneNumber,
            sendVerificationCode: true,
        });
        
    } catch (err) {
        setLoading(false);
        console.error(err);
    }
};





  const verifyCode = async data => {
    // if (!verificationCode) {
    //   alert(LanguageUtils.getLangText(languagekeys.verification_code_required));
    //   return;
    // }

    setLoading(true);
    try {
      const user = await Auth.sendCustomChallengeAnswer(session, data.verificationCode);
     // const Setuser = await Auth.confirmSignIn(session, data.verificationCode);
      setUser(user);

      // Store authentication status
      await AsyncStorage.setItem('authenticated', 'true');

      navigation.navigate('Home');
    } catch (err) {
      alert(err.message);
      setVerificationCode('');
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Check if the user is already authenticated
    AsyncStorage.getItem('authenticated')
      .then(authenticated => {
        if (authenticated === 'true') {
          navigation.navigate('Home');
        }
      })
      .catch(error => {
        console.log('Error checking authentication status:', error);
      });
  }, []);


  const onForgotPasswordPressed = () => {
    console.log("will need to go to page called forgot password");
  };

  const onSignUpPress = () => {
    navigation.navigate('RegviaMailScreenNextStep');
  };
  

  const handlePhoneNumberChange = (text) => {
    let newText = text.startsWith('+9720') ? text.replace('+9720', '+972') : text;
    setUsername(newText);
};

  const isValidPhoneNumber = (phoneNumber) => {
    const regex = /^\+972(?!0)\d+$/;
    return regex.test(phoneNumber);
  };
  
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: COLORS[mode].background,
      }}
    >
      <View style={styles.root}>
        <Image
          source={images.whitelogo}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />



      <CustomInput
          name="username"
          control={control}
          placeholder={LanguageUtils.getLangText(languagekeys.phone_number)}
          keyboardType="numeric"
          onChangeText={handlePhoneNumberChange}
          value={username}
          defaultValue="+972" 
      />


        {/* <CustomButton
          text={loading ? LanguageUtils.getLangText(languagekeys.loading) : LanguageUtils.getLangText(languagekeys.Send_Temporary_Code)}
          onPress={handleSubmit(sendTempCode)}
          type="TERTIARY"
          fgColor="black"
          bgColor="#efb60e"
        /> */}
        
        <NextButton
          customOnPress={handleSubmit(sendTempCode)}
          buttonText={loading ? LanguageUtils.getLangText(languagekeys.loading) : LanguageUtils.getLangText(languagekeys.Send_Temporary_Code)}
        />


{/* 
        <CustomInput
          name="verificationCode"
          placeholder={LanguageUtils.getLangText(languagekeys.verification_code)}
          control={control}
          keyboardType="numeric"
          onChangeText={text => setVerificationCode(text)}
          value={verificationCode}
        />

        <NextButton
          customOnPress={handleSubmit(verifyCode)}
          buttonText={loading ? LanguageUtils.getLangText(languagekeys.loading) : LanguageUtils.getLangText(languagekeys.login)}
        /> */}
{/* 
        <CustomButton
          text={LanguageUtils.getLangText(languagekeys.forgot_password)}
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
          fgColor="#ffff"
        /> */}

        <SocialSignInButtons />

        <CustomButton
          text={LanguageUtils.getLangText(languagekeys.dont_have_an_acount)}
          onPress={onSignUpPress}
          type="TERTIARY"
          fgColor="#ffff"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default SignInScreen;
