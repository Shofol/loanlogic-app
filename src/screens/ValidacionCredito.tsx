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
import StatusTag from "../components/StatusTag";
import { theme } from "../constants";
import { Guarantee } from "../utils/types";

const ValidacionCredito: React.FC = () => {
  const [data, setData] = useState<Guarantee[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataFetchingCompleted, setDataFetchingCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation: any = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (!dataFetchingCompleted) {
      setLoading(true);
      const response = await api.get(
        `/tasks/credit-validation?page=${currentPage}&pageSize=10`
      );
      if (
        +response.data.pagination.totalPages > +response.data.pagination.page
      ) {
        setCurrentPage(+response.data.pagination.page + 1);
      } else {
        setDataFetchingCompleted(true);
      }
      setLoading(false);
      setData([...data, ...response.data.data]);
    }
  };

  const ListEndLoader = () => {
    if (data.length > 0 && loading) {
      return <ActivityIndicator size={"large"} />;
    }
  };

  const renderHeader = () => {
    return <components.Header title="Validación Crédito" goBack={true} />;
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
            keyExtractor={(item) => item.id.toString()}
            onEndReached={() => fetchData()}
            ListFooterComponent={ListEndLoader}
          />
        )}
      </View>
    );
  };

  const handleNavigation = (id: number) => {
    navigation.navigate("ValidarCréditoForm", { id: id });
  };

  const renderItem = ({ item }: { item: any }) => {
    return <Item item={item} onPress={() => handleNavigation(item.id)} />;
  };

  const Item = ({
    item,
    onPress
  }: {
    item: Guarantee;
    onPress: () => void;
  }) => {
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
          alignItems: "flex-start",
          justifyContent: "flex-start"
        }}
      >
        <View>
          <StatusTag status={item.status} />

          <Text
            style={{
              ...theme.FONTS.H6,
              color: theme.COLORS.mainDark
            }}
          >
            {item?.client.name} {item?.client.surname} ({item.id})
          </Text>
          <Text
            style={{
              ...theme.FONTS.Mulish_400Regular,
              fontSize: 12,
              lineHeight: 12 * 1.6,
              color: theme.COLORS.bodyTextColor
            }}
          >
            {item?.client.residence_address}
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
            {item?.client.department_of_residence}
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
            {item?.client.residence_municipality}
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

export default ValidacionCredito;