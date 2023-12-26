import React from "react";
import { Button, Text, View } from "react-native";
import { useWizard } from "react-use-wizard";
import { theme } from "../constants";

const NegocioPropio = ({ stepper, onSubmit, occupation, data }) => {
  const { handleStep, previousStep, nextStep, goToStep } = useWizard();

  return (
    <View>
      <Text>NegocioPropio</Text>
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
            nextStep();
          }}

          // onPress={handleSubmit(onFormSubmit)}
        />
      </View>
    </View>
  );
};

export default NegocioPropio;
