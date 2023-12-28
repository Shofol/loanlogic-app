import "dayjs/locale/es";

import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useWizard } from "react-use-wizard";
import CustomCheckbox from "../components/CustomCheckbox";
import CustomDatePicker from "../components/CustomDatePicker";
import CustomDropdownPicker from "../components/CustomDropdownPicker";
import CustomInput from "../components/CustomInput";
import { theme } from "../constants";
import {
  departments,
  municipalitiesValues,
  wantCredit
} from "../constants/data";
import { InputStyles, Wizard } from "../constants/theme";

const DPINIT = ({ onSubmit }: { onSubmit: (value: any) => void }) => {
  const { handleStep, previousStep, nextStep } = useWizard();
  const [isNITNotRequired, setIsNITNotRequired] = useState(false);
  const [municipalities, setMunicipalities] = useState<any[]>([]);
  const [negMunicipalities, setNegMunicipalities] = useState<any[]>([]);
  // const [date, setDate] = useState<any>(dayjs());
  // const [showDatePicker, setShowDatePicker] = useState(false);

  const _pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    console.log(result);
  };

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      dpi_number: "",
      place_of_birth_city: 0,
      place_of_birth_region: "",
      neighborhood_region: "",
      neighborhood_city: "",
      expiration_date: null,
      nit: "",
      credit_institutions_and_amount: "",
      is_have_credit: null
    }
  });

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
        <Text style={Wizard.header}>DPI & NIT</Text>

        <View style={InputStyles.field}>
          <Text style={InputStyles.label}>
            Destino del crédito<Text>*</Text>
          </Text>
          <View style={InputStyles.container}>
            <Controller
              control={control}
              // rules={{
              //   required: true
              // }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Número DPI"
                />
              )}
              name="dpi_number"
            />
          </View>
          {errors.dpi_number && (
            <Text style={InputStyles.error}>This is required.</Text>
          )}
        </View>

        <Text style={InputStyles.label}>
          Lugar de nacimiento (departamento, municipio)*
        </Text>

        <View style={InputStyles.field}>
          <Text style={InputStyles.label}>Departamento</Text>
          <Controller
            control={control}
            // rules={{
            //   required: true
            // }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomDropdownPicker
                value={value}
                items={departments}
                onSelectItem={(e: any) => {
                  setMunicipalities(
                    municipalitiesValues.filter(
                      (muni) => muni.department === e.value
                    )[0].municipalities
                  );
                  onChange(e.value);
                }}
              />
            )}
            name="place_of_birth_city"
          />
          {errors.place_of_birth_city && <Text>This is required.</Text>}
        </View>

        <View style={InputStyles.field}>
          <Text style={InputStyles.label}>Municipio</Text>
          <Controller
            control={control}
            // rules={{
            //   required: true
            // }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomDropdownPicker
                value={value}
                items={municipalities}
                onSelectItem={(e: any) => onChange(e.value)}
              />
            )}
            name="place_of_birth_region"
          />
          {errors.place_of_birth_region && <Text>This is required.</Text>}
        </View>

        <View style={InputStyles.field}>
          <Text style={InputStyles.label}>
            Fecha vencimiento<Text>*</Text>
          </Text>

          <Controller
            control={control}
            rules={
              {
                // required: true
                // minLength: 5
              }
            }
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomDatePicker
                defaultValue={null}
                value={value}
                onChange={onChange}
                defaultText="Seleccionar fecha de vencimiento"
              />
            )}
            name="expiration_date"
          />
          {errors.expiration_date && (
            <Text style={InputStyles.error}>This is required.</Text>
          )}
        </View>

        <Text style={InputStyles.label}>Vecindad*</Text>

        <View style={InputStyles.field}>
          <Text style={InputStyles.label}>Departamento</Text>
          <Controller
            control={control}
            // rules={{
            //   required: true
            // }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomDropdownPicker
                value={value}
                items={departments}
                onSelectItem={(e: any) => {
                  setNegMunicipalities(
                    municipalitiesValues.filter(
                      (muni) => muni.department === e.value
                    )[0].municipalities
                  );
                  onChange(e.value);
                }}
              />
            )}
            name="neighborhood_city"
          />
          {errors.neighborhood_city && <Text>This is required.</Text>}
        </View>

        <View style={InputStyles.field}>
          <Text style={InputStyles.label}>Municipio</Text>
          <Controller
            control={control}
            // rules={{
            //   required: true
            // }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomDropdownPicker
                value={value}
                items={negMunicipalities}
                onSelectItem={(e: any) => onChange(e.value)}
              />
            )}
            name="neighborhood_region"
          />
          {errors.neighborhood_region && <Text>This is required.</Text>}
        </View>

        <Text style={InputStyles.label}>Foto ambos lados del DPI*</Text>
        <TouchableOpacity
          style={{
            padding: 10,
            borderColor: theme.COLORS.green,
            borderWidth: 2,
            borderRadius: 5,
            marginBottom: 20
          }}
          onPress={(e) => {
            _pickDocument();
          }}
        >
          <Text style={{ fontSize: 16 }}>Cargar Foto</Text>
        </TouchableOpacity>

        <View style={InputStyles.field}>
          <Text style={InputStyles.label}>
            NIT
            {!isNITNotRequired && <Text>*</Text>}
          </Text>
          <View style={InputStyles.container}>
            <Controller
              control={control}
              // rules={{
              //   required: true,
              //   minLength: 5
              // }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="NIT"
                />
              )}
              name="nit"
            />
          </View>
          {errors.nit && <Text>This is required.</Text>}
        </View>

        <View style={{ marginTop: 10, marginBottom: 20 }}>
          <CustomCheckbox
            text="No tengo NIT"
            onchange={(e: any) => {
              setIsNITNotRequired(!isNITNotRequired);
            }}
          />
        </View>

        <View style={InputStyles.field}>
          <Text style={InputStyles.label}>
            Tiene crédito con alguna institución financiera o con personas
            individuales? <Text>*</Text>
          </Text>
          <Controller
            control={control}
            // rules={{
            //   required: true
            // }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomDropdownPicker
                value={value}
                items={wantCredit}
                onSelectItem={(e: any) => onChange(e.value)}
              />
            )}
            name="is_have_credit"
          />
          {errors.is_have_credit && <Text>This is required.</Text>}
        </View>

        <View style={InputStyles.field}>
          <Text style={InputStyles.label}>
            Si la respuesta es sí, indicar las instituciones y monto
            <Text>*</Text>
          </Text>

          <View style={InputStyles.container}>
            <Controller
              control={control}
              // rules={{
              //   required: true,
              //   minLength: 5
              // }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Si la respuesta es sí, indicar las instituciones y monto"
                />
              )}
              name="credit_institutions_and_amount"
            />
          </View>
          {errors.credit_institutions_and_amount && (
            <Text>This is required.</Text>
          )}
        </View>

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

export default DPINIT;
