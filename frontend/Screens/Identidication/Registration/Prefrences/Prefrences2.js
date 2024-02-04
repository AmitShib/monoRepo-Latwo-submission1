import React, { useContext, useState } from "react";
import { SafeAreaView, TextInput, Dimensions, View, StyleSheet,ScrollView } from "react-native";
import SPACING from "../../../../Tools/ThemeConsts/SPACING";
import Color from "../../../../Tools/ThemeConsts/colors";
import BackButton from "../../../../Tools/Components/BackButton";
import ComplainButton from "./ComplainButton";
import NextButton from "../../../../Tools/Components/NextButton";
import SwitchButton from "../../../../Tools/Components/SwitchButton";
import SwitchButtonSave from "../../../../Tools/Components/SwitchButtonSave";
import { ThemeContext } from "../../../../ThemeContext";
import { Text } from "../../../../DefaultFont";
import { useUserContext } from "../../../../UserContext";

import languagekeys from "../../Login/localization/Languagekeys";
import LanguageUtils from "../../Login/localization/LanguageUtils";
import { useLanguage } from "../../../../LanguageContext";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const lifestyles = [
  "צמחוני",
  "טבעוני",
  "ללא חלב",
  "פלאו",
  "פירותני",
  "בהריון",
];

const Prefrences2 = ({ navigation }) => {
  const { mode, COLORS } = useContext(ThemeContext);
  const { selectedLanguage, languageRenderCount } = useLanguage();
  const { user, setUser } = useUserContext();
  const [searchQuery, setSearchQuery] = useState("");
  const filteredLifestyles = lifestyles.filter(lifestyle =>
    lifestyle.includes(searchQuery)
  );

  const handleNoAllergies= ()=>
  {
    const updatedUser = {...user,lifestyles:["All good"]};
    setUser(updatedUser);        
    console.log(updatedUser);
  };


  const handleComplainButtonPress = () => {
    navigation.navigate("Oops");
  };

  {/* //change starts */}

  const [selectedLifestyles, setSelectedLifestyles] = useState([]);

  const handleLifestyleToggle = (allergy, isSelected) => {
    if (isSelected) {
      // Add the allergy to the selected allergies array
      setSelectedLifestyles((prevSelection) => [...prevSelection, allergy]);
    } else {
      // Remove the allergy from the selected allergies array
      setSelectedLifestyles((prevSelection) =>
        prevSelection.filter((item) => item !== allergy)
      );
    }
  };

  console.log(selectedLifestyles); // Log the selected allergies array to the console

         {/* change end */}


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
                    {LanguageUtils.getLangText(languagekeys.life_style)}
                  </Text>
                  <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBar, { backgroundColor: COLORS[mode].primary }]}></View>
                  </View>
                  <TextInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder={LanguageUtils.getLangText(languagekeys.search)}
                    style={[
                      styles.searchInput,
                      {
                        color: COLORS[mode].text,
                        borderColor: COLORS[mode].border,
                        backgroundColor: COLORS[mode].background,
                      },
                    ]}
                    placeholderTextColor={COLORS[mode].text}
                  />
                </View>
                <View style={styles.lifestyleContainer}>
                  {filteredLifestyles.map(lifestyle => (
                    <SwitchButtonSave
                      key={lifestyle}
                      buttonText={lifestyle}
                      onToggle={handleLifestyleToggle}
                    />
                  ))}
                </View>
              </View>


              {/* all goes with lifestyles */}
      <View
        style={{marginTop:10,}}      
      >
        <NextButton 
          buttonText={LanguageUtils.getLangText(languagekeys.anything_goes)}            
          CustomRadius={15}
          customOnPress={handleNoAllergies}
          navigation={navigation} 
          nextScreen="Prefrences3"                 
        />
      </View>



      <View>
      <ComplainButton
          buttonText={LanguageUtils.getLangText(languagekeys.did_we_forget_something)}
          navigation={navigation}
          screenName="Lifestyle"
          complainScreen="Oops"
          nextScreen="Prefrences3"
        />
        <NextButton
          buttonText={LanguageUtils.getLangText(languagekeys.next)}
          navigation={navigation}
          nextScreen="Prefrences3"
          customOnPress={() => {
            const updatedUser = {...user,lifestyles:selectedLifestyles};
            setUser(updatedUser);        
            console.log(updatedUser);
          }
          }
        />
      </View>
      
      </ScrollView>
    </SafeAreaView>
    
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: SPACING * 2,
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "gray", // You can adjust the color here
    borderRadius: 30,
    marginBottom: SPACING * 2,
  },
  progressBar: {
    width: "66%",
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
  lifestyleContainer: {
    paddingTop: SPACING * 2,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});
export default Prefrences2;
