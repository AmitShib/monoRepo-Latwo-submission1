import { StyleSheet } from 'react-native';
import SPACING from "../../../Tools/ThemeConsts/SPACING";

const styles = StyleSheet.create({
  toggleButton: {
    backgroundColor: "#EFB60E",
    paddingVertical: SPACING * 0.5,
    paddingHorizontal: SPACING * 0.5,
    borderRadius: SPACING * 0.5,
    marginBottom: SPACING * 2,
    width: "50%",
    alignSelf: "center",
  },
  toggleButtonText: {
    fontSize: SPACING * 1.2,
    fontWeight: "900",
    color: "black",
    textAlign: "center",
  },
});

export default styles;
