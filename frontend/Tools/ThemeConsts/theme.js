import {Dimensions} from "react-native";
const {width,height}  = Dimensions.get("window");

export const COLORS = {
    primary : "#EFB60E",
    secondary: "#FCDA2B",
    tabcho: "#fff",
    

    //general-colors 
    black: "#1E1F20",
    white: "#ffffff",
    light: 'rgb(240,240,240)',
    lightGray: "#F5F5F6",
    lightGray2: "#F6F6F7",
    lightGray3: "#EFEFF1",
    lightGray4: "#F8F8F9",
    transparent: "transparent",
    darkgray: '#898C95',
    gray: 'rgb(120,120,120)',
    dark:'rgb(70,70,70)',
    yellowmenu: "#FFD500",
    yellowlight:"#EFB60E1C",
    yellow:"#FCDA2B",
    ordergray:"#D9D9D9",

    // focued 
    focused: { 
    color: "#fffff",
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
        width: 0,
        height: 4
    },
    shadowRadius: 4,
    shadowOpacity: 1
    }

};
const SPACING = 10;

export const SIZES = {
    // Global-sizes
    base: 8,
    font: 14,
    radius: 30,
    radiusimg:12,
    padding: 10,
    padding2: 12,

    //Font-Sizes
    largeTitle:50,
    h1:30,
    h2:22,
    h3:20,
    h4:18,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,

    // App-dimensions
    width,
    height

};


export const FONTS = {
    largeTitle : {fontfamily : "Roboto-Regular", fontSize:SIZES.largeTitle, linarHeight:46},
    h1: {fontfamily: "Roboto-Black", fontSize: SIZES.h1, linarHeight:36},
    h2: {fontfamily: "Roboto-Bold", fontSize: SIZES.h2, linarHeight:30},
    h3: {fontfamily: "Roboto-Bold", fontSize: SIZES.h3, linarHeight:22},
    h4: {fontfamily: "Roboto-Bold", fontSize: SIZES.h4, linarHeight:22},
    body1: {fontfamily: "Roboto-Regular", fontSize:SIZES.body1, linarHeight:36},
    body2: {fontfamily: "Roboto-Regular", fontSize:SIZES.body2, linarHeight:30},
    body3: {fontfamily: "Roboto-Regular", fontSize:SIZES.body3, linarHeight:22},
    body4: {fontfamily: "Roboto-Regular", fontSize:SIZES.body4, linarHeight:22},
    body5: {fontfamily: "Roboto-Regular", fontSize:SIZES.body5, linarHeight:22},
};

const appTheme = {SPACING,COLORS,SIZES,FONTS};

export default appTheme;
