import { Image, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, View, Dimensions } from "react-native";
import React, { useState } from "react";
import { Text } from "../../DefaultFont";

const TextBox = (props) => {

    const boxWidth = props.width;
    const boxPlaceHolder = props.placeHolder;

    console.log(boxWidth);
    

    return (

        <TextInput style={{
            height: 50,
            width: boxWidth,
            padding: 10,
            fontSize: 20,
            textAlign: "center",
            marginRight: 15,
            borderBottomWidth: 3,
            borderBottomColor: "#F5DF6E"
        }}

        placeholder={boxPlaceHolder} />

    )

}

export default TextBox;