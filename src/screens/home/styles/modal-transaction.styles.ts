import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    formContainer: {
      backgroundColor: 'white',
      margin: 20,
      padding: 20,
      borderRadius: 10,
      gap: 10,
    },
    title: {
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
    },
    input: {
      marginBottom: 8,
    },
    radioOption: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 16,
    },
    button: {
      flex: 1,
      marginHorizontal: 8,
    },
    radioGroup: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-around',
    },
    datePicker: {
      
    },
    errorText: {
      color: 'red',
      fontSize: 12,
      marginBottom: 8,
    },
    dropdown: {
      width: '100%',
      height: 50,
      backgroundColor: 'white',
      borderRadius: 5,
      padding: 12,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
      borderWidth: 0.5,
    },
    icon: {
      marginRight: 5,
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textItem: {
      flex: 1,
      fontSize: 16,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
      },
  });

export default styles;
