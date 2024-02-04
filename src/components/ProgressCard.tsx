import React from "react";
import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { ComponentStyles, theme } from "../constants/theme";

const ProgressCard = ({
  pieData,
  qoutient,
  divisor,
  title
}: {
  pieData: any[];
  qoutient: number;
  divisor: number;
  title: string;
}) => {
  return (
    <View
      style={[
        ComponentStyles.card,
        { justifyContent: "center", alignItems: "center" }
      ]}
    >
      <Text
        style={{
          ...theme.FONTS.H5,
          color: theme.COLORS.bodyTextColor
        }}
      >
        {title}
      </Text>

      <View style={{ marginVertical: 20 }}>
        <PieChart
          donut
          radius={80}
          innerRadius={60}
          data={pieData}
          centerLabelComponent={() => {
            return (
              <Text
                style={{
                  fontSize: 16,
                  color: theme.COLORS.bodyTextColor
                }}
              >
                {`${Math.round((qoutient / divisor) * 100)}%`}
              </Text>
            );
          }}
        />
      </View>
      <Text style={{ ...theme.FONTS.Mulish_500Medium }}>{`${qoutient.toFixed(
        2
      )}Q / ${divisor.toFixed(2)}Q`}</Text>
    </View>
  );
};

export default ProgressCard;
