import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('hebrew'); // Default is Hebrew
  const [toggleRender, setToggleRender] = useState(0); // State for triggering re-render
  const [languageRenderCount, setLanguageRenderCount] = useState(0); 

  useEffect(() => {
    const loadSelectedLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('selectedLanguage');
        if (storedLanguage) {
          setSelectedLanguage(storedLanguage);
        }
      } catch (error) {
        console.error('Error loading selected language:', error);
      }
    };

    loadSelectedLanguage();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('selectedLanguage', selectedLanguage);
    setLanguageRenderCount(prevCount => prevCount + 1); // Increment the counter
  }, [selectedLanguage]);

  const value = {
    selectedLanguage,
    setSelectedLanguage,
    toggleRender,
    languageRenderCount, 
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};


export const useLanguage = () => {
  return useContext(LanguageContext);
};
