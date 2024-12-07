import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    avatarContainer: {
      gap: 10,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: 10,
    },
    userName: {
      marginLeft: 10,
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });