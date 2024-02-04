import React, { useRef } from 'react';
import { View, StyleSheet, Platform, PanResponder, Modal } from 'react-native';
import { WebView } from 'react-native-webview';
import BackButton from './BackButton';
import { useNavigation } from '@react-navigation/native';

const Chat = ({ onClose }) => {
  const navigation = useNavigation();
  
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        if (gestureState.dy > 150) { 
          if (typeof onClose === 'function') {
            onClose();
          }
        }
      }
    })
  ).current;

  const webContent = (
    <iframe
      src="https://tawk.to/chat/64c682f5cc26a871b02c2de6/1h6jmv401"
      style={styles.webViewContainer}
    />
  );

  const mobileContent = (
    <WebView 
    source={{ uri: 'https://tawk.to/chat/64c682f5cc26a871b02c2de6/1h6jmv401' }} 
    style={{ flex: 1 }}
    transparent
    backgroundColor="transparent"
/>
  );

  const content = Platform.OS === 'web' ? webContent : mobileContent;

  return (
    <Modal transparent={true}>
      <View style={styles.container} {...panResponder.panHandlers}>
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
        </View>
        {content}
        <View style={styles.backButtonContainer}>
          <BackButton onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '90%',   // Setting the height to 80%
    alignSelf: 'center',
    //backgroundColor: 'transparent',  // Semi-transparent background (adjust as required)
    position: 'absolute', // Make it overlay on top of the screen
    bottom: 0, // Align it to the bottom of the screen

  },
  webViewContainer: {
    flex: 1,
    width: '100%',
    height: '100vh',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#333',
  },
  dividerContainer: {
    alignItems: 'center',
    paddingVertical: 8,
    
  },
  divider: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#CCC', // Set the color of the divider as needed
  },
});

export default Chat;
