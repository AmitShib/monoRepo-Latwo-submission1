import React, { useContext, useEffect, useState } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, Image, I18nManager, ScrollView, Modal, Platform } from 'react-native'; 
import { ThemeContext } from '../../../../ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { Text } from '../../../../DefaultFont';
import Heading from '../../../../Tools/Components/Heading';
import NextButton from '../../../../Tools/Components/NextButton';
import SPACING from '../../../../Tools/ThemeConsts/SPACING';
import { Auth,Storage } from 'aws-amplify';
import { images } from '../../../../Tools/ThemeConsts';
import { useLanguage } from '../../../../LanguageContext';
import ProfileCategory from '../../../../Tools/Components/ProfileCategory';
import languagekeys from '../../Login/localization/Languagekeys';
import LanguageUtils from '../../Login/localization/LanguageUtils';
import QRCode from 'react-native-qrcode-svg';
import {icons} from '../../../../Tools/ThemeConsts';
import { COLORS } from '../../../../Tools/ThemeConsts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomLanguageToggle from '../../Navigation/CustomLanguageToggle';
import RefreshScreen from '../../../../Tools/Components/RefreshScreen';
const ProfileSettingsScreen = () => {
  const navigation = useNavigation();
  const { mode, toggleMode, COLORS } = useContext(ThemeContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { selectedLanguage, setSelectedLanguage, toggleRender } = useLanguage(); // Include toggleRender
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [toggleText, setToggleText] = useState(mode === "light" ? "Dark" : "Light");
  const [isRTL, setIsRTL] = useState(true);



  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      await AsyncStorage.removeItem("authenticated"); 
      resetfields();     
      navigation.navigate('RefreshScreen', { key: Date.now(), nextScreen: 'WelcomeScreen' });
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const resetfields = () => {
    setFirstName('');
    setLastName('');
    setPhoneNumber('');
    setEmail('');
    setPassword('');    
  };
// QR PART //

const generateUniqueID = () => {
  return `https://www.latwo-ai.com/`;
};

const handleDrawerItemPress2 = (screen) => {
  setShowQRCode(true); // this will open the QR modal
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
    //I18nManager.forceRTL(false);
    //I18nManager.allowRTL(false);
    LanguageUtils.setAppLanguage('english');
    LanguageUtils.setAppLanguageFromDeviceLocale('english');
  }
  navigation.closeDrawer();
}, [selectedLanguage]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setFirstName(user.attributes.name);
      setLastName(user.attributes.family_name);
      setPhoneNumber(user.attributes.phone_number);
      setEmail(user.attributes.email);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const prefrences_check = async () => {
    try {
      // Update the user's information using Amplify Auth
      const user = await Auth.currentAuthenticatedUser();

    } catch (error) {
      console.error('Error updating profile:', error);
    }

  }
  const handleDrawerItemPress = (screenName) => {
    navigation.navigate(screenName);
  };
  const handleSaveProfile = async () => {
    try {
      // Update the user's information using Amplify Auth
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, {
        name: firstName,
        family_name: lastName,
        phone_number: phoneNumber,
        email,
      });
      await Auth.changePassword(user, password);

      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <ScrollView style={{ backgroundColor: COLORS[mode].background }}>
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


      <View style={styles.categoriesContainer}>
        {/* Dark/Light Mode Toggle && Lanagague Toggle*/}
        <View style={styles.togglesRow}>
        <View style={styles.toggleContainer}>
          <CustomLanguageToggle isRTL={isRTL} onPress={handleTogglePress} />
          <Text style={{ color: COLORS[mode].text, fontSize: 16, marginLeft: 10 }}></Text>
        </View>
        <TouchableOpacity style={[styles.toggleButton, {backgroundColor:COLORS.light.primary,}]} onPress={handleToggleMode}>
          <Text style={styles.toggleButtonText}>{toggleText} Mode</Text>
        </TouchableOpacity>
      </View>

   
        <View style={{ marginHorizontal: 30, marginTop: 20 }}>
          {/* Main Title */}
        <Text style={[{color: COLORS[mode].headermenu, fontSize:25, fontWeight:'900', paddingBottom:5,textAlign: 'center'}]}>
          {LanguageUtils.getLangText(languagekeys.update_profile_properties)}
         </Text>  
        {/* Include the UserProfile component */}
          <UserProfile />
          <TextInput
            style={[styles.input, { color: COLORS[mode].text }]}
            placeholder={LanguageUtils.getLangText(languagekeys.first_name)}
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={[styles.input, { color: COLORS[mode].text }]}
            placeholder={LanguageUtils.getLangText(languagekeys.last_name)}
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={[styles.input, { color: COLORS[mode].text }]}
            placeholder={LanguageUtils.getLangText(languagekeys.phone_number)}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />

          {/* Email in setting screen */}
          {/* <TextInput
            style={[styles.input, { color: COLORS[mode].text }]}
            placeholder={LanguageUtils.getLangText(languagekeys.mail_address)}
            value={email}
            onChangeText={setEmail}
          /> */}


          {/* <TextInput
            style={[styles.input, { color: COLORS[mode].text }]}
            placeholder={LanguageUtils.getLangText(languagekeys.password)}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          /> */}

          {/* Buttons */}
          <View style={{ marginHorizontal: 20, marginVertical: 0,   }}>          
          <View style={styles.buttonWrapper}>
            <NextButton 
              buttonText={LanguageUtils.getLangText(languagekeys.Prefrences_edit)} 
              navigation={navigation} 
              nextScreen="Prefrences" 
              onPress={prefrences_check} 
            />
          </View>

          <View style={styles.buttonWrapper}>
            <NextButton 
              buttonText={LanguageUtils.getLangText(languagekeys.save_changes)}  
              onPress={handleSaveProfile} 
            />
          </View>
          
        </View>

        </View>
      </View>

      <ScrollView
        // horizontal
        // showsHorizontalScrollIndicator={false}
        style={styles.categoriesScrollView}
      >
        <View style={styles.categoriesSection}>

          <ProfileCategory 
            title={LanguageUtils.getLangText(languagekeys.home_page)} 
            icon={icons.home}
            onPress={() => handleDrawerItemPress('Home')}
          />

          <ProfileCategory 
            title={LanguageUtils.getLangText(languagekeys.my_table)} 
            icon={icons.basket}
            onPress={() => handleDrawerItemPress('Table')}
          />
          <ProfileCategory 
            title={LanguageUtils.getLangText(languagekeys.I_liked)} 
            icon={icons.like2}
            onPress={() => handleDrawerItemPress('LikedDishes')}
          />
          <ProfileCategory 
            title={LanguageUtils.getLangText(languagekeys.invite_friend)} 
            icon={icons.user}
            onPress={handleDrawerItemPress2}
          />
          <ProfileCategory 
            title={LanguageUtils.getLangText(languagekeys.help_center)} 
            icon={icons.info}
            onPress={() => handleDrawerItemPress('Chat')}
          />
          <ProfileCategory 
            title={LanguageUtils.getLangText(languagekeys.sign_out)}
            icon={icons.logout}
            onPress={handleSignOut}
          />
        </View>
      </ScrollView>
    </ScrollView>
  );
};

const UserProfile = () => {
  // You can modify this component to display the user's profile picture
  return (
    <View style={styles.profilePictureContainer}>
      <Image source={images.ido} style={{ width: 100, height: 100, borderRadius: 50 }} />
      {/* Add any additional profile information you want to display */}
    </View>
  );
};

// const UserProfile = () => {
//   const [profilePic, setProfilePic] = useState(null);

//   useEffect(() => {
//     fetchUserProfilePic();
//   }, []);

//   const fetchUserProfilePic = async () => {
//     try {
//       const user = await Auth.currentAuthenticatedUser();
//       const profilePicURL = await Storage.get(user.username + '.jpg'); // assuming you save the images with username.jpg as the key
//       setProfilePic(profilePicURL);
//     } catch (error) {
//       console.error('Error fetching profile picture:', error);
//     }
//   };

//   return (
//     <View style={styles.profilePictureContainer}>
//       {profilePic ? (
//         <Image source={{ uri: profilePic }} style={{ width: 100, height: 100, borderRadius: 50 }} />
//       ) : (
//         // Placeholder image in case the profile pic doesn't exist
//         <Image source={images.defaultProfilePic} style={{ width: 100, height: 100, borderRadius: 50 }} />
//       )}
//       {/* Add any additional profile information you want to display */}
//     </View>
//   );
// };

const styles = StyleSheet.create({
  smallNextButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
  },
  buttonWrapper: {
    transform: [{ scale: 0.8 }],  // Scale down to 90%
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  scrollContainer: {
    paddingBottom: 10,
},
categoriesContainer: {
   paddingTop:30,

},
categoriesScrollView: {
  flex: 1,
  zIndex:111,
  bottom:10,
},
categoriesSection: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-start',

},
toggleText: {
  color: COLORS.text,
  fontSize: 16,
},
toggleButton: {
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 20,
  alignSelf: 'center',
  marginTop: 5,
},
toggleButtonText: {
  fontSize: 16,
  fontWeight: 'bold',
},
togglesRow: {
  flexDirection: 'row',
  justifyContent: 'space-between', // to distribute space between toggles
  alignItems: 'center',
  paddingVertical: 5,
  paddingHorizontal: 50,
},
toggleContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},

});

export default ProfileSettingsScreen;
