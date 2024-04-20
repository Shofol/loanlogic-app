import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, SafeAreaView, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { z } from "zod";
import api from "../api/api";
import { components } from "../components";
import CustomDropdownPicker from "../components/CustomDropdownPicker";
import CustomFileUploader from "../components/CustomFileUploader";
import CustomInput from "../components/CustomInput";
import { tipoDeGarantiaOptions } from "../constants/data";
import { InputStyles, theme } from "../constants/theme";
import useLocation from "../utils/hooks/useLocation";

const Garantia: React.FC = ({ route, navigation }: any) => {
  const { id } = route.params;
  const location = useLocation();

  const Schema = z
    .object({
      guarantee_item: z.string().min(1),
      description: z.string().min(1),
      model: z.any(),
      serial_number: z.any(),
      photo: z.any().array().nonempty()
    })
    .required();

  const {
    setValue,
    setError,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {
      guarantee_item: "",
      description: "",
      model: "",
      serial_number: "",
      photo: []
    }
  });
  const renderHeader = () => {
    return (
      <components.Header
        title={`Garantía (${id})`}
        goBack={true}
        goBackColor={theme.COLORS.white}
      />
    );
  };

  const onDocumentUpload = (newUploadedFiles: any) => {
    setValue("photo", newUploadedFiles as any);
  };

  // const pickDocument = async () => {
  //   let newUploadedFiles: any[] = [];

  //   let result = await DocumentPicker.getDocumentAsync({
  //     multiple: true
  //   });

  //   if (result.assets) {
  //     result.assets.map((item) => {
  //       newUploadedFiles = [...newUploadedFiles, formatToFile(item)];
  //     });
  //     setValue("photo", newUploadedFiles as any);
  //   }
  // };

  const onSubmit = async (values: any) => {
    const form = new FormData();

    Object.keys(values).map((key) => {
      if (key === "photo") {
        values[`${key}`].map((file: any) => {
          form.append(key, file);
        });
      } else {
        form.append(key, values[`${key}`]);
      }
    });

    form.append("application_id", id);
    form.append(
      "guaranty_latitude",
      location?.coords.latitude.toString() as string
    );

    form.append(
      "guaranty_longitude",
      location?.coords.longitude.toString() as string
    );
    try {
      const response = await api.post("guarantee", form, {});
      Toast.show({
        type: "success",
        text1: response.data.message,
        position: "bottom",
        visibilityTime: 2000
      });
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {renderHeader()}
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.COLORS.bgColor }}>
        <ScrollView style={{ padding: 20 }}>
          <View style={InputStyles.field}>
            <Text style={InputStyles.label}>Tipo garantía*</Text>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomDropdownPicker
                  value={value}
                  items={tipoDeGarantiaOptions}
                  onSelectItem={(e: any) => onChange(e.value)}
                />
              )}
              name="guarantee_item"
            />
            {errors.guarantee_item && (
              <Text style={InputStyles.error}>Esto es requerido.</Text>
            )}
          </View>

          <View style={InputStyles.field}>
            <Text style={InputStyles.label}>
              Descripción<Text>*</Text>
            </Text>
            <View style={InputStyles.container}>
              <Controller
                control={control}
                rules={{
                  required: "Esto es requerido"
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Descripción"
                  />
                )}
                name="description"
              />
            </View>
            {errors.description && (
              <Text style={InputStyles.error}>
                {errors.description.message}
              </Text>
            )}
          </View>

          <View style={InputStyles.field}>
            <Text style={InputStyles.label}>
              Marca<Text>*</Text>
            </Text>
            <View style={InputStyles.container}>
              <Controller
                control={control}
                rules={{
                  required: "Esto es requerido"
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Marca"
                  />
                )}
                name="model"
              />
            </View>
            {errors.model && (
              <Text style={InputStyles.error}>{errors.model.message}</Text>
            )}
          </View>

          <View style={InputStyles.field}>
            <Text style={InputStyles.label}>
              Número de serie<Text>*</Text>
            </Text>
            <View style={InputStyles.container}>
              <Controller
                control={control}
                rules={{
                  required: "Número de serie"
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Número de serie"
                  />
                )}
                name="serial_number"
              />
            </View>
            {errors.serial_number && (
              <Text style={InputStyles.error}>
                {errors.serial_number.message}
              </Text>
            )}
          </View>

          <Text style={InputStyles.label}>Foto de Garantía*</Text>
          <View style={{ marginBottom: 20 }}>
            <CustomFileUploader
              onUpload={(files) => {
                onDocumentUpload(files);
              }}
            />
            {errors.photo && (
              <Text style={[InputStyles.error]}>Esto es requerido.</Text>
            )}
          </View>

          <Button
            color={theme.COLORS.linkColor}
            title="Guardar"
            onPress={handleSubmit(onSubmit)}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Garantia;
