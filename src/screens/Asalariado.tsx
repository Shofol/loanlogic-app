import { zodResolver } from "@hookform/resolvers/zod";
import { LocationObject } from "expo-location";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Text, View } from "react-native";
import { z } from "zod";
import CustomDatePicker from "../components/CustomDatePicker";
import CustomDropdownPicker from "../components/CustomDropdownPicker";
import CustomInput from "../components/CustomInput";
import LocationButton from "../components/LocationButton";
import { theme } from "../constants";
import { departments, municipalitiesValues } from "../constants/data";
import { InputStyles, Wizard } from "../constants/theme";
import { DPIContext } from "../utils/contexts/DPIContext";

const Asalariado = ({
  location,
  occupation,
  onSubmit,
  // dpiData,
  previousStep,
  nextStep
}: {
  occupation: string;
  onSubmit: (value: any) => void;
  // dpiData: any;
  previousStep: (e?: number) => void;
  nextStep: (e?: number) => void;
  location: LocationObject;
}) => {
  // const { handleStep, previousStep, nextStep, goToStep } = useWizard();
  const dpiData = useContext(DPIContext);
  const defaultValues = {
    company_name: dpiData ? dpiData.company_name : "",
    entry_date: dpiData ? dpiData.entry_date : "",
    position: dpiData ? dpiData.position : "",
    monthly_income: dpiData ? `${parseInt(dpiData.monthly_income)}` : "",
    monthly_expenses: dpiData ? `${parseInt(dpiData.monthly_expenses)}` : "",
    date_and_number_of_income: dpiData ? dpiData.date_and_number_of_income : "",
    immediate_boss_name: dpiData ? dpiData.immediate_boss_name : "",
    work_address: dpiData ? dpiData.work_address : "",
    work_department: dpiData ? dpiData.work_department : "",
    work_municipality: dpiData ? dpiData.work_municipality : "",
    work_phone: dpiData ? dpiData.work_phone : "",
    work_latitude: "",
    work_longitude: ""
  };

  useEffect(() => {
    if (dpiData) {
      reset(defaultValues);
    }
  }, [dpiData]);

  const Schema = z
    .object({
      company_name: z.string().min(1),
      entry_date: z.string().min(1),
      position: z.string().min(1),
      monthly_income: z
        .string()
        .min(1)
        .refine((value) => /^[0-9]*$/.test(value), "Sólo se permiten números"),
      monthly_expenses: z
        .string()
        .min(1)
        .refine((value) => /^[0-9]*$/.test(value), "Sólo se permiten números"),
      date_and_number_of_income: z.string().min(1),
      immediate_boss_name: z.string().min(1),
      work_address: z.string().min(1),
      work_department: z.string().min(1),
      work_municipality: z.string().min(1),
      work_latitude: z.string(),
      work_longitude: z.string(),
      work_phone: z
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
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(Schema),
    defaultValues: defaultValues
  });
  const [municipalities, setMunicipalities] = useState<any[]>([]);
  const [locationAdded, setLocationAdded] = useState(false);

  const onFormSubmit = async (values: any) => {
    onSubmit(values);

    if (occupation === "BUSINESS" || occupation === "SALARIEDANDBUSINESS") {
      nextStep();
    } else {
      nextStep(5);
    }
  };

  return (
    <View>
      <Text style={Wizard.header}>Asalariado</Text>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>
          SNombre de la empresa<Text>*</Text>
        </Text>
        <View style={InputStyles.container}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="SNombre de la empresa"
              />
            )}
            name="company_name"
          />
        </View>
        {errors.company_name && (
          <Text style={InputStyles.error}>Esto es requerido.</Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>
          Fecha de ingreo<Text>*</Text>
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
          name="entry_date"
        />
        {errors.entry_date && (
          <Text style={InputStyles.error}>Esto es requerido.</Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>
          Puesto<Text>*</Text>
        </Text>
        <View style={InputStyles.container}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Puesto"
              />
            )}
            name="position"
          />
        </View>
        {errors.position && (
          <Text style={InputStyles.error}>Esto es requerido.</Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>
          Ingresos mensuales<Text>*</Text>
        </Text>
        <View style={InputStyles.container}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="numeric"
                placeholder="Ingresos mensuales"
              />
            )}
            name="monthly_income"
          />
        </View>
        {errors.monthly_income && (
          <Text style={InputStyles.error}>
            {errors.monthly_income.type === "too_small"
              ? "Esto es requerido"
              : errors.monthly_income.message?.toString()}
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
                keyboardType="numeric"
                placeholder="Gastos mensuales"
              />
            )}
            name="monthly_expenses"
          />
        </View>
        {errors.monthly_expenses && (
          <Text style={InputStyles.error}>
            {errors.monthly_expenses.type === "too_small"
              ? "Esto es requerido"
              : errors.monthly_expenses.message?.toString()}
          </Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>
          Fecha y número de ingresos<Text>*</Text>
        </Text>
        <View style={InputStyles.container}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Fecha y número de ingresos"
              />
            )}
            name="date_and_number_of_income"
          />
        </View>
        {errors.date_and_number_of_income && (
          <Text style={InputStyles.error}>Esto es requerido.</Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>
          Nombre del jefe inmediato<Text>*</Text>
        </Text>
        <View style={InputStyles.container}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Nombre del jefe inmediato"
              />
            )}
            name="immediate_boss_name"
          />
        </View>
        {errors.immediate_boss_name && (
          <Text style={InputStyles.error}>Esto es requerido.</Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>
          Dirección del trabajo<Text>*</Text>
        </Text>
        <View style={InputStyles.container}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Dirección del trabajo"
              />
            )}
            name="work_address"
          />
        </View>
        {errors.work_address && (
          <Text style={InputStyles.error}>Esto es requerido.</Text>
        )}
      </View>

      <View style={{ marginBottom: 20 }}>
        <LocationButton
          locationAdded={locationAdded}
          onPress={() => {
            try {
              setValue(
                "work_latitude",
                location.coords.latitude.toString() as string
              );
              setValue(
                "work_longitude",
                location.coords.longitude.toString() as string
              );
              setLocationAdded(true);
            } catch (error) {
              console.log(error);
            }
          }}
        />
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
          name="work_department"
        />
        {errors.work_department && (
          <Text style={InputStyles.error}>Esto es requerido.</Text>
        )}
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
          name="work_municipality"
        />
        {errors.work_municipality && (
          <Text style={InputStyles.error}>Esto es requerido.</Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>
          Teléfono del trabajo<Text>*</Text>
        </Text>
        <View style={InputStyles.container}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                keyboardType="numeric"
                placeholder="Teléfono del trabajo"
              />
            )}
            name="work_phone"
          />
        </View>
        {errors.work_phone && (
          <Text style={InputStyles.error}>
            {errors.work_phone.type === "too_small"
              ? "Esto es requerido"
              : errors.work_phone.message?.toString()}
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
          onPress={() => previousStep()}
        />
        <Button
          color={theme.COLORS.linkColor}
          title="Siguiente"
          onPress={handleSubmit(onFormSubmit)}
        />
      </View>
    </View>
  );
};

export default Asalariado;
