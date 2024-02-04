import React,{useContext} from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Colors from '../../Tools/ThemeConsts/colors';
import {ThemeContext} from '../../ThemeContext';
const TipButton = (props) => {

  const { mode, COLORS } = useContext(ThemeContext);

  const handleTipPress = () => {
    // Call the tip calculation function from props and pass the tip percentage
    props.onTipPress(props.percent);
  };

  return (
    <TouchableOpacity
      style={{
        borderColor: COLORS[mode].primary,
        borderWidth: 1.5,
        borderRadius: 100,
        marginTop: 10,
        marginRight: 10,
        paddingRight: 5,
        width: 50,
      }}
      onPress={handleTipPress}
    >
      {/* Check if custom text is provided, if yes, render the custom text */}
      {props.text ? (
        <Text style={{ paddingLeft:5,textAlign: 'center', fontSize: 15,color:COLORS[mode].text }}>{props.text}</Text>
      ) : (
        <Text style={{ paddingLeft:5,textAlign: 'center', fontSize: 15,color:COLORS[mode].text }}>{props.percent}%</Text>
      )}
    </TouchableOpacity>
  );
};

export default TipButton;
