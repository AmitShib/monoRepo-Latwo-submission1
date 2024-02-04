import React from "react";
import { Pressable } from "react-native";
import Color from "../ThemeConsts/colors";
import SPACING from "../ThemeConsts/SPACING";
import { Text } from "../../DefaultFont";

/*type ButtonProps = {
    setView: (string) => unknown
}*/

const SendButton = (props) => {


    return <Pressable
        onPress={() => props.setView("allergies")}
        android_ripple = {{color: Color.lightYellow, foreground: false}}
        style={({ pressed }) => ({
            backgroundColor: Color.yellow,
            borderRadius: 150,
            width: "100%",
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 3*SPACING
        })}>
        <Text style={{ fontSize: 25, fontWeight: "bold", textAlign: "center" }}>שלח</Text>

    </Pressable>
}

export default SendButton;
