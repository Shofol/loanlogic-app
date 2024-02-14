import React from "react";
import { Text, TouchableHighlight, View } from "react-native";
import { theme } from "../constants";
import { svg } from "../svg";

const LocationButton = ({
  locationAdded,
  onPress
}: {
  locationAdded: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableHighlight
      style={{
        padding: 12,
        borderRadius: 5,
        backgroundColor: locationAdded
          ? theme.COLORS.bodyTextColor
          : theme.COLORS.linkColor
      }}
      disabled={locationAdded}
      onPress={onPress}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {locationAdded && (
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 50,
              height: 15,
              width: 15,
              justifyContent: "center",
              alignItems: "center",
              margin: 5
            }}
          >
            <svg.CheckSvg></svg.CheckSvg>
          </View>
        )}
        <Text style={{ color: theme.COLORS.white, textAlign: "center" }}>
          {locationAdded ? "Coordenadas agregadas" : "Agregar coordenadas"}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default LocationButton;
