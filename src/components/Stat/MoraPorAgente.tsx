import React, { useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView, Text, View } from "react-native";
import api from "../../api/api";
import { theme } from "../../constants";

const MoraPorAgente: React.FC = () => {
  const [data, setData] = useState<MoraAgente[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await api.get(`stats/default_breakdown`);
    setData(response.data.data);
  };

  const renderContent = () => {
    return (
      <View style={{ paddingHorizontal: 20, flex: 1, marginTop: 20 }}>
        {data.length <= 0 && loading && (
          <ActivityIndicator
            style={{ marginTop: "70%" }}
            size="large"
            color={theme.COLORS.linkColor}
          />
        )}

        <View
          style={{
            width: "100%",
            backgroundColor: theme.COLORS.white,
            borderRadius: 10,
            marginBottom: 10,
            padding: 10,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text style={[{ ...theme.FONTS.H5 }]}>MORA POR PROMOTOR</Text>
        </View>

        {data &&
          data.length > 0 &&
          data.map((item) => {
            return <Item key={item.user.id} item={item} />;
          })}
      </View>
    );
  };

  const Item = ({ item }: { item: MoraAgente }) => {
    return (
      <View
        style={{
          width: "100%",
          backgroundColor: theme.COLORS.white,
          borderRadius: 10,
          marginBottom: 10,
          padding: 10,
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <View style={{ flex: 1 }}>
          <Text
            style={{
              ...theme.FONTS.H6,
              color: theme.COLORS.mainDark
            }}
          >
            {item?.user.name} {item?.user.family_name} ({item.user.id})
          </Text>
          <Text
            style={{
              ...theme.FONTS.Mulish_400Regular,
              fontSize: 12,
              lineHeight: 12 * 1.6,
              color: theme.COLORS.bodyTextColor
            }}
          >
            Mora - {item?.default_amount}Q
          </Text>
          <Text
            style={{
              ...theme.FONTS.Mulish_400Regular,
              fontSize: 12,
              color: theme.COLORS.bodyTextColor,
              textAlign: "right"
            }}
          >
            {item.default_percentage}%
          </Text>

          <View
            style={{
              height: 5,
              backgroundColor: theme.COLORS.sage,
              width: "100%",
              borderRadius: 20,
              marginVertical: 5,
              position: "relative",
              overflow: "hidden"
            }}
          >
            <View
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                maxWidth: "100%",
                width: `${item.default_percentage}%`,
                backgroundColor: returnColor(item.default_percentage),
                borderRadius: 5
              }}
            ></View>
          </View>
        </View>
      </View>
    );
  };

  const returnColor = (value: number) => {
    if (value < 40) {
      return theme.COLORS.green;
    } else if (value >= 40 && value < 80) {
      return theme.COLORS.warning;
    } else {
      return theme.COLORS.danger;
    }
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>{renderContent()}</SafeAreaView>
    </>
  );
};

type MoraAgente = {
  user: User;
  default_amount: string;
  default_percentage: number;
};

type User = {
  id: number;
  name: string;
  family_name: string;
};

export default MoraPorAgente;
