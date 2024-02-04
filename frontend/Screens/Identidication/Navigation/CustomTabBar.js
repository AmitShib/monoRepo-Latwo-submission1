import React, { useContext, useEffect } from 'react';
import { Image, TouchableOpacity, View, Platform } from 'react-native'; // Import Platform
import { useNavigation } from '@react-navigation/native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { ThemeContext } from "../../../ThemeContext";
import icons from '../../../Tools/ThemeConsts/icons';
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs";
import { Text } from "../../../DefaultFont";
import DrawerIconToggle from '../../../Tools/Components/DrawerIconToggle';
import { createDrawerNavigator, DrawerContentScrollView } from "@react-navigation/drawer";
import BirdChat from '../../../Tools/Components/BirdChat';

const CustomTabBar = ({ props }) => {
  const { mode, COLORS } = useContext(ThemeContext);
  const navigation = useNavigation();


  const handleDrawerToggle = () => {
    navigation.openDrawer(); 
  };
  const tabBarHeight = Platform.OS === 'web' ? 70 : 60;

  return (
    <View style={{ height: tabBarHeight, backgroundColor: COLORS[mode].tabsbackground }}>
      <BottomTabBar {...props} />
      {/* <DrawerIconToggle onPress={handleDrawerToggle} /> */}
      <View style={{ position: 'absolute', bottom: 50, right: 0 }}>
        <BirdChat />
      </View>
    </View>
  );
};

export default CustomTabBar;
