import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const COLORS = {
  mainDark: "#1B1D4D",
  bodyTextColor: "#4C4C60",
  white: "#FFFFFF",
  bgColor: "#EDF0F2",
  green: "#3EB290",
  grey1: "#D8D9DB",
  linkColor: "#26C770",
  transparent: "transparent",
  warning: "#ff7207",
  danger: "#dc3444"
};

const FONTS = {
  H1: {
    fontFamily: "Mulish_700Bold",
    fontSize: 44,
    lineHeight: 48 * 1.2
  },
  H2: {
    fontFamily: "Mulish_700Bold",
    fontSize: 36,
    lineHeight: 36 * 1.2
  },
  H3: {
    fontFamily: "Mulish_700Bold",
    fontSize: 28,
    lineHeight: 28 * 1.2
  },
  H4: {
    fontFamily: "Mulish_500Medium",
    fontSize: 20,
    lineHeight: 20 * 1.2
  },
  H5: {
    fontFamily: "Mulish_600SemiBold",
    fontSize: 16,
    lineHeight: 16 * 1.3
  },
  H6: {
    fontFamily: "Mulish_600SemiBold",
    fontSize: 14,
    lineHeight: 14 * 1.6
  },
  Mulish_400Regular: {
    fontFamily: "Mulish_400Regular"
  },
  Mulish_500Medium: {
    fontFamily: "Mulish_500Medium"
  },
  Mulish_600SemiBold: {
    fontFamily: "Mulish_600SemiBold"
  },
  Mulish_700Bold: {
    fontFamily: "Mulish_700Bold"
  }
};

export const InputStyles = StyleSheet.create({
  field: {
    flexDirection: "column",
    marginBottom: 20
  },
  container: {
    height: 50,
    width: "100%",
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "transparent"
  },
  containerBg: {
    height: 50,
    width: "100%",
    backgroundColor: COLORS.bgColor,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "transparent"
  },
  input: {
    flex: 1,
    height: "100%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 14,
    lineHeight: 16 * 1,
    ...FONTS.Mulish_400Regular
  },
  label: {
    marginBottom: 10,
    fontSize: 16,
    color: COLORS.mainDark
  },
  error: {
    marginTop: 10,
    color: "#fb504f",
    fontWeight: "bold"
  }
});

export const Wizard = StyleSheet.create({
  header: {
    textAlign: "center",
    ...FONTS.H3,
    color: COLORS.linkColor,
    marginBottom: 30
  }
});

export const ComponentStyles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    borderRadius: 10,
    padding: 20,
    marginTop: 20
  }
});

export const DataStyle = StyleSheet.create({
  data: {
    ...FONTS.Mulish_400Regular,
    fontSize: 14,
    lineHeight: 12 * 1.6,
    color: COLORS.bodyTextColor
  },
  dataSemiBold: {
    ...FONTS.Mulish_600SemiBold,
    fontSize: 14,
    lineHeight: 12 * 1.6,
    color: COLORS.bodyTextColor
  },
  separator: {
    borderBottomColor: COLORS.bodyTextColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 5
  }
});

const SIZES = {
  width,
  height
};

const theme = {
  COLORS,
  SIZES,
  FONTS
};

export { COLORS, FONTS, SIZES, theme };
