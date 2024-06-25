import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  SafeAreaView,
  Text,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { PieChart } from "react-native-gifted-charts";
import Toast from "react-native-toast-message";
import api from "../api/api";
import { components } from "../components";
import CustomCheckbox from "../components/CustomCheckbox";
import CustomInput from "../components/CustomInput";
import { theme } from "../constants";
import { ComponentStyles, DataStyle, InputStyles } from "../constants/theme";
import { DebtCollection } from "../utils/types";

const Cobranza: React.FC = ({ route, navigation }: any) => {
  const { id } = route.params;
  const [data, setData] = useState<DebtCollection>();
  const [pieData, setPieData] = useState<any[]>([]);
  const [totalPaid, setTotalPaid] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [errors, setErrors] = useState(false);
  const [exonerationErrors, setExonerationErrors] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  const [payment_made, setPayment_made] = useState<string>();
  const [exoneration_description, setExoneration_description] =
    useState<string>();
  const [exoneration_requested, setExoneration_requested] =
    useState<boolean>(false);

  const submit = async () => {
    if (!payment_made || (exoneration_requested && !exoneration_description)) {
      if (!payment_made) {
        setErrors(true);
      }
      if (exoneration_requested && !exoneration_description) {
        setExonerationErrors(true);
        return;
      }
      return;
    }

    const values = {
      payment_made: payment_made
    };

    try {
      const response = await api.put(`/debt/collection/${id}`, values);
      setNewData(response);
      Toast.show({
        type: "success",
        text1: response.data.message,
        position: "bottom",
        visibilityTime: 2000
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.response.data.error,
        text1Style: { overflow: "scroll" },
        position: "bottom",
        visibilityTime: 2000
      });
      console.log(error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const response = await api.get(`/debt/collection/${id}`);
    setLoading(false);
    setNewData(response);
  };

  const setNewData = (response: any) => {
    const paymentMade = +response.data.data?.debt_collection.payment_made;
    if (paymentMade) {
      setPayment_made(paymentMade > 0 ? `${paymentMade}` : "");
    }
    setTotalPaid(response.data.data?.debt_collection.total_paid_amount);
    setTotal(response.data.data?.credit.total_amount);
    setTotalPending(response.data.data?.debt_collection.total_pending_amount);
    const progressValue: number = Math.round(
      (response.data.data?.debt_collection.total_paid_amount /
        response.data.data?.credit.total_amount) *
        100
    );

    setPieData([
      {
        value: progressValue,
        color: theme.COLORS.linkColor,
        text: `${progressValue}%`
      },
      {
        value: 100 - progressValue,
        color: theme.COLORS.bgColor,
        text: `${100 - progressValue}%`
      }
    ]);

    setData(response.data.data);
  };

  const renderHeader = () => {
    return (
      <components.Header
        title={`Cobranza (${id})`}
        goBack={true}
        goBackColor={theme.COLORS.white}
      />
    );
  };

  const checkValidation = (data: DebtCollection) => {
    if (!data?.debt_collection?.default_amount) {
      return true;
    } else if (
      +data?.debt_collection?.default_amount > 0 &&
      data?.debt_collection?.status === "PENDING"
    ) {
      return false;
    } else {
      return true;
    }
  };

  const print = async () => {
    const html = `<h1 style="font-weight:'bold'">${data?.client.name.toUpperCase()}  
      ${data?.client.surname.toUpperCase()} 
      ${data?.client.second_surname.toUpperCase()}</h1>
     <p><strong>DPI:</strong> ${data?.client.dpi_number}</p>
     <p><strong>Núm. Crédito:</strong> ${data?.credit.id}</p>
     <p><strong>Fecha crédito:</strong> ${data?.credit.disbursement_date}</p>
     <p><strong>Monto solicitado:</strong> ${
       data?.credit.requested_amount
     } Q</p>
     <p><strong>Crédito:</strong> ${data?.credit.product_name}</p>
     <p><strong>Capital crédito:</strong> ${
       data?.credit.total_credit_amount
     } Q</p>
    <p><strong>Cuota crédito:</strong> ${
      data?.debt_collection?.credit_fee
    } Q</p>
    <p><strong>Total adeudado:</strong> ${data?.credit.total_amount} Q</p> 
    <p><strong>Capital e intereses amortizado:</strong> ${totalPaid} Q</p>
    <p><strong>Capital e interés pendiente:</strong> ${totalPending} Q</p>
    <p><strong>Fecha Pago:</strong> ${data?.debt_collection?.payment_date}</p>
    <p><strong>Cuota crédito:</strong> ${
      data?.debt_collection?.credit_fee
    } Q</p>
    <p><strong>Mora:</strong> ${data?.debt_collection?.default_amount} Q</p>
    <p><strong>Interés mora:</strong> ${
      data?.debt_collection?.default_interest
    } Q</p>
    <p><strong>Monto total:</strong> ${
      data?.debt_collection?.amount_to_pay
    } Q</p>
    <p><strong>Pago realizado:</strong> ${
      data?.debt_collection?.paid_default_interest_with_tax
    } Q</p>
    <p><strong>Estado:</strong>
    ${
      data?.debt_collection?.status == " PAID"
        ? " PAGADO"
        : data?.debt_collection?.status == " PARTIALLY_PAID"
        ? " PAGO PARCIAL"
        : data?.debt_collection?.status == " PENDING"
        ? " PENDIENTE"
        : " IMPAGO"
    }
  </p>
  <p><strong>
    #Pago:</strong> ${data?.debt_collection?.no_of_installment}
  </p>
    `;

    const { uri } = await Print.printToFileAsync({ html });
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  return (
    <>
      {renderHeader()}

      <SafeAreaView style={{ backgroundColor: theme.COLORS.bgColor, flex: 1 }}>
        {data && loading && (
          <ActivityIndicator
            style={{ marginTop: "70%" }}
            size="large"
            color={theme.COLORS.linkColor}
          />
        )}
        <ScrollView>
          {data && (
            <>
              <View style={ComponentStyles.card}>
                <Text
                  style={{
                    color: theme.COLORS.linkColor,
                    ...theme.FONTS.H4,
                    marginBottom: 2
                  }}
                >
                  {`${data?.client.name.toUpperCase()} ` +
                    `${data?.client.surname.toUpperCase()} ` +
                    `${data?.client.second_surname.toUpperCase()}`}
                </Text>

                <Text style={DataStyle.data}>
                  DPI: {data?.client.dpi_number}
                </Text>
                <Text style={DataStyle.data}>
                  Núm. Crédito:{` ${data?.credit.id}`}
                </Text>
                <Text style={DataStyle.data}>
                  Fecha crédito: {data?.credit.disbursement_date}
                </Text>
                <Text style={DataStyle.data}>
                  Monto solicitado: {data?.credit.requested_amount} Q
                </Text>
                <Text style={DataStyle.data}>
                  Crédito: {data?.credit.product_name}
                </Text>
                <Text style={DataStyle.data}>
                  Capital crédito: {data?.credit.total_credit_amount} Q
                </Text>
                <Text style={DataStyle.data}>
                  Cuota crédito: {data?.debt_collection?.credit_fee} Q
                </Text>
                <Text style={DataStyle.data}>
                  Total adeudado: {data?.credit.total_amount} Q
                </Text>
              </View>

              <View
                style={[
                  ComponentStyles.card,
                  { flex: 1, justifyContent: "center", alignItems: "center" }
                ]}
              >
                <Text
                  style={{
                    ...theme.FONTS.H5,
                    color: theme.COLORS.bodyTextColor
                  }}
                >
                  Crédito pendiente
                </Text>

                <View style={{ marginVertical: 10 }}>
                  <PieChart
                    donut
                    radius={60}
                    innerRadius={50}
                    data={pieData}
                    centerLabelComponent={() => {
                      return (
                        <Text
                          style={{
                            fontSize: 30,
                            color: theme.COLORS.bodyTextColor
                          }}
                        >
                          {`${Math.round((totalPaid / total) * 100)}%`}
                        </Text>
                      );
                    }}
                  />
                </View>
                <Text
                  style={{ ...theme.FONTS.Mulish_500Medium }}
                >{`${totalPaid} Q / ${total} Q`}</Text>

                <Text
                  style={[
                    { ...theme.FONTS.Mulish_500Medium },
                    { marginVertical: 5 }
                  ]}
                >
                  Capital e intereses amortizado: {totalPaid} Q
                </Text>
                <Text style={{ ...theme.FONTS.Mulish_500Medium }}>
                  Capital e interés pendiente: {totalPending} Q
                </Text>
              </View>

              <View style={ComponentStyles.card}>
                <Text style={[DataStyle.dataSemiBold]}>
                  Fecha Pago: {data?.debt_collection?.payment_date}
                </Text>
                <Text style={DataStyle.data}>
                  Cuota crédito: {data?.debt_collection?.credit_fee} Q
                </Text>
                <Text style={DataStyle.data}>
                  Mora: {data?.debt_collection?.default_amount} Q
                </Text>
                <Text style={DataStyle.data}>
                  Interés mora: {data?.debt_collection?.default_interest} Q
                </Text>
                <View style={DataStyle.separator} />
                <Text style={DataStyle.dataSemiBold}>
                  Monto total: {data?.debt_collection?.amount_to_pay} Q
                </Text>
                <View style={[DataStyle.separator, { marginBottom: 20 }]} />

                <View style={{ marginBottom: 20 }}>
                  <CustomCheckbox
                    disabled={checkValidation(data)}
                    text={"Solicitar exoneración de mo"}
                    onchange={() => {
                      setExoneration_requested((prev) => !prev);
                    }}
                  />
                </View>

                {exoneration_requested && (
                  <View style={InputStyles.field}>
                    <Text
                      style={[
                        { ...theme.FONTS.Mulish_500Medium },
                        { marginBottom: 5 }
                      ]}
                    >
                      Motivo petición de exoneración de mora*
                    </Text>
                    <View style={InputStyles.containerBg}>
                      <CustomInput
                        value={exoneration_description}
                        onChange={(value: string) => {
                          setExonerationErrors(false);
                          setExoneration_description(value);
                        }}
                        placeholder="Ingrese el motivo de la petición de exoneración"
                      />
                    </View>
                    {exonerationErrors && (
                      <Text style={InputStyles.error}>Esto es requerido</Text>
                    )}
                  </View>
                )}

                <View style={InputStyles.field}>
                  <Text
                    style={[
                      { ...theme.FONTS.Mulish_500Medium },
                      { marginBottom: 5 }
                    ]}
                  >
                    Pago realizado<Text>*</Text>
                  </Text>
                  <View style={InputStyles.containerBg}>
                    <CustomInput
                      value={payment_made}
                      disabled={data?.debt_collection?.status != "PENDING"}
                      onChange={(value: string) => {
                        setErrors(false);
                        setPayment_made(value);
                      }}
                      placeholder="Pago realizado"
                    />
                  </View>
                  {errors && (
                    <Text style={InputStyles.error}>Esto es requerido</Text>
                  )}
                </View>

                <View
                  style={{ flexDirection: "row", gap: 20, marginBottom: 10 }}
                >
                  <Text style={DataStyle.dataSemiBold}>
                    Estado:
                    {data?.debt_collection?.status == " PAID"
                      ? " PAGADO"
                      : data?.debt_collection?.status == " PARTIALLY_PAID"
                      ? " PAGO PARCIAL"
                      : data?.debt_collection?.status == " PENDING"
                      ? " PENDIENTE"
                      : " IMPAGO"}
                  </Text>
                  <Text style={DataStyle.dataSemiBold}>
                    #Pago: {data?.debt_collection?.no_of_installment}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  marginHorizontal: 20,
                  marginTop: 20,
                  justifyContent: "space-between"
                }}
              >
                <Button
                  color={theme.COLORS.bodyTextColor}
                  disabled={data?.debt_collection?.status === "PENDING"}
                  title="Imprimir ticket"
                  onPress={() => print()}
                />
                <Button
                  color={theme.COLORS.linkColor}
                  title="Pagar"
                  disabled={data?.debt_collection?.status != "PENDING"}
                  onPress={() => submit()}
                />
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Cobranza;
