import React, { useContext, useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import SPACING from "../ThemeConsts/SPACING";
import { Text } from "../../DefaultFont";
import ThemeContext from '../../ThemeContext';
import Icon from "react-native-vector-icons/Feather";
import PropTypes from 'prop-types';
import alert from './Alert';


const CheckboxWithLimit = (props) => {
    const [buttonState, setButtonState] = useState(false);
    const { mode, COLORS } = useContext(ThemeContext);
    const align = props.align || 'right';

    // const handlePress = () => {
    //     setButtonState(!buttonState);
    //     props.handleOptionSelect(props.buttonText, !buttonState);
    // };

    const handlePress = () => {
        if (buttonState) {
          setButtonState(!buttonState);
          props.handleOptionSelect(props.buttonText, !buttonState);
        } else if (!buttonState && props.currentCount < props.limitOfChoose) {
          setButtonState(!buttonState);
          props.handleOptionSelect(props.buttonText, !buttonState);
        } else {
          alert(`You can only select up to ${props.limitOfChoose} options.`); //to translate this 
        }
      };

    const styles = StyleSheet.create({
        container: {
            flexDirection: align === 'left' ? 'row' : 'row-reverse',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: "100%",
            marginTop: 5,
        },
        pressable: {
            backgroundColor: buttonState ? COLORS[mode].primary : COLORS[mode].dark,
            borderRadius: 11,
            borderColor: COLORS[mode].primary,
            borderWidth: 1,
            width: 22,
            height: 22,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: align === 'left' ? 10 : 0,
            marginLeft: align === 'left' ? 0 : 10,
        },
        text: {
            fontSize: 18,
            color: COLORS[mode].gray,
        },
    });

    return (
        <View style={styles.container}>
            <Pressable
                onPress={handlePress}
                android_ripple={{ color: COLORS[mode].yellow, foreground: false }}
                style={styles.pressable}
            >            
                {buttonState && (
                    <Icon name="check" size={16} color={COLORS[mode].background} />
                )}
            </Pressable>
            <Text style={styles.text}>{props.buttonText}</Text>
        </View>
    );
}

CheckboxWithLimit.propTypes = {
    align: PropTypes.string,
    buttonText: PropTypes.string.isRequired,
    handleOptionSelect: PropTypes.func.isRequired,
};

export default CheckboxWithLimit;
