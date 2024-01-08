import "dayjs/locale/es";

import { zodResolver } from "@hookform/resolvers/zod";
import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Image, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useWizard } from "react-use-wizard";
import { z } from "zod";
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
import { formatToFile } from "../utils/formatToFile";

const DPINIT = ({ onSubmit }: { onSubmit: (value: any) => void }) => {
  const { handleStep, previousStep, nextStep } = useWizard();
  const [isNITNotRequired, setIsNITNotRequired] = useState(false);
  const [municipalities, setMunicipalities] = useState<any[]>([]);
  const [negMunicipalities, setNegMunicipalities] = useState<any[]>([]);
  const [isCreditInsAmntRqrd, setIsCreditInsAmntRqrd] = useState(false);
  const [documents, setDocuments] = useState([]);

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
    control,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {
      dpi_number: "",
      place_of_birth_city: null,
      place_of_birth_region: null,
      neighborhood_region: null,
      neighborhood_city: null,
      expiration_date: null,
      nit: "",
      credit_institutions_and_amount: "",
      is_have_credit: null,
      photos_of_the_dpi: []
    }
  });

  const pickDocument = async () => {
    let newUploadedFiles: any[] = [];

    let result = await DocumentPicker.getDocumentAsync({
      multiple: true
    });

    if (result.assets) {
      result.assets.map((item) => {
        newUploadedFiles = [...newUploadedFiles, formatToFile(item)];
      });
      setValue("photos_of_the_dpi", newUploadedFiles as any);
      setDocuments(newUploadedFiles as any);
    }
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
                  onBlur={onBlur}
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
                value={value}
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
            onSelect={() => {
              pickDocument();
            }}
          />
          {errors.photos_of_the_dpi && (
            <Text style={[InputStyles.error]}>Esto es requerido.</Text>
          )}
        </View>

        <View style={{ marginBottom: 20, flexDirection: "row", gap: 16 }}>
          {documents.length > 0 &&
            documents.map((item: any) => {
              const isImage = item.type.includes("image");
              return (
                <Image
                  key={item.name}
                  style={{ width: 50, height: 50 }}
                  source={
                    isImage
                      ? {
                          uri: item.uri
                        }
                      : require("../assets/icons/file.png")
                  }
                />
              );
            })}
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
