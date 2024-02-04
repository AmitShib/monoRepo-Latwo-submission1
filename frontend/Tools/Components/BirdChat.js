import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Linking } from 'react-native';
import { images } from '../ThemeConsts';
import COLORS from '../ThemeConsts/colors';

const BirdChat = () => {

  const handleFloatingActionButtonPress = () => {
    // Open the chat in the device's default web browser
    Linking.openURL('https://tawk.to/chat/64c682f5cc26a871b02c2de6/1h6jmv401')
      .catch(err => console.error("Failed to open URL", err));
  };


  return (
    <View style={{ flex: 1 }}>
      {/* Floating action button */}
      <TouchableOpacity
        style={styles.floatingActionButton}
        onPress={handleFloatingActionButtonPress}
      >
        <Image source={images.chatimg3} style={styles.floatingActionButtonIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  floatingActionButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.greygen,
  },
  floatingActionButtonIcon: {
    width: '70%', 
    height: '100%', 
    borderRadius: 30, 
    resizeMode: 'contain',
    tintColor:'white'
  },
});

export default BirdChat;



