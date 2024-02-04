import React, { useContext, useState, useEffect } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Image, TouchableOpacity, I18nManager, StyleSheet, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import ThemeContext from '../../../ThemeContext';
import CustomTabBar from './CustomTabBar';
import { Text } from '../../../DefaultFont';
import { icons, images } from '../../../Tools/ThemeConsts';
// Screens imports
import Home from '../../InAction/OrderProcess/Home';
import HomePage from '../../InAction/OrderProcess/HomePage';
import Profile from '../Registration/PersonalInfo/Profile';
import Table from '../../InAction/OrderProcess/Table';
import LikedDishes from '../../InAction/OrderProcess/LikedDishes';
import Payment from '../../InAction/OrderProcess/Payment';
import languagekeys from '../Login/localization/Languagekeys';
import LanguageUtils from '../Login/localization/LanguageUtils';
import { useOrderedItems } from '../../../OrderedItemsProvider';
import AuthModal from '../../../Tools/Components/AuthModal';
import AsyncStorage from "@react-native-async-storage/async-storage";


const TabBarCustomButton = ({ accessibilityState, children, onPress }) => {
  const { mode, COLORS } = useContext(ThemeContext);
  

  const isSelected = accessibilityState.selected;

  if (isSelected) {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          height: Platform.OS === 'web' ? 60 : 50,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS[mode].tabsbackground,
        }}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          height: Platform.OS === 'web' ? 60 : 50,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS[mode].tabsbackground,
        }}
        activeOpacity={1}
        onPress={onPress}
      >
        {children}
      </TouchableOpacity>
    );
  }
};
const Tab = createBottomTabNavigator();



const Tabs = (navigation) => {
  const { orderedItems, hasVisitedTable } = useOrderedItems();
  const numberOfDishesInTable = orderedItems.length;
  const { mode, COLORS } = useContext(ThemeContext);  
  const filteredOrderedItems = orderedItems.filter(orderedItem => orderedItem.ordered);
  const filteredItemsCount = filteredOrderedItems.length;
  const [authModalVisible, setAuthModalVisible] = useState(false); 
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  useEffect(() => {
    // Check authentication status from AsyncStorage
    AsyncStorage.getItem("authenticated")
      .then(authenticated => {
        if (authenticated === "true") {
          setIsAuthenticated(true); // Set isAuthenticated to true if authenticated
        } else {
          // User is not authenticated, show AuthModal if needed
          setAuthModalVisible(false);
        }
      })
      .catch(error => {
        console.log("Error checking authentication status:", error);
      });
  }, []);

  return (
    <React.Fragment>
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: COLORS[mode].tabsbackground ,borderTopWidth: 0
          , elevation: 0,  },
        getIsUserInteractionEnabled: ({ route }) => {
          // Allow user interaction only if the route is not the Profile tab or if user is authenticated
          return route.name !== "Profile" || isAuthenticated;
        },
      }}

      tabBar={(props) => <CustomTabBar props={props} />}
    >
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.mainmenuicon}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                bottom: 0,
                tintColor: focused
                  ? COLORS[mode].primaryicon
                  : COLORS[mode].white,
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: COLORS[mode].white }}>{LanguageUtils.getLangText(languagekeys.menu)}</Text>
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />
      



      <Tab.Screen
        name="MyTable"
        component={Table}
        options={({ focused }) => ({
          tabBarIcon: ({ focused }) => (
            <View style={{ position: 'relative' }}>
              <Image
                source={icons.table}
                resizeMode="contain"
                style={{
                  width: 40,
                  height: 40,
                  bottom: 0,
                  tintColor: focused ? COLORS[mode].primary : COLORS[mode].white,
                }}
              />
              {numberOfDishesInTable > 0 && !hasVisitedTable && (
                <View
                  style={{
                    position: 'absolute',
                    left: 30,  // Adjusted from `right: 2` to make it consistent with 'Pay'
                    backgroundColor: 'red',
                    width: 22,     // Set to your desired size from 'Pay'
                    height: 22,    // Same as width
                    borderRadius: 11,  // Half of width or height
                    justifyContent: 'center',   // To center the text vertically
                    alignItems: 'center',       // To center the text horizontally
                    bottom: 30,  // Adjusted from `bottom: 50` to make it consistent with 'Pay'
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 12 }}>
                    {numberOfDishesInTable}
                  </Text>
                </View>
              )}
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: COLORS[mode].white }}>
              {LanguageUtils.getLangText(languagekeys.my_table)}
            </Text>
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        })}
      />
            <Tab.Screen
        name="Pay"
        component={Payment}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ position: 'relative' }}>
        <Image
          source={icons.pay}
          resizeMode="contain"
          style={{
            width: 35,
            height: 35,
            bottom: 0,
            tintColor: focused ? COLORS[mode].pay : COLORS[mode].white,
          }}
        />
        {/* {filteredItemsCount > 0 && (
          <View
            style={{
              position: 'absolute',
              left:15,
              backgroundColor: 'red',
              width: 22,     // Set to your desired size
              height: 22,    // Same as width
              borderRadius: 11,
              paddingHorizontal: 6,
              justifyContent: 'center',   // To center the text vertically
              alignItems: 'center',       // To center the text horizontally
              bottom: 18,  // Adjust this as per your needs
            }}
          >
            <Text style={{ color: 'white', fontSize: 12 }}>
              {filteredItemsCount}
            </Text>
          </View>
        )} */}
      </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: COLORS[mode].white }}>{LanguageUtils.getLangText(languagekeys.payment_nav)}</Text>
          ),
          tabBarButton: (props) => (
            <TabBarCustomButton
              {...props}
              onPress={() => {
                if (!isAuthenticated) {
                  // If the user is not authenticated, show the AuthModal
                  setAuthModalVisible(true);
                } else {
                  // If the user is authenticated, allow navigation to the "Profile" screen
                  props.onPress(); 
                }
              }}
            />
          ),
        }}
      />
      <Tab.Screen
  name="Profile"
  component={Profile}
  options={{
    tabBarIcon: ({ focused }) => (
      <Image
        source={icons.usermenu}
        resizeMode="contain"
        style={{
          width: 25,
          height: 25,
          bottom: 0,
          tintColor: focused
            ? COLORS[mode].primaryicon
            : COLORS[mode].white,
        }}
      />
    ),
    tabBarLabel: ({ focused }) => (
      <Text style={{ color: COLORS[mode].white }}>
        {LanguageUtils.getLangText(languagekeys.personal_area)}
      </Text>
    ),
    tabBarButton: (props) => (
      <TabBarCustomButton
        {...props}
        onPress={() => {
          if (!isAuthenticated) {
            // If the user is not authenticated, show the AuthModal
            setAuthModalVisible(true);
          } else {
            // If the user is authenticated, allow navigation to the "Profile" screen
            props.onPress(); 
          }
        }}
      />
    ),
  }}
/>
     {/* <Tab.Screen
        name="Love"
        component={LikedDishes}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={icons.love}
              resizeMode="contain"
              style={{
                width: 25,
                height: 25,
                bottom: 0,
                tintColor: focused ? COLORS[mode].heart : COLORS[mode].white,
              }}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={{ color: COLORS[mode].white }}>{LanguageUtils.getLangText(languagekeys.like)}</Text>
          ),
          tabBarButton: (props) => <TabBarCustomButton {...props} />,
        }}
      />*/}

    </Tab.Navigator>

    {/* Render AuthModal when authModalVisible is true */}
    {authModalVisible && !isAuthenticated && (
            <AuthModal
              isVisible={authModalVisible}
              onClose={() => setAuthModalVisible(false)}
              onNavigateToSignIn={() => {
                setAuthModalVisible(false);
                // navigation.navigate('SignInScreen');
              }}
            />
          )}
    </React.Fragment>
  );
};


export default Tabs;