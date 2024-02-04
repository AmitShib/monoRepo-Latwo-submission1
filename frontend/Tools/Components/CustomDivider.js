import { View } from "react-native";

export const CustomDivider = (props) => {
     return (
      <View
        style={{
          borderBottomColor: props.borderColor || '#000', // Default color is black
          borderBottomWidth: props.borderBottomWidth || 1, // You can adjust this
          marginVertical: props.marginVertical || 5, // Some vertical spacing
          marginHorizontal: props.marginHorizontal || 15, // Some vertical spacing
         // width : props.width || '45%',
          ...props.style, // Incase you want to pass some additional styles
        }}
      />
    );
  };
  