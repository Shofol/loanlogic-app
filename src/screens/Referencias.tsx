import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Text, View } from "react-native";
import { useWizard } from "react-use-wizard";
import CustomInput from "../components/CustomInput";
import { theme } from "../constants";
import { InputStyles, Wizard } from "../constants/theme";

const Referencias = ({
  onPrevious,
  onSubmit
}: {
  onPrevious: (value: any) => void;
  onSubmit: (value: any) => void;
}) => {
  const { handleStep, previousStep, nextStep } = useWizard();

  const onFormSubmit = async (values: any) => {
    // onSubmit(values);
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
      f_references_name_and_surname: "",
      f_references_name_and_surname2: "",
      f_references_work_phone: "",
      f_references_work_phone2: "",
      f_references_cell_phone: "",
      f_references_cell_phone2: "",
      f_references_relationship: "",
      f_references_relationship_2: "",
      p_references_name_and_surname: "",
      p_references_name_and_surname2: "",
      p_references_work_phone: "",
      p_references_work_phone2: "",
      p_references_cell_phone: "",
      p_references_cell_phone2: "",
      p_references_relationship: "",
      p_references_relationship_2: ""
    }
  });
  const [municipalities, setMunicipalities] = useState<any[]>([]);
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
          <>
            <View style={InputStyles.field}>
              <Text style={InputStyles.label}>
                Nombre y apellidos<Text>*</Text>
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
              ] && <Text style={InputStyles.error}>This is required.</Text>}
            </View>

            <View style={InputStyles.field}>
              <Text style={InputStyles.label}>
                Parentesco<Text>*</Text>
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
              ] && <Text style={InputStyles.error}>This is required.</Text>}
            </View>

            <View style={InputStyles.field}>
              <Text style={InputStyles.label}>
                Teléfono trabajo<Text>*</Text>
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
                      placeholder="Teléfono trabajo"
                    />
                  )}
                  name={
                    `f_references_work_phone${ref}` as keyof ReferenceFormType
                  }
                />
              </View>
              {errors[
                `f_references_work_phone${ref}` as keyof ReferenceFormType
              ] && <Text style={InputStyles.error}>This is required.</Text>}
            </View>

            <View style={InputStyles.field}>
              <Text style={InputStyles.label}>
                Celular<Text>*</Text>
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
                      placeholder="Celular"
                    />
                  )}
                  name={
                    `f_references_cell_phone${ref}` as keyof ReferenceFormType
                  }
                />
              </View>
              {errors[
                `f_references_cell_phone${ref}` as keyof ReferenceFormType
              ] && <Text style={InputStyles.error}>This is required.</Text>}
            </View>
          </>
        );
      })}

      <View style={{ marginBottom: 20, marginTop: 20 }}>
        <Text style={theme.FONTS.H4}>
          Referencias personales {"\n"}(que no sean familiares)
        </Text>
      </View>
      {referenciasPersonales.map((ref) => {
        return (
          <>
            <View style={InputStyles.field}>
              <Text style={InputStyles.label}>
                Nombre y apellidos<Text>*</Text>
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
              ] && <Text style={InputStyles.error}>This is required.</Text>}
            </View>

            <View style={InputStyles.field}>
              <Text style={InputStyles.label}>
                Parentesco<Text>*</Text>
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
              ] && <Text style={InputStyles.error}>This is required.</Text>}
            </View>

            <View style={InputStyles.field}>
              <Text style={InputStyles.label}>
                Teléfono trabajo<Text>*</Text>
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
                      placeholder="Teléfono trabajo"
                    />
                  )}
                  name={
                    `p_references_work_phone${ref}` as keyof ReferenceFormType
                  }
                />
              </View>
              {errors[
                `p_references_work_phone${ref}` as keyof ReferenceFormType
              ] && <Text style={InputStyles.error}>This is required.</Text>}
            </View>

            <View style={InputStyles.field}>
              <Text style={InputStyles.label}>
                Celular<Text>*</Text>
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
                      placeholder="Celular"
                    />
                  )}
                  name={
                    `p_references_cell_phone${ref}` as keyof ReferenceFormType
                  }
                />
              </View>
              {errors[
                `p_references_cell_phone${ref}` as keyof ReferenceFormType
              ] && <Text style={InputStyles.error}>This is required.</Text>}
            </View>
          </>
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
          onPress={() => nextStep()}

          // onPress={handleSubmit(onFormSubmit)}
        />
      </View>
    </View>
  );
};

export default Referencias;

type ReferenceFormType = {
  f_references_name_and_surname: string;
  f_references_name_and_surname2: string;
  f_references_work_phone: string;
  f_references_work_phone2: string;
  f_references_cell_phone: string;
  f_references_cell_phone2: string;
  f_references_relationship: string;
  f_references_relationship_2: string;
  p_references_name_and_surname: string;
  p_references_name_and_surname2: string;
  p_references_work_phone: string;
  p_references_work_phone2: string;
  p_references_cell_phone: string;
  p_references_cell_phone2: string;
  p_references_relationship: string;
  p_references_relationship_2: string;
};
