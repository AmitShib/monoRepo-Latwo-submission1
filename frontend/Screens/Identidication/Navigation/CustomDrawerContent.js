import React, { useContext, useState, useEffect } from 'react';
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from '@react-navigation/native';
import ThemeContext from '../../../ThemeContext';
import { Text } from "../../../DefaultFont";
import { View, Image, TouchableOpacity, I18nManager, Modal } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import icons from '../../../Tools/ThemeConsts/icons';
import SIZES from '../../../Tools/ThemeConsts/theme';
import FONTS from '../../../Tools/ThemeConsts/theme';
import images from "../../../Tools/ThemeConsts/images";
import NextButton from "../../../Tools/Components/NextButton";
import SPACING from "../../../Tools/ThemeConsts/SPACING";
import Home from '../../InAction/OrderProcess/Home';
import Profile from '../Registration/PersonalInfo/Profile'
import OrderSummary from '../../InAction/OrderProcess/OrderSummary';
import Table from '../../InAction/OrderProcess/Table';
import LikedDishes from '../../InAction/OrderProcess/LikedDishes';
import Payment from '../../InAction/OrderProcess/Payment';
import { setStatusBarHidden, setStatusBarTranslucent } from 'expo-status-bar';
import styles from './styles';
import CustomDrawerItem from './CustomDrawerItem';
import CustomLanguageToggle from './CustomLanguageToggle';
import { Restart } from 'fiction-expo-restart';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLanguage } from '../../../LanguageContext';

import languagekeys from '../Login/localization/Languagekeys';
import LanguageUtils from '../Login/localization/LanguageUtils';
import { Auth } from 'aws-amplify';
import AuthModal from '../../../Tools/Components/AuthModal';
import QRCode from 'react-native-qrcode-svg'; 
import HomePage from '../../InAction/OrderProcess/HomePage';

const CustomDrawerContent = ({ navigation }) => {
  const { mode, toggleMode, COLORS } = useContext(ThemeContext);
  const [isRTL, setIsRTL] = useState(true);
  const [toggleText, setToggleText] = useState(mode === "light" ? "Dark" : "Light");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { selectedLanguage, setSelectedLanguage, toggleRender } = useLanguage(); // Include toggleRender
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  
// QR PART //

const generateUniqueID = () => {
  return `https://www.latwo-ai.com/`;
};

const handleDrawerItemPress2 = (screen) => {
  setShowQRCode(true); // this will open the QR modal
};


  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      await AsyncStorage.removeItem("authenticated");
      navigation.navigate('WelcomeScreen');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setFirstName(user.attributes.name);
      setLastName(user.attributes.family_name);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleToggleMode = () => {
    toggleMode();
    setToggleText(prevText => (prevText === "Light" ? "Dark" : "Light"));
  };

  const handleTogglePress = () => {
    const newLanguage = selectedLanguage === 'hebrew' ? 'english' : 'hebrew';
    setSelectedLanguage(newLanguage);
    AsyncStorage.setItem('userLanguage', newLanguage);
    navigation.navigate('RefreshScreen', { key: Date.now() });

  };

  useEffect(() => {
    const loadUserLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('userLanguage');
        if (storedLanguage) {
          setSelectedLanguage(storedLanguage);
        }
      } catch (error) {
        console.error('Error loading user language:', error);
      }
    };

    loadUserLanguage();

    if (selectedLanguage === 'hebrew') {
      // I18nManager.forceRTL(true);
      // I18nManager.allowRTL(true);
      LanguageUtils.setAppLanguage('hebrew');
      LanguageUtils.setAppLanguageFromDeviceLocale('hebrew');
    } else {
      // I18nManager.forceRTL(false);
      // I18nManager.allowRTL(false);
      LanguageUtils.setAppLanguage('english');
      LanguageUtils.setAppLanguageFromDeviceLocale('english');
    }
    navigation.closeDrawer();
  }, [selectedLanguage]);

  const handleDrawerItemPress = (screenName) => {
    navigation.navigate(screenName);
    navigation.closeDrawer();
  };


  return (
    <View style={{ flex: 1, backgroundColor: COLORS[mode].togglemenuicon }}>

{showQRCode && (
  <Modal
    animationType="slide"
    transparent={true}
    visible={showQRCode}
    onRequestClose={() => {
      setShowQRCode(false);
    }}
  >
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      <View style={{ width: 280, padding: 20, backgroundColor: COLORS[mode].background, borderRadius: 10 }}>
        <QRCode value={generateUniqueID()} size={250} />
        <TouchableOpacity style={{ marginTop: 20, alignSelf: 'center' }} onPress={() => setShowQRCode(false)}>
          <Text style={{color:COLORS[mode].text}}>{LanguageUtils.getLangText(languagekeys.close)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
)}

      <DrawerContentScrollView
        scrollEnabled={true}
        contentContainerStyle={{ flex: 1 }}
      >
        {/* Close button */}
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.closeDrawer()}
          >
            <Image
              source={icons.reject}
              style={{
                height: 25,
                width: 25,
                tintColor: COLORS[mode].white,
                left: 10,
              }}
            />
          </TouchableOpacity>
        </View>
  

        {/* must be logged in modal */}
        <AuthModal
          isVisible={authModalVisible}
          onClose={() => setAuthModalVisible(false)}
          onNavigateToSignIn={() => {
            setAuthModalVisible(false);
            navigation.navigate('SignInScreen'); // Replace with your actual navigation logic
          }}
        />
        {/* Profile */}
        <TouchableOpacity
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: SIZES.radius,
          }}
          onPress={() => navigation.navigate('Profile')}
        >
          <Image
            source={images.ido}
            style={{
              height: 25,
              width: 25,
              borderRadius: SIZES.radius,
              left: 5,
            }}
          />
          <View style={{ marginLeft: SIZES.radius }}>
            <Text
              style={{
                fontWeight: 900,
                left: 12,
                color: COLORS[mode].white,
                ...FONTS.h3,
              }}
            >
              {firstName} {lastName}
            </Text>
            <Text
              style={{
                fontWeight: 900,
                left: 12,
                color: COLORS[mode].white,
                ...FONTS.body4,
              }}
            >
              {LanguageUtils.getLangText(languagekeys.your_profile)}
            </Text>
          </View>
        </TouchableOpacity>

        {/* Drawer items */}
        <View style={{ flex: 1, marginTop: SIZES.padding }}>
          {/* Existing drawer items */}
          <CustomDrawerItem
            //label="דף הבית"
            label={LanguageUtils.getLangText(languagekeys.home_page)}
            icon={icons.home}
            onPress={() => handleDrawerItemPress('HomePage')}
          />
          <CustomDrawerItem
            //label="ההזמנה שלי"
            label={LanguageUtils.getLangText(languagekeys.my_table)}
            icon={icons.basket}
            onPress={() => handleDrawerItemPress('Table')}
          />
          <CustomDrawerItem
            //label="התראות"
            label={LanguageUtils.getLangText(languagekeys.notifications)}
            icon={icons.star}
            onPress={() => handleDrawerItemPress('Home')}
          />
          <CustomDrawerItem
            //label="אהבתי"
            label={LanguageUtils.getLangText(languagekeys.I_liked)}
            icon={icons.like2}
            onPress={() => handleDrawerItemPress('LikedDishes')}
          />



          <View
            style={{
              height: 2,
              marginVertical: SIZES.radius,
              marginLeft: SIZES.radius,
              backgroundColor: COLORS[mode].white,
              width: '70%',
            }}
          ></View>

          <CustomDrawerItem
            //label="עקוב אחרי ההזמנה שלך"
            label={LanguageUtils.getLangText(languagekeys.follow_order)}
            icon={icons.pin}
            onPress={() => handleDrawerItemPress('Home')}
          />
          <CustomDrawerItem
            //label="קופונים"
            label={LanguageUtils.getLangText(languagekeys.coupons)}
            icon={icons.fire}
            onPress={() => handleDrawerItemPress('Home')}
          />
          <CustomDrawerItem
            //label="הגדרות"
            label={LanguageUtils.getLangText(languagekeys.settings)}
            icon={icons.user}
            // onPress={() =>{ 
            //   handleDrawerItemPress('Profile');

            // }}
            onPress={() => {
              // Check if the user is authenticated
              AsyncStorage.getItem("authenticated")
                  .then(authenticated => {
                      if (authenticated === "true") {
                          // If authenticated, navigate to the Profile screen
                          navigation.navigate('Profile');
                      } else {
                          // If not authenticated, show the authentication modal
                          setAuthModalVisible(true);
                      }
                  })
                  .catch(error => {
                      console.log("Error checking authentication status:", error);
                  });
          }}
          />

          <CustomDrawerItem
            //label="הזמן חבר"
            label={LanguageUtils.getLangText(languagekeys.invite_friend)}
            icon={icons.user}
            onPress={handleDrawerItemPress2}
          />
          <CustomDrawerItem
            //label="מרכז התמיכה"
            label={LanguageUtils.getLangText(languagekeys.help_center)}
            icon={icons.info}
            onPress={() => handleDrawerItemPress('Home')}
          />

          {/* Language toggle */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 5,
              paddingLeft: 20,
            }}
          >
            <CustomLanguageToggle isRTL={isRTL} onPress={handleTogglePress} />
            <Text
              style={{
                color: COLORS[mode].white,
                fontSize: 16,
                marginLeft: 10,
              }}
            >
              {selectedLanguage === 'hebrew' ? 'עברית' : 'English'}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.toggleButton} onPress={handleToggleMode}>
          <Text style={styles.toggleButtonText}>{toggleText} Mode</Text>
        </TouchableOpacity>
        <View style={{ marginTop: 100 }}>
          <CustomDrawerItem
            label="התנתקות"
            icon={icons.logout}
            onPress={handleSignOut}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  );
};


export default CustomDrawerContent;