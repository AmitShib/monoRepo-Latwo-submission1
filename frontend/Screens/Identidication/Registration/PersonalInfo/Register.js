import React from "react";
import {
    View
} from "react-native";
import { Text } from "../../../../DefaultFont";

import languagekeys from "../../Login/localization/Languagekeys";
import LanguageUtils from "../../Login/localization/LanguageUtils";

const Register = () => {
    return (
        <View>
            <Text>{LanguageUtils.getLangText(languagekeys.home_page)}</Text>
        </View>
    )
}
export default Register;