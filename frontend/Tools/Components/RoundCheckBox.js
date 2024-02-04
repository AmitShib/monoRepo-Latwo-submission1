import React, { useContext, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import ThemeContext from '../../ThemeContext';

const RoundCheckBox = ({ isChecked, handleCheckBoxClick }) => {
  const { mode, COLORS } = useContext(ThemeContext);

  return (
    <TouchableOpacity onPress={handleCheckBoxClick}>
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: isChecked ? COLORS[mode].primary : '#A9A9A9',
          backgroundColor: isChecked ? COLORS[mode].primary : 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isChecked && (
          <FontAwesomeIcon icon={faCheck} color="#FFFFFF" size={16} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default RoundCheckBox;
