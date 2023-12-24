import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { theme } from "../constants";

type Props = {
  containerStyle?: any;
  onPress?: () => void;
  title?: string;
};

const Button: React.FC<Props> = ({ title, onPress, containerStyle }) => {
  return (
    <View style={{ ...containerStyle, width: "100%" }}>
      <TouchableOpacity onPress={onPress}>
        <LinearGradient
          colors={["#B1CB0D", "#5CAA1D"]}
          style={{
            width: "100%",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text
            style={{
              color: theme.COLORS.white,
              ...theme.FONTS.Mulish_600SemiBold,
              fontSize: 16
            }}
          >
            {title}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default Button;
