import React,{useContext} from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Controller } from 'react-hook-form';
import { ThemeContext } from 'react-native-elements';



const CustomInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,default_val,keyboardType }) => {

  const { mode, COLORS } = useContext(ThemeContext);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange, onBlur }, fieldState: { error } }) => (
        <>
          <View
            style={[
              styles.container,
              { borderColor: error ? 'red' : '#e8e8e8' },
            ]}
          >
            <TextInput
            
              keyboardType={keyboardType || 'numeric'}
              value={value || ''}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={styles.input} // Updated style here
              secureTextEntry={secureTextEntry}
              defaultValue={default_val || ''}              
            />
          </View>
          {error && (
            <Text style={{ color: 'red', alignSelf: 'stretch' }}>
              {error.message || 'Error'}
            </Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',

    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
    marginVertical: 5,
    marginBottom :10,
  },
  input: {
    padding: 10,
    fontSize: 20,
    textAlign: 'center',
  },
});

export default CustomInput;
