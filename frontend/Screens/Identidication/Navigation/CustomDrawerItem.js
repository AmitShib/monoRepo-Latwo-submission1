import React, { useContext, useState } from 'react';
import { TouchableOpacity, Text, Image,  Platform, View } from "react-native";
import { ThemeContext } from "../../../ThemeContext";
import icons from '../../../Tools/ThemeConsts/icons';
import SIZES from '../../../Tools/ThemeConsts/theme';
import FONTS from '../../../Tools/ThemeConsts/theme';
import images from "../../../Tools/ThemeConsts/images";
const CustomDrawerItem = ({ label, icon, onPress }) => {
  const { mode, COLORS } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        height: 40,
        marginBottom: SIZES.base,
        alignItems: 'center',
        paddingLeft: SIZES.radius,
        borderRadius: SIZES.base,
        left:5,
      }}
      onPress={onPress}
    >
      <Image
        source={icon}
        style={{
          width: 20,
          height: 20,
          tintColor: COLORS[mode].white,
          left: 5,
        }}
      />
      <View style = {{left: Platform.OS === 'web' ? 30 : 0, right:10}}>
      <Text
        style={{
          fontWeight: 700,
          color: COLORS[mode].white,
          left: Platform.OS === 'web' ? 25 : 15,
          ...FONTS.h3,
        }}
      >
        {label}
      </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomDrawerItem;