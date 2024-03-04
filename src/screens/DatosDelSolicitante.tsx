import { zodResolver } from "@hookform/resolvers/zod";
import * as Location from "expo-location";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Text, View } from "react-native";
import { z } from "zod";
import CustomCheckbox from "../components/CustomCheckbox";
import CustomDatePicker from "../components/CustomDatePicker";
import CustomDropdownPicker from "../components/CustomDropdownPicker";
import CustomFileUploader from "../components/CustomFileUploader";
import CustomInput from "../components/CustomInput";
import LocationButton from "../components/LocationButton";
import { theme } from "../constants";
import {
  departments,
  maritialStatus,
  municipalitiesValues,
  nationalities,
  sexValues
} from "../constants/data";
import { InputStyles, Wizard } from "../constants/theme";
import { DPIContext } from "../utils/contexts/DPIContext";

const DatosDelSolicitante = ({
  location,
  onSubmit,
  // dpiData,
  occupation,
  previousStep,
  nextStep
}: {
  onSubmit: (value: any) => void;
  // dpiData: any;
  occupation: string | null;
  previousStep: (e?: number) => void;
  nextStep: (e?: number) => void;
  location: Location.LocationObject;
}) => {
  // const { handleStep, previousStep, nextStep, goToStep } = useWizard();

  const onFormSubmit = async (values: any) => {
    onSubmit(values);
    if (occupation === "SALARIED" || occupation === "SALARIEDANDBUSINESS") {
      nextStep();
    } else if (occupation === "BUSINESS") {
      nextStep(4);
    } else {
      nextStep(5);
    }
  };

  const [isSecondNameNotRequired, setisSecondNameNotRequired] = useState(false);
  const [municipalities, setMunicipalities] = useState<any[]>([]);
  const dpiData = useContext(DPIContext);
  const defaultValues = {
    photos_of_bills: [],
    surname: dpiData ? dpiData.surname : "",
    second_surname: dpiData ? dpiData.second_surname : "",
    name: dpiData ? dpiData.name : "",
    second_name: dpiData ? dpiData.second_name : "",
    phone_number: dpiData ? dpiData.phone_number : "",
    landline_phone_number: dpiData ? dpiData.landline_phone_number : "",
    email: dpiData ? dpiData.email : "",
    residence_address: dpiData ? dpiData.residence_address : "",
    residence_municipality: dpiData ? dpiData.residence_municipality : "",
    department_of_residence: dpiData ? dpiData.department_of_residence : "",
    birth_date: dpiData ? dpiData.birth_date : null,
    profession: dpiData ? dpiData.profession : "",
    civil_status: dpiData ? dpiData.civil_status : "",
    sex: dpiData ? dpiData.sex : "",
    nationality: dpiData ? dpiData.nationality : "",
    residence_latitude: "",
    residence_longitude: ""
  };

  useEffect(() => {
    if (dpiData) {
      reset(defaultValues);
    }
  }, [dpiData]);

  const Schema = z
    .object({
      photos_of_bills: z.any().array().nonempty(),
      surname: z.string().min(1),
      second_surname: z.string().min(1),
      name: z.string().min(1),
      second_name: !isSecondNameNotRequired ? z.string().min(1) : z.any(),
      phone_number: z
        .string()
        .min(1)
        .max(8)
        .refine((value) => /^[0-9]*$/.test(value), "Sólo se permiten números"),
      landline_phone_number: z
        .string()
        .min(1)
        .max(8)
        .refine((value) => /^[0-9]*$/.test(value), "Sólo se permiten números"),
      email: z.any(),
      residence_address: z.string().min(1),
      residence_municipality: z.string().min(1),
      department_of_residence: z.string().min(1),
      birth_date: z.string().min(1),
      profession: z.string().min(1),
      civil_status: z.string().min(1),
      sex: z.string().min(1),
      nationality: z.string().min(1),
      residence_latitude: z.string(),
      residence_longitude: z.string()
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
  // 1817283672722818263563113434

  const onDocumentUpload = async (newUploadedFiles: any) => {
    setValue("photos_of_bills", newUploadedFiles);
  };
  const [locationAdded, setLocationAdded] = useState(false);

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
          <Text style={InputStyles.error}>Esto es requerido.</Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>
          Segundo apellido<Text>*</Text>
        </Text>
        <View style={InputStyles.container}>
          <Controller
            control={control}
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
          <Text style={InputStyles.error}>Esto es requerido.</Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>
          Nombre<Text>*</Text>
        </Text>
        <View style={InputStyles.container}>
          <Controller
            control={control}
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
          <Text style={InputStyles.error}>Esto es requerido.</Text>
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
          <Text style={InputStyles.error}>Esto es requerido.</Text>
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
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Número de celular"
                keyboardType="numeric"
              />
            )}
            name="phone_number"
          />
        </View>
        {errors.phone_number && (
          <Text style={InputStyles.error}>
            {errors.phone_number.type === "too_small"
              ? "Esto es requerido"
              : errors.phone_number.message?.toString()}
          </Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>Número de teléfono fijo*</Text>
        <View style={InputStyles.container}>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomInput
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Número de teléfono fijo"
                keyboardType="numeric"
              />
            )}
            name="landline_phone_number"
          />
        </View>
        {errors.landline_phone_number && (
          <Text style={InputStyles.error}>
            {errors.landline_phone_number.type === "too_small"
              ? "Esto es requerido"
              : errors.landline_phone_number.message?.toString()}
          </Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>Correo electrónico</Text>
        <View style={InputStyles.container}>
          <Controller
            control={control}
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
          <Text style={InputStyles.error}>
            {errors.email.type === "too_small"
              ? "Esto es requerido"
              : errors.email.message?.toString()}
          </Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>Dirección de residencia*</Text>
        <View style={InputStyles.container}>
          <Controller
            control={control}
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
          <Text style={InputStyles.error}>Esto es requerido.</Text>
        )}
      </View>

      <View style={{ marginBottom: 20 }}>
        <LocationButton
          locationAdded={locationAdded}
          onPress={() => {
            try {
              setValue(
                "residence_latitude",
                location.coords.latitude.toString() as string
              );
              setValue(
                "residence_longitude",
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
          name="department_of_residence"
        />
        {errors.department_of_residence && (
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
          name="residence_municipality"
        />
        {errors.residence_municipality && (
          <Text style={InputStyles.error}>Esto es requerido.</Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>
          Fecha de nacimiento<Text>*</Text>
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
          name="birth_date"
        />
        {errors.birth_date && (
          <Text style={InputStyles.error}>Esto es requerido.</Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>Profesión*</Text>
        <View style={InputStyles.container}>
          <Controller
            control={control}
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
          <Text style={InputStyles.error}>Esto es requerido.</Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>Estado civil</Text>
        <Controller
          control={control}
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
        {errors.civil_status && (
          <Text style={InputStyles.error}>Esto es requerido.</Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>Sexo*</Text>
        <Controller
          control={control}
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
        {errors.sex && (
          <Text style={InputStyles.error}>Esto es requerido.</Text>
        )}
      </View>

      <View style={InputStyles.field}>
        <Text style={InputStyles.label}>Nacionalidad*</Text>
        <Controller
          control={control}
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
        {errors.nationality && (
          <Text style={InputStyles.error}>Esto es requerido.</Text>
        )}
      </View>

      <Text style={InputStyles.label}>
        Foto del recibo de la luz (u otro recibo)*
      </Text>
      <View style={{ marginBottom: 20 }}>
        <CustomFileUploader
          onUpload={(files) => {
            onDocumentUpload(files);
          }}
        />
        {errors.photos_of_bills && (
          <Text style={[InputStyles.error]}>Esto es requerido.</Text>
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

export default DatosDelSolicitante;
