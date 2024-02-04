import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Auth } from 'aws-amplify';
import { images } from './Tools/ThemeConsts';

const AuthLoadingScreen = ({ navigation }) => {
    useEffect(() => {
      checkAuthentication();
    }, []);
  
    const checkAuthentication = async () => {
      try {
        await Auth.currentAuthenticatedUser();
        navigation.navigate('Home'); // Authenticated user, go to main app
      } catch (error) {
        navigation.navigate('WelcomeScreen'); // Not authenticated, show welcome screen
      }
    };
  
    return (
      <View style={styles.container}>
        <Image source={images.splash} style={styles.splashImage} />
      </View>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    splashImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
  });
  
  export default AuthLoadingScreen;


  
