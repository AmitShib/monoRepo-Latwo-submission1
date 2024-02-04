import React, { useContext } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "../../DefaultFont";
import { ThemeContext } from "../../ThemeContext";
import { useNavigation } from "@react-navigation/native";

const CartItem = ({ item, customizeNames, selectedOptionsArr, parentNumber }) => {
  const { mode, COLORS } = useContext(ThemeContext);
  const navigation = useNavigation();

  const renderCustomizations = () => {
    return (
      <View>
        {item.dishCustomizes.map((custom, index) => (
          <Text key={index} style={{ textAlign: "right", lineHeight: 16 }}>
            {`${customizeNames[index]}: ${selectedOptionsArr[index]}`}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <View >
      <TouchableOpacity
        onPress={() => navigation.navigate('DishPage', { item })}
        style={{
          marginBottom: 2 * 10,
          // backgroundColor: COLORS[mode].menubackground,
          borderRadius: 20,
          height: 95,
          flexDirection: "row",
        }}
      >
        {/* Image */}
        {/* <Image
          source={item.photo}
          style={{ height: 95, width: 120, borderRadius: 15, resizeMode: "cover" }}
        /> */}

        {/* Content */}
        <View style={{ flex: 1, paddingHorizontal: 10, justifyContent: "center" }}>
          {/* Dish Name */}
          <Text style={{ textAlign: "right", fontWeight: "bold", fontSize: 16 }}>
            {item.name}
          </Text>

          {/* Dish Customizations */}
          {renderCustomizations()}

          {/* Dish Price */}
          <Text style={{ textAlign: "right", fontSize: 16, color: "#EFB60E", fontWeight: "bold" }}>
            {item.price}₪ 
          </Text>
        </View>
              {/* Parent Number */}
      <Text style={{ fontSize: 16, fontWeight: "bold",  paddingHorizontal:5, paddingVertical:30,color: COLORS[mode].primary,}}>
        {parentNumber}
      </Text>
      </TouchableOpacity>


    </View>
  );
};

export default CartItem;
