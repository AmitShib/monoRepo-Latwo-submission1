// import React, { useContext } from 'react';
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { I18nManager } from 'react-native';

// import { ThemeContext } from "../../../ThemeContext";
// import Tabs from './tabs';
// import CustomDrawerContent from './CustomDrawerContent';
// import styles from './styles';
// import Home from '../../InAction/OrderProcess/Home';

// const Drawer = createDrawerNavigator();

// const AppNavigator = () => {
//   const { mode, COLORS } = useContext(ThemeContext);
//   const [isRTL, setIsRTL] = React.useState(true);

//   // const handleTogglePress = () => {
//   //   setIsRTL(!isRTL);
//   //   if (!isRTL) {
//   //     I18nManager.forceRTL(true);
//   //     I18nManager.allowRTL(true);
//   //   } else {
//   //     I18nManager.forceRTL(false);
//   //     I18nManager.allowRTL(false);
//   //   }
//   // };

//   return (
//     <Drawer.Navigator
//       drawerPosition="right"
//       drawerType="slide"
//       overlayColor="transparent"
//       drawerStyle={{
//         flex: 1,
//         width: '65%',
//         paddingLeft: 20,
//         flexDirection: 'row-reverse',
//       }}
//       sceneContainerStyle={{
//         backgroundColor: 'transparent',
//       }}
//       screenOptions={{
//         headerShown: false,
//       }}
//       drawerContent={({ navigation }) => ( // Correctly pass the navigation prop to CustomDrawerContent
//         <CustomDrawerContent navigation={navigation} />
//       )}
//     >
//       <Drawer.Screen
//         name="Tabs"
//         component={Tabs}
//         options={{
//           headerShown: false,
//         }}
//       />
//     </Drawer.Navigator>
//   );
// };

// export default AppNavigator;