import React from "react";
import {
    SafeAreaView,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    FlatList
} from "react-native";
import COLORS from '../../../Tools/ThemeConsts/colors'
import FONTS from '../../../Tools/ThemeConsts/colors'
import SIZES from '../../../Tools/ThemeConsts/theme'
import images from "../../../Tools/ThemeConsts/images"
import NextButton from "../../../Tools/Components/NextButton";
import SPACING from "../../../Tools/ThemeConsts/SPACING";
import { Text } from "../../../DefaultFont";

  
  const updateSearch = (search) => {
    setSearch(search);
  };
const Product = ({ navigation }) => {

    // Dummy Datas

    

    const categoryData = [
        {
            id: 1,
            name: "ארוחות בוקר",
        },
        {
            id: 2,
            name: "כריכים",
        },
        {
            id: 3,
            name: "פסטות",
        },
        {
            id: 4,
            name: "פסטות",
        },
        {
            id: 5,
            name: "שקשוקה",
        },
        {
            id: 6,
            name: "שתיה קלה",
        },
        {
            id: 7,
            name: "שתיה חמה",
        },
    ]

    // price rating
    const affordable = 1
    const fairPrice = 2
    const expensive = 3

    const restaurantData = [
        {
            id: 1,
            name: "גרג ארוחת בוקר",
            rating: 4.8,
            categories: [5, 7],
            priceRating: affordable,
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
        {
            id: 2,
            name: "גרג ארוחת בוקר",
            rating: 4.8,
            categories: [2, 4, 6],
            priceRating: expensive,
            photo: images.pizza_restaurant,
            duration: "15 - 20 min",
            description: "ביצים לבחירה (אומלט מוגש על עלה סיגר), ממרח עגבניות מיובשות ופסטו, קוביות פטה וזעתר, אבוקדו עם לימון כבוש, סלט טונה, גבינת שמנת, זיתים מתובלים, סלט אישי, לחם הבית, קונפיטורה, עוגייה ביתית, קפה ותפוזים / לימונדה / אשכוליות אדומות / גזר / תפוחים (תוספת 6/9 שח)",
            location: {
                latitude: 1.556306570595712,
                longitude: 110.35504616746915,
            },
            courier: {
                avatar: images.avatar_2,
                name: "Jackson"
            },
            menu: [
                {
                    menuId: 4,
                    name: "Hawaiian Pizza",
                    photo: images.hawaiian_pizza,
                    description: "Canadian bacon, homemade pizza crust, pizza sauce",
                    calories: 250,
                    price: 15
                },
                {
                    menuId: 5,
                    name: "Tomato & Basil Pizza",
                    photo: images.pizza,
                    description: "Fresh tomatoes, aromatic basil pesto and melted bocconcini",
                    calories: 250,
                    price: 20
                },
                {
                    menuId: 6,
                    name: "Tomato Pasta",
                    photo: images.tomato_pasta,
                    description: "Pasta with fresh tomatoes",
                    calories: 100,
                    price: 10
                },
                {
                    menuId: 7,
                    name: "Mediterranean Chopped Salad ",
                    photo: images.salad,
                    description: "Finely chopped lettuce, tomatoes, cucumbers",
                    calories: 100,
                    price: 10
                }
            ]
        },
        {
            id: 3,
            name: "גרג ארוחת בוקר",
            rating: 4.8,
            categories: [3],
            priceRating: expensive,
            photo: images.hot_dog_restaurant,
            duration: "20 - 25 min",
            description: "ביצים לבחירה (אומלט מוגש על עלה סיגר), ממרח עגבניות מיובשות ופסטו, קוביות פטה וזעתר, אבוקדו עם לימון כבוש, סלט טונה, גבינת שמנת, זיתים מתובלים, סלט אישי, לחם הבית, קונפיטורה, עוגייה ביתית, קפה ותפוזים / לימונדה / אשכוליות אדומות / גזר / תפוחים (תוספת 6/9 שח)",
            location: {
                latitude: 1.5238753474714375,
                longitude: 110.34261833833622,
            },
            courier: {
                avatar: images.avatar_3,
                name: "James"
            },
            menu: [
                {
                    menuId: 8,
                    name: "Chicago Style Hot Dog",
                    photo: images.chicago_hot_dog,
                    description: "Fresh tomatoes, all beef hot dogs",
                    calories: 100,
                    price: 20
                }
            ]
        },
        {
            id: 4,
            name: "גרג ארוחת בוקר",
            rating: 4.8,
            categories: [8],
            priceRating: expensive,
            photo: images.japanese_restaurant,
            duration: "10 - 15 min",
            description: "ביצים לבחירה (אומלט מוגש על עלה סיגר), ממרח עגבניות מיובשות ופסטו, קוביות פטה וזעתר, אבוקדו עם לימון כבוש, סלט טונה, גבינת שמנת, זיתים מתובלים, סלט אישי, לחם הבית, קונפיטורה, עוגייה ביתית, קפה ותפוזים / לימונדה / אשכוליות אדומות / גזר / תפוחים (תוספת 6/9 שח)",
            location: {
                latitude: 1.5578068150528928,
                longitude: 110.35482523764315,
            },
            courier: {
                avatar: images.avatar_4,
                name: "Lola"
            },
            menu: [
                {
                    menuId: 9,
                    name: "Sushi sets",
                    photo: images.sushi,
                    description: "Fresh salmon, sushi rice, fresh juicy avocado",
                    calories: 100,
                    price: 50
                }
            ]
        },
        {
            id: 5,
            name: "גרג ארוחת בוקר",
            rating: 4.8,
            categories: [1, 2],
            priceRating: affordable,
            photo: images.noodle_shop,
            duration: "15 - 20 min",
            description: "ביצים לבחירה (אומלט מוגש על עלה סיגר), ממרח עגבניות מיובשות ופסטו, קוביות פטה וזעתר, אבוקדו עם לימון כבוש, סלט טונה, גבינת שמנת, זיתים מתובלים, סלט אישי, לחם הבית, קונפיטורה, עוגייה ביתית, קפה ותפוזים / לימונדה / אשכוליות אדומות / גזר / תפוחים (תוספת 6/9 שח)",
            location: {
                latitude: 1.558050496260768,
                longitude: 110.34743759630511,
            },
            courier: {
                avatar: images.avatar_4,
                name: "Muthu"
            },
            menu: [
                {
                    menuId: 10,
                    name: "Kolo Mee",
                    photo: images.kolo_mee,
                    description: "Noodles with char siu",
                    calories: 200,
                    price: 5
                },
                {
                    menuId: 11,
                    name: "Sarawak Laksa",
                    photo: images.sarawak_laksa,
                    description: "Vermicelli noodles, cooked prawns",
                    calories: 300,
                    price: 8
                },
                {
                    menuId: 12,
                    name: "Nasi Lemak",
                    photo: images.nasi_lemak,
                    description: "A traditional Malay rice dish",
                    calories: 300,
                    price: 8
                },
                {
                    menuId: 13,
                    name: "Nasi Briyani with Mutton",
                    photo: images.nasi_briyani_mutton,
                    description: "A traditional Indian rice dish with mutton",
                    calories: 300,
                    price: 8
                },

            ]
        },
        {

            id: 6,
            name: "ארוחת בוקר גרג",
            rating: 4.9,
            categories: [9, 10],
            priceRating: affordable,
            photo: images.kek_lapis_shop,
            duration: "35 - 40 min",
            description: "ביצים לבחירה (אומלט מוגש על עלה סיגר), ממרח עגבניות מיובשות ופסטו, קוביות פטה וזעתר, אבוקדו עם לימון כבוש, סלט טונה, גבינת שמנת, זיתים מתובלים, סלט אישי, לחם הבית, קונפיטורה, עוגייה ביתית, קפה ותפוזים / לימונדה / אשכוליות אדומות / גזר / תפוחים (תוספת 6/9 שח)",
            location: {
                latitude: 1.5573478487252896,
                longitude: 110.35568783282145,
            },
            courier: {
                avatar: images.avatar_1,
                name: "Jessie"
            },
            menu: [
                {
                    menuId: 12,
                    name: "Teh C Peng",
                    photo: images.teh_c_peng,
                    description: "Three Layer Teh C Peng",
                    calories: 100,
                    price: 2
                },
                {
                    menuId: 13,
                    name: "ABC Ice Kacang",
                    photo: images.ice_kacang,
                    description: "Shaved Ice with red beans",
                    calories: 100,
                    price: 3
                },
                {
                    menuId: 14,
                    name: "Kek Lapis",
                    photo: images.kek_lapis,
                    description: "Layer cakes",
                    calories: 300,
                    price: 20
                }
            ]

        }


    ]

    const [categories, setCategories] = React.useState(categoryData)
    const [selectedCategory, setSelectedCategory] = React.useState(null)
    const [restaurants, setRestaurants] = React.useState(restaurantData)
    


    function onSelectCategory(category) {
        //filter restaurant
        let restaurantList = restaurantData.filter(a => a.categories.includes(category.id))

        setRestaurants(restaurantList)

        setSelectedCategory(category)
    }

    function getCategoryNameById(id) {
        let category = categories.filter(a => a.id == id)

        if (category.length > 0)
            return category[0].name

        return ""
    }

  
    function renderMainCategories() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        
                        backgroundColor: (selectedCategory?.id == item.id) ? COLORS.yellowmenu : COLORS.yellowmenu,
                        borderRadius: 20,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: SIZES.padding,
                       
                    }}
                    onPress={() => onSelectCategory(item)}
                >
                    <View
                        style={{
                            marginTop:5,
                            width: 78,
                            height: 2,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: (selectedCategory?.id == item.id) ? COLORS.yellowmenu : COLORS.yellowmenu
                        }}
                    >
                        
                    </View>

                    <Text
                        style={{
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign:"center",
                          paddingBottom:10,
                            fontWeight:600,
                            color: (selectedCategory?.id == item.id) ? COLORS.black : COLORS.black,
                            ...FONTS.body5
                        }}
                    >
                        {item.name}
                        {item.description}
                    </Text>
                </TouchableOpacity>
            )
        }

        return (
            <View style={{  }}>
                <Image
                        source={require("../../../Tools/Src/Images/greg.png")}
                        resizeMode="cover"
                        style={{
                            width: "100%",
                            height: 200,
                        }}
                    />
                
              <Text style={{ ...FONTS.h1, fontWeight:900, color:COLORS.primary,paddingVertical:10, paddingHorizontal:10, }}>קפה גרג ירושלים</Text>

                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
                />
            </View>
        )
    }
    {/* Item itself */}
    function renderRestaurantList() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{ marginBottom: SIZES.padding * 2 }}
                onPress={() => navigation.navigate("Restaurant", {
                    item,
                    
                })}
            >
                {/* Image */}
                <View
                    style={{
                        marginBottom: SIZES.padding ,
                        position: 'absolute',

                        
                    }}
                >
                    <Image
                        source={item.photo}
                        resizeMode="contain"
                        style={{
                            width: 103,
                            height: 89,
                            top:20,
                            borderRadius: SIZES.radiusimg
                        }}
                    />
                {/* Fav */}
                    <View
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            height: 90,
                            //width: SIZES.width ,
                            alignItems: 'center',
                            justifyContent: 'center',
                            ...styles.shadow
                        }}
                    >
                     <Image
                        source={icons.like}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.primary,
                            marginRight: 10
                        }}
                    />
                        <Text style={{ ...FONTS.h4 }}>{item.like}</Text>
                    </View>
                </View>

                {/* Restaurant Info */}
                <Text style={{ ...FONTS.body2, fontWeight:800, color:COLORS.black }}>{item.name}</Text>
                {/* Description Info */}
                <Text style={{ ...FONTS.body5, color:COLORS.black,width:"65%",left :130}}>{item.description}</Text>                

                <View
                    style={{
                        marginTop: SIZES.padding,
                        flexDirection: 'row',
                        alignItems: 'center',
                        left: 125
                    }}
                >
                    {/* Rating */}
                    <Image
                        source={icons.star}
                        style={{
                            height: 20,
                            width: 20,
                            tintColor: COLORS.primary,
                            marginRight: 10
                        }}
                    />
                    <Text style={{ ...FONTS.body3 }}>{item.rating}</Text>

                    {/* Categories */}
                    <View
                        style={{
                            flexDirection: 'row',
                            marginLeft: 10,
                            
                        }}
                    >
                        {
                            item.categories.map((categoryId) => {
                                return (
                                    <View
                                        style={{ flexDirection: 'row' }}
                                        key={categoryId}
                                    >
                                        <Text style={{ ...FONTS.body3 }}>{getCategoryNameById(categoryId)}</Text>
                                        <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}> . </Text>
                                    </View>
                                )
                            })
                        }

                        {/* Price */}
                        {
                            [1, 2, 3].map((priceRating) => (
                                <Text
                                    key={priceRating}
                                    style={{
                                        ...FONTS.body3,
                                        color: (priceRating <= item.priceRating) ? COLORS.black : COLORS.darkgray
                                    }}
                                >$</Text>
                            ))
                        }
                    </View>
                </View>
                
            </TouchableOpacity>
        )

        return (
            <FlatList
                data={restaurants}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding * 2,
                    paddingBottom: 30
                }}
            />
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderMainCategories()}
            {renderRestaurantList()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    }
})

export default Product