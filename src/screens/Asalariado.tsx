import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Text, View } from "react-native";
import { useWizard } from "react-use-wizard";
import { z } from "zod";
import CustomDatePicker from "../components/CustomDatePicker";
import CustomDropdownPicker from "../components/CustomDropdownPicker";
import CustomInput from "../components/CustomInput";
import { theme } from "../constants";
import { departments, municipalitiesValues } from "../constants/data";
import { InputStyles, Wizard } from "../constants/theme";

const Asalariado = ({
  occupation,
  onSubmit
}: {
  occupation: string;
  onSubmit: (value: any) => void;
}) => {
  const { handleStep, previousStep, nextStep, goToStep } = useWizard();

  const Schema = z
    .object({
      company_name: z.string().min(1),
      entry_date: z.string().min(1),
      position: z.string().min(1),
      monthly_income: z.string().min(1),
      monthly_expenses: z.string().min(1),
      date_and_number_of_income: z.string().min(1),
      immediate_boss_name: z.string().min(1),
      work_address: z.string().min(1),
      work_department: z.string().min(1),
      work_municipality: z.string().min(1),
      work_phone: z.string().min(1).max(8)
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {
      company_name: "",
      entry_date: "",
      position: "",
      monthly_income: "",
      monthly_expenses: "",
      date_and_number_of_income: "",
      immediate_boss_name: "",
      work_address: "",
      work_department: "",
      work_municipality: "",
      work_phone: ""
    }
  });
  const [municipalities, setMunicipalities] = useState<any[]>([]);

  const onFormSubmit = async (values: any) => {
    onSubmit(values);
    // nextStep();

    if (occupation === "SALARIED" || occupation === "SALARIEDANDBUSINESS") {
      nextStep();
    } else if (occupation === "BUSINESS") {
      goToStep(4);
    } else {
      goToStep(5);
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
          <Text style={InputStyles.error}>This is required.</Text>
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
          <Text style={InputStyles.error}>This is required.</Text>
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
          <Text style={InputStyles.error}>This is required.</Text>
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
                placeholder="Ingresos mensuales"
              />
            )}
            name="monthly_income"
          />
        </View>
        {errors.monthly_income && (
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
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Gastos mensuales"
              />
            )}
            name="monthly_expenses"
          />
        </View>
        {errors.monthly_expenses && (
          <Text style={InputStyles.error}>This is required.</Text>
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
          <Text style={InputStyles.error}>This is required.</Text>
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
          <Text style={InputStyles.error}>This is required.</Text>
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
          <Text style={InputStyles.error}>This is required.</Text>
        )}
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
          <Text style={InputStyles.error}>This is required.</Text>
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
          <Text style={InputStyles.error}>This is required.</Text>
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
                placeholder="Teléfono del trabajo"
              />
            )}
            name="work_phone"
          />
        </View>
        {errors.work_phone && (
          <Text style={InputStyles.error}>
            {errors.work_phone.type === "too_small"
              ? "This is required"
              : errors.work_phone.message}
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
