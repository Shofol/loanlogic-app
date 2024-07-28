import { zodResolver } from "@hookform/resolvers/zod";
import React, { forwardRef, useImperativeHandle } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { z } from "zod";
import CustomDropdownPicker from "../components/CustomDropdownPicker";
import CustomFileUploader from "../components/CustomFileUploader";
import CustomInput from "../components/CustomInput";
import { tipoDeGarantiaOptions } from "../constants/data";
import { InputStyles, theme } from "../constants/theme";
import useLocation from "../utils/hooks/useLocation";

const GarantiaForm: React.FC = forwardRef((props: any, ref) => {
  const location = useLocation();
  const Schema = z
    .object({
      guarantee_item: z.string().min(1),
      description: z.string().min(1),
      model: z.string().min(1),
      serial_number: z.string().min(1),
      photo: z.any().array().nonempty(),
    })
    .required();

  const {
    getValues,
    setValue,
    setError,
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(Schema),
    defaultValues: props.init,
  });

  const onDocumentUpload = (newUploadedFiles: any) => {
    setValue("photo", newUploadedFiles as any);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        getGuarantee() {
          return getFormValue();
        },
        submit() {
          handleSubmit(onSubmit)();
        },
        isValid() {
          return isSubmitSuccessful;
        },
      };
    },
    []
  );

  const getFormValue = () => {
    return getValues();
  };

  const onSubmit: SubmitHandler<any> = () => {
    props.onFormSubmit(getFormValue());
  };

  return (
    <>
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
              required: "Esto es requerido",
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
          <Text style={InputStyles.error}>Esto es requerido. </Text>
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
              required: "Esto es requerido",
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
          <Text style={InputStyles.error}>Esto es requerido.</Text>
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
              required: "Número de serie",
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
          <Text style={InputStyles.error}>Esto es requerido.</Text>
        )}
      </View>

      <Text style={InputStyles.label}>Foto de Garantía*</Text>
      <View style={{ marginBottom: 5 }}>
        <CustomFileUploader
          onUpload={(files) => {
            onDocumentUpload(files);
          }}
        />
        {errors.photo && (
          <Text style={[InputStyles.error]}>Esto es requerido.</Text>
        )}
      </View>

      <View
        style={{
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <TouchableOpacity
          style={{
            borderColor: theme.COLORS.danger,
            borderWidth: 1,
            width: 150,
            display: "flex",
            alignItems: "center",
            paddingVertical: 10,
            borderRadius: 5,
          }}
          onPress={() => props.onRemove()}
        >
          <Text style={{ color: theme.COLORS.danger }}>Eliminar garantía</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: 2,
          backgroundColor: theme.COLORS.grey1,
          marginVertical: 20,
        }}
      ></View>
    </>
  );
});

export default GarantiaForm;
