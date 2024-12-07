import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Modal, Portal, Button, Text, useTheme} from 'react-native-paper';

interface ModalButton {
  label: string;
  onPress: () => void;
  color: 'error' | 'warning' | 'success' | 'info';
}

interface ModalProps {
  visible: boolean;
  onDismiss: () => void;
  title: string;
  content: string;
  buttons: ModalButton[];
}

const ModalComponent: React.FC<ModalProps> = ({
  visible,
  onDismiss,
  title,
  content,
  buttons,
}) => {
  const theme = useTheme();

  const getColor = (color: ModalButton['color']) => {
    switch (color) {
      case 'error':
        return theme.colors.error;
      case 'warning':
        return '#FFC107';
      case 'info':
        return '#2196F3';
      default:
        return theme.colors.primary;
    }
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={[styles.modal, {backgroundColor: theme.colors.background}]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
        <View style={styles.buttonContainer}>
          {buttons.map((button, index) => (
            <Button
              key={index}
              mode="contained"
              onPress={button.onPress}
              textColor= {theme.colors.background}
              style={[
                styles.button,
                {backgroundColor: getColor(button.color)},
              ]}>
              {button.label}
            </Button>
          ))}
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    padding: 24,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  button: {
    width: '45%',
  },
});

export default ModalComponent;
