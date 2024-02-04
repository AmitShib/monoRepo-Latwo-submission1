import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text, Image } from 'react-native';

const ToggleSwitch = ({
  isEnabled,
  onToggle,
  activeColor,
  inactiveColor,
  activeLabel,
  inactiveLabel,
  activeImage,
  inactiveImage,
}) => {
  return (
    <TouchableOpacity 
      style={[styles.toggleContainer, { backgroundColor: isEnabled ? activeColor : inactiveColor }]}
      onPress={onToggle}
    >
      <View style={[styles.labelContainer, { alignItems: isEnabled ? 'flex-end' : 'flex-start' }]}>
        {isEnabled && activeImage ? (
          <Image source={activeImage} style={styles.toggleImage} resizeMode="contain" />
        ) : !isEnabled && inactiveImage ? (
          <Image source={inactiveImage} style={styles.toggleImage} resizeMode="contain" />
        ) : (
          <Text style={styles.toggleText}>
            {isEnabled ? activeLabel : inactiveLabel}
          </Text>
        )}
      </View>

      <View style={[styles.toggleCircle, { marginLeft: isEnabled ? 50 : 0 }]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    width: 100,
    height: 30,
    borderRadius: 15,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  toggleCircle: {
    width: 100,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#EFB60E',
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  toggleText: {
    color: 'white',
    fontSize: 10,
    zIndex:1,
  },
  toggleImage: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -15 }, { translateY: -15 }],
    width: 30,
    height: 30,
  },
});

export default ToggleSwitch;
