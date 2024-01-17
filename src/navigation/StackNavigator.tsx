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
        component={screens.FotoGarantía}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Garantía"
        component={screens.Garantía}
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
        name="ValidaciónCrédito"
        component={screens.ValidaciónCrédito}
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
        name="Profile"
        component={screens.Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditPersonalInfo"
        component={screens.EditPersonalInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ExchangeRates"
        component={screens.ExchangeRates}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CardMenu"
        component={screens.CardMenu}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CardDetails"
        component={screens.CardDetails}
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
        name="SignInCode"
        component={screens.SignInCode}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangePinCode"
        component={screens.ChangePinCode}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpAccountCreated"
        component={screens.SignUpAccountCreated}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Statistics"
        component={screens.Statistics}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="StatisticsChooseCard"
        component={screens.StatisticsChooseCard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TopUpPayment"
        component={screens.TopUpPayment}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TransactionDetails"
        component={screens.TransactionDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TransactionHistory"
        component={screens.TransactionHistory}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="VerifyYourPhoneNumber"
        component={screens.VerifyYourPhoneNumber}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ConfirmationCode"
        component={screens.ConfirmationCode}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateInvoice"
        component={screens.CreateInvoice}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FAQ"
        component={screens.FAQ}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={screens.ForgotPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPasswordSentEmail"
        component={screens.ForgotPasswordSentEmail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FundTransfer"
        component={screens.FundTransfer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="IbanPayment"
        component={screens.IbanPayment}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InvoiceSent"
        component={screens.InvoiceSent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MobilePayment"
        component={screens.MobilePayment}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NewPassword"
        component={screens.NewPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OpenMoneybox"
        component={screens.OpenMoneybox}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OpenNewCard"
        component={screens.OpenNewCard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PaymentFailed"
        component={screens.PaymentFailed}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Payments"
        component={screens.Payments}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PaymentSuccess"
        component={screens.PaymentSuccess}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={screens.PrivacyPolicy}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
