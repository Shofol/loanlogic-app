import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Text, View } from "react-native";
import { useWizard } from "react-use-wizard";
import CustomDatePicker from "../components/CustomDatePicker";
import CustomDropdownPicker from "../components/CustomDropdownPicker";
import CustomInput from "../components/CustomInput";
import { theme } from "../constants";
import { departments, municipalitiesValues } from "../constants/data";
import { InputStyles, Wizard } from "../constants/theme";

const NegocioPropio = ({
  onSubmit,
  occupation
}: {
  onSubmit: (value: any) => void;
  occupation: string;
}) => {
  const { handleStep, previousStep, nextStep, goToStep } = useWizard();

  const onFormSubmit = async (values: any) => {
    onSubmit(values);
    console.log(values);
    nextStep();

    // if (occupation === "SALARIED" || occupation === "SALARIEDANDBUSINESS") {
    //   nextStep();
    // } else if (occupation === "BUSINESS") {
    //   goToStep(4);
    // } else {
    //   goToStep(5);
    // }
  };

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      business_name: "",
      start_date: "",
      nit5: "",
      monthly_sales: "",
      monthly_expenses5: "",
      business_address: "",
      business_municipality: "",
      business_department: "",
      business_phone: ""
    }
  });
  const [municipalities, setMunicipalities] = useState<any[]>([]);

  return (
    <View>
      <Text style={Wizard.header}>NegocioPropio</Text>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>
          Nombre del negocio<Text>*</Text>
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
                placeholder="Nombre del negocio"
              />
            )}
            name="business_name"
          />
        </View>
        {errors.business_name && (
          <Text style={InputStyles.error}>This is required.</Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>
          Fecha de inicio<Text>*</Text>
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
            />
          )}
          name="start_date"
        />
        {errors.start_date && (
          <Text style={InputStyles.error}>This is required.</Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>
          NIT<Text>*</Text>
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
                placeholder="NIT"
              />
            )}
            name="nit5"
          />
        </View>
        {errors.nit5 && (
          <Text style={InputStyles.error}>This is required.</Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>
          Ventas mensuales<Text>*</Text>
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
                placeholder="Ventas mensuales"
              />
            )}
            name="monthly_sales"
          />
        </View>
        {errors.monthly_sales && (
          <Text style={InputStyles.error}>This is required.</Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>
          Gastos mensuales<Text>*</Text>
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
                placeholder="Gastos mensuales"
              />
            )}
            name="monthly_expenses5"
          />
        </View>
        {errors.monthly_expenses5 && (
          <Text style={InputStyles.error}>This is required.</Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>
          Dirección del negocio<Text>*</Text>
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
                placeholder="Dirección del negocio"
              />
            )}
            name="business_address"
          />
        </View>
        {errors.business_address && (
          <Text style={InputStyles.error}>This is required.</Text>
        )}
      </View>

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
          name="business_department"
        />
        {errors.business_department && <Text>This is required.</Text>}
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
          name="business_municipality"
        />
        {errors.business_municipality && <Text>This is required.</Text>}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>
          Teléfono del negocio<Text>*</Text>
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
                placeholder="Teléfono del negocio"
              />
            )}
            name="business_phone"
          />
        </View>
        {errors.business_phone && (
          <Text style={InputStyles.error}>This is required.</Text>
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
          onPress={() => {
            if (occupation === "BUSINESS") {
              goToStep(3);
            } else {
              previousStep();
            }
          }}
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
