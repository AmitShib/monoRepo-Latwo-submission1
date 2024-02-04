import React, { useContext } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Auth } from 'aws-amplify';
import { ThemeContext } from '../../../../ThemeContext';
import ProfileSettingsScreen from './ProfileSettingsScreen'; 
import BackButton from '../../../../Tools/Components/BackButton'; 
import { Text } from '../../../../DefaultFont';
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const { mode, toggleMode, COLORS } = useContext(ThemeContext); 
  const navigation = useNavigation();

  return (
    <ScrollView
    contentContainerStyle={[styles.container, { backgroundColor: COLORS[mode].background }]}>
      <BackButton height={40} navigation={navigation} style={styles.backButton} />
      <ProfileSettingsScreen />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default Profile;
