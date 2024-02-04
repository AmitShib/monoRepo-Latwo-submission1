import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import Spacing from "../constants/Spacing";
  import FontSize from "../constants/FontSize";
  import Colors from "../constants/Colors";
  import Font from "../constants/Font";
  import { Ionicons } from "@expo/vector-icons";
  import { NativeStackScreenProps } from "@react-navigation/native-stack";
  import { RootStackParamList } from "../types";
  import AppTextInput from "../components/AppTextInput";
  import { Text } from "../../../DefaultFont";
  
  import languagekeys from "./localization/Languagekeys";
  import LanguageUtils from "./localization/LanguageUtils";


  let Props = NativeStackScreenProps<RootStackParamList, "Login">;
  
  const LoginScreen = ({ navigation: { navigate } }) => {
    return (
      <SafeAreaView>
        <View>
          <Text>{LanguageUtils.getLangText(languagekeys.login)}</Text>
        </View>
      </SafeAreaView>
    );
  };
  
  export default LoginScreen;
  
  const styles = StyleSheet.create({});