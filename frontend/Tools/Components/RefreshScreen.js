import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useLanguage } from '../../LanguageContext';
import { images } from '../ThemeConsts';

function RefreshScreen({ navigation, route }) {
  const { selectedLanguage } = useLanguage();

  useEffect(() => {
    // If nextScreen is provided, navigate to that screen. Otherwise, go to Home.
    const destination = route.params?.nextScreen || 'Home';
    navigation.navigate(destination, { key: route.params?.key });
  }, [route.params, selectedLanguage]);

  return (
    <View style={styles.container}>
      <Image
        source={images.splash}
        resizeMode="cover"
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default RefreshScreen;
