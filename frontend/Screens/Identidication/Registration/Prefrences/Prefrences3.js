import React, { useContext, useState } from "react";
import { SafeAreaView, ScrollView, TextInput, View, Dimensions, StyleSheet } from "react-native";
import SPACING from "../../../../Tools/ThemeConsts/SPACING";
import Color from "../../../../Tools/ThemeConsts/colors";
import BackButton from "../../../../Tools/Components/BackButton";
import ComplainButton from "./ComplainButton";
import NextButton from "../../../../Tools/Components/NextButton";
import Checkbox from "../../../../Tools/Components/Checkbox";
import { ThemeContext } from "../../../../ThemeContext";
import { Text } from "../../../../DefaultFont";
import { useUserContext } from "../../../../UserContext";

import languagekeys from "../../Login/localization/Languagekeys";
import LanguageUtils from "../../Login/localization/LanguageUtils";
import { useLanguage } from "../../../../LanguageContext";
const dontLike = [
  "חמוצים",
  "פטריות",
  "חריף",
  "גזר",
  "דג נא",
  "קוקוס",
  "זיתים",
  "חסה",
  "אנונה",
];

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Prefrences3 = ({ navigation }) => {
  const { mode, COLORS } = useContext(ThemeContext);
  const { selectedLanguage, languageRenderCount } = useLanguage();
  const { user, setUser ,setSignupActionType, setSigninActionType} = useUserContext();
  const [selectedItems, setSelectedItems] = useState([]);
  const [buttonState, setButtonState] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCheckboxChange = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleNextButtonPress = () => {
    const updatedUser = { ...user, like: buttonState ? ["everything"] : selectedItems };
    setUser(updatedUser);
    setSigninActionType();
    console.log(updatedUser);
  };

  const filteredItems = dontLike.filter(item =>
    item.includes(searchQuery)
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS[mode].background }]}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { backgroundColor: COLORS[mode].background },
        ]}
      >
        <View style={styles.content}>
          <View style={{ paddingTop: SPACING }}>
            <BackButton height={30} />
            <Text style={[styles.title, { color: COLORS[mode].text }]}>
              {LanguageUtils.getLangText(languagekeys.i_dont_like)}
            </Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { backgroundColor: COLORS[mode].primary }]}>
                {/* progress bar stuff */}
              </View>
            </View>
          </View>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={LanguageUtils.getLangText(languagekeys.search)}
            style={[styles.searchInput, { color: COLORS[mode].text, borderColor: COLORS[mode].gray }]}
            placeholderTextColor={COLORS[mode].text}
          />
          <ScrollView
            style={{
              maxHeight: 300,
              borderWidth: 2,
              borderColor: COLORS[mode].gray,
              borderRadius: 10,
            }}
          >
            <View style={{ display: "flex", flexDirection: "column", gap: 10, marginLeft: 20 }}>
              {filteredItems.map((pref) => (
                <Checkbox
                  key={pref}
                  buttonText={pref}
                  mode={mode}
                  checked={selectedItems.includes(pref)}
                  onChange={() => handleCheckboxChange(pref)}
                  botmargin={5}
                />
              ))}
            </View>
          </ScrollView>
        </View>
        <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Checkbox
            buttonText={LanguageUtils.getLangText(languagekeys.i_like_everything)}
            mode={mode}
            checked={buttonState}
            onChange={() => setButtonState(!buttonState)}
          />
         <ComplainButton
          buttonText={LanguageUtils.getLangText(languagekeys.did_we_forget_something)}
          navigation={navigation}
          screenName="Prefrences3"
          complainScreen="Oops"
          nextScreen="Home"


        />
          <NextButton
            buttonText={LanguageUtils.getLangText(languagekeys.next)}
            navigation={navigation}
            nextScreen="Home"
            customOnPress={handleNextButtonPress}
            mode={mode}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    paddingHorizontal: SPACING * 2,
    paddingVertical: SPACING * 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  content: {
    paddingHorizontal: SPACING * 2,
    paddingVertical: SPACING,
  },
  title: {
    marginBottom: SPACING,
    fontWeight: "800",
    fontSize: 40,
    textAlign: "right",
    right: 40,
  },
  progressBarContainer: {
    width: "100%",
    height: 19,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: Color.gray,
    borderRadius: 30,
    marginBottom: SPACING * 2,
  },
  progressBar: {
    width: "100%",
    height: 12,
    borderRadius: 30,
  },
  searchInput: {
    fontSize: 18,
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 15,
    marginTop: SPACING * 2,
    paddingRight: SPACING * 2,
    paddingLeft: SPACING * 2,
    textAlign: "right",
  },
});

export default Prefrences3;
