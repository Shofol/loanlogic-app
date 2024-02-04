import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setScreen } from "../store/tabSlice";

import * as SecureStore from "expo-secure-store";
import { theme } from "../constants";
import { screens } from "../screens";
import { svg } from "../svg";

const TabNavigator = () => {
  const dispatch = useDispatch();

  const currentScreen = useSelector((state: any) => state.tab.screen);

  enum Tab {
    Dashboard = "Dashboard",
    Solicitudes = "Solicitudes",
    Garantia = "Garantía",
    RecuperacionDiaria = "Recuperación",
    Clientes = "Clientes",
    Cobertura = "Cobertura",
    ValidacionCredito = "Validación"
  }
  let initalTabs = [
    {
      name: Tab.Dashboard,
      icon: (
        <svg.ReportSvg
          color={
            currentScreen === Tab.Dashboard
              ? theme.COLORS.linkColor
              : theme.COLORS.bodyTextColor
          }
        />
      )
    },
    {
      name: Tab.Garantia,
      icon: (
        <svg.WalletSvg
          color={
            currentScreen === Tab.Garantia
              ? theme.COLORS.linkColor
              : theme.COLORS.bodyTextColor
          }
        />
      )
    },
    {
      name: Tab.Solicitudes,
      icon: (
        <svg.CreditCardSvg
          color={
            currentScreen === Tab.Solicitudes
              ? theme.COLORS.linkColor
              : theme.COLORS.bodyTextColor
          }
        />
      )
    },
    {
      name: Tab.Clientes,
      icon: (
        <svg.UserOneSvg
          color={
            currentScreen === Tab.Clientes
              ? theme.COLORS.linkColor
              : theme.COLORS.bodyTextColor
          }
        />
      )
    },
    {
      name: Tab.RecuperacionDiaria,
      icon: (
        <svg.SafeDepositSvg
          color={
            currentScreen === Tab.RecuperacionDiaria
              ? theme.COLORS.linkColor
              : theme.COLORS.bodyTextColor
          }
        />
      )
    },
    {
      name: Tab.Cobertura,
      icon: (
        <svg.PiggyBankSvg
          color={
            currentScreen === Tab.Cobertura
              ? theme.COLORS.linkColor
              : theme.COLORS.bodyTextColor
          }
        />
      )
    },
    {
      name: Tab.ValidacionCredito,
      icon: (
        <svg.TypeCardSvg
          color={
            currentScreen === Tab.ValidacionCredito
              ? theme.COLORS.linkColor
              : theme.COLORS.bodyTextColor
          }
        />
      )
    }
  ];
  const [tabs, setTabs] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      let user = JSON.parse((await SecureStore.getItemAsync("user")) as string);
      if (user?.role === "AGENT") {
        setTabs(
          initalTabs.filter(
            (tab) =>
              tab.name !== Tab.ValidacionCredito && tab.name !== Tab.Cobertura
          )
        );
      } else {
        setTabs(initalTabs);
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.COLORS.bgColor }}>
      {currentScreen === Tab.Dashboard && <screens.Dashboard />}
      {currentScreen === Tab.Garantia && <screens.FotoGarantia />}
      {currentScreen === Tab.Solicitudes && <screens.Solicitudes />}
      {currentScreen === Tab.Clientes && <screens.Clientes />}
      {currentScreen === Tab.RecuperacionDiaria && (
        <screens.RecuperacionDiaria />
      )}
      {currentScreen === Tab.Cobertura && <screens.Cobertura />}
      {currentScreen === Tab.ValidacionCredito && <screens.ValidacionCredito />}
      <View
        style={{
          width: "100%",
          borderRadius: 10,
          backgroundColor: "white"
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 10,
            paddingBottom: 15,
            paddingTop: 15,
            backgroundColor: theme.COLORS.white,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10
          }}
        >
          {tabs.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => dispatch(setScreen(item.name))}
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <View
                  style={{
                    alignSelf: "center",
                    marginBottom: 6,
                    height: 20
                  }}
                >
                  {item.icon}
                </View>
                <Text
                  style={{
                    textAlign: "center",
                    ...theme.FONTS.Mulish_600SemiBold,
                    fontSize: 8,
                    color:
                      item.name === currentScreen
                        ? theme.COLORS.linkColor
                        : theme.COLORS.mainDark
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default TabNavigator;
