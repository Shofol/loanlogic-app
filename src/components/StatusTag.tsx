import React from "react";
import { Text, View } from "react-native";
import { theme } from "../constants";
import { getStatusColor } from "../utils/functions";

const StatusTag = ({ status }: { status: string }) => {
  return (
    <View
      style={{
        backgroundColor: getStatusColor(status),
        paddingHorizontal: 10,
        borderRadius: 5
      }}
    >
      <Text
        style={{
          ...theme.FONTS.Mulish_400Regular,
          fontSize: 10,
          lineHeight: 12 * 1.6,
          color: theme.COLORS.white
        }}
      >
        {`${status}`}
      </Text>
    </View>
  );
};

export default StatusTag;
