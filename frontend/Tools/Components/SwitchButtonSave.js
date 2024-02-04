import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const SwitchButton = ({ buttonText, onToggle }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handlePress = () => {
    setIsSelected((prevValue) => !prevValue);
    onToggle(buttonText, !isSelected); // Call the onToggle callback with the button text and the new selected state
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isSelected ? styles.selectedButton : styles.unselectedButton,
      ]}
      onPress={handlePress}
    >
      <Text
        style={[
          styles.buttonText,
          isSelected ? styles.selectedButtonText : styles.unselectedButtonText,
        ]}
      >
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    width: 100,
    height: 115,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  selectedButton: {
    backgroundColor: "#EFB60E"
  },
  unselectedButton: {
    backgroundColor: "gray",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedButtonText: {
    color: "black",
  },
  unselectedButtonText: {
    color: "black",
  },
});

export default SwitchButton;
