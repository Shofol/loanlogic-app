import "dayjs/locale/es";

import dayjs from "dayjs";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "react-native-ui-datepicker";
import { useWizard } from "react-use-wizard";
import { theme } from "../constants";
import { departments, municipalitiesValues } from "../constants/data";
import { InputStyles } from "../constants/theme";

const DPINIT = ({ onSubmit }: { onSubmit: (value: any) => void }) => {
  const { handleStep, previousStep, nextStep } = useWizard();
  const [open, setOpen] = useState(false);
  const [muniOpen, setMuniOpen] = useState(false);
  const [negCountryOpen, setNegCountryOpen] = useState(false);
  const [negMuniOpen, setNegMuniOpen] = useState(false);

  const [municipalities, setMunicipalities] = useState([]);
  const [negMunicipalities, setNegMunicipalities] = useState([]);
  const munRef = useRef(null);
  const neMunRef = useRef(null);

  const [date, setDate] = useState(dayjs());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      dpi_number: "",
      place_of_birth_city: 0,
      place_of_birth_region: "",
      neighborhood_region: "",
      neighborhood_city: "",
      expiration_date: null
    }
  });

  const onFormSubmit = async (values: any) => {
    onSubmit(values);
    console.log(values);
    nextStep();
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
    >
      <View>
        <Text
          style={{
            textAlign: "center",
            ...theme.FONTS.H3,
            color: theme.COLORS.linkColor,
            marginBottom: 30
          }}
        >
          DPI & NIT
        </Text>

        <Text style={InputStyles.label}>
          Destino del crédito<Text>*</Text>
        </Text>

        <View style={InputStyles.container}>
          <Controller
            control={control}
            // rules={{
            //   required: true,
            //   minLength: 5
            // }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Número DPI"
                style={InputStyles.input}
                placeholderTextColor={"#868698"}
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
              />
            )}
            name="dpi_number"
          />
        </View>
        {errors.dpi_number && <Text>This is required.</Text>}

        <Text style={InputStyles.label}>
          Lugar de nacimiento (departamento, municipio)*
        </Text>

        <Text style={InputStyles.label}>Departamento</Text>
        <Controller
          control={control}
          // rules={{
          //   required: true
          // }}
          render={({ field: { onChange, onBlur, value } }) => (
            <DropDownPicker
              style={InputStyles.container}
              open={open}
              value={value}
              items={departments}
              setOpen={setOpen}
              setValue={() => {}}
              listMode="MODAL"
              onSelectItem={(e) => {
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
        {errors.place_of_birth_city && <Text>This is required.</Text>}

        <Text style={InputStyles.label}>Municipio</Text>
        <Controller
          control={control}
          // rules={{
          //   required: true
          // }}
          render={({ field: { onChange, onBlur, value } }) => (
            <DropDownPicker
              style={InputStyles.container}
              open={muniOpen}
              value={value}
              items={municipalities}
              setOpen={setMuniOpen}
              setValue={() => {}}
              listMode="MODAL"
              onSelectItem={(e) => onChange(e.value)}
            />
          )}
          name="place_of_birth_region"
        />
        {errors.place_of_birth_region && <Text>This is required.</Text>}

        <Text style={InputStyles.label}>
          Fecha vencimiento<Text>*</Text>
        </Text>

        <TouchableOpacity
          style={[
            InputStyles.container,
            {
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start"
            }
          ]}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={{ textTransform: "capitalize" }}>
            {date
              ? dayjs(date).locale("es").format("MMMM, DD, YYYY")
              : "Seleccionar fecha de vencimiento"}
          </Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          visible={showDatePicker}
          presentationStyle="fullScreen"
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View style={{ position: "absolute", left: 0, top: "25%" }}>
            <Controller
              control={control}
              // rules={{
              //   required: true,
              //   minLength: 5
              // }}
              render={({ field: { onChange, onBlur, value } }) => (
                <DateTimePicker
                  value={value}
                  mode="date"
                  locale="es"
                  onValueChange={(date) => {
                    if (date) {
                      setDate(date);
                      setShowDatePicker(false);
                      onChange(date.split(" ")[0]);
                    }
                  }}
                />
              )}
              name="expiration_date"
            />
          </View>
        </Modal>
        {errors.expiration_date && <Text>This is required.</Text>}

        <Text style={InputStyles.label}>Vecindad*</Text>

        <Text style={InputStyles.label}>Departamento</Text>
        <Controller
          control={control}
          // rules={{
          //   required: true
          // }}
          render={({ field: { onChange, onBlur, value } }) => (
            <DropDownPicker
              style={InputStyles.container}
              open={negCountryOpen}
              value={value}
              items={departments}
              setOpen={setNegCountryOpen}
              setValue={() => {}}
              listMode="MODAL"
              onSelectItem={(e) => {
                // munRef.current.clearValue();
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
        {errors.neighborhood_city && <Text>This is required.</Text>}

        <Text style={InputStyles.label}>Municipio</Text>
        <Controller
          control={control}
          // rules={{
          //   required: true
          // }}
          render={({ field: { onChange, onBlur, value } }) => (
            <DropDownPicker
              style={InputStyles.container}
              open={negMuniOpen}
              value={value}
              items={negMunicipalities}
              setOpen={setNegMuniOpen}
              setValue={() => {}}
              listMode="MODAL"
              onSelectItem={(e) => onChange(e.value)}
            />
          )}
          name="neighborhood_region"
        />
        {errors.neighborhood_region && <Text>This is required.</Text>}

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
            onPress={handleSubmit(onFormSubmit)}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default DPINIT;
