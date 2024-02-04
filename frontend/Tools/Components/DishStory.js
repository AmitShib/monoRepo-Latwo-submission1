import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, Image, PanResponder } from 'react-native';
import NextButton from './NextButton';
import languagekeys from '../../Screens/Identidication/Login/localization/Languagekeys';
import LanguageUtils from '../../Screens/Identidication/Login/localization/LanguageUtils';
import ThemeContext from '../../ThemeContext';

const DishStory = ({ visible, onClose, dishes, navigateToDishPage, selectedDishIndex, setSelectedDishIndex }) => {
  const { mode, COLORS } = useContext(ThemeContext);

  const currentDish = dishes[selectedDishIndex];
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dx > 50) {
        setSelectedDishIndex((prevIndex) => (prevIndex - 1 + dishes.length) % dishes.length);
      } else if (gestureState.dx < -50) {
        setSelectedDishIndex((prevIndex) => (prevIndex + 1) % dishes.length);
      }
    },
  });

  if (!visible) {
    return null;
  }

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:  COLORS[mode].background, }}>
        <View style={{ width: '100%', backgroundColor: COLORS[mode].background }} {...panResponder.panHandlers}>
          <Image source={currentDish.photo} style={{ width: '100%', height: '58%', }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
            {dishes.map((_, index) => (
              <View
                key={index}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: index === selectedDishIndex ? COLORS[mode].primary : COLORS[mode].text,
                  marginHorizontal: 4,
                }}
              />
            ))}
          </View>
          <View style={{ padding: 20 }}>
            <Text style={{ color: COLORS[mode].text, fontSize: 18, fontWeight: 'bold' }}>{currentDish.name}</Text>
            <Text style={{ color: COLORS[mode].text, paddingBottom: 10 }}>{currentDish.description}</Text>
            <Text style={{ color: COLORS[mode].text, fontWeight: 'bold', paddingBottom: 10 }}>{LanguageUtils.getLangText(languagekeys.Duration)}: {currentDish.duration}</Text>
            <Text style={{ color: COLORS[mode].text, fontWeight: 'bold', paddingBottom: 10 }}>{LanguageUtils.getLangText(languagekeys.Price)}: {currentDish.price} ₪</Text>
            <NextButton buttonText={LanguageUtils.getLangText(languagekeys.Order_this_dish)} customOnPress={() => {
              navigateToDishPage(currentDish);
              onClose();
            }} />
            <TouchableOpacity onPress={onClose} style={{ top: -10 }}>
              <Text style={{ color: COLORS[mode].text, textAlign: 'center' }}>{LanguageUtils.getLangText(languagekeys.close)}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DishStory;
