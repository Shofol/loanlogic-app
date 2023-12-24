import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Text, TextInput, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { useWizard } from "react-use-wizard";
import api from "../api/api";

const DatosCrédito = ({ stepper, onSubmit, onOccupationSelect }) => {
  const { handleStep, previousStep, nextStep } = useWizard();
  const [rangeValue, setRangeValue] = useState(500);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [minValue, setMinValue] = useState([]);
  const [maxValue, setMaxValue] = useState([]);
  const countries = ["Egypt", "Canada", "Australia", "Ireland"];

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: ""
    }
  });
  //   const onSubmit = (data) => console.log(data);

  useEffect(() => {
    setMinValue(parseInt(500));
    setMaxValue(parseInt(20000));
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    const response = await api.get(`product/label`);
    setProducts([...response.data.data]);
  };

  return (
    <View>
      <Text>DatosCrédito</Text>

      <Controller
        control={control}
        rules={{
          required: true
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <SelectDropdown
            data={countries}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            buttonTextAfterSelection={(selectedItem, index) => {
              // text represented after item is selected
              // if data array is an array of objects then return selectedItem.property to render after item is selected
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item;
            }}
          />
        )}
        name="firstName"
      />
      {errors.firstName && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 100
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Last name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="lastName"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />

      <Button title="Go Previous" onPress={() => previousStep()} />
      <Button title="Go Next" onPress={() => nextStep()} />
    </View>
  );
};

export default DatosCrédito;
