import React, { useState } from "react";
import { SafeAreaView, Button, View, Pressable } from "react-native";
import Color from "../ThemeConsts/colors";
import { Text } from "../../DefaultFont";

/*type ButtonProps = {
    buttonText: string
}*/

const SwitchButton = (props) => {
    const [buttonState, setButtonState] = useState(false);

    return <Pressable
        onPress={() => setButtonState(!buttonState)}
        android_ripple = {{color: Color.lightYellow, foreground: false}}
        style={({ pressed }) => ({
            backgroundColor: buttonState ? Color.yellow : "#D9D9D9",
            borderRadius: 15,
            width: 100,
            height: 115,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        })}>
        <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>{props.buttonText}</Text>

    </Pressable>
}

export default SwitchButton;