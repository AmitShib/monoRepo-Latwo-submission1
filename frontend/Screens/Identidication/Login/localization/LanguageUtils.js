import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nManager } from "react-native";

import en from "./en";
import he from "./he";

export default class LanguageUtils {
  static languages = {
    english: "english",
    hebrew: "hebrew",
  };

  static changeLanguageGlobal = "CHANGE_LANGUAGE_GLOBAL";

  static Locales = ["en", "he"];

  static currentAppLanguage;

  static async setAppLanguageFromDeviceLocale(needToGetLang) {
    let language = await AsyncStorage.getItem("@APP_LANGUAGE");

    if (!language) {
      // If the language is not set in local storage, set the default to english
      language = "english";
    }

    if (needToGetLang) {
      this.currentAppLanguage = language;
      return language;
    }

    this.setAppLanguage(language);
  }

  static async setAppLanguage(language) {
    this.currentAppLanguage = language;
    await AsyncStorage.setItem("@APP_LANGUAGE", language);
  }

  static async setAppLanguageFromDeviceStorage() {
    await this.setAppLanguageFromDeviceLocale(false);
  }

  static getLangText(key) {
    if (this.currentAppLanguage === this.languages.hebrew) {
      return he[key];
    }

    if (this.currentAppLanguage === this.languages.english) {
      return en[key];
    }

    return he[key]; // Default to Hebrew if language not set
  }
}
