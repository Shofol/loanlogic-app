import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { components } from "../components";
import Colocacion from "../components/Stat/Colocacion";
import DesgloseRecuperación from "../components/Stat/DesgloseRecuperación";
import MoraStat from "../components/Stat/MoraStat";
import Recuperación from "../components/Stat/Recuperación";
import { theme } from "../constants";

const Dashboard = () => {
  const renderHeader = () => {
    return (
      <components.Header
        title="Dashboard"
        goBack={false}
        goBackColor={theme.COLORS.white}
      />
    );
  };

  const renderContent = () => {
    return (
      <View style={{ paddingHorizontal: 20, flex: 1, marginTop: 20 }}>
        <ScrollView>
          <MoraStat />
          <Colocacion />
          <Recuperación />
          <DesgloseRecuperación />
        </ScrollView>
      </View>
    );
  };

  return (
    <>
      {renderHeader()}
      {renderContent()}
    </>
  );
};

export default Dashboard;
