import React, { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '../../DefaultFont';
import { Ionicons } from '@expo/vector-icons'; 
import { ThemeContext } from '../../ThemeContext';
import LanguageUtils from '../../Screens/Identidication/Login/localization/LanguageUtils';
import languagekeys from '../../Screens/Identidication/Login/localization/Languagekeys';
import { useNavigation } from '@react-navigation/native';
import { useOrderedItems } from '../../OrderedItemsProvider';


const NewComplaint = ({ navigation, screenName, nextScreen,CustomOnPressHandle,item,parentNumber,customizeNames,selectedOptionsArr,isordersummary,title }) => {
  const { orderedItems, addOrderedItem, removeOrderedItem, checkedItems, addCheckedItem, removeCheckedItem, setOrderedItems } = useOrderedItems();
  const { mode, COLORS } = useContext(ThemeContext);
  // const navigation = useNavigation();

  // console.log("ssssssssssssssssss");
  // console.log(customizeName);

  // console.log("NEEEWWWWcomplaint");
  // console.log("=====================");
  // console.log("=====================");
  // console.log("=====================");
  // console.log("=====================");
  // console.log(parentNumber);
  // console.log(customizeNames);
  // console.log(selectedOptionsArr);

  const handleComplainPress = () => {
    //navigation.navigate('Oops', { screenName: 'MissingChangesinDish' });
    navigation.navigate('Oops', { navigation, screenName, nextScreen,CustomOnPressHandle,item,parentNumber,customizeNames,selectedOptionsArr,isordersummary,title });
  };

  return (
    <View style={{ right: 0, left: 0 }}>
      <TouchableOpacity
        style={{
          marginTop: 10,
          marginBottom: 10,
          backgroundColor: COLORS[mode].background,
          borderRadius: 20,
        }}
        onPress={handleComplainPress} // Navigate to Oops with screenName
      >
        <Ionicons
          name="chatbubble-ellipses-sharp"
          size={30}
          color={COLORS[mode].primary}
          style={{ position: 'absolute', right: 10, top: 10 }}
        />
        <Text
          style={{
            textAlign: 'right',
            marginTop: 10,
            marginRight: 50,
            fontSize: 15,
            color: COLORS[mode].text,
          }}
        >
          {LanguageUtils.getLangText(languagekeys.would_you_like_to)}
        </Text>
        <Text
          style={{
            textAlign: 'right',
            marginRight: 50,
            marginBottom: 10,
            fontSize: 11,
            color: COLORS[mode].yellowlight,
          }}
        >
          {LanguageUtils.getLangText(languagekeys.another_plate)}
        </Text>
        <Ionicons
          name="chevron-back-outline"
          size={10 * 3}
          color={COLORS[mode].primary}
          style={{ position: 'absolute',marginTop:10,marginLeft:-30,  }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default NewComplaint;