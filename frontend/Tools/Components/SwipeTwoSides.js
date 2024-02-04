import React, { useState } from "react";
import { SafeAreaView, Button, View, Pressable } from "react-native";
import Color from "../ThemeConsts/colors";
import { Text } from "../../DefaultFont";

const SwipeTwoSides = (props) => {

    return <Pressable
        onPress={() => props.setView(props.nextView)}
        style={{
            backgroundColor: Color.yellow,
            borderRadius: 150,
            width: "100%",
            height: 60
        }}>

        <Text style={{ fontSize: 25, fontWeight: "bold", textAlign: "center" }}>{props.buttonText}</Text>

    </Pressable>
}

export default SwipeTwoSides;
