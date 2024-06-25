import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { screens } from "../screens";

import TabNavigator from "./TabNavigator";

const Stack = createStackNavigator();

const StackNavigator: React.FC = () => {
  const initialScreen = "Onboarding";

  return (
    <Stack.Navigator
      initialRouteName={initialScreen}
      screenOptions={{
        gestureEnabled: false,
        cardStyle: { backgroundColor: "white" }
      }}
    >
      <Stack.Screen
        name="Onboarding"
        component={screens.Onboarding}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Solicitudes"
        component={screens.Solicitudes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FotoGarantía"
        component={screens.FotoGarantia}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Garantía"
        component={screens.Garantia}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Cobranza"
        component={screens.Cobranza}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Clientes"
        component={screens.Clientes}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CuotaAdelantada"
        component={screens.CuotaAdelantada}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ValidaciónCrédito"
        component={screens.ValidacionCredito}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ValidarCréditoForm"
        component={screens.ValidationForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Pago"
        component={screens.Pago}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignIn"
        component={screens.SignIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={screens.SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewPassword"
        component={screens.NewPassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
