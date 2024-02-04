// import React, { useRef } from 'react';
// import { View, TouchableOpacity, Animated, StyleSheet, PanResponder, Text } from 'react-native';

// const Swipe2 = ({ onSwipe, text = 'Swipe me!', buttonColor = '#4CAF50', containerColor = '#E0E0E0' }) => {
//   const swipeAnim = useRef(new Animated.Value(0)).current;

//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderMove: (_, gestureState) => {
//         // Move the swipe button based on gesture distance
//         const dx = gestureState.dx;
//         swipeAnim.setValue(dx);
//       },
//       onPanResponderRelease: (_, gestureState) => {
//         const swipeButtonWidth = 100; // You can customize the button width here
//         if (gestureState.dx <= -swipeButtonWidth) {
//           // Swipe released beyond the negative button width, trigger onSwipe action
//           onSwipe();
//         }

//         // Reset the swipe position after release
//         Animated.timing(swipeAnim, {
//           toValue: 0,
//           duration: 150,
//           useNativeDriver: false,
//         }).start();
//       },
//     })
//   ).current;

//   const swipeButtonWidth = 100; // You can customize the button width here

//   const translateX = swipeAnim.interpolate({
//     inputRange: [-swipeButtonWidth, 0],
//     outputRange: [-swipeButtonWidth, 0],
//     extrapolate: 'clamp',
//   });

//   return (
//     <View style={[styles.container, { backgroundColor: containerColor }]} {...panResponder.panHandlers}>
//       <Animated.View
//         style={[
//           styles.swipeButton,
//           {
//             width: swipeButtonWidth,
//             backgroundColor: buttonColor,
//             transform: [{ translateX }],
//           },
//         ]}
//       >
//         <TouchableOpacity style={styles.buttonContent} onPress={() => alert('Button Clicked!')}>
//           {/* Get the button text from props */}
//           <Text>{text}</Text>
//         </TouchableOpacity>
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     height: 50,
//     borderRadius: 25,
//     overflow: 'hidden',
//   },
//   swipeButton: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 25,
//   },
//   buttonContent: {
//     // Customize button content styles if needed
//   },
// });

// export default Swipe2;
