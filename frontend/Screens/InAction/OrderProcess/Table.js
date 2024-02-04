import React, { useContext, useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '../../../DefaultFont';
import Colors from '../../../Tools/ThemeConsts/colors';
import { ThemeContext } from '../../../ThemeContext';
import ProfilesCircles from '../../../Tools/Components/ProfilesCircles';
import PaymentRow from '../../../Tools/Components/PaymentRow';
import Heading from '../../../Tools/Components/Heading';
import Modal from 'react-native-modal';
import OrderButton from '../../../Tools/Components/OrderButton';
import { useOrderedItems } from '../../../OrderedItemsProvider';
import BackButton from '../../../Tools/Components/BackButton';
import { useNavigation } from "@react-navigation/native";
import AuthModal from '../../../Tools/Components/AuthModal'; // auth modal to check if user logged
import ToggleSwitch from '../../../Tools/Components/ToggleSwitch';
import languagekeys from '../../Identidication/Login/localization/Languagekeys';
import LanguageUtils from '../../Identidication/Login/localization/LanguageUtils';
import YellowHeading from '../../../Tools/Components/YellowHeading';
import { CustomDivider } from '../../../Tools/Components/CustomDivider';
import { useLanguage } from '../../../LanguageContext';
import { useUserContext } from '../../../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Auth } from 'aws-amplify';
import CallWaiter from '../../../Tools/Components/CallWaiter';


const Table = ({ route }) => {
  const navigation = useNavigation();
  const { mode, COLORS } = useContext(ThemeContext);
  const [isModalVisible, setModalVisible] = useState(false);
  const { orderedItems, addOrderedItem, removeOrderedItem, checkedItems,
    addCheckedItem, removeCheckedItem, selectItemForCheckout,
    confirmOrderForPayment,
    setOrderedItems, markTableAsVisited, setCheckedItems, paymentItems } = useOrderedItems();
  const [totalPrice, setTotalPrice] = useState(0);
  const [authModalVisible, setAuthModalVisible] = useState(false); // State for authentication modal
  const { selectedLanguage, languageRenderCount } = useLanguage();
  const [filterMe, setFilterMe] = useState(false);
  const { user } = useUserContext();

  const [align_dir,set_align_dir]= useState(selectedLanguage === "hebrew" ? 'right' : 'left');

  console.log(align_dir);
  console.log(align_dir);
  console.log(align_dir);
  
  console.log(selectedLanguage);
  console.log(selectedLanguage);
  console.log(selectedLanguage);


  useEffect(() => {
    // Actions to take when selectedLanguage changes
    // For example, updating states or re-initializing component data
    set_align_dir(selectedLanguage === "hebrew" ? 'right' : 'left');
  }, [selectedLanguage]);

  const [selectedItems, setSelectedItems] = useState([]);


  const [myMeals, setMyMeals] = useState([]);
  const [otherMeals, setOtherMeals] = useState([]);

  //console.log(user);
  // console.log("((((((((((((");
  // console.log(orderedItems);
  // console.log("((((((((((((");
  // console.log("((((((((((((");
  // console.log("((((((((((((");
  //const [phoneNumber, setPhoneNumber] = useState('');

  const displayedItems = filterMe ? orderedItems.filter(item => item.users.id) : orderedItems;
  // const my_meals = orderedItems.filter(item =>
  //   item.users ? item.users.some(user => user.id === yourUser.id) : false
  // );

  // console.log('---------------------------------');
  // console.log(my_meals);
  // console.log('---------------------------------');


  useEffect(() => {
    markTableAsVisited();
    // console.log(orderedItems);
  }, []);

  useEffect(() => {
    // console.log("~~~~~~~~~~~~~~~~~~~~~");
    // console.log(orderedItems);
    if (user.phonenumber === "") { //user isnt logged in
      const updatedMyMeals = orderedItems.filter(item => item.users.some(person => person.id === "0"));
      const updatedOtherMeals = orderedItems.filter(item => !item.users.some(person => person.id === "0"));
      setMyMeals(updatedMyMeals);
      setOtherMeals(updatedOtherMeals);
      // console.log("my meals");
      // console.log(updatedMyMeals.length);
      // console.log("................");
      // console.log("otherMeals");
      // console.log(updatedOtherMeals.length);
      // console.log("ZZZZZZZZZZZZZZZZZ");
    }
    else {//user is logged in
      // console.log(user);
      //const updatedMyMeals = orderedItems.filter(item => item.users.some(user => user.id === user.phonenumber));
      const updatedMyMeals = orderedItems.filter(item => item.users.some(person => person.id === user.phonenumber));
      const updatedOtherMeals = orderedItems.filter(item => !item.users.some(person => person.id === user.phonenumber));
      setMyMeals(updatedMyMeals);
      setOtherMeals(updatedOtherMeals);
      // console.log("my meals");
      // console.log(updatedMyMeals.length);
      // console.log("................");
      // console.log("otherMeals");
      // console.log(updatedOtherMeals.length);
    }
    // console.log("userrrrrrrr");
    // console.log(user);
    // console.log(myMeals);


  }, [orderedItems]);

  const handleDishSelect = (item, isChecked, price) => {
    const itemIdForCheckout = item.key_id;
    if (typeof price === 'number') {
    selectItemForCheckout(itemIdForCheckout, isChecked);


    const newTotalPrice = isChecked ? totalPrice + price : totalPrice - price;
    setTotalPrice(Math.max(newTotalPrice, 0));
    }
  };

  const createOrder = () => {
    if ((!user || !user.firstname) && !authCheckFromStorage()) {
      setAuthModalVisible(true);
      return;
    }

    if (checkedItems.length === 0) {
      alert('Please select at least one dish to order.');
      return; 
    }

    confirmOrderForPayment();
    setModalVisible(true);
  };

  const authCheckFromStorage = async () => {
    try {
      const authenticated = await AsyncStorage.getItem("authenticated");
      return authenticated === "true";
    } catch (error) {
      console.log("Error checking authentication status:", error);
      return false;
    }
  };

  const hasItems = [orderedItems, myMeals, otherMeals, paymentItems].some(array => array && array.length > 0);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    (hasItems 
      // (orderedItems && orderedItems.length > 0)  ||
      // (myMeals.length >0) || 
      // (otherMeals.length>0) ||
      // (paymentItems.length>0)
    ) ? (
      <ScrollView
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          backgroundColor: COLORS[mode].background,
        }}
      >

        {/* Conditional rendering of authentication modal */}
        <AuthModal
          isVisible={authModalVisible}
          onClose={() => setAuthModalVisible(false)}
          onNavigateToSignIn={() => {
            setAuthModalVisible(false); // Close modal
            navigation.navigate('SignInScreen');
          }}
        />

        <View style={{ paddingTop: 80, paddingHorizontal: 30 }}>
          <Heading align={align_dir} text={LanguageUtils.getLangText(languagekeys.table_number) + ' ' +'5'} />
          <BackButton height={40} navigation={navigation} />

          <View style={styles.horizontalContainer}>
            <ProfilesCircles />
            <CallWaiter />
          </View>
          


          {/* meals that belong to the logged in user */}
          {
            <Text
              style={{
                marginBottom: 10,
                fontSize: 18,
                fontWeight: 900,
              }}>
              {LanguageUtils.getLangText(languagekeys.my_meals)}
            </Text>
          }

          {
            (myMeals && myMeals.length > 0) ? (
              myMeals.map((orderedItem, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleDishSelect(orderedItem, !orderedItem.checked, orderedItem.price)}
                >
                  <PaymentRow
                    item={orderedItem}
                    onSelect={(isChecked, price) => handleDishSelect(orderedItem, isChecked, price)}
                    key_id={orderedItem.key_id}
                  />
                </TouchableOpacity>
              ))
            ) : (
              <Text>{LanguageUtils.getLangText(languagekeys.no_items_ordered)}</Text>
            )
          }

          {
          // displayedItems && displayedItems.length > 0 && 
          (
            <CustomDivider borderColor={COLORS[mode].primary} borderBottomWidth={1} />
          )}


          {/* meals that dont belong to the logged in user */}
          {
            <Text style={{
              marginBottom: 10,
              fontSize: 18,
              fontWeight: 900,
            }}>
              {LanguageUtils.getLangText(languagekeys.other_meals)}
            </Text>
          }
          {
            (otherMeals && otherMeals.length > 0) ? (
              otherMeals.map((orderedItem, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleDishSelect(orderedItem, !orderedItem.checked, orderedItem.price)}
                >
                  <PaymentRow
                    item={orderedItem}
                    onSelect={(isChecked, price) => handleDishSelect(orderedItem, isChecked, price)}
                    key_id={orderedItem.key_id}
                  />
                </TouchableOpacity>
              ))
            ) : (
              <Text>{LanguageUtils.getLangText(languagekeys.no_items_ordered)}</Text>
            )
          }

          {
          // displayedItems && displayedItems.length > 0 && 
          (
            <CustomDivider borderColor={COLORS[mode].primary} borderBottomWidth={1} />
          )}


          {/* meals that got ordered to the table */}
          {
            <Text style={{
              marginBottom: 10,
              fontSize: 18,
              fontWeight: 900,
            }}>
              {LanguageUtils.getLangText(languagekeys.already_ordered_meals)}
            </Text>
          }
          {
            (paymentItems && paymentItems.length > 0) ? (
              paymentItems.map((orderedItem, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleDishSelect(orderedItem, !orderedItem.checked, orderedItem.price)}  
                  disabled={true}                
                >
                  <PaymentRow
                    item={orderedItem}
                    onSelect={(isChecked, price) => handleDishSelect(orderedItem, isChecked, price)}
                    key_id={orderedItem.key_id}
                    cant_use={true}
                  />
                </TouchableOpacity>
              ))
            ) : (
              <Text>{LanguageUtils.getLangText(languagekeys.no_items_ordered)}</Text>
            )
          }

          {
          // displayedItems && displayedItems.length > 0 && 
          (
            <CustomDivider borderColor={COLORS[mode].primary} borderBottomWidth={1} />
          )}


          <Modal
            isVisible={isModalVisible}
            backdropOpacity={0.8}
            onBackdropPress={closeModal}
            animationIn="fadeIn"
            animationOut="fadeOut"
            useNativeDriverForBackdrop
            style={{ margin: 0, justifyContent: 'center', alignItems: 'center' }}
          >
            <View style={{ backgroundColor: 'transparent', padding: 20, borderRadius: 10 }}>
              <Text style={{ color: COLORS[mode].primary, fontSize: 20, marginBottom: 10 }}>{LanguageUtils.getLangText(languagekeys.your_order_has_been_created)}</Text>
              <Text style={{ color: COLORS[mode].primary }}>{LanguageUtils.getLangText(languagekeys.thank_you_for_your_order)}</Text>
              <TouchableOpacity onPress={closeModal} style={{ alignSelf: 'flex-end', marginTop: 20, backgroundColor: 'transparent' }}>
                <Text style={{ color: Colors.primary, fontSize: 16 }}>{LanguageUtils.getLangText(languagekeys.close)}</Text>
              </TouchableOpacity>
            </View>
          </Modal>

          {/* total order sum */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10, backgroundColor: COLORS[mode].background }}>

            {align_dir==="right" && (
            <Text style={{ color: COLORS[mode].text, fontWeight: '800', fontSize: 30 }}>{totalPrice}₪</Text>
            )}
            <Text style={{ color: COLORS[mode].text, fontWeight: '800', fontSize: 30 }}>{LanguageUtils.getLangText(languagekeys.order_total)}</Text>
            {align_dir==="left" && (
              <Text style={{ color: COLORS[mode].text, fontWeight: '800', fontSize: 30 }}>{totalPrice}₪</Text>
            )}
          </View>

          {/* order btn */}
          <OrderButton buttonText={LanguageUtils.getLangText(languagekeys.order_dishes)} createOrder={createOrder} navigation={navigation} />

        </View>
      </ScrollView>
    ) 
    :
      <ScrollView
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          backgroundColor: COLORS[mode].background,
        }}
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <YellowHeading
          align = {align_dir}
          text={LanguageUtils.getLangText(languagekeys.no_items_ordered)}
          style={{
            marginTop: 40,  // Add margin from the top (adjust value as needed)
          }}
        />
      </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollViewStyle: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: Colors.background,
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'center', // This will vertically align the child components
    justifyContent: 'space-around', // Align children to the start of the container
  },
});

export default Table;
