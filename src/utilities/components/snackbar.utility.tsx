import React, {useContext, useEffect} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {
  Snackbar as PaperSnackbar,
  IconButton,
  Text,
  useTheme,
} from 'react-native-paper';
import {GlobalContext} from '../../context/global.context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Snackbar = () => {
  const context = useContext(GlobalContext);
  const theme = useTheme();

  const stylesByType = {
    error: {
      backgroundColor: theme.colors.error,
      textColor: theme.colors.onError,
      icon: 'error-outline',
    },
    warning: {
      backgroundColor: '#fff3cd',
      textColor: theme.colors.tertiaryContainer,
      icon: 'warning-amber',
    },
    info: {
      backgroundColor: '#d1ecf1',
      textColor: theme.colors.paperContainer,
      icon: 'info-outline',
    },
    success: {
      backgroundColor: '#d4edda',
      textColor: theme.colors.primary,
      icon: 'check-circle-outline',
    },
  };

  const {message, onActionPress, duration, type, isVisible} =
    context?.snackbarInfo || {};

  const slideAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, slideAnim]);

  const currentStyle = stylesByType[type || 'info'];

  return (
    <Animated.View
      style={{
        transform: [
          {
            translateY: slideAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [100, 0],
            }),
          },
        ],
      }}>
      <PaperSnackbar
        visible={isVisible || false}
        onDismiss={() =>
          context?.setSnackbarInfo({...context.snackbarInfo, isVisible: false})
        }
        duration={duration || 3500}
        style={[
          styles.snackbar,
          {backgroundColor: currentStyle.backgroundColor},
        ]}
        action={{
          textColor: currentStyle.textColor,
          label: 'Cerrar',
          onPress: () =>
            context?.setSnackbarInfo({
              ...context.snackbarInfo,
              isVisible: false,
            }),
        }}>
        <Text
          style={{
            color: currentStyle.textColor,
          }}>
          {message}
        </Text>
      </PaperSnackbar>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    margin: 15,
    borderRadius: 5,
    zIndex: 1000,
  },
});

export default Snackbar;
