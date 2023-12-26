import React from "react";
import { Button, Text, View } from "react-native";
import { useWizard } from "react-use-wizard";
import { theme } from "../constants";

const DatosDelSolicitante = ({
  onSubmit,
  occupation
}: {
  onSubmit: (value: any) => void;
  occupation: string | null;
}) => {
  const { handleStep, previousStep, nextStep, goToStep } = useWizard();

  return (
    <View>
      <Text
        style={{
          textAlign: "center",
          ...theme.FONTS.H3,
          color: theme.COLORS.linkColor,
          marginBottom: 30
        }}
      >
        Datos del Solicitante
      </Text>
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          justifyContent: "space-between"
        }}
      >
        <Button
          color={theme.COLORS.bodyTextColor}
          title="Go Previous"
          onPress={() => previousStep()}
        />
        <Button
          color={theme.COLORS.linkColor}
          title="Go Next"
          onPress={() => {
            if (
              occupation === "SALARIED" ||
              occupation === "SALARIEDANDBUSINESS"
            ) {
              nextStep();
            } else if (occupation === "BUSINESS") {
              goToStep(4);
            } else {
              goToStep(5);
            }
          }}

          // onPress={handleSubmit(onFormSubmit)}
        />
      </View>
    </View>
  );
};

export default DatosDelSolicitante;
