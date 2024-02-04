import React, { useState, useContext } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import ThemeContext from '../../ThemeContext';
import { Platform } from 'react-native';

const IncreaseDecrease = ({onNumberChange }) => {
  const { mode, COLORS } = useContext(ThemeContext);
  const [number, setNumber] = useState(1);

  const handleIncrease = () => {
    const newNumber = number + 1;
    setNumber(newNumber);
    onNumberChange(newNumber);
  };

  const handleDecrease = () => {
    if (number > 0) {
      const newNumber = number - 1;
      setNumber(newNumber);
      onNumberChange(newNumber);
    }
  };

  return (
    <View
      style={{
        marginTop:15,
        backgroundColor: COLORS[mode].primaryicon,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
        height: 40, // Adjust the height to match the AddToTableBtn height
        marginBottom: 15, // Add margin at the bottom for spacing
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 5, // Adjust the spacing as needed.
          backgroundColor: COLORS[mode].primaryicon,
        }}
      >

        <TouchableOpacity onPress={handleIncrease}>
          <Text
            style={{
              fontSize: 24,
              color: COLORS[mode].text,
              backgroundColor: COLORS[mode].primary,
              borderRadius: 50,              
              width: 30,
              height: 30,
              textAlign: 'center',
              lineHeight: 30,
            }}
          >
            +
          </Text>
        </TouchableOpacity>
        

        <Text style={{ fontSize: 15, fontWeight:900,color: COLORS[mode].text, marginHorizontal: 10 }}>
          {number}
        </Text>


        <TouchableOpacity onPress={handleDecrease}
        style={{
          
          
          backgroundColor: COLORS[mode].primary,
          borderRadius: 50,
          padding: 6,
          width: 30,
          height: 30,
          marginTop:1,
          lineHeight: 30,
          // ↓↓↓ Add this property to adjust the position of "-" inside its circle
          marginBottom: Platform.OS === 'android' ? 2 : 0, // Adjust this value as needed
        }}>
          <Text
            style={{
              color: COLORS[mode].text,
              fontSize: 30,
              textAlign: 'center',
              textAlignVertical :'center',
              marginTop:-13,
            }}
          >
            -
          </Text>
        </TouchableOpacity>
        
      </TouchableOpacity>
    </View>
  );
};

export default IncreaseDecrease;
