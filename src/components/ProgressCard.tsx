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
          radius={60}
          innerRadius={50}
          data={pieData}
          centerLabelComponent={() => {
            return (
              <Text
                style={{
                  fontSize: 20,
                  color: theme.COLORS.bodyTextColor
                }}
              >
                {`${Math.round((qoutient / divisor) * 100)}%`}
              </Text>
            );
          }}
        />
      </View>
      <Text
        style={{ ...theme.FONTS.Mulish_500Medium }}
      >{`${qoutient}Q / ${divisor}Q`}</Text>
    </View>
  );
};

export default ProgressCard;
