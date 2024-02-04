import React, { useContext } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import ThemeContext from '../../ThemeContext';
import { icons } from '../ThemeConsts';

const DrawerIconToggle = ({ onPress }) => {
  const { mode, COLORS } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      style={{
         position: 'relative',
        bottom: 700, // Adjust this value to control the vertical position
        right: 0, // Adjust this value to control the horizontal position
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS[mode].tabsbackground,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
        
      }}
      onPress={onPress}
    >
      <Image
        source={icons.menu}
        style={{
          width: 25,
          height: 25,
          tintColor: COLORS[mode].white,
        }}
      />
    </TouchableOpacity>
  );
};

export default DrawerIconToggle;
