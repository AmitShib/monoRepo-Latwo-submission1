import React, { useContext, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Colors from '../ThemeConsts/colors';
import { Text } from '../../DefaultFont';
import ThemeContext from '../../ThemeContext';
import languagekeys from '../../Screens/Identidication/Login/localization/Languagekeys';
import LanguageUtils from '../../Screens/Identidication/Login/localization/LanguageUtils';

const FeedbackModal = () => {
    const { mode, COLORS } = useContext(ThemeContext);
    const [starRating, setStarRating] = useState(0);
    const [feedbackText, setFeedbackText] = useState('');
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

    const renderStars = () => {
      let stars = [];
      for (let i = 1; i <= 5; i++) {
        stars.push(
          <TouchableOpacity key={i} onPress={() => setStarRating(i)}>
            <Text style={i <= starRating ? styles.selectedStar : styles.star}>★</Text>
          </TouchableOpacity>
        );
      }
      return <View style={styles.starsContainer}>{stars}</View>;
    };
  
    return (
      <View style={styles.modalContainer}>
        <View style={styles.modal}>
          <Text style={styles.modalText}>{LanguageUtils.getLangText(languagekeys.Payment_was_done_suc)}</Text>
          {renderStars()}
          <TextInput 
            style={styles.feedbackInput}
            placeholder={LanguageUtils.getLangText(languagekeys.leave_a_comment)}
            onChangeText={text => setFeedbackText(text)}
            value={feedbackText}
          />
          <TouchableOpacity style={styles.nevermindButton} onPress={() => setIsSuccessModalVisible(false)}>
            <Text>{LanguageUtils.getLangText(languagekeys.nevermind)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    // ... other styles you have
    starsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 20,
    },
    star: {
      fontSize: 30,
      color: 'gray',
      marginHorizontal: 10,
    },
    selectedStar: {
      fontSize: 30,
      color: Colors.yellow,
      marginHorizontal: 10,
    },
    feedbackInput: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginVertical: 10,
      padding: 10,
      color: Colors.yellow,
    },
    nevermindButton: {
      marginTop: 20,
      padding: 10,
      backgroundColor: Colors.yellow,
      borderRadius: 5,
      alignSelf: 'center',
    },
    modal: {
        // padding: 20,
        // borderRadius: 10,
        alignContent:'center',
        alignSelf:'center'
      },
      modalText: {
        fontSize: 30,
        color: "#EFB60E",
        fontWeight:'900',
        alignContent:'center',
        alignSelf:'center',
        justifyContent: 'center',
    
      },
});

export default FeedbackModal;
