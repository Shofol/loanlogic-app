import "dayjs/locale/es";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View
} from "react-native";
import Toast from "react-native-toast-message";
import { z } from "zod";
import api from "../api/api";
import { components } from "../components";
import CustomCheckbox from "../components/CustomCheckbox";
import CustomCheckboxGroup from "../components/CustomCheckboxGroup";
import CustomFileUploader from "../components/CustomFileUploader";
import CustomInput from "../components/CustomInput";
import { theme } from "../constants";
import { ChecboxGroupStyle, InputStyles } from "../constants/theme";
import useLocation from "../utils/hooks/useLocation";

const ValidationForm: React.FC = ({ route, navigation }: any) => {
  const [isNITNotRequired, setIsNITNotRequired] = useState(false);
  const [dirección, setDirección] = useState("");
  const [garantía, setGarantía] = useState([]);
  const { id } = route.params;
  const location = useLocation();

  const mapInitialValues = () => {
    const initialValues: CreditValidation = {
      business_type: "",
      address_approved: null,
      inventory: "",
      comment_observations: "",
      observations: [],
      payment_day: "",
      guarantee_approved: null,
      comment: "",
      evidences: [],
      work_documents: [],
      credit_approval: null
    };
    return initialValues;
  };

  const [formValues, setFormValues] = useState(mapInitialValues());

  useEffect(() => {
    fetchApplication();
  }, []);

  const fetchApplication = async () => {
    const response = await api.get(`credit-application/${id}`);
    const application = response.data.data;
    setDirección(
      application.client.residence_address +
        ", " +
        application.client.residence_municipality
    );

    if (application.guarantee && application.guarantee.photo) {
      setGarantía(application.guarantee.photo);
    } else {
      setGarantía(application.gurrentee_items.photo);
    }
  };

  const Schema = z
    .object({
      business_type: z.string().min(1),
      address_approved: z.boolean(),
      inventory: z.string().min(1),
      comment_observations: z.string(),
      observations: z.any(),
      payment_day: z.string().min(1),
      guarantee_approved: z.boolean(),
      comment: z.string().min(1),
      evidences: z.any(),
      work_documents: z.any(),
      credit_approval: z.boolean()
    })
    .required();

  const {
    setValue,
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(Schema),
    defaultValues: formValues
  });

  const onDocumentUpload = (newUploadedFiles: any, key: any) => {
    setValue(key, newUploadedFiles as any);
  };

  const onFormSubmit = async (values: any) => {
    const form = new FormData();

    Object.entries(values).map((pair: any) => {
      if (pair[0] === "evidences" || pair[0] === "work_documents") {
        values[`${pair[0]}`].map((file: any) => {
          form.append(`${pair[0]}`, file);
        });
      } else if (pair[0] === "observations") {
        form.append(`${pair[0]}`, JSON.stringify(pair[1]));
      } else {
        form.append(pair[0], pair[1]);
      }
    });

    form.append(
      "validation_latitude",
      location?.coords.latitude.toString() as string
    );

    form.append(
      "validation_longitude",
      location?.coords.longitude.toString() as string
    );

    try {
      const response = await api.post(`credit/validation/${id}`, form);
      Toast.show({
        type: "success",
        text1: `${response.data.message}`
      });
      navigation.navigate("ValidaciónCrédito");
    } catch (error) {
      console.error(error);
    }
  };

  const renderHeader = () => {
    return (
      <components.Header
        title={`Validar crédito (${id})`}
        goBack={true}
        goBackColor={theme.COLORS.white}
      />
    );
  };

  return (
    <>
      {renderHeader()}
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.COLORS.bgColor }}>
        <ScrollView style={{ padding: 20 }}>
          <View style={InputStyles.field}>
            <Text style={InputStyles.label}>
              Tipo de negocio<Text>*</Text>
            </Text>
            <View style={InputStyles.container}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Tipo de negocio"
                  />
                )}
                name="business_type"
              />
            </View>
            {errors.business_type && (
              <Text style={InputStyles.error}>Esto es requerido.</Text>
            )}
          </View>

          <View style={InputStyles.field}>
            <Text style={InputStyles.label}>
              Dirección<Text>*</Text>
            </Text>
            <Text
              style={[
                theme.FONTS.Mulish_400Regular,
                { marginBottom: 10, color: theme.COLORS.bodyTextColor }
              ]}
            >
              {dirección}
            </Text>
            <CustomCheckboxGroup
              data={[
                { id: "1", text: "Aceptar", value: true },
                { id: "2", text: "Rechazar", value: false }
              ]}
              onSelect={(e) => {
                setValue("address_approved", e.value as boolean);
              }}
            />
            {errors.address_approved && (
              <Text style={InputStyles.error}>Esto es requerido.</Text>
            )}
          </View>

          <View style={InputStyles.field}>
            <Text style={InputStyles.label}>
              Inventario<Text>*</Text>
            </Text>
            <View style={InputStyles.container}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Inventario"
                  />
                )}
                name="inventory"
              />
            </View>
            {errors.inventory && (
              <Text style={InputStyles.error}>Esto es requerido.</Text>
            )}
          </View>

          <View style={InputStyles.field}>
            <Text style={InputStyles.label}>
              Modalidad de pago<Text>*</Text>
            </Text>
            <View style={InputStyles.container}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Modalidad de pago"
                  />
                )}
                name="payment_day"
              />
            </View>
            {errors.payment_day && (
              <Text style={InputStyles.error}>Esto es requerido.</Text>
            )}
          </View>

          <View style={InputStyles.field}>
            <Text style={InputStyles.label}>
              Garantía<Text>*</Text>
            </Text>
            <Text>
              {garantía &&
                garantía.length > 0 &&
                garantía.map((item) => {
                  return (
                    <Image
                      style={{ width: 50, height: 50 }}
                      source={{ uri: item }}
                      key={item}
                    />
                  );
                })}
            </Text>
            <CustomCheckboxGroup
              data={[
                { id: "1", text: "Aceptar", value: true },
                { id: "2", text: "Rechazar", value: false }
              ]}
              onSelect={(e) => {
                setValue("guarantee_approved", e.value as boolean);
              }}
            />
            {errors.guarantee_approved && (
              <Text style={InputStyles.error}>Esto es requerido.</Text>
            )}
          </View>

          <View style={InputStyles.field}>
            <Text style={InputStyles.label}>Observaciones</Text>
            <View style={ChecboxGroupStyle.group}>
              <CustomCheckbox
                text="Vidrios rotos"
                onchange={(e: any) => {
                  setValue(
                    "observations",
                    e === true
                      ? [...getValues().observations, "vidriosRotos"]
                      : [
                          ...getValues().observations.filter(
                            (ob) => ob !== e.target.value
                          )
                        ]
                  );
                }}
              />

              <CustomCheckbox
                text="Postes"
                onchange={(e: any) => {
                  setValue(
                    "observations",
                    e === true
                      ? [...getValues().observations, "postes"]
                      : [
                          ...getValues().observations.filter(
                            (ob) => ob !== e.target.value
                          )
                        ]
                  );
                }}
              />
              <CustomCheckbox
                text="Malas referencias vecinos"
                onchange={(e: any) => {
                  setValue(
                    "observations",
                    e === true
                      ? [...getValues().observations, "malasReferencias"]
                      : [
                          ...getValues().observations.filter(
                            (ob) => ob !== e.target.value
                          )
                        ]
                  );
                }}
              />
            </View>
            {errors.observations && (
              <Text style={InputStyles.error}>Esto es requerido.</Text>
            )}
          </View>

          <View style={InputStyles.field}>
            <Text style={InputStyles.label}>Comentarios observaciones</Text>
            <View style={InputStyles.container}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Comentarios observaciones"
                  />
                )}
                name="comment_observations"
              />
            </View>
            {errors.comment_observations && (
              <Text style={InputStyles.error}>Esto es requerido.</Text>
            )}
          </View>

          <Text style={InputStyles.label}>Fotos de la casa</Text>
          <View style={{ marginBottom: 20 }}>
            <CustomFileUploader
              onUpload={(files) => {
                onDocumentUpload(files, "evidences");
              }}
            />
            {errors.evidences && (
              <Text style={[InputStyles.error]}>Esto es requerido.</Text>
            )}
          </View>

          <Text style={InputStyles.label}>Fotos del negocio</Text>
          <View style={{ marginBottom: 20 }}>
            <CustomFileUploader
              onUpload={(files) => {
                onDocumentUpload(files, "work_documents");
              }}
            />
            {errors.work_documents && (
              <Text style={[InputStyles.error]}>Esto es requerido.</Text>
            )}
          </View>

          <View style={InputStyles.field}>
            <Text style={InputStyles.label}>Analizar riesgo*</Text>
            <View style={InputStyles.container}>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <CustomInput
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    placeholder="Analizar riesgo"
                  />
                )}
                name="comment"
              />
            </View>
            {errors.comment && (
              <Text style={InputStyles.error}>Esto es requerido.</Text>
            )}
          </View>

          <View style={InputStyles.field}>
            <Text style={InputStyles.label}>
              Aceptar crédito<Text>*</Text>
            </Text>
            <View style={ChecboxGroupStyle.group}>
              <CustomCheckboxGroup
                data={[
                  { id: "1", text: "Aceptar", value: true },
                  { id: "2", text: "Rechazar", value: false }
                ]}
                onSelect={(e) => {
                  setValue("credit_approval", e.value as boolean);
                }}
              />
            </View>
            {errors.credit_approval && (
              <Text style={InputStyles.error}>Esto es requerido.</Text>
            )}
          </View>

          <View
            style={{
              flexDirection: "row",
              marginVertical: 20,
              justifyContent: "space-between"
            }}
          >
            <Button
              color={theme.COLORS.bodyTextColor}
              title="Descartar"
              onPress={() => reset(formValues)}
            />
            <Button
              color={theme.COLORS.linkColor}
              title="Guardar"
              onPress={handleSubmit(onFormSubmit)}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

type CreditValidation = {
  business_type: string;
  address_approved: boolean | null;
  inventory: string;
  comment_observations: string;
  observations: string[];
  payment_day: string;
  guarantee_approved: boolean | null;
  comment: string;
  evidences: string[];
  work_documents: string[];
  credit_approval: boolean | null;
};

export default ValidationForm;
