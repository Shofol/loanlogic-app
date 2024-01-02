import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { theme } from "../constants";

const CustomFileUploader = ({ onSelect }: { onSelect: () => void }) => {
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        borderColor: theme.COLORS.green,
        borderWidth: 2,
        borderRadius: 5,
        borderStyle: "dashed"
      }}
      onPress={(e) => {
        onSelect();
      }}
    >
      <View
        style={{
          backgroundColor: theme.COLORS.white,
          padding: 10,
          borderRadius: 5
        }}
      >
        <Text
          style={{
            fontSize: 14,
            textAlign: "center",
            fontWeight: "bold",
            color: theme.COLORS.bodyTextColor
          }}
        >
          Cargar Foto
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomFileUploader;
