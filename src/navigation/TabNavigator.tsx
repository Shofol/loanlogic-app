import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setScreen } from "../store/tabSlice";

import { theme } from "../constants";
import { screens } from "../screens";
import { svg } from "../svg";

const TabNavigator = () => {
  const dispatch = useDispatch();

  const currentScreen = useSelector((state: any) => state.tab.screen);

  enum Tab {
    Dashboard = "Dashboard",
    Solicitudes = "Solicitudes",
    Garantía = "Garantía",
    RecuperaciónDiaria = "Recuperación Diaria"
    // Loans = "Loans",
    // Notifications = "Notifications",
    // More = "More"
  }

  const tabs = [
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
      name: Tab.Garantía,
      icon: (
        <svg.WalletSvg
          color={
            currentScreen === Tab.Garantía
              ? theme.COLORS.linkColor
              : theme.COLORS.bodyTextColor
          }
        />
      )
    },
    {
      name: Tab.Solicitudes,
      icon: (
        <svg.SafeDepositSvg
          color={
            currentScreen === Tab.Solicitudes
              ? theme.COLORS.linkColor
              : theme.COLORS.bodyTextColor
          }
        />
      )
    },

    {
      name: Tab.RecuperaciónDiaria,
      icon: (
        <svg.SafeDepositSvg
          color={
            currentScreen === Tab.RecuperaciónDiaria
              ? theme.COLORS.linkColor
              : theme.COLORS.bodyTextColor
          }
        />
      )
    }

    // {
    //   name: Tab.Loans,
    //   icon: (
    //     <svg.WalletSvg
    //       color={
    //         currentScreen === Tab.Loans
    //           ? theme.COLORS.linkColor
    //           : theme.COLORS.bodyTextColor
    //       }
    //     />
    //   )
    // },
    // {
    //   name: Tab.Notifications,
    //   icon: (
    //     <View>
    //       <svg.NotificationSvg
    //         color={
    //           currentScreen === Tab.Notifications
    //             ? theme.COLORS.linkColor
    //             : theme.COLORS.bodyTextColor
    //         }
    //       />
    //       <View
    //         style={{
    //           width: 8,
    //           height: 8,
    //           borderRadius: 4,
    //           backgroundColor: theme.COLORS.linkColor,
    //           position: "absolute",
    //           right: 0,
    //           top: -1
    //         }}
    //       />
    //     </View>
    //   )
    // },
    // {
    //   name: Tab.More,
    //   icon: (
    //     <svg.MoreSvg
    //       color={
    //         currentScreen === Tab.More
    //           ? theme.COLORS.linkColor
    //           : theme.COLORS.bodyTextColor
    //       }
    //     />
    //   )
    // }
  ];

  return (
    <View style={{ flex: 1, backgroundColor: theme.COLORS.bgColor }}>
      {currentScreen === Tab.Dashboard && <screens.Dashboard />}
      {currentScreen === Tab.Garantía && <screens.FotoGarantía />}
      {currentScreen === Tab.Solicitudes && <screens.Solicitudes />}
      {currentScreen === Tab.RecuperaciónDiaria && (
        <screens.RecuperaciónDiaria />
      )}
      {/* {currentScreen === Tab.Loans && <screens.Loans />} */}
      {/* {currentScreen === Tab.Notifications && <screens.Notification />} */}
      {/* {currentScreen === Tab.More && <screens.More />} */}
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
            paddingHorizontal: 22,
            paddingBottom: 28,
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
              >
                <View
                  style={{
                    alignSelf: "center",
                    marginBottom: 6
                  }}
                >
                  {item.icon}
                </View>
                <Text
                  style={{
                    textAlign: "center",
                    ...theme.FONTS.Mulish_600SemiBold,
                    fontSize: 10,
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
