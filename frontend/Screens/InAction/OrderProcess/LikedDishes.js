import { SafeAreaView, Dimensions, ScrollView, View, Image,StyleSheet } from "react-native";
import React, { useContext } from 'react';
import YellowHeading from "../../../Tools/Components/YellowHeading";
import { ThemeContext } from "../../../ThemeContext";
import SPACING from "../../../Tools/ThemeConsts/SPACING";
import { Text } from "../../../DefaultFont";
import LikedDishesContext from "../../../LikedDishesContext";
import BackButton from "../../../Tools/Components/BackButton";
import { images } from "../../../Tools/ThemeConsts";


import languagekeys from '../../Identidication/Login/localization/Languagekeys';
import LanguageUtils from '../../Identidication/Login/localization/LanguageUtils'; 
import { useLanguage } from "../../../LanguageContext";


const LikedDishes = ({ route, navigation }) => {
    const { mode, COLORS } = useContext(ThemeContext);
    const width = Dimensions.get("screen").width;
    const height = Dimensions.get("screen").height;
    const { likedDishes } = useContext(LikedDishesContext);
    const { selectedLanguage, languageRenderCount } = useLanguage();


    return (
        
        <View style={{ position: "absolute", height: "100%", width: "100%", backgroundColor: COLORS[mode].background }}>
            
            <BackButton height={40} navigation={navigation}/>    
            <ScrollView>
                <SafeAreaView style={{ marginTop: 80, marginRight: 30, marginLeft: 30 }}>

                    {likedDishes.length > 0 &&
                     (<YellowHeading text={LanguageUtils.getLangText(languagekeys.dishes_that_i_liked)} />)}
                    {likedDishes.length > 0 ? (
                        likedDishes.map((dish) => (
                            <View key={dish.id} style={{ marginBottom: SPACING, flexDirection: "row", alignItems: "center" }}>
                                {dish.photo && (
                                    <Image
                                        source={dish.photo}
                                        style={{ width: 103, height: 89, marginRight: 10, borderRadius: 12 }}
                                    />
                                )}
                                <View style={{ flex: 1 }}>
                                    <Text style={{ fontWeight: "bold" }}>{dish.name}</Text>
                                    <Text numberOfLines={3}>{dish.description}</Text>
                                </View>
                            </View>
                        ))
                            ) : (
                        <View style={styles.centerContainer}>
                            <Image
                                source={images.brokenHeart}
                                resizeMode="contain"   
                                style={styles.image}                     
                            />
                            <Text  style={styles.text}>
                                {LanguageUtils.getLangText(languagekeys.no_liked_dishes)}
                            </Text>
                        </View>
                    )}
                    
                </SafeAreaView>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 30, // Set an appropriate width
      height: 30, // Set an appropriate height
    },
    text: {
      marginTop: 10, // Add some spacing between the image and text
      fontSize: 16,
      textAlign: 'center',
    },
  });

export default LikedDishes;
