import React, { useContext, useState } from "react";
import { SafeAreaView, TextInput, View, StyleSheet, Button, ScrollView } from "react-native";
import { ThemeContext } from "../../../../ThemeContext";
import SPACING from "../../../../Tools/ThemeConsts/SPACING";
import BackButton from "../../../../Tools/Components/BackButton";
import ComplainButton from "./ComplainButton";
import NextButton from "../../../../Tools/Components/NextButton";
import SwitchButtonSave from "../../../../Tools/Components/SwitchButtonSave";
import { useNavigation } from '@react-navigation/native';
import { Text } from "../../../../DefaultFont";
import { AddDoc } from './../../../../Tools/Mongo/AddDoc';
import { createDiner } from "../../../../Tools/Mongo/AddDiner";
import { useUserContext } from "../../../../UserContext";
import languagekeys from "../../Login/localization/Languagekeys";
import LanguageUtils from "../../Login/localization/LanguageUtils";

const allergies = [
  "בוטנים",
  "לקטוז",
  "סויה",
  "אגוזים",
  "גלוטן",
  "פול",
];

const Preferences = () => {
  const { mode, COLORS } = useContext(ThemeContext);
  const navigation = useNavigation();
  const { user, setUser } = useUserContext();

  const [searchQuery, setSearchQuery] = useState("");
  const filteredAllergies = allergies.filter(allergy =>
    allergy.includes(searchQuery)
  );

  const handleAllGood = () => {
    setSelectedAllergies(["nothing"]);
    const updatedUser = { ...user, allergies: selectedAllergies };
    setUser(updatedUser);
    console.log(updatedUser);
  };

  const [selectedAllergies, setSelectedAllergies] = useState([]);

  const handleAllergyToggle = (allergy, isSelected) => {
    if (isSelected) {
      // Add the allergy to the selected allergies array
      setSelectedAllergies(prevSelection => [...prevSelection, allergy]);
    } else {
      // Remove the allergy from the selected allergies array
      setSelectedAllergies(prevSelection =>
        prevSelection.filter(item => item !== allergy)
      );
    }
  };

  // const handleAddDocument = () => {
  //   const data = {
  //     dinerId: "1234",
  //     firstName: "amit",
  //     lastName: "shib",
  //     phoneNumber:"05987654"
  //   };
  //   createDiner(data);
  // };

  const handleAddDocument = () => {
    const data = {
      dinerId: "1234",
      firstName: "amit",
      lastName: "shib",
      phoneNumber: "05987654",
    };
  
    createDiner(data)
      .then((response) => {
        // Handle success here
        console.log("Diner created successfully:", response);
      })
      .catch((error) => {
        // Handle error here
        console.error("Error creating diner:", error.message);
      });
  };
  

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
              {LanguageUtils.getLangText(languagekeys.allergies)}
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
          <View style={styles.allergiesContainer}>
            {filteredAllergies.map(allergy => (
              <SwitchButtonSave
                key={allergy}
                buttonText={allergy}
                onToggle={handleAllergyToggle}
              />
            ))}
          </View>
        </View>

        {/* no allergies btn */}
        <View style={{ marginTop: 10 }}>
          <NextButton
            buttonText={LanguageUtils.getLangText(languagekeys.no_allergies)}
            customOnPress={handleAllGood}
            CustomRadius={15}
            navigation={navigation}
            nextScreen="lifestyle"
          />
        </View>

        <View>
          <Button
            title="Save Preferences"
            onPress={handleAddDocument}
            style={{ marginBottom: 30 }}
          />
          <View style={{ marginTop: 20 }}>
            <NextButton
              buttonText={LanguageUtils.getLangText(languagekeys.next)}
              navigation={navigation}
              nextScreen="lifestyle" //Prefrences2 -> actual name
              customOnPress={() => {
                const updatedUser = { ...user, allergies: selectedAllergies };
                setUser(updatedUser);
                console.log(updatedUser);
              }}
            />
          </View>
        </View>
        <ComplainButton
          buttonText={LanguageUtils.getLangText(languagekeys.did_we_forget_something)}
          navigation={navigation}
          complainScreen="Oops"
          style={{
            marginBottom: 20,
            marginTop: -20,
          }}
        />
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
    borderRadius: 30,
    marginBottom: SPACING * 2,
    backgroundColor: "gray", // Adjust the color here
  },
  progressBar: {
    width: "33%",
    flex: 1,
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
  allergiesContainer: {
    paddingTop: SPACING * 2,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
});

export default Preferences;