import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Text, View } from "react-native";
import { useWizard } from "react-use-wizard";
import CustomCheckbox from "../components/CustomCheckbox";
import CustomDatePicker from "../components/CustomDatePicker";
import CustomDropdownPicker from "../components/CustomDropdownPicker";
import CustomInput from "../components/CustomInput";
import { theme } from "../constants";
import {
  departments,
  maritialStatus,
  municipalitiesValues,
  nationalities,
  sexValues
} from "../constants/data";
import { InputStyles, Wizard } from "../constants/theme";

const DatosDelSolicitante = ({
  onSubmit,
  occupation
}: {
  onSubmit: (value: any) => void;
  occupation: string | null;
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
      photos_of_bills: [],
      surname: "",
      second_surname: "",
      name: "",
      second_name: "",
      phone_number: "",
      landline_phone_number: "",
      email: "",
      residence_address: "",
      residence_municipality: "",
      department_of_residence: "",
      birth_date: null,
      profession: "",
      civil_status: "",
      sex: "",
      nationality: ""
    }
  });
  const [isSecondNameNotRequired, setisSecondNameNotRequired] = useState(false);
  const [municipalities, setMunicipalities] = useState<any[]>([]);

  return (
    <View>
      <Text style={Wizard.header}>Datos del Solicitante</Text>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>
          Primer apellido<Text>*</Text>
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
                placeholder="Primer apellido"
              />
            )}
            name="surname"
          />
        </View>
        {errors.surname && (
          <Text style={InputStyles.error}>This is required.</Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>
          Segundo apellido<Text>*</Text>
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
                placeholder="Segundo apellido"
              />
            )}
            name="second_surname"
          />
        </View>
        {errors.second_surname && (
          <Text style={InputStyles.error}>This is required.</Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>
          Nombre<Text>*</Text>
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
                placeholder="Nombre"
              />
            )}
            name="name"
          />
        </View>
        {errors.name && (
          <Text style={InputStyles.error}>This is required.</Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>
          Segundo nombre
          <Text> {!isSecondNameNotRequired && <Text>*</Text>}</Text>
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
                placeholder="Segundo nombre"
              />
            )}
            name="second_name"
          />
        </View>
        {errors.second_name && (
          <Text style={InputStyles.error}>This is required.</Text>
        )}
      </View>

      <View style={{ marginTop: 10, marginBottom: 20 }}>
        <CustomCheckbox
          text="Sin Segundo Nombre"
          onchange={(e: any) => {
            setisSecondNameNotRequired(!isSecondNameNotRequired);
          }}
        />
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>Número de celular*</Text>
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
                placeholder="Número de celular"
              />
            )}
            name="phone_number"
          />
        </View>
        {errors.phone_number && (
          <Text style={InputStyles.error}>This is required.</Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>Número de teléfono fijo*</Text>
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
                placeholder="Número de teléfono fijo"
              />
            )}
            name="landline_phone_number"
          />
        </View>
        {errors.landline_phone_number && (
          <Text style={InputStyles.error}>This is required.</Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>Correo electrónico*</Text>
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
                placeholder="Correo electrónico"
              />
            )}
            name="email"
          />
        </View>
        {errors.email && (
          <Text style={InputStyles.error}>This is required.</Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>Dirección de residencia*</Text>
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
                placeholder="Dirección de residencia"
              />
            )}
            name="residence_address"
          />
        </View>
        {errors.residence_address && (
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
          name="department_of_residence"
        />
        {errors.department_of_residence && <Text>This is required.</Text>}
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
          name="residence_municipality"
        />
        {errors.residence_municipality && <Text>This is required.</Text>}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>
          Fecha de nacimiento<Text>*</Text>
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
          name="birth_date"
        />
        {errors.birth_date && (
          <Text style={InputStyles.error}>This is required.</Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>Profesión*</Text>
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
                placeholder="Profesión"
              />
            )}
            name="profession"
          />
        </View>
        {errors.profession && (
          <Text style={InputStyles.error}>This is required.</Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>Estado civil</Text>
        <Controller
          control={control}
          // rules={{
          //   required: true
          // }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomDropdownPicker
              value={value}
              items={maritialStatus}
              onSelectItem={(e: any) => {
                onChange(e.value);
              }}
            />
          )}
          name="civil_status"
        />
        {errors.civil_status && <Text>This is required.</Text>}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>Sexo*</Text>
        <Controller
          control={control}
          // rules={{
          //   required: true
          // }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomDropdownPicker
              value={value}
              items={sexValues}
              onSelectItem={(e: any) => {
                onChange(e.value);
              }}
            />
          )}
          name="sex"
        />
        {errors.sex && <Text>This is required.</Text>}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>Nacionalidad*</Text>
        <Controller
          control={control}
          // rules={{
          //   required: true
          // }}
          render={({ field: { onChange, onBlur, value } }) => (
            <CustomDropdownPicker
              value={value}
              items={nationalities}
              onSelectItem={(e: any) => {
                onChange(e.value);
              }}
            />
          )}
          name="nationality"
        />
        {errors.nationality && <Text>This is required.</Text>}
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

export default DatosDelSolicitante;
