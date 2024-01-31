import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import api from "../api/api";
import { components } from "../components";
import { theme } from "../constants";
import { DebtCollection } from "../utils/types";

const RecuperacionDiaria: React.FC = () => {
  const [data, setData] = useState<DebtCollection[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation: any = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const response = await api.get(`/debt/collection/pending`);
    setLoading(false);
    setData(response.data.data);
  };

  const renderHeader = () => {
    return (
      <components.Header
        title="Recuperación diaria"
        goBack={true}
        goBackColor={theme.COLORS.white}
      />
    );
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

        {data && data.length > 0 && (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.debt_collections.id.toString()}
          />
        )}
      </View>
    );
  };

  const handleNavigation = (id: number) => {
    navigation.navigate("Cobranza", { id: id });
  };

  const renderItem = ({ item }: { item: any }) => {
    return (
      <Item
        item={item}
        onPress={() => handleNavigation(item.debt_collections.id)}
      />
    );
  };

  const Item = ({
    item,
    onPress
  }: {
    item: DebtCollection;
    onPress: () => void;
  }) => {
    const collection: DebtCollection = item;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          width: "100%",
          backgroundColor: theme.COLORS.white,
          borderRadius: 10,
          marginBottom: 10,
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <View>
          <Text
            style={{
              ...theme.FONTS.H6,
              color: theme.COLORS.mainDark
            }}
          >
            {collection?.client.name} {collection?.client.surname} (
            {collection.credit.id})
          </Text>
          <Text
            style={{
              ...theme.FONTS.Mulish_400Regular,
              fontSize: 12,
              lineHeight: 12 * 1.6,
              color: theme.COLORS.bodyTextColor
            }}
          >
            Monto - {collection?.debt_collections.amount_to_pay}
          </Text>
        </View>
        <View style={{ marginLeft: "auto" }}>
          <Text
            style={{
              ...theme.FONTS.H6,
              color: theme.COLORS.mainDark,
              textAlign: "right"
            }}
          >
            {collection?.client.residence_municipality}
          </Text>
          <Text
            style={{
              ...theme.FONTS.Mulish_400Regular,
              fontSize: 12,
              lineHeight: 12 * 1.6,
              color: theme.COLORS.bodyTextColor,
              textAlign: "right"
            }}
          >
            {collection?.client.residence_address}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {renderHeader()}

      <SafeAreaView style={{ flex: 1 }}>{renderContent()}</SafeAreaView>
    </>
  );
};

export default RecuperacionDiaria;
