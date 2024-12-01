import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(44, 62, 80)',
  },
  headerImageTop: {
    width: '100%',
    zIndex: 2,
    position: 'absolute',
  },
  headerImageBottom: {
    width: '100%',
    zIndex: 2,
    position: 'absolute',
    bottom: 0,
    transform: [{rotate: '180deg'}],
  },
});