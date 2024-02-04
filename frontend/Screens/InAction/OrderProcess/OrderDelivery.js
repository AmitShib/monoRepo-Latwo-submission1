import React from "react";
import {
    SafeAreaView,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList,
    Alert,
    StatusBar,
    Button,
    ScrollView
} from "react-native";
import {useState} from 'react';
import COLORS from '../../../Tools/ThemeConsts/colors'
import FONTS from '../../../Tools/ThemeConsts/Font'
import SIZES from '../../../Tools/ThemeConsts/theme'
import images from "../../../Tools/ThemeConsts/images"
import NextButton from "../../../Tools/Components/NextButton";
import SPACING from "../../../Tools/ThemeConsts/SPACING";
//import {SwipeButton} from 'rn-swipe-button'
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Text } from "../../../DefaultFont";


const OrderDelivery = () => {
   
    const restaurantData = [
        {
            id: 1,
            name: "גרג ארוחת בוקר",
            rating: 4.8,
            categories: [5, 7],
            priceRating: 1,
            photo: images.burger_restaurant_1,
            duration: "30 - 45 min",
            description: "ביצים לבחירה (אומלט מוגש על עלה סיגר), ממרח עגבניות מיובשות ופסטו, קוביות פטה וזעתר, אבוקדו עם לימון כבוש, סלט טונה, גבינת שמנת, זיתים מתובלים, סלט אישי, לחם הבית, קונפיטורה, עוגייה ביתית, קפה ותפוזים / לימונדה / אשכוליות אדומות / גזר / תפוחים (תוספת 6/9 שח)",
            courier: {
                avatar: images.avatar_1,
                name: "Amy"
            },
            menu: [
                {
                    menuId: 1,
                    name: "Crispy Chicken Burger",
                    photo: images.crispy_chicken_burger,
                    description: "Burger with crispy chicken, cheese and lettuce",
                    calories: 200,
                    price: 10
                },
                {
                    menuId: 2,
                    name: "Crispy Chicken Burger with Honey Mustard",
                    photo: images.honey_mustard_chicken_burger,
                    description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                    calories: 250,
                    price: 15
                },
                {
                    menuId: 3,
                    name: "Crispy Baked French Fries",
                    photo: images.baked_fries,
                    description: "Crispy Baked French Fries",
                    calories: 194,
                    price: 8
                }
            ]
        },
    ];
    return (
    <ScrollView>
        <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 35,
                        paddingTop: SIZES.padding,
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.goBack()}
                >
                    
                    <Image
                        source={icons.arrowright}
                        resizeMode="contain"
                        
                        style={{
                            width: 30,
                            height: 30,
                            top:10,
                        }}
                    />
                </TouchableOpacity>
        </View>

        <View style={{  }}>

      <Text style={{ ...FONTS.h1, fontWeight:900, color:COLORS.primary,paddingVertical:10, paddingHorizontal:10, }}> ההזמנה שלי </Text>

        </View>
        {/*Item Continer*/ }
        {/*Counter [Add/Remove]*/ }
        {/*Item Details*/ }


        {/*Banner Below*/ }
        <View style ={{
            backgroundColor:COLORS.yellowlight,
            padding:10,
            borderRadius:20,
            width:"80%",
            alignSelf: 'center',
        }}>
             <Image
                        source={icons.msgboxorder}
                        resizeMode="contain"
                        
                        style={{
                            width: 30,
                            height: 30,
                            top:10,
                            left:292,
                            position:'absolute',
                           
                        }}
                    />
           <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={{
                        //paddingLeft: SIZES.padding * 5,
                        //paddingTop: SIZES.padding,
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.goBack()}
                >
                    
                    <Image
                        source={icons.leftarrowyellow}
                        resizeMode="contain"
                        
                        style={{
                            width:8,
                            height: 25,
                            top:8,
                            left:-20,
                            position:'absolute',
                            paddingRight:SIZES.padding * 5,


                        }}
                    />
                
        <Text 
        style={{ ...FONTS.h5, 
                fontWeight:900,
                color:COLORS.black,
                paddingHorizontal:10,
                left:20
                  }}
        > תרצה לעדכן אותנו במשהו?  </Text>
             <Text 
        style={{ ...FONTS.body5, 
                fontWeight:400,
                color:COLORS.black,
                paddingHorizontal:10,
                left:20
                  }}
        > עוד צלחת, אקסטרה חצילים, אין מלחיה בשולחן? </Text>
        </TouchableOpacity> 
            </View>
        </View>

           {/*Botton Below*/ }
           <View>
           <TouchableOpacity
            style={{
              padding: SIZES.base * 2,
              backgroundColor: "#FFD500",
              borderRadius: SIZES.base * 4,
              alignItems: "center",
              marginTop: SIZES.base * 5,
              shadowColor: "rgb(0,0,0)",
              shadowOffset:{width:0,height:4,},
              shadowOpacity:0.25,
              shadowRadius:4,
              opacity:1,
              width:312,
              left:"13%",
              


            }}
          >
             <Image
                        source={icons.arrowleft}
                        resizeMode="contain"
                        
                        style={{
                            width:30,
                            height: 35,
                            top:8,
                            left:20,
                            position:'absolute',
                            paddingRight:SIZES.padding * 5,


                        }}
                    />
            
            <Text
              style={{
                color: COLORS.black,
                fontSize: SIZES.base * 2,
                fontWeight: "900",
              }}
            >
              לחץ כאן כדי להזמין
            </Text>
          </TouchableOpacity>

          
           </View>
       
      </ScrollView>

    )
}
export default OrderDelivery;