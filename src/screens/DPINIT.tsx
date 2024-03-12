import "dayjs/locale/es";

import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import { z } from "zod";
import api from "../api/api";
import CustomCheckbox from "../components/CustomCheckbox";
import CustomDatePicker from "../components/CustomDatePicker";
import CustomDropdownPicker from "../components/CustomDropdownPicker";
import CustomFileUploader from "../components/CustomFileUploader";
import CustomInput from "../components/CustomInput";
import { theme } from "../constants";
import {
  departments,
  municipalitiesValues,
  wantCredit
} from "../constants/data";
import { InputStyles, Wizard } from "../constants/theme";

const DPINIT = ({
  onSubmit,
  onLoadDPIData,
  previousStep,
  nextStep
}: {
  onSubmit: (value: any) => void;
  onLoadDPIData: (value: any) => void;
  previousStep: (e?: number) => void;
  nextStep: (e?: number) => void;
}) => {
  // const { previousStep, nextStep } = useWizard();
  const [isNITNotRequired, setIsNITNotRequired] = useState(false);
  const [municipalities, setMunicipalities] = useState<any[]>([]);
  const [negMunicipalities, setNegMunicipalities] = useState<any[]>([]);
  const [isCreditInsAmntRqrd, setIsCreditInsAmntRqrd] = useState(false);
  const [data, setData] = useState<any>();

  const fetchDPIData = async (dpi_number: any) => {
    try {
      const response = await api.get(`/client/dpi/${dpi_number}`);
      const tempData = response.data.data;
      setData(tempData);
      onLoadDPIData(response.data.data);
    } catch (error) {
      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Cliente no encontrado"
      });
      console.log(error);
    }
  };

  const mapInitialValues = () => {
    const initialValues = {
      dpi_number: data ? data.dpi_number : "",
      place_of_birth_city: data ? data.place_of_birth_city : "",
      place_of_birth_region: data ? data.place_of_birth_region : "",
      neighborhood_city: data ? data.neighborhood_city : "",
      neighborhood_region: data ? data.neighborhood_region : "",
      expiration_date: data ? data.expiration_date : null,
      photos_of_the_dpi: [],
      nit: data ? data.nit : "",
      is_have_credit: "",
      credit_institutions_and_amount: ""
    };
    return initialValues;
  };

  const [formValues, setFormValues] = useState(mapInitialValues());

  useEffect(() => {
    if (data) {
      const values = mapInitialValues();
      setFormValues(values);
      reset(values);
    }
  }, [data]);

  const Schema = z
    .object({
      dpi_number: z.string().min(1),
      place_of_birth_city: z.string(),
      place_of_birth_region: z.string(),
      neighborhood_city: z.string(),
      neighborhood_region: z.string(),
      expiration_date: z.string(),
      nit: !isNITNotRequired ? z.string().min(1) : z.any(),
      credit_institutions_and_amount: isCreditInsAmntRqrd
        ? z.string().min(1)
        : z.any(),
      is_have_credit: z.string(),
      photos_of_the_dpi: z.any().array().nonempty()
    })
    .required();

  const {
    setValue,
    getValues,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(Schema),
    defaultValues: formValues
  });

  const onDocumentUpload = (newUploadedFiles: any) => {
    setValue("photos_of_the_dpi", newUploadedFiles as any);
  };

  const onFormSubmit = async (values: any) => {
    onSubmit(values);
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
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomInput
                  onChange={onChange}
                  onBlur={() => {
                    fetchDPIData(value);
                    onBlur();
                  }}
                  value={value}
                  placeholder="Número DPI"
                />
              )}
              name="dpi_number"
            />
          </View>
          {errors.dpi_number && (
            <Text style={InputStyles.error}>Esto es requerido.</Text>
          )}
        </View>

        <Text style={InputStyles.label}>
          Lugar de nacimiento (departamento, municipio)*
        </Text>

        <View style={InputStyles.field}>
          <Text style={InputStyles.label}>Departamento</Text>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
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
          {errors.place_of_birth_city && (
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
            name="place_of_birth_region"
          />
          {errors.place_of_birth_region && (
            <Text style={InputStyles.error}>Esto es requerido.</Text>
          )}
        </View>

        <View style={InputStyles.field}>
          <Text style={InputStyles.label}>
            Fecha vencimiento<Text>*</Text>
          </Text>

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomDatePicker
                defaultValue={null}
                value={dayjs(value)}
                onChange={onChange}
                defaultText="Seleccionar fecha de vencimiento"
              />
            )}
            name="expiration_date"
          />
          {errors.expiration_date && (
            <Text style={InputStyles.error}>Esto es requerido.</Text>
          )}
        </View>

        <Text style={InputStyles.label}>Vecindad*</Text>

        <View style={InputStyles.field}>
          <Text style={InputStyles.label}>Departamento</Text>
          <Controller
            control={control}
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
          {errors.neighborhood_city && (
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
                items={negMunicipalities}
                onSelectItem={(e: any) => onChange(e.value)}
              />
            )}
            name="neighborhood_region"
          />
          {errors.neighborhood_region && (
            <Text style={InputStyles.error}>Esto es requerido.</Text>
          )}
        </View>

        <Text style={InputStyles.label}>Foto ambos lados del DPI*</Text>
        <View style={{ marginBottom: 20 }}>
          <CustomFileUploader
            onUpload={(files) => {
              onDocumentUpload(files);
            }}
          />
          {errors.photos_of_the_dpi && (
            <Text style={[InputStyles.error]}>Esto es requerido.</Text>
          )}
        </View>
        <View style={InputStyles.field}>
          <Text style={InputStyles.label}>
            NIT
            {!isNITNotRequired && <Text>*</Text>}
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
              name="nit"
            />
          </View>
          {errors.nit && (
            <Text style={InputStyles.error}>Esto es requerido.</Text>
          )}
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
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomDropdownPicker
                value={value}
                items={wantCredit}
                onSelectItem={(e: any) => {
                  setIsCreditInsAmntRqrd(e.value === "yes" ? true : false);
                  onChange(e.value);
                }}
              />
            )}
            name="is_have_credit"
          />
          {errors.is_have_credit && (
            <Text style={InputStyles.error}>Esto es requerido.</Text>
          )}
        </View>

        <View style={InputStyles.field}>
          <Text style={InputStyles.label}>
            Si la respuesta es sí, indicar las instituciones y monto
            {isCreditInsAmntRqrd && <Text>*</Text>}
          </Text>

          <View style={InputStyles.container}>
            <Controller
              control={control}
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
            <Text style={InputStyles.error}>Esto es requerido.</Text>
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
    </KeyboardAwareScrollView>
  );
};

export default DPINIT;
