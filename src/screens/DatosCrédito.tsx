import { Slider } from "@react-native-assets/slider";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Text, TextInput, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DropDownPicker from "react-native-dropdown-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useWizard } from "react-use-wizard";
import api from "../api/api";
import { guaranteeTypes, professions } from "../constants/data";
import { InputStyles, theme } from "../constants/theme";

const DatosCrédito = ({
  onSubmit,
  onOccupationSelect
}: {
  onSubmit: (value: any) => void;
  onOccupationSelect: (value: string) => void;
}) => {
  const { handleStep, previousStep, nextStep } = useWizard();
  const [rangeValue, setRangeValue] = useState(500);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<any[]>([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" }
  ]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      product_id: "",
      credit_amount: 0,
      credit_destination: "",
      gurrentee_items: [""],
      occupation: ""
    }
  });
  //   const onSubmit = (data) => console.log(data);

  useEffect(() => {
    setMinValue(parseInt("500"));
    setMaxValue(parseInt("20000"));
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    const response = await api.get(`product/label`);
    setProducts([...response.data.data]);
  };

  const onFormSubmit = async (values: any) => {
    onSubmit(values);
    console.log(values);
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

        <Text style={InputStyles.label}>¿Qué producto desea?</Text>
        <Controller
          control={control}
          // rules={{
          //   required: true
          // }}
          render={({ field: { onChange, onBlur, value } }) => (
            <DropDownPicker
              style={InputStyles.container}
              open={open}
              value={value}
              items={products}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              listMode="SCROLLVIEW"
              onSelectItem={(e) => onChange(e.value)}
            />
          )}
          name="product_id"
        />
        {errors.product_id && <Text>This is required.</Text>}

        <Text style={InputStyles.label}>
          Monto deseado del crédito:* de 500 en 500Q
        </Text>
        <View style={{ marginBottom: 20, marginLeft: 10 }}>
          <Controller
            control={control}
            // rules={{
            //   required: true
            // }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Slider
                value={value} // set the current slider's value
                minimumValue={minValue} // Minimum value
                maximumValue={maxValue} // Maximum value
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
          {errors.credit_amount && <Text>This is required.</Text>}
        </View>

        <Text style={InputStyles.label}>
          Destino del crédito<Text>*</Text>
        </Text>

        <View style={InputStyles.container}>
          <Controller
            control={control}
            // rules={{
            //   required: true,
            //   minLength: 5
            // }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="mínimo 5 caracteres"
                style={InputStyles.input}
                placeholderTextColor={"#868698"}
                autoCapitalize="none"
                onChangeText={onChange}
                numberOfLines={1}
                value={value}
                onBlur={onBlur}
              />
            )}
            name="credit_destination"
          />
        </View>
        {errors.credit_destination && <Text>This is required.</Text>}

        <Text style={InputStyles.label}>
          ¿De qué tipo de garantía dispone? (seleccione todas las opciones
          pertinentes)<Text>*</Text>
        </Text>

        <View style={{ marginBottom: 20 }}>
          {guaranteeTypes.map((gurrentee_items, index) => {
            return (
              <View style={{ marginTop: 10 }}>
                <Controller
                  control={control}
                  // rules={{
                  //   required: true
                  // }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <BouncyCheckbox
                      size={20}
                      fillColor="#26C770"
                      unfillColor="#FFFFFF"
                      text={gurrentee_items.title}
                      iconStyle={{ borderColor: "26C770" }}
                      innerIconStyle={{ borderWidth: 2 }}
                      textStyle={{
                        fontFamily: "JosefinSans-Regular",
                        textDecorationLine: "none"
                      }}
                      onPress={(e) => onChange(gurrentee_items.value)}
                    />
                  )}
                  name={`gurrentee_items.${index}`}
                />
              </View>
            );
          })}
        </View>

        <Text style={InputStyles.label}>
          Usted es (seleccione una única opción)
        </Text>

        {professions.map((prof) => {
          return (
            <View style={{ marginTop: 10 }}>
              <Controller
                control={control}
                // rules={{
                //   required: true
                // }}
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
                      fontFamily: "JosefinSans-Regular",
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
