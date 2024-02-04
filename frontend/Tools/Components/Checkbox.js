import React, { useState, useContext } from 'react';
import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons or your chosen icon library
import Color from '../ThemeConsts/colors';
import { ThemeContext } from "../../ThemeContext";
import { Text } from "../../DefaultFont";

const Checkbox = (props) => {
    const { mode, COLORS } = useContext(ThemeContext);
    const [buttonState, setButtonState] = useState(false);

    return (
        <View style={{
            display: "flex",
            flexDirection: "row",
            direction: "rtl",
            gap: 10,
            //width: "100%",
            alignItems: "center",
            marginBottom:props.botmargin ||30,
        }}>
            <Pressable
                onPress={() => {
                    const old_state = buttonState;
                    setButtonState(!buttonState);
                    if(props.onChange) {
                        props.onChange(!old_state);
                    }
                }}
                android_ripple={{ color: Color.lightYellow, foreground: false }}
                style={({ pressed }) => ({
                    backgroundColor: buttonState ? Color.primary : Color.gray,
                    borderRadius: 10,
                    width: 30,
                    height: 30,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                })}
            >
                {buttonState && (
                    <Ionicons name="md-checkmark" size={24} color={Color.text} /> // Render the checkmark icon
                )}
            </Pressable>
            {(props.buttonText) && (
                <Text style={{ fontSize: 16, color: COLORS[mode].text }}>{props.buttonText}</Text>
            )}
        </View>
    );
}

export default Checkbox;
