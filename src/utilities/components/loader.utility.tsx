import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Image } from 'react-native';
import { useTheme } from 'react-native-paper';

interface LoaderProps {
  visible: boolean;
}

const Loader: React.FC<LoaderProps> = ({ visible }) => {
  const theme = useTheme();
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      startRotation();
    }
  }, [visible]);

  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  };

  if (!visible) return null;

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.loaderContainer}>
      <Animated.Image
        source={require('../../assets/AhorroSmartLogoV2-removebg.png')}
        style={[styles.image, { transform: [{ rotate }] }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 99999,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default Loader;
