import { zodResolver } from "@hookform/resolvers/zod";
import { LocationObject } from "expo-location";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Text, View } from "react-native";
import { z } from "zod";
import CustomDatePicker from "../components/CustomDatePicker";
import CustomDropdownPicker from "../components/CustomDropdownPicker";
import CustomInput from "../components/CustomInput";
import { theme } from "../constants";
import { departments, municipalitiesValues } from "../constants/data";
import { InputStyles, Wizard } from "../constants/theme";

const NegocioPropio = ({
  onSubmit,
  occupation,
  dpiData,
  previousStep,
  nextStep,
  location
}: {
  onSubmit: (value: any) => void;
  occupation: string;
  dpiData: any;
  previousStep: (e?: number) => void;
  nextStep: (e?: number) => void;
  location: LocationObject;
}) => {
  const onFormSubmit = async (values: any) => {
    values.business_latitude = location.coords.latitude.toString() as string;
    values.business_longitude = location.coords.longitude.toString() as string;
    onSubmit(values);

    if (occupation === "SALARIED" || occupation === "SALARIEDANDBUSINESS") {
      nextStep();
    } else if (occupation === "BUSINESS") {
      nextStep(4);
    } else {
      nextStep(5);
    }
  };

  const Schema = z
    .object({
      business_name: z.string().min(1),
      start_date: z.string().min(1),
      nit5: z.string().min(1),
      monthly_sales: z
        .string()
        .min(1)
        .refine((value) => /^[0-9]*$/.test(value), "Sólo se permiten números"),
      monthly_expenses5: z
        .string()
        .min(1)
        .refine((value) => /^[0-9]*$/.test(value), "Sólo se permiten números"),
      business_address: z.string().min(1),
      business_municipality: z.string().min(1),
      business_department: z.string().min(1),
      business_latitude: z.string(),
      business_longitude: z.string(),
      business_phone: z
        .string()
        .min(1)
        .max(8)
        .refine((value) => /^[0-9]*$/.test(value), "Sólo se permiten números")
    })
    .required();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {
      business_name: dpiData ? dpiData.business_name : "",
      start_date: dpiData ? dpiData.start_date : "",
      nit5: dpiData ? dpiData.nit5 : "",
      monthly_sales: dpiData ? dpiData.monthly_sales : "",
      monthly_expenses5: dpiData ? dpiData.monthly_expenses5 : "",
      business_address: dpiData ? dpiData.business_address : "",
      business_municipality: dpiData ? dpiData.business_municipality : "",
      business_department: dpiData ? dpiData.business_department : "",
      business_phone: dpiData ? dpiData.business_phone : "",
      business_latitude: "",
      business_longitude: ""
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
          <Text style={InputStyles.error}>Esto es requerido.</Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>
          Fecha de inicio<Text>*</Text>
        </Text>

        <Controller
          control={control}
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
          <Text style={InputStyles.error}>Esto es requerido.</Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>
          NIT<Text>*</Text>
        </Text>
        <View style={InputStyles.container}>
          <Controller
            control={control}
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
          <Text style={InputStyles.error}>Esto es requerido.</Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>
          Ventas mensuales<Text>*</Text>
        </Text>
        <View style={InputStyles.container}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Ventas mensuales"
                keyboardType="numeric"
              />
            )}
            name="monthly_sales"
          />
        </View>
        {errors.monthly_sales && (
          <Text style={InputStyles.error}>
            {errors.monthly_sales.type === "too_small"
              ? "Esto es requerido"
              : errors.monthly_sales.message?.toString()}
          </Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>
          Gastos mensuales<Text>*</Text>
        </Text>
        <View style={InputStyles.container}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Gastos mensuales"
                keyboardType="numeric"
              />
            )}
            name="monthly_expenses5"
          />
        </View>
        {errors.monthly_expenses5 && (
          <Text style={InputStyles.error}>
            {errors.monthly_expenses5.type === "too_small"
              ? "Esto es requerido"
              : errors.monthly_expenses5.message?.toString()}
          </Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>
          Dirección del negocio<Text>*</Text>
        </Text>
        <View style={InputStyles.container}>
          <Controller
            control={control}
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
          <Text style={InputStyles.error}>Esto es requerido.</Text>
        )}
      </View>

      <View style={{ marginBottom: 20 }}>
        <Button
          title="Agregar Direccion"
          color={theme.COLORS.linkColor}
          onPress={() => {
            setValue(
              "business_latitude",
              location.coords.latitude.toString() as string
            );
            setValue(
              "business_longitude",
              location.coords.longitude.toString() as string
            );
          }}
        ></Button>
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>Departamento</Text>
        <Controller
          control={control}
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
        {errors.business_department && <Text>Esto es requerido.</Text>}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>Municipio</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomDropdownPicker
              value={value}
              items={municipalities}
              onSelectItem={(e: any) => onChange(e.value)}
            />
          )}
          name="business_municipality"
        />
        {errors.business_municipality && <Text>Esto es requerido.</Text>}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>
          Teléfono del negocio<Text>*</Text>
        </Text>
        <View style={InputStyles.container}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Teléfono del negocio"
                keyboardType="numeric"
              />
            )}
            name="business_phone"
          />
        </View>
        {errors.business_phone && (
          <Text style={InputStyles.error}>
            {errors.business_phone.type === "too_small"
              ? "Esto es requerido"
              : errors.business_phone.message?.toString()}
          </Text>
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
          title="Anterior"
          onPress={() => {
            if (occupation === "BUSINESS") {
              previousStep(2);
            } else {
              previousStep();
            }
          }}
        />
        <Button
          color={theme.COLORS.linkColor}
          title="Siguiente"
          // onPress={() => {
          //   nextStep();
          // }}
          onPress={handleSubmit(onFormSubmit)}
        />
      </View>
    </View>
  );
};

export default NegocioPropio;
