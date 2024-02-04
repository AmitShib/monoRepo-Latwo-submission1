// import React, {useContext} from 'react';
// import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
// import SwipeButton from 'rn-swipe-button';
// import ThemeContext from '../../ThemeContext';

// const SwipeableButtonComponent = (props) => {

//     const { mode, COLORS } = useContext(ThemeContext);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.container}>

//         <SwipeButton
//           disabled={false}
//           swipeSuccessThreshold={70}
//           height={65}
//           width={330}
//           title="החלק לאישור"
//           titleColor={COLORS[mode].primary}
//           shouldResetAfterSuccess={true}
//           onSwipeSuccess={() => {
//             if (props.onConfirm && typeof props.onConfirm === 'function') {
//                 props.onConfirm(); // Call the onConfirm function from the parent
//             } else {
//                 alert('Swiped Successfully!');
//             }
//         }}
//           //color={COLORS[mode].primary}
//           railFillBackgroundColor={COLORS[mode].primary}
//           railFillBorderColor={COLORS[mode].primary}
//           thumbIconBackgroundColor={COLORS[mode].primary}
//           thumbIconBorderColor={COLORS[mode].primary}
//           railBackgroundColor={COLORS[mode].menubackground}
//           railBorderColor={COLORS[mode].background}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'transparent',
//     padding: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     padding: 10,
//   },
// });

// export default SwipeableButtonComponent;
