import { Image, SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, View, Dimensions } from "react-native";
import React, { useState } from "react";
import SPACING from "../ThemeConsts/SPACING";
import Colors from "../ThemeConsts/colors";
import { Text } from "../../DefaultFont";

const YellowHeading = (props) => {

    return (
        <Text
            style={{
                marginBottom: SPACING*2,
                fontFamily: "Rubik-Bold",
                textAlign: props.align || "left",
                fontSize: 30,
                color: Colors.yellow,
                }}>

                {props.text}
            </Text>
    );
};

export default YellowHeading;