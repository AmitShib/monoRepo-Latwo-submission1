import { Image, View, TouchableOpacity, Modal, Button, FlatList, } from "react-native";
import React, { useState, useContext, useEffect } from 'react';
import { Text } from "../../DefaultFont";
import colors from "../../Tools/ThemeConsts/colors";
import images from "../../Tools/ThemeConsts/images";
import RoundCheckBox from "./RoundCheckBox";
import NextButton from "./NextButton";
import ThemeContext from "../../ThemeContext";
import { useTable } from "../../TableProvider ";
import { useOrderedItems } from "../../OrderedItemsProvider";

import languagekeys from "../../Screens/Identidication/Login/localization/Languagekeys";
import LanguageUtils from "../../Screens/Identidication/Login/localization/LanguageUtils";
import { user } from "../ThemeConsts/icons";


const PaymentRow = (props) => {

  console.log("**************");
  // console.log('PaymentRow props', props); // Check the entire props structure

  const item = props.item.items;
  // console.log('PaymentRow item', item); // Check the item structure
  console.log(item.selectedOptions);
  console.log(item.selectedOptions);
  console.log(item.selectedOptions);
  //const item = props.item.items;
  // const item = props.item.items;
  //console.log(item);
  const selectedCustomOptions = item.selectedOptions;
  console.log(selectedCustomOptions);
  const { orderedItems, addOrderedItem,
    removeOrderedItem, checkedItems, addCheckedItem,
    removeCheckedItem, setOrderedItems, markTableAsVisited,
    getItemById, addUserToItem, removeUserFromItem, updateUsersForItem,
  } = useOrderedItems();





  const item2 = getItemById(props.key_id);
  // console.log("key_id");
  // console.log(props.key_id);
  // console.log("item2");
  // console.log(item2);
  //console.log(item);
  // console.log("+++++++++++");
  //console.log(user);
  const [isChecked, setIsChecked] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const { mode, COLORS } = useContext(ThemeContext);
  const { people, addPerson, removePerson } = useTable();
  const [itemUsers, setItemUsers] = useState(item.users || []);
  const [usersList, setUsersList] = useState(item.users);
  const [sharedUsers, setSharedUsers] = useState(item.users);



  //this line VVV
  //updateUsersForItem(props.key_id, props.item.items.users);
  const getSelectedSubOptions = (dishCustomizes) => {
    let selectedOptions = dishCustomizes.flatMap(customize => customize.customizeOptions);
    return selectedOptions.join(', ');
  };

  // console.log(getSelectedSubOptions(item.dishCustomizes));
  // console.log(getSelectedSubOptions(item.dishCustomizes));
  // console.log(getSelectedSubOptions(item.dishCustomizes));
  console.log(props.dishCustomizes);
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~');

  useEffect(() => {
    // console.log("while loading paymentrow");
    // console.log(props.item.items.users);
    updateUsersForItem(props.key_id, props.item.items.users);
    if (props.cant_use) {
      setIsChecked(true);
    }

  }, []);  // <-- Empty dependency array ensures this runs only once when the component mounts.


  // Calculate the total price for this Each User in the shared Dish 
  const calculateUserShare = () => {
    return calculateTotalPrice() / sharedUsers.length;
  };

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  // Calculate the total price for this payment row
  // console.log(item);
  // console.log(item2);
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    if (item.price) {
      totalPrice += item.price;
    }
    return totalPrice;
  };
  // Handle CheckBox click
  const handleCheckBoxClick = () => {
    if (props.cant_use) {
      //setIsChecked(true);
      return;
    }
    setIsChecked(!isChecked);
    if (props.onSelect) {
      props.onSelect(!isChecked, item.price);
    }
  };

  const addItemUser = (userId) => {
    // Look up the user in the people array using the provided user ID.
    const foundUser = people.find((person) => person.id === userId);

    // If the user is found...
    if (foundUser) {
      // Add the complete user object to the local usersList state.
      setUsersList(prev => [...prev, foundUser]);

      // Update the item's users list with the new data.
      props.item.items.users = [...props.item.items.users, foundUser];
      //  console.log(props.item.items.users);
    } else {
      //   console.log(`User with ID ${userId} not found in people array.`);
    }
  };

  // const addItemUser = (userId) => {
  //   const foundUser = people.find((person) => person.id === userId);
  //   if (foundUser) {
  //     addUserToItem(props.key_id, foundUser);
  //   } else {
  //     console.warn(`User with ID ${userId} not found in people array.`);
  //   }
  // };

  const removeItemUser = (userId) => {
    // Remove the user's id from item.users
    const updatedUsers = props.item.items.users.filter((user) => user.id !== userId);
    props.item.items.users = updatedUsers;

    // Update the local state for rendering
    setUsersList(updatedUsers);
    //  console.log("updated users: ", updatedUsers);
    // console.log(props.key_id);
  };

  // const removeItemUser = (userId) => {
  //   removeUserFromItem(props.key_id, userId);
  // };

  // get the users that are in the item.users
  const matchedUsers = item.users.map((user) => {
    const matchedPerson = people.find((person) => person.id === user.id);
    return matchedPerson;
  });
  //console.log(matchedUsers);


  const numberOfUsers = matchedUsers.length;

  return (
    <TouchableOpacity
      onPress={handleCheckBoxClick}
      style={{ flexDirection: "row", marginBottom: 20, height: 80, position: "relative" }}
    >
      {/* Checkbox */}
      <View style={{ position: "absolute", top: 15, left: -15 }}>
        <RoundCheckBox isChecked={isChecked} handleCheckBoxClick={handleCheckBoxClick} />
      </View>

      {/* Dish Details */}
      <View style={{ flex: 1, marginLeft: 30, marginRight: -60, justifyContent: 'flex-start' }}>
        <Text style={{ textAlign: "right", fontSize: 17 }}>{item.name}</Text>
        <Text style={{ textAlign: "right", fontSize: 12 }}>
          {/* Using a newline to separate each option */}
          {item.selectedOptions.join(',')}
        </Text>
        <Text style={{
          textAlign: "right",
          color: colors.yellow,
          marginTop: 10, // Adjust the value as needed to move the price down
          fontWeight: 'bold' // This will make the text bold
        }}>
          {calculateTotalPrice()}₪ • {item.duration}
        </Text>
      </View>

      {/* Dish Photo */}
      {/* <View>
        <Image
          source={item.photo}
          style={{ resizeMode: "cover", width: 100, height: 80, borderRadius: 10, marginRight: -65 }}
        />
      </View> */}

      {/* Display Users & Logo Image */}
      <View style={{
        width: 150,
        flexDirection: 'row',
        alignItems: 'center',
        //  alignItems:'space-between',
        justifyContent: 'flex-end',
        position: 'relative',
      }}>

        {/* Other Users */}
        {/* show only the first two users */}
        {matchedUsers.slice(0, 2).map((user) => (
          <Image
            key={user.id}
            source={user.image}
            alt={user.name}
            style={{
              width: 40,
              height: 40,
              borderRadius: 35,
              marginLeft: -60,
            }}
          />
        ))}


        {numberOfUsers > 2 && (
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 35,
              marginLeft: -60,
              backgroundColor: 'gray', // or any color you prefer
              justifyContent: 'center',
              alignItems: 'center',
              left: 0
            }}
          >
            <Text style={{ color: 'white' }}>+{numberOfUsers - 2}</Text>
          </View>
        )}




        {/* Add User Modal*/}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            setModalVisible(!isModalVisible);
          }}
        >
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View style={{ width: 300, padding: 20, backgroundColor: COLORS[mode].background, borderRadius: 10 }}>
              <Text>{LanguageUtils.getLangText(languagekeys.select_a_user)}</Text>

              {/* Render users not in the current item */}
              {people
                .filter((person) => !usersList.some((user) => user.id === person.id))
                .map((person) => (
                  <View key={person.id}
                    style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5, justifyContent: 'space-between' }}>
                    <Image
                      source={person.image}
                      resizeMode="contain"
                      style={{ width: 30, height: 30, borderRadius: 15, right: 0, }}
                    />
                    <Text style={{ marginLeft: 10 }}>{person.name}</Text>
                    <TouchableOpacity onPress={() => {
                      {
                        addItemUser(person.id);
                      }
                    }}
                      style={{ justifyContent: 'flex-end' }}>
                      <Text style={{ color: COLORS[mode].text }}>{LanguageUtils.getLangText(languagekeys.add)}</Text>
                    </TouchableOpacity>
                  </View>
                ))}

              <FlatList
                data={usersList}
                renderItem={({ item: user }) => (
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5, justifyContent: 'space-between' }}>
                    <Image
                      source={user.image}
                      resizeMode="contain"
                      style={{ width: 30, height: 30, borderRadius: 15 }}
                    />
                    <Text style={{}}>{user.name}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                      <TouchableOpacity onPress={() => removeItemUser(user.id)}>
                        <Text style={{ color: COLORS[mode].text }}>{LanguageUtils.getLangText(languagekeys.remove)}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                keyExtractor={(user) => user.id.toString()}
              />



              {/* add dummy person can remove */}
              {/* <TouchableOpacity onPress={() => {
            // Mock user addition
            const newUser = {
              id: Date.now(),
              name: "Tomer Yosef",
              image: images.ido
            };
            setUsersList(prev => [...prev, newUser]);
          }}>            
            <Text style={{ color:  COLORS[mode].text }}>Add Mock User</Text> 
          </TouchableOpacity> */}

              <NextButton buttonText="Close" customOnPress={() => {
                setModalVisible(false);
                updateUsersForItem(props.key_id, props.item.items.users);
                //      console.log("saved users!");
                //       console.log(props.item.items.users);
              }} />
              {/* to translate */}
            </View>
          </View>
        </Modal>




        {/* Add User Button */}
        <TouchableOpacity
          disabled={props.cant_use}
          onPress={() => setModalVisible(true)}
          style={{
            top: 20,
            bottom: 0,
            left: numberOfUsers === 0 ?
              -20 : numberOfUsers <= 2 ?
                -40 + numberOfUsers * 20 : 20,
            transform: [{ translateY: -20 }]
          }}
        >
          <Image source={images.add} resizeMode="contain" style={{ width: 40, height: 40 }} />
        </TouchableOpacity>

      </View>
    </TouchableOpacity>


  );
};

export default PaymentRow;
