import React, { useState, useContext } from "react";
import { Pressable, SafeAreaView, AsyncStorage } from "react-native";
import Color from "../ThemeConsts/colors";
import { Text } from "../../DefaultFont";
import ThemeContext from "../../ThemeContext";
import AuthModal from "./AuthModal";

const OrderButton = ({ buttonText, createOrder, navigation }) => {
  const { mode, COLORS } = useContext(ThemeContext);
  const [authModalVisible, setAuthModalVisible] = useState(false);

  const handleButtonPress = () => {
    if (typeof createOrder === "function") {
      createOrder({
        onAuthenticated: () => {
          setAuthModalVisible(false);
        },
        onUnauthenticated: () => {
          setAuthModalVisible(true);
        }
      });
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: COLORS[mode].background }}>
      <Pressable
        onPress={handleButtonPress}
        android_ripple={{ color: COLORS[mode].primary, foreground: false }}
        style={({ pressed }) => ({
          backgroundColor: Color.yellow,
          borderRadius: 150,
          width: "100%",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <Text style={{ fontSize: 25, fontFamily: "Rubik-Bold", textAlign: "center", color: "black" }}>
          {buttonText}
        </Text>
      </Pressable>
      <AuthModal
        isVisible={authModalVisible}
        onClose={() => setAuthModalVisible(false)}
        onNavigateToSignIn={() => {
          setAuthModalVisible(false); // Close modal
          navigation.navigate('SignInScreen'); // Replace with your actual navigation logic
        }}
      />
    </SafeAreaView>
  );
};

export default OrderButton;
