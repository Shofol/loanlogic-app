import { zodResolver } from "@hookform/resolvers/zod";
import * as DocumentPicker from "expo-document-picker";
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
import { formatToFile } from "../utils/formatToFile";

const Garantía: React.FC = ({ route, navigation }: any) => {
  const { id } = route.params;

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

  const pickDocument = async () => {
    let newUploadedFiles: any[] = [];

    let result = await DocumentPicker.getDocumentAsync({
      multiple: true
    });

    if (result.assets) {
      result.assets.map((item) => {
        newUploadedFiles = [...newUploadedFiles, formatToFile(item)];
      });
      setValue("photo", newUploadedFiles as any);
    }
  };

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

    try {
      const response = await api.post("guarantee", form);
      Toast.show({
        type: "success",
        text1: response.data.message,
        position: "bottom",
        visibilityTime: 2000
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {renderHeader()}
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.COLORS.bgColor }}>
        {/* {renderContent()} */}
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
              Modelo<Text>*</Text>
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
                    placeholder="Modelo"
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
              Destino del crédito<Text>*</Text>
            </Text>
            <View style={InputStyles.container}>
              <Controller
                control={control}
                rules={{
                  required: "Número de série"
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Número de série"
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

          <Text style={InputStyles.label}>Foto ambos lados del DPI*</Text>
          <View style={{ marginBottom: 20 }}>
            <CustomFileUploader
              onSelect={() => {
                pickDocument();
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

export default Garantía;
