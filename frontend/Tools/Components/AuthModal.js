import React, { useContext } from 'react';
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure you have Ionicons from expo installed
import ThemeContext from '../../ThemeContext';
import NextButton from './NextButton'; // Import your NextButton component
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { Text } from '../../DefaultFont';
import LanguageUtils from '../../Screens/Identidication/Login/localization/LanguageUtils';
import languagekeys from '../../Screens/Identidication/Login/localization/Languagekeys';
import { useLanguage } from '../../LanguageContext';

const AuthModal = ({ isVisible, onClose, onNavigateToSignIn }) => {
  const { mode, COLORS } = useContext(ThemeContext);
  const navigation = useNavigation(); 
  const { selectedLanguage, languageRenderCount } = useLanguage();


  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: COLORS[mode].menubackground, padding: 20, borderRadius: 10 }}>
          <Text style={{ color: COLORS[mode].text, fontWeight:'bold' }}>
          {LanguageUtils.getLangText(languagekeys.you_need_to_be_logged_in_to_procced)}
          </Text>

          <View style={{marginTop:10, marginVertical:10, marginHorizontal:10}}>
          <NextButton
            buttonText={LanguageUtils.getLangText(languagekeys.Login_Signup)}
            navigation={navigation} 
            nextScreen="SignInScreen" 
            customOnPress={onNavigateToSignIn} 
            disabled={false} 
            CustomRadius={20}
          />
          </View>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="exit-outline" size={24} color={COLORS[mode].primary} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  nextButton: {
    backgroundColor: 'blue', // Customize background color
    borderRadius: 8, // Customize border radius
    height: 40, // Customize height
    alignItems: 'center', // Customize alignment
    justifyContent: 'center', // Customize alignment
    marginTop: 10, // Customize margin
  },
});

export default AuthModal;
