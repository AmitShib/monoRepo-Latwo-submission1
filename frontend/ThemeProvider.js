import React, { useState, useMemo } from "react";
import { ThemeContext } from "./ThemeContext";

const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("dark"); // Replace with your desired initial mode
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () => ({
      mode,
      toggleMode,
      COLORS: {
        dark: {
          background: "#202020",
          text: "#fff",
          primary: "#EFB60E",
          lightPrimary :'#EEDEB8',
          gray: "#D9D9D9",
          lightGray: "#F5F5F6",
          lightGray2: "#F6F6F7",
          lightGray3: "#EFEFF1",
          lightGray4: "#F8F8F9",
          lightGray5: "#818181",
          lightGray6: "#8F8F8F",
          transparent: "transparent",
          darkgray: "#898C95",
          yellowmenu: "#FFD500",
          yellowlight: "#FFFFE0",
          ordergray: "#D9D9D9",
          border : "#EFB60E",
          link: "#EFB60E",
          progressBar: "#EFB60E",
          menubackground:"#2E2E2E",
          tabsbackground:"#1A1A1A",
          white:"#fff",
          primaryicon:"#EFB60E",
          togglemenuicon:"#202020",
          headermenu:"#fff",
          heart : "#C10404",
          pay: "#41A131",
          newhomepagebackground:"#121212",
          dishcardcon:"#1b1d1f",
          maincardDescription:"#aaa",
        },
        light: {
          dishcardcon:"#fff",
          maincardDescription:"black",
          pay: "#41A131",
          heart : "#C10404",
          headermenu:"#EFB60E",
          togglemenuicon:"#EFB60E",
          primaryicon:"#fff",
          white:"#fff",
          background: "#fff",
          text: "#000",
          primary: "#EFB60E",
          lightPrimary :'#EEDEB8',
          gray: "#D9D9D9",
          lightGray: "#F5F5F6",
          lightGray2: "#F6F6F7",
          lightGray3: "#EFEFF1",
          lightGray4: "#F8F8F9",
          lightGray5: "#818181",
          lightGray6:"#8F8F8F",
          transparent: "transparent",
          darkgray: "#898C95",
          yellowmenu: "#FFD500",
          yellowlight: "#FFFFE0",
          ordergray: "#D9D9D9",
          border : "#EFB60E",
          link: "#EFB60E",
          progressBar: "#EFB60E",
          menubackground:"#F8F8F9",
          tabsbackground:"#EFB60E",
          newhomepagebackground:"#fff",


        },
      },
    }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;