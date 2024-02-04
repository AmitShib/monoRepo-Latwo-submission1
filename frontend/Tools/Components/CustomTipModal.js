import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet } from 'react-native';
import Colors from '../ThemeConsts/colors';
import { ThemeContext } from '../../ThemeContext';

const CustomTipModal = ({ isVisible, onClose, onConfirm, selectedTip, handleTipPress }) => {
  const { mode, COLORS } = useContext(ThemeContext);
  const [customTipAmount, setCustomTipAmount] = useState('');

  const handleConfirm = () => {
    if (parseFloat(customTipAmount) > 0) {
      onConfirm(parseFloat(customTipAmount));
      setCustomTipAmount(''); // Reset the customTipAmount state after confirming
      handleTipPress(parseFloat(customTipAmount)); // Update the selected tip percentage in the Payment component
    } else {
      // Display an error message or handle invalid input
      console.log('Please enter a valid tip amount (greater than 0).');
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', //make the back semi-transparent
        }}
      >
        <View
          style={{
            backgroundColor: COLORS[mode].background,
            paddingVertical: 20,
            paddingHorizontal: 30,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        >
          {/* Use TextInput for the custom tip */}
          <TextInput
            style={{
              ...styles.input,
              color: COLORS[mode].text,
            }}
            placeholder="הכנס אחוז לטיפ"
            placeholderTextColor={COLORS[mode].text} // Set the placeholder text color
            keyboardType="numeric"
            value={customTipAmount}
            onChangeText={(text) => setCustomTipAmount(text)}
          />

          {/* Add the confirm button */}
          <TouchableOpacity
            style={{
              backgroundColor: Colors.yellow,
              paddingVertical: 10,
              borderRadius: 10,
            }}
            onPress={handleConfirm}
          >
            <Text style={{ textAlign: 'center', fontSize: 17, color: Colors.white }}>אישור</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
});

export default CustomTipModal;
