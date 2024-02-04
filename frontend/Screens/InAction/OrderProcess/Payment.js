import React, { useContext, useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet,TextInput } from 'react-native';
import Colors from '../../../Tools/ThemeConsts/colors';
import { Text } from '../../../DefaultFont';
import { ThemeContext } from '../../../ThemeContext';
import YellowHeading from '../../../Tools/Components/YellowHeading';
import TipButton from '../../../Tools/Components/TipButton';
import ProfilesCircles from '../../../Tools/Components/ProfilesCircles';
import PaymentRow from '../../../Tools/Components/PaymentRow'; // Assuming this component is the same as in the Table.js file
import SwipeableConfirmButton from '../../../Tools/Components/SwipeableConfirmButton';
import CustomTipModal from '../../../Tools/Components/CustomTipModal';
import Heading from '../../../Tools/Components/Heading';
import { useOrderedItems } from '../../../OrderedItemsProvider';
import NextButton from '../../../Tools/Components/NextButton';

import languagekeys from '../../Identidication/Login/localization/Languagekeys';
import LanguageUtils from '../../Identidication/Login/localization/LanguageUtils'; 
import { useLanguage } from '../../../LanguageContext';
import FeedbackModal from '../../../Tools/Components/FeedbackModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserContext } from '../../../UserContext';
import AuthModal from '../../../Tools/Components/AuthModal';


const Payment = ({ props, navigation }) => {
  const { mode, COLORS } = useContext(ThemeContext);
  const [selectedRows, setSelectedRows] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [tipAmount, setTipAmount] = useState(0);
  const [selectedTip, setSelectedTip] = useState(0);
  const [isCustomTipSelected, setCustomTipSelected] = useState(false);
  const { selectedLanguage, setSelectedLanguage } = useLanguage();

  //const align = selectedLanguage === "hebrew" ? 'right' : 'left';
  const [align_dir,set_align_dir] = useState(selectedLanguage === "hebrew" ? 'right' : 'left');

  const { orderedItems, addOrderedItem, removeOrderedItem, setOrderedItems,
    paymentItems,handleConfirmPayment,handleDishSelectForPayment, } = useOrderedItems();

  const filteredOrderedItems = paymentItems;//orderedItems.filter(orderedItem => orderedItem.ordered);
  const [loading, setLoading] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const { user } = useUserContext();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status from AsyncStorage
    AsyncStorage.getItem("authenticated")
      .then(authenticated => {
        if (authenticated === "true") {
          setIsAuthenticated(true); // Set isAuthenticated to true if authenticated
        } else {
          setIsAuthenticated(false); // Set isAuthenticated to false if not authenticated
        }
      })
      .catch(error => {
        console.log("Error checking authentication status:", error);
      });
  }, []);
  
  useEffect(() => {
    // Actions to take when selectedLanguage changes
    // For example, updating states or re-initializing component data
    set_align_dir(selectedLanguage === "hebrew" ? 'right' : 'left');
  }, [selectedLanguage]);
  
  

  console.log(orderedItems);
  //console.log(orderedItems[0].items.price);


  const handleDishSelect = (item, isChecked, price) => {        
    handleDishSelectForPayment(item, isChecked);
  
    setTotalPrice((prevTotalPrice) => {
      const updatedPrice = isChecked ? prevTotalPrice + price : prevTotalPrice - price;
      return updatedPrice < 0 ? 0 : updatedPrice;
    });    
  };

  const handleTipPress = (percentage) => {
    setSelectedTip(percentage);
  };

  const updateTipAmount = () => {
    console.log("updating the tip");
    if (totalPrice > 0) {
      const tip = (parseFloat(totalPrice) * parseFloat(selectedTip)) / 100;
      setTipAmount(tip);
      console.log("total price ",totalPrice);
      console.log("selectedTip ",selectedTip);
      console.log("set tip to ",tip);
    } else {
      setTipAmount(0);
      console.log("set to zero :)");
    }
  };


  useEffect(() => {
    updateTipAmount();
  }, [totalPrice, selectedTip]);


  // just to check if the items did or did not update
  // useEffect(() => {
  //   console.log(orderedItems);
  // }, [totalPrice, selectedTip]);

  const handleCustomTipModalOpen = () => {
    setCustomTipSelected(true);
  };

  const handleCustomTipConfirm = (percentage) => {
    setTipAmount((totalPrice * percentage) / 100);
    setCustomTipSelected(false);
  };

  const handleConfirm = () => {
    setLoading(true);
    console.log("payyy meee");    
    
    handleConfirmPayment();

    // Show the success modal
    if(isAuthenticated)
    {
      setIsSuccessModalVisible(true);

      // Set a timer to hide the success modal after 3 seconds
      setTimeout(() => {
        setIsSuccessModalVisible(false);
        navigation.navigate('Home');
      }, 5000);
    }

    // const updatedOrderedItems = orderedItems.map((orderedItem) => {
    //   if (orderedItem.checked_p) {
    //     console.log("item added to payment -->",orderedItem.items.name);
    //     return {          
    //       ...orderedItem,
    //       checked_p:true, //checked_p is for payment screen
    //       paid:true,          
    //     };
    //     setLoading(false);
    //   }
    //   return orderedItem;
    // });
  
    // Update the state of orderedItems with the updatedOrderedItems array
    // setOrderedItems(updatedOrderedItems);
  
    // Now you can console.log or perform other actions with the updated ordered items
    // console.log("updated items");
    // console.log(updatedOrderedItems);
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS[mode].background }}>
      <ScrollView>
        <View style={{ paddingTop: 80, paddingHorizontal: 30,marginTop:30, marginBottom: 30 }}>
          {/* <Heading align="left" color={COLORS[mode].primary} text={LanguageUtils.getLangText(languagekeys.payment)} /> */}
          <Heading align={align_dir} color={COLORS[mode].primary} text={LanguageUtils.getLangText(languagekeys.payment)} />
          <ProfilesCircles />

          {/* Render the PaymentRow components for each dish */}
          {/* Replace the following examples with your actual data */}
          {filteredOrderedItems && filteredOrderedItems.length > 0 ? (
            filteredOrderedItems.map((orderedItem, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleDishSelect(orderedItem, false, orderedItem.price)}
              >
                <PaymentRow
                  item={orderedItem}
                  onSelect={(isChecked, price) => handleDishSelect(orderedItem, isChecked, price)}
                />
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ textAlign: align_dir, fontSize: 25, color: Colors.yellow, marginBottom: 15 }}>{LanguageUtils.getLangText(languagekeys.no_items_ordered)}</Text>
          )}
            
          {/* Render tip options */}
          <Text style={{ textAlign: align_dir, fontSize: 25, color: Colors.yellow, marginBottom: 15 }}>{LanguageUtils.getLangText(languagekeys.tip_for_waiter)} </Text>
          <Text style={{ textAlign: align_dir, fontSize: 17 }}>
            {LanguageUtils.getLangText(languagekeys.tax_decleration)}
          </Text>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <TipButton percent={0} onTipPress={handleTipPress} />
              <TipButton percent={5} onTipPress={handleTipPress} />
              <TipButton percent={10} onTipPress={handleTipPress} />
              <TipButton percent={15} onTipPress={handleTipPress} />
              {/* Render the custom tip button */}
              {isCustomTipSelected ? (
                <CustomTipModal
                  isVisible={isCustomTipSelected}
                  onClose={() => setCustomTipSelected(false)}
                  onConfirm={handleCustomTipConfirm}
                  handleTipPress={handleTipPress}
                />
              ) : (
                <TipButton text={LanguageUtils.getLangText(languagekeys.other)} onTipPress={handleCustomTipModalOpen} />
              )}
            </View>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 30,marginBottom: 10 }}>
              {/* this is the ORDER total */}
              {align_dir === 'left' && (
                <Text style={{ flex: 1, fontSize: 17, textAlign: align_dir }}>{LanguageUtils.getLangText(languagekeys.order_total)} </Text>              
              )}
              {align_dir === 'right' &&
                (<Text style={{ flex: 1, fontSize: 17, marginBottom: 10 }}>{totalPrice}₪</Text>)
              }
              {align_dir === 'left' &&
                (<Text style={{ flex: 1, fontSize: 17, marginBottom: 10 }}>{totalPrice}₪</Text>)
              }
              {align_dir === 'right' && (
                <Text style={{ flex: 1, fontSize: 17, textAlign: align_dir }}>{LanguageUtils.getLangText(languagekeys.order_total)} </Text>              
              )}

              
            </View>

            {/* this is the TIP total */}
            <View style={{ flexDirection: 'row', justifyContent: 'center' ,marginBottom: 10}}>                            
              {align_dir==='left' && (
                <Text style={{ flex: 1, fontSize: 17, textAlign: align_dir,width:80 }}>{LanguageUtils.getLangText(languagekeys.tip_for_waiter)} </Text>
              )}
              {align_dir==='left' && (
                (<Text style={{ flex: 1, fontSize: 17, marginBottom: 10 }}>{tipAmount}₪</Text>)
              )}

              {align_dir==='right' && (
                (<Text style={{ flex: 1, fontSize: 17, marginBottom: 10 }}>{tipAmount}₪</Text>)
              )}
              {align_dir==='right' && (
                <Text style={{ flex: 1, fontSize: 17, textAlign: align_dir }}>{LanguageUtils.getLangText(languagekeys.tip_for_waiter)} </Text>
              )}
          
            </View>

            {/* this is the TOTAL total */}
            <View style={{ flexDirection: 'row', justifyContent: 'center',marginBottom: 10 }}>              
              {align_dir ==='left'&& (
                <Text style={{ flex: 1, fontSize: 17, textAlign: align_dir }}>{LanguageUtils.getLangText(languagekeys.total)}</Text>
              )}
              {align_dir ==='left'&& (
                <Text style={{ flex: 1, fontSize: 17, marginBottom: 10 }}>{totalPrice + tipAmount}₪</Text>
              )}
              {align_dir ==='right'&& (
                <Text style={{ flex: 1, fontSize: 17, marginBottom: 10 }}>{totalPrice + tipAmount}₪</Text>
              )}
              {align_dir ==='right'&& (
                <Text style={{ flex: 1, fontSize: 17, textAlign: align_dir }}>{LanguageUtils.getLangText(languagekeys.total)}</Text>
              )}
                

              

            </View> 

          <View style={{ marginBottom: 50,flex: 1,alignSelf: 'center' ,justifyContent: 'center'}}>      
          
           
          </View>

          {/* Render the confirm button */}
          <NextButton 
          buttonText={loading ? LanguageUtils.getLangText(languagekeys.loading) : LanguageUtils.getLangText(languagekeys.order_bil)}
          // navigation={navigation}
          // nextScreen="Home"
          customOnPress ={handleConfirm} />

          {/*dont delete the swipe button please :) */}
          {/* <SwipeableConfirmButton onConfirm={handleConfirm} /> */}
        </View>
      </ScrollView>

      {/* Render the custom tip modal */}
      {isCustomTipSelected && (
        <CustomTipModal
          isVisible={isCustomTipSelected}
          onClose={() => setCustomTipSelected(false)}
          onConfirm={handleCustomTipConfirm}
          handleTipPress={handleTipPress}
        />
      )}

      {/* Render the success modal */} 
           
      {isAuthenticated && isSuccessModalVisible && (
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            {/* <Text style={styles.modalText}>{LanguageUtils.getLangText(languagekeys.Payment_was_done_suc)}</Text>
            <Text style={styles.modalText1}>{LanguageUtils.getLangText(languagekeys.Waiting_For_You_till_next_time)}</Text> */}
            <FeedbackModal/>
          </View>
        </View>
      )}

      {!isAuthenticated  && (
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            {/* <Text style={styles.modalText}>{LanguageUtils.getLangText(languagekeys.Payment_was_done_suc)}</Text>
            <Text style={styles.modalText1}>{LanguageUtils.getLangText(languagekeys.Waiting_For_You_till_next_time)}</Text> */}
            <AuthModal
              isVisible={!isAuthenticated}
              onClose={() => setIsSuccessModalVisible(false)}
              onNavigateToSignIn={() => { 
                setIsSuccessModalVisible(false);         
                navigation.navigate('SignInScreen'); // Replace with your actual navigation logic
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor:"#1A1A1A",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
  modalText1: {
    fontSize: 30,
    color: "#EFB60E",
    fontWeight:'900',
    alignContent:'center',
    alignSelf:'center',
    justifyContent: 'center',
    top:20,

  },
});
export default Payment;