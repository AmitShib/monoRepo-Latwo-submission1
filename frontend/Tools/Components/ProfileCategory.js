import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import { ThemeContext } from '../../ThemeContext';
import { icon as IconModule } from '../ThemeConsts';

const ProfileCategory = ({ title, icon, onPress }) => {
  const { mode, COLORS } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      style={[
        styles.categoryContainer,
        {
          backgroundColor: COLORS[mode].menubackground,
          borderColor: COLORS[mode].border,
        },
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {icon && (
        <Image
          source={icon}
          style={[
            styles.iconStyle,
            { tintColor: COLORS[mode].text },
          ]}
        />
      )}
      <Text style={[styles.title, { color: COLORS[mode].text }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
categoryContainer: {
  paddingVertical: 15,
  paddingHorizontal: 10,
  borderBottomWidth: 5,
  // alignItems: 'center',
  borderRadius: 5, 
  elevation: 2, // For Android shadow
  shadowColor: '#000', // For iOS shadow
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
  marginRight:5,
  margin: 2.5,
  width:"45%",
  flexDirection: 'column',  // Stacks children vertically.
  justifyContent: 'center', // Centers children vertically in the container.
  marginHorizontal:10,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    top:10
  },
  iconStyle: {
    width: 20,
    height: 20,
  }
});

export default ProfileCategory;
