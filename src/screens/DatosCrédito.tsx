import { zodResolver } from "@hookform/resolvers/zod";
import { Slider } from "@react-native-assets/slider";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Text, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useWizard } from "react-use-wizard";
import { z } from "zod";
import api from "../api/api";
import CustomCheckbox from "../components/CustomCheckbox";
import CustomDropdownPicker from "../components/CustomDropdownPicker";
import CustomInput from "../components/CustomInput";
import { guaranteeTypes, professions } from "../constants/data";
import { InputStyles, theme } from "../constants/theme";

const DatosCrédito = ({
  onSubmit,
  onOccupationSelect
}: {
  onSubmit: (value: any) => void;
  onOccupationSelect: (value: string) => void;
}) => {
  const { previousStep, nextStep } = useWizard();
  const [products, setProducts] = useState<any[]>([]);

  const Schema = z
    .object({
      product_id: z.number(),
      credit_destination: z.string().min(5),
      occupation: z.string().min(1),
      credit_amount: z.number()
    })
    .required();

  const {
    getValues,
    setError,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {
      product_id: null,
      credit_amount: 500,
      credit_destination: "",
      gurrentee_items: [undefined],
      occupation: ""
    }
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await api.get(`product/label`);
    setProducts([...response.data.data]);
  };

  const onFormSubmit = async (values: any) => {
    const finalVales = getValues();
    const guaranteeItems = finalVales.gurrentee_items.filter(
      (val) => val !== undefined
    );
    if (guaranteeItems.length > 0) {
      values.gurrentee_items = guaranteeItems;
    } else {
      setError("gurrentee_items", {
        type: "custom",
        message: "Esto es requerido"
      });
    }
    onSubmit(values);
    nextStep();
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
    >
      <View>
        <Text
          style={{
            textAlign: "center",
            ...theme.FONTS.H3,
            color: theme.COLORS.linkColor,
            marginBottom: 30
          }}
        >
          DatosCrédito
        </Text>

        <View style={InputStyles.field}>
          <Text style={InputStyles.label}>¿Qué producto desea?*</Text>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomDropdownPicker
                value={value}
                items={products}
                onSelectItem={(e: any) => onChange(e.value)}
              />
            )}
            name="product_id"
          />
          {errors.product_id && (
            <Text style={InputStyles.error}>Esto es requerido.</Text>
          )}
        </View>

        <Text style={InputStyles.label}>
          Monto deseado del crédito:* de 500 en 500Q
        </Text>
        <View style={{ marginBottom: 20, marginLeft: 10 }}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Slider
                value={value} // set the current slider's value
                minimumValue={500} // Minimum value
                maximumValue={20000} // Maximum value
                step={500} // The step for the slider (0 means that the slider will handle any decimal value within the range [min, max])
                minimumTrackTintColor="#3EB290" // The track color before the current value
                maximumTrackTintColor="grey" // The track color after the current value
                trackHeight={8} // The track's height in pixel
                onValueChange={onChange} // Called each time the value changed. The type is (value: number) => void
                CustomThumb={CustomThumb}
              />
            )}
            name="credit_amount"
          />
          {errors.credit_amount && <Text>Esto es requerido.</Text>}
        </View>

        <View style={InputStyles.field}>
          <Text style={InputStyles.label}>
            Destino del crédito<Text>*</Text>
          </Text>
          <View style={InputStyles.container}>
            <Controller
              control={control}
              rules={{
                required: "Esto es requerido"
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Teléfono del trabajo"
                />
              )}
              name="credit_destination"
            />
          </View>
          {errors.credit_destination && (
            <Text style={InputStyles.error}>
              {errors.credit_destination.message}
            </Text>
          )}
        </View>

        <Text style={InputStyles.label}>
          ¿De qué tipo de garantía dispone? (seleccione todas las opciones
          pertinentes)<Text>*</Text>
        </Text>

        <View style={{ marginBottom: 20 }}>
          {guaranteeTypes.map((gurrentee_items, index) => {
            return (
              <View style={{ marginTop: 10 }} key={gurrentee_items.title}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomCheckbox
                      text={gurrentee_items.title}
                      onchange={(e: any) => onChange(gurrentee_items.value)}
                    />
                  )}
                  name={`gurrentee_items.${index}`}
                />
              </View>
            );
          })}
          {errors.gurrentee_items && (
            <Text style={InputStyles.error}>
              {errors.gurrentee_items.message}
            </Text>
          )}
        </View>

        <Text style={InputStyles.label}>
          Usted es (seleccione una única opción)*
        </Text>
        {professions.map((prof) => {
          return (
            <View style={{ marginTop: 10 }} key={prof.title}>
              <Controller
                control={control}
                rules={{
                  required: true
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <BouncyCheckbox
                    disabled={value !== "" && value !== prof.value}
                    size={20}
                    fillColor={
                      value !== "" && value !== prof.value
                        ? "#c6c4c4"
                        : "#26C770"
                    }
                    unfillColor="#FFFFFF"
                    text={prof.title}
                    iconStyle={{ borderColor: "26C770" }}
                    innerIconStyle={{ borderWidth: 2 }}
                    textStyle={{
                      textDecorationLine: "none"
                    }}
                    onPress={(e) => {
                      if (e === true) {
                        onChange(prof.value);
                        onOccupationSelect(prof.value);
                      } else {
                        onChange("");
                        onOccupationSelect("");
                      }
                    }}
                  />
                )}
                name="occupation"
              />
            </View>
          );
        })}

        {errors.occupation && (
          <Text style={InputStyles.error}>Esto es requerido</Text>
        )}

        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            justifyContent: "space-between"
          }}
        >
          <Button
            color={theme.COLORS.bodyTextColor}
            title="Anterior"
            onPress={() => previousStep()}
          />
          <Button
            color={theme.COLORS.linkColor}
            title="Siguiente"
            onPress={handleSubmit(onFormSubmit)}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const CustomThumb = ({ value }: { value: any }) => {
  return (
    <View
      style={{
        width: 30,
        height: 30,
        borderRadius: 50,
        backgroundColor: "#26C770",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Text style={{ fontSize: 8, color: "white" }}>{value}</Text>
    </View>
  );
};

export default DatosCrédito;
