// import React, { useState, useEffect } from 'react';
// import { View, Animated, PanResponder, TouchableOpacity, StyleSheet, Text } from 'react-native';

// const SwipeButton = ({ onPress, text }) => {
//   const [sliderWidth, setSliderWidth] = useState(0);
//   const [sliderPosition, setSliderPosition] = useState(new Animated.Value(0));
//   const [sliderText, setSliderText] = useState("text"); // Default text

//   useEffect(() => {
//     // Set the slider text based on the prop
//     if (text) {
//       setSliderText(text);
//     }
//   }, [text]);

//   const panResponder = PanResponder.create({
//     onStartShouldSetPanResponder: () => true,
//     onPanResponderMove: (_, gesture) => {
//       const { dx } = gesture;
//       const newPosition = Math.min(Math.max(dx, 0), sliderWidth);
//       setSliderPosition(new Animated.Value(newPosition));
//     },
//     onPanResponderRelease: (_, gesture) => {
//       const { dx } = gesture;
//       if (dx >= sliderWidth * 0.5) {
//         // Swipe complete
//         Animated.timing(sliderPosition, {
//           toValue: sliderWidth,
//           duration: 200,
//           useNativeDriver: false,
//         }).start(() => {
//           onPress();
//           setSliderPosition(new Animated.Value(0));
//         });
//       } else {
//         // Reset position
//         Animated.timing(sliderPosition, {
//           toValue: 0,
//           duration: 200,
//           useNativeDriver: false,
//         }).start();
//       }
//     },
//   });

//   const sliderStyle = {
//     transform: [{ translateX: sliderPosition }],
//   };

//   const onLayout = (event) => {
//     const { width } = event.nativeEvent.layout;
//     setSliderWidth(width);
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={onPress} style={styles.button}>
//         <Text style={styles.buttonText}>{sliderText}</Text>
//       </TouchableOpacity>
//       <View style={styles.sliderContainer}>
//         <Animated.View
//           style={[styles.slider, sliderStyle]}
//           onLayout={onLayout}
//           {...panResponder.panHandlers}
//         />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   button: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     backgroundColor: '#4287f5',
//     borderRadius: 5,
//     zIndex: 1,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   sliderContainer: {
//     flex: 1,
//     marginLeft: -20,
//     overflow: 'hidden',
//     borderRadius: 5,
//   },
//   slider: {
//     flex: 1,
//     backgroundColor: '#f5a442',
//   },
// });

// export default SwipeButton;
