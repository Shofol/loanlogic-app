import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, View } from "react-native";
import api from "../api/api";
import { components } from "../components";
import CoberturaItem from "../components/CoberturaItem";
import { theme } from "../constants";
import { Guarantee } from "../utils/types";

const Cobertura: React.FC = () => {
  const [data, setData] = useState<Guarantee[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataFetchingCompleted, setDataFetchingCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!dataFetchingCompleted && currentPage === 1) {
      fetchData();
    }
  }, [dataFetchingCompleted, currentPage]);

  const fetchData = async () => {
    if (!dataFetchingCompleted) {
      setLoading(true);
      const response = await api.get(
        `tasks/address-validation?page=${currentPage}&pageSize=10`
      );
      setData(
        currentPage === 1
          ? [...response.data.data]
          : [...data, ...response.data.data]
      );

      if (
        +response.data.pagination.totalPages > +response.data.pagination.page
      ) {
        setCurrentPage(+response.data.pagination.page + 1);
      } else {
        setDataFetchingCompleted(true);
      }
      setLoading(false);
    }
  };

  const ListEndLoader = () => {
    if (data.length > 0 && loading) {
      return <ActivityIndicator size={"large"} />;
    }
  };

  const renderHeader = () => {
    return (
      <components.Header
        title="Confirmación Cobertura"
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
            keyExtractor={(item) => item.id.toString()}
            onEndReached={() => fetchData()}
            ListFooterComponent={ListEndLoader}
          />
        )}
      </View>
    );
  };

  const renderItem = ({ item }: { item: any }) => {
    return (
      <CoberturaItem
        item={item}
        fetchData={() => {
          setDataFetchingCompleted(false);
          setCurrentPage(1);
        }}
      />
    );
  };

  return (
    <>
      {renderHeader()}
      <SafeAreaView style={{ flex: 1 }}>{renderContent()}</SafeAreaView>
    </>
  );
};

export default Cobertura;
