import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import api from "../../api/api";
import { ComponentStyles, theme } from "../../constants/theme";

const DesgloseRecuperación = () => {
  const [data, setData] = useState(null);
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await api.get(`/stats/debt_collection_breakdown`);
    setData(response.data.data);
    setList([
      {
        title: "Ingresos recuperación",
        value: response.data.data?.collected
      },
      {
        title: "Ingresos por papelería",
        value: response.data.data?.administrative
      },
      {
        title: "Ingresos por asistencias",
        value: response.data.data?.assistance
      },
      {
        title: "Ingresos por adelantos: (voluntario)",
        value: response.data.data?.advanced
      },
      {
        title: "Ingresos por anticipios: (días corridos)",
        value: response.data.data?.holidays
      },
      {
        title: "Ingresos recuperación TOTAL",
        value: response.data.data?.total_collected
      }
    ]);
  };
  type ItemProps = { title: string; value: string };

  const Item = ({ title, value }: ItemProps) => (
    <View>
      <Text
        style={[{ ...theme.FONTS.Mulish_400Regular }, { marginVertical: 5 }]}
      >
        {title}: {value}
      </Text>
    </View>
  );

  return (
    <View
      style={[
        ComponentStyles.card,
        { justifyContent: "center", alignItems: "center" }
      ]}
    >
      <Text style={[{ ...theme.FONTS.H5 }, { marginBottom: 5 }]}>
        DESGLOSE RECUPERACIÓN
      </Text>

      <FlatList
        data={list}
        renderItem={({ item }) => (
          <Item title={item.title} value={item.value} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default DesgloseRecuperación;
