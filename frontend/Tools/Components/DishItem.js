import { SafeAreaView } from "react-native";
import { Image } from "react-native-elements";
import SPACING from "../ThemeConsts/SPACING";
import { Text } from "../../DefaultFont";
import { ThemeContext } from "../../ThemeContext";
import React, { useState, useContext } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const DishItem = () => {

    const { mode, COLORS } = useContext(ThemeContext);
    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.navigate("Restaurant")} style={{flexDirection: "row-reverse" }}>

            <Image source={require("../Src/Images/greg.png/")} style={{width: 140, borderRadius: 15, marginLeft: 11}}/>
            <SafeAreaView style={{flex: 1, margin: 0, padding: 0}}>
                <Text style={{ textAlign: "left", fontSize: 17, marginBottom: SPACING, fontWeight: "bold" }}>
                    ארוחת בוקר גרג
                </Text>

                <Text numberOfLines={2} style={{ textAlign: "left", marginBottom: SPACING}}>
                    ביצים לבחירה (אומלט מוגש על עלה סיגר), ממרח עגבניות מיובשות ופסטו, קוביות פטה וזעתר, אבוקדו עם לימון כבוש, סלט טונה, גבינת שמנת, זיתים מתובלים, סלט אישי, לחם הבית, קונפיטורה, עוגייה ביתית, קפה ותפוזים / לימונדה / אשכוליות אדומות / גזר / תפוחים (תוספת 6/9 שח)
                </Text>

                <SafeAreaView style={{flexDirection: "row" }}>
                    <Text style={{ marginBottom: SPACING, fontWeight: "bold", color: "#EFB60E"}}>
                        78₪  
                    </Text>

                    <Text style={{ marginBottom: SPACING, marginRight: 3, marginLeft: 3, fontWeight: "bold", color: "#EFB60E"}}>
                        •
                    </Text>

                    <Text style={{ fontWeight: "bold", marginBottom: SPACING, color: "#EFB60E"}}>
                        20-25  דק׳
                    </Text>
                </SafeAreaView>
            </SafeAreaView>

        </TouchableOpacity>
    )
}

export default DishItem;