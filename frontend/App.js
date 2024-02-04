import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import ThemeProvider from "./ThemeProvider";
import { ThemeContext } from "./ThemeContext";
import * as Font from "expo-font";
import { LikedDishesProvider } from "./LikedDishesContext";
import { UserProvider } from "./UserContext";
import { LanguageProvider } from "./LanguageContext";
import { Platform } from 'react-native';
// Initialize Clarity.
import { LogLevel, initialize, setCustomUserId,  setCustomSessionId, setCustomTag, setCurrentScreenName, getCurrentSessionId } from 'react-native-clarity';
const clarityConfig = {
  logLevel: LogLevel.Verbose,
  allowMeteredNetworkUsage: true
};
initialize('<ki13twt9tn>', clarityConfig);

// Import AWS components
import { Amplify } from "aws-amplify";
import Storage from '@aws-amplify/storage';
import config from "./src/aws-exports";
// import {
//   useAuthenticator,
//   withAuthenticator,
// } from "@aws-amplify/ui-react-native";

// Import your screen components
import Tabs from "./Screens/Identidication/Navigation/tabs";
import RegViaMailScreen from "./Screens/Identidication/Registration/PersonalInfo/RegviaMailScreen";
import RegviaMailScreenNextStep from "./Screens/Identidication/Registration/PersonalInfo/RegviaMailScreenNextStep";
import Hey from "./Screens/Identidication/Registration/PersonalInfo/Hey";
import Prefrences from "./Screens/Identidication/Registration/Prefrences/Prefrences";
import Prefrences2 from "./Screens/Identidication/Registration/Prefrences/Prefrences2";
import Prefrences3 from "./Screens/Identidication/Registration/Prefrences/Prefrences3";
import CollectingPhone from "./Screens/Identidication/Login/CollectingPhone";
import CollectingPhoneCode from "./Screens/Identidication/Login/CollectingPhoneCode";
import WelcomeScreen from "./Screens/Identidication/Login/WelcomeScreen";
import Oops from "./Screens/Identidication/Registration/Prefrences/Oops";
import TermsAndConditions from "./Screens/Identidication/Login/TermsAndConditions";
import Profile from "./Screens/Identidication/Registration/PersonalInfo/Profile";
import DishPage from "./Screens/InAction/OrderProcess/DishPage";
import Chat from "./Tools/Components/Chat";
import BirdChat from "./Tools/Components/BirdChat";
import CustomDrawerContent from "./Screens/Identidication/Navigation/CustomDrawerContent";
import OrderSummary from "./Screens/InAction/OrderProcess/OrderSummary";
import Table from "./Screens/InAction/OrderProcess/Table";
import { OrderedItemsProvider } from "./OrderedItemsProvider";
import LikedDishes from "./Screens/InAction/OrderProcess/LikedDishes";
import SignInScreen from "./Screens/Identidication/Login/SignInScreen";
import AuthLoadingScreen from "./AuthLoadingScreen";
import RefreshScreen from "./Tools/Components/RefreshScreen";
import HomePage from "./Screens/InAction/OrderProcess/HomePage";
import { TableProvider } from "./TableProvider ";


// Define your Stack and Drawer
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const title = (text) => Platform.select({ web: `Latwo`, default: text })

// Config Amplify
Amplify.configure(config);
// Amplify.configure({

//   Storage: {
//     AWSS3: {
//       bucket: 'amplify-amplify02f10ed8e8f74-staging-180318-deployment',
//       region: ' eu-north-1', // for example, 'us-east-1'
//     }
//   }
// });
function AppWithAuthenticator() {
  const [isFontLoaded, setIsFontLoaded] = useState(false);

  useEffect(() => {
    loadFonts();
  }, []);

  const loadFonts = async () => {
    await Font.loadAsync({
      "Rubik-Regular": require("./Tools/Src/Fonts/Rubik-Regular.ttf"),
      "Rubik-Bold": require("./Tools/Src/Fonts/Rubik-Bold.ttf"),
    });

    setIsFontLoaded(true);
  };

  if (!isFontLoaded) {
    return <Stack.Screen name="Drawer" component={DrawerStack} options={{ title: title('Drawer') }}/>;
  }
  
  const handleMenuButtonPress = () => {
    console.log('Menu button pressed');
    navigation.openDrawer(); // Open the drawer
  };
  return (
    <ThemeProvider>
      
      <ThemeContext.Consumer>
        {(theme) => (
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false,     
            cardStyle: {
            backgroundColor: 'transparent',
            opacity: 1,
    },    cardOverlayEnabled: true, }}>
              <Stack.Screen name="Drawer" component={DrawerStack} options={{ title: title('DrawerStack') }}/>
              <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} options={{ title: title('AuthLoadingScreen') }} />
              <Stack.Screen name="RegViaMailScreen" component={RegViaMailScreen} options={{ title: title('RegViaMail') }}/>
              <Stack.Screen name="Hey" component={Hey} options={{ title: title('Hey') }} />
              <Stack.Screen name="DishPage" component={DishPage} options={{ title: title('DishPage') }} />
              <Stack.Screen name="lifestyle" component={Prefrences2}  options={{ title: title('Prefrences2') }}/>
              <Stack.Screen name="Prefrences" component={Prefrences} options={{ title: title('Prefrences') }}/>
              <Stack.Screen name="Prefrences3" component={Prefrences3} options={{ title: title('Prefrences3') }} />
              <Stack.Screen name="Oops" component={Oops} options={{ title: title('Oopss') }}/>
              <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} options={{ title: title('TermsAndConditions') }}/>
              <Stack.Screen name="Chat" component={Chat} options={{ title: title('Chat') }}/>
              <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ title: title('WelcomeScreen') }} />
              <Stack.Screen name="CollectingPhone" component={CollectingPhone} options={{ title: title('CollectingPhone') }} />
              <Stack.Screen name="SignInScreen" component={SignInScreen} options={{ title: title('signinScreen') }}/>
              <Stack.Screen name="CollectingPhoneCode" component={CollectingPhoneCode} options={{ title: title('CollectionPhoneCode') }}/>
              <Stack.Screen name="Table" component={Table} options={{ title: title('Table') }}/>
              <Stack.Screen name="Profile" component={Profile} options={{ title: title('Profile') }} />
              <Stack.Screen name="OrderSummary" component={OrderSummary} options={{ title: title('OrderSummary') }}/>
              <Stack.Screen name="LikedDishes" component={LikedDishes} options={{ title: title('LikedDishes') }} />
              <Stack.Screen name="RegviaMailScreenNextStep" component={RegviaMailScreenNextStep} options={{ title: title('RegviaMailScreenNextStep') }}/>
              {/* <Stack.Screen name="Home" component={Tabs} options={{ title: title('Tabs') }} /> */}
              <Stack.Screen name="RefreshScreen" component={RefreshScreen} options={{ title: title('RefreshScreen') }} />
              <Stack.Screen name="HomePage" component={HomePage} options={{ title: title('RefreshScreen') }} />

            </Stack.Navigator>
          </NavigationContainer>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}

// function DrawerStack({ navigation }) { // Add navigation as a prop
//   return (
//     <Drawer.Navigator initialRouteName="WelcomeScreen" screenOptions={{ headerShown: false }} drawerContent={(props) => (
//         <CustomDrawerContent navigation={props.navigation} />)}>

//       {/* <Drawer.Screen name="Home" component={Tabs} initialParams={{ navigation }}/> */}
//       <Drawer.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ title: title('WelcomeScreen') }} />
//       <Drawer.Screen name="Restaurant" component={Tabs} options={{ title: title('Tabs') }}/>
//       <Drawer.Screen name="OrderDelivery" component={Tabs} options={{ title: title('Tabs') }}/>
//       <Drawer.Screen name="RegviaMailScreenNextStep" component={RegviaMailScreenNextStep} options={{ title: title('RegviaMailScreenNextStep') }}/>
//        <Drawer.Screen name="RefreshScreen" component={RefreshScreen} options={{ title: title('RegviaMailScreenNextStep') }} />
//        <Drawer.Screen
//               name="Home"
//               component={Tabs}
//               options={({ navigation }) => ({
//                 drawerIcon: ({ focused, color, size }) => (
//                   <DrawerIconToggle
//                     onPress={() => navigation.openDrawer()}
//                   />
//                 ),
//               })}
//             />
//     </Drawer.Navigator>
//   );
// }

function DrawerStack() {
  return (
    <Drawer.Navigator initialRouteName="WelcomeScreen" screenOptions={{ headerShown: false }} drawerContent={(props) => (
        <CustomDrawerContent navigation={props.navigation} />)}>
      <Drawer.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ title: title('WelcomeScreen') }} />
      <Drawer.Screen name="Restaurant" component={Tabs} options={{ title: title('Tabs') }}/>
      <Drawer.Screen name="OrderDelivery" component={Tabs} options={{ title: title('Tabs') }}/>
      <Drawer.Screen name="RegviaMailScreenNextStep" component={RegviaMailScreenNextStep} options={{ title: title('RegviaMailScreenNextStep') }}/>
      <Drawer.Screen name="RefreshScreen" component={RefreshScreen} options={{ title: title('RegviaMailScreenNextStep') }} />
      <Drawer.Screen
        name="Home"
        component={Tabs}
        options={({ navigation }) => ({
          title: title('Tabs'),
          drawerIcon: ({ focused, color, size }) => (
            <DrawerIconToggle onPress={() => navigation.openDrawer()} />
          ),
        })}
      />
    </Drawer.Navigator>
  );
}



// Wrap the AppWithAuthenticator component with withAuthenticator
const AppWithAuthentication = AppWithAuthenticator;

// The export statement for the main component is kept as it is.
export default function MainApp() {
  return (
    <UserProvider>
      <TableProvider>
        <LanguageProvider>
          <OrderedItemsProvider>
            <LikedDishesProvider>
              <AppWithAuthentication />
            </LikedDishesProvider>
          </OrderedItemsProvider>
        </LanguageProvider>
      </TableProvider>
    </UserProvider>
  );
}
