import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Text, View } from "react-native";
import { z } from "zod";
import CustomInput from "../components/CustomInput";
import { theme } from "../constants";
import { InputStyles, Wizard } from "../constants/theme";

const Referencias = ({
  onPrevious,
  onSubmit,
  occupation,
  dpiData,
  previousStep
}: {
  onPrevious: (value: any) => void;
  onSubmit: (value: any) => void;
  occupation: string;
  dpiData: any;
  previousStep: (e?: number) => void;
}) => {
  // const { handleStep, previousStep, nextStep, goToStep } = useWizard();

  const onFormSubmit = async (values: any) => {
    onSubmit(values);
  };

  const Schema = z
    .object({
      f_references_name_and_surname: z.string().min(1),
      f_references_name_and_surname_2: z.string().min(1),
      f_references_work_phone: z
        .string()
        .min(1)
        .max(8)
        .refine((value) => /^[0-9]*$/.test(value), "Sólo se permiten números"),
      f_references_work_phone_2: z
        .string()
        .min(1)
        .max(8)
        .refine((value) => /^[0-9]*$/.test(value), "Sólo se permiten números"),
      f_references_cell_phone: z
        .string()
        .min(1)
        .max(8)
        .refine((value) => /^[0-9]*$/.test(value), "Sólo se permiten números"),
      f_references_cell_phone_2: z
        .string()
        .min(1)
        .max(8)
        .refine((value) => /^[0-9]*$/.test(value), "Sólo se permiten números"),
      f_references_relationship: z.string().min(1),
      f_references_relationship_2: z.string().min(1),
      p_references_name_and_surname: z.string().min(1),
      p_references_name_and_surname_2: z.string().min(1),
      p_references_work_phone: z
        .string()
        .min(1)
        .max(8)
        .refine((value) => /^[0-9]*$/.test(value), "Sólo se permiten números"),
      p_references_work_phone_2: z
        .string()
        .min(1)
        .max(8)
        .refine((value) => /^[0-9]*$/.test(value), "Sólo se permiten números"),
      p_references_cell_phone: z
        .string()
        .min(1)
        .max(8)
        .refine((value) => /^[0-9]*$/.test(value), "Sólo se permiten números"),
      p_references_cell_phone_2: z
        .string()
        .min(1)
        .max(8)
        .refine((value) => /^[0-9]*$/.test(value), "Sólo se permiten números"),
      p_references_relationship: z.string().min(1),
      p_references_relationship_2: z.string().min(1)
    })
    .required();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {
      f_references_name_and_surname: "",
      f_references_name_and_surname_2: "",
      f_references_work_phone: "",
      f_references_work_phone_2: "",
      f_references_cell_phone: "",
      f_references_cell_phone_2: "",
      f_references_relationship: "",
      f_references_relationship_2: "",
      p_references_name_and_surname: "",
      p_references_name_and_surname_2: "",
      p_references_work_phone: "",
      p_references_work_phone_2: "",
      p_references_cell_phone: "",
      p_references_cell_phone_2: "",
      p_references_relationship: "",
      p_references_relationship_2: ""
    }
  });
  const [referenciasFamiliares, setReferenciasFamiliares] = useState([
    "",
    "_2"
  ]);

  const [referenciasPersonales, setReferenciasPersonales] = useState([
    "",
    "_2"
  ]);

  return (
    <View>
      <Text style={Wizard.header}>Referencias</Text>
      <View style={{ marginBottom: 20 }}>
        <Text style={theme.FONTS.H4}>
          Referencias familiares {"\n"}(que no vivan con usted)
        </Text>
      </View>

      {referenciasFamiliares.map((ref) => {
        return (
          <View key={ref}>
            <View style={InputStyles.field}>
              <Text style={InputStyles.label}>
                Nombre y apellidos<Text>*</Text>
              </Text>
              <View style={InputStyles.container}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder="Nombre y apellidos"
                    />
                  )}
                  name={
                    `f_references_name_and_surname${ref}` as keyof ReferenceFormType
                  }
                />
              </View>
              {errors[
                `f_references_name_and_surname${ref}` as keyof ReferenceFormType
              ] && <Text style={InputStyles.error}>Esto es requerido.</Text>}
            </View>

            <View style={InputStyles.field}>
              <Text style={InputStyles.label}>
                Parentesco<Text>*</Text>
              </Text>
              <View style={InputStyles.container}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder="Parentesco"
                    />
                  )}
                  name={
                    `f_references_relationship${ref}` as keyof ReferenceFormType
                  }
                />
              </View>
              {errors[
                `f_references_relationship${ref}` as keyof ReferenceFormType
              ] && <Text style={InputStyles.error}>Esto es requerido.</Text>}
            </View>

            <View style={InputStyles.field}>
              <Text style={InputStyles.label}>
                Teléfono trabajo<Text>*</Text>
              </Text>
              <View style={InputStyles.container}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder="Teléfono trabajo"
                      keyboardType="numeric"
                    />
                  )}
                  name={
                    `f_references_work_phone${ref}` as keyof ReferenceFormType
                  }
                />
              </View>
              {errors[
                `f_references_work_phone${ref}` as keyof ReferenceFormType
              ] && (
                <Text style={InputStyles.error}>
                  {errors[
                    `f_references_work_phone${ref}` as keyof ReferenceFormType
                  ]?.type === "too_small"
                    ? "Esto es requerido"
                    : errors[
                        `f_references_work_phone${ref}` as keyof ReferenceFormType
                      ]?.message?.toString()}
                </Text>
              )}
            </View>

            <View style={InputStyles.field}>
              <Text style={InputStyles.label}>
                Celular<Text>*</Text>
              </Text>
              <View style={InputStyles.container}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder="Celular"
                      keyboardType="numeric"
                    />
                  )}
                  name={
                    `f_references_cell_phone${ref}` as keyof ReferenceFormType
                  }
                />
              </View>
              {errors[
                `f_references_cell_phone${ref}` as keyof ReferenceFormType
              ] && (
                <Text style={InputStyles.error}>
                  {errors[
                    `f_references_cell_phone${ref}` as keyof ReferenceFormType
                  ]?.type === "too_small"
                    ? "Esto es requerido"
                    : errors[
                        `f_references_cell_phone${ref}` as keyof ReferenceFormType
                      ]?.message?.toString()}
                </Text>
              )}
            </View>
          </View>
        );
      })}

      <View style={{ marginBottom: 20, marginTop: 20 }}>
        <Text style={theme.FONTS.H4}>
          Referencias personales {"\n"}(que no sean familiares)
        </Text>
      </View>
      {referenciasPersonales.map((ref) => {
        return (
          <View key={ref}>
            <View style={InputStyles.field}>
              <Text style={InputStyles.label}>
                Nombre y apellidos<Text>*</Text>
              </Text>
              <View style={InputStyles.container}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder="Nombre y apellidos"
                    />
                  )}
                  name={
                    `p_references_name_and_surname${ref}` as keyof ReferenceFormType
                  }
                />
              </View>
              {errors[
                `p_references_name_and_surname${ref}` as keyof ReferenceFormType
              ] && <Text style={InputStyles.error}>Esto es requerido.</Text>}
            </View>

            <View style={InputStyles.field}>
              <Text style={InputStyles.label}>
                Parentesco<Text>*</Text>
              </Text>
              <View style={InputStyles.container}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder="Parentesco"
                    />
                  )}
                  name={
                    `p_references_relationship${ref}` as keyof ReferenceFormType
                  }
                />
              </View>
              {errors[
                `p_references_relationship${ref}` as keyof ReferenceFormType
              ] && <Text style={InputStyles.error}>Esto es requerido.</Text>}
            </View>

            <View style={InputStyles.field}>
              <Text style={InputStyles.label}>
                Teléfono trabajo<Text>*</Text>
              </Text>
              <View style={InputStyles.container}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder="Teléfono trabajo"
                      keyboardType="numeric"
                    />
                  )}
                  name={
                    `p_references_work_phone${ref}` as keyof ReferenceFormType
                  }
                />
              </View>
              {errors[
                `p_references_work_phone${ref}` as keyof ReferenceFormType
              ] && (
                <Text style={InputStyles.error}>
                  {errors[
                    `p_references_work_phone${ref}` as keyof ReferenceFormType
                  ]?.type === "too_small"
                    ? "Esto es requerido"
                    : errors[
                        `p_references_work_phone${ref}` as keyof ReferenceFormType
                      ]?.message?.toString()}
                </Text>
              )}
            </View>

            <View style={InputStyles.field}>
              <Text style={InputStyles.label}>
                Celular<Text>*</Text>
              </Text>
              <View style={InputStyles.container}>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <CustomInput
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder="Celular"
                      keyboardType="numeric"
                    />
                  )}
                  name={
                    `p_references_cell_phone${ref}` as keyof ReferenceFormType
                  }
                />
              </View>
              {errors[
                `p_references_cell_phone${ref}` as keyof ReferenceFormType
              ] && (
                <Text style={InputStyles.error}>
                  {errors[
                    `p_references_cell_phone${ref}` as keyof ReferenceFormType
                  ]?.type === "too_small"
                    ? "Esto es requerido"
                    : errors[
                        `p_references_cell_phone${ref}` as keyof ReferenceFormType
                      ]?.message?.toString()}
                </Text>
              )}
            </View>
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
          title="Anterior"
          onPress={() => {
            if (occupation === "SALARIED") {
              previousStep(3);
            } else if (occupation === "NOINCOME") {
              previousStep(2);
            } else {
              previousStep();
            }
          }}
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

export default Referencias;

type ReferenceFormType = {
  f_references_name_and_surname: string;
  f_references_name_and_surname_2: string;
  f_references_work_phone: number;
  f_references_work_phone_2: number;
  f_references_cell_phone: number;
  f_references_cell_phone_2: number;
  f_references_relationship: string;
  f_references_relationship_2: string;
  p_references_name_and_surname: string;
  p_references_name_and_surname_2: string;
  p_references_work_phone: number;
  p_references_work_phone_2: number;
  p_references_cell_phone: number;
  p_references_cell_phone_2: number;
  p_references_relationship: string;
  p_references_relationship_2: string;
};
