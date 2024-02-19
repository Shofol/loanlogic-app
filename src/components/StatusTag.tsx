import React from "react";
import { Text, View } from "react-native";
import { theme } from "../constants";
import { getStatusColor } from "../utils/functions";

const StatusTag = ({ status }: { status: string }) => {
  const translate = [
    // Applications
    { en: "PENDING_ASSIGNMENT", es: "PENDIENTE ASIGNACIÓN" },
    { en: "PENDING_PRE_VALIDATION", es: "PENDIENTE PRE VALIDACIÓN" },
    {
      en: "PENDING_ADDRESS_VALIDATION",
      es: "PENDIENTE VALIDACIÓN DE DIRECCIÓN"
    },
    { en: "ACCEPTED", es: "ACEPTADO" },
    { en: "REFUSED", es: "RECHAZADO" },
    { en: "REFUSED_PRODUCT_NOT_FOUND", es: "RECHAZADOPRODUCTO NO ENCONTRADO" },
    { en: "ERROR_PRODUCT_MATCH", es: "ERROR COINCIDENCIA DE PRODUCTO" },
    { en: "REFUSED_REGION", es: "RECHAZADO REGIÓN" },
    { en: "PENDING_GUARANTY", es: "PENDIENTE GARANTÍA" },
    {
      en: "REFUSED_LOCATION_NOT_COVERED",
      es: "RECHAZADO UBICACIÓN NO CUBIERTA"
    },
    { en: "PENDING_DATA_VALIDATION", es: "PENDIENTE VALIDACIÓN DE DATOS" },
    { en: "REFUSED_INCORRECT_DATA", es: "RECHAZADO DATOS INCORRECTOS" },
    { en: "PENDING_VALIDATION", es: "PENDIENTE VALIDACIÓN" },
    { en: "REFUSED_CRITERIA", es: "RECHAZADO CRITERIO" },
    { en: "REFUSED_COMMITTEE", es: "RECHAZADO COMITÉ" },
    { en: "RECHAZADO_VALIDACIÓN", es: "RECHAZADO VALIDACIÓN" },
    { en: "PENDING_NIT", es: "PENDIENTE NIT" },
    { en: "CANCELED", es: "CANCELADO" },
    { en: "REFUSED_AGE", es: "RECHAZADO EDAD" },
    { en: "PENDING_AGE_VALIDATION", es: "PENDIENTE VALIDACIÓN EDAD" },

    // Credits
    { en: "PENDING", es: "VIGENTE" },
    { en: "DELAY", es: "VENCIDO" },
    { en: "OVERDUE", es: "COBRO" },
    { en: "PUNISHMENT", es: "CASTIGO" },
    { en: "FINISHED", es: "CANCELADO" },
    { en: "CANCELED", es: "RECHAZADO" }

    // X
  ];

  let translation = status;

  var result = translate.filter((obj) => {
    return obj.en === status;
  });

  if (result && result[0]) {
    translation = result[0].es;
  }

  return (
    <View
      style={{
        backgroundColor: getStatusColor(status),
        paddingHorizontal: 10,
        borderRadius: 5
      }}
    >
      <Text
        style={{
          ...theme.FONTS.Mulish_400Regular,
          fontSize: 9,
          lineHeight: 12 * 1.6,
          color: theme.COLORS.white
        }}
      >
        {translation}
      </Text>
    </View>
  );
};

export default StatusTag;
