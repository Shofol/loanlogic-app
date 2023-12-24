import { Slider } from "@react-native-assets/slider";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useWizard } from "react-use-wizard";
import api from "../api/api";
import { InputStyles } from "../constants/theme";

const DatosCrédito = ({ stepper, onSubmit, onOccupationSelect }) => {
  const { handleStep, previousStep, nextStep } = useWizard();
  const [rangeValue, setRangeValue] = useState(500);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [items, setItems] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" }
  ]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      product_id: "",
      credit_amount: ""
    }
  });
  //   const onSubmit = (data) => console.log(data);

  useEffect(() => {
    setMinValue(parseInt("500"));
    setMaxValue(parseInt("20000"));
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    const response = await api.get(`product/label`);
    console.log(products);
    setProducts([...response.data.data]);
  };

  return (
    <View>
      <Text>DatosCrédito</Text>

      <Text>¿Qué producto desea?</Text>
      <Controller
        control={control}
        rules={{
          required: true
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <DropDownPicker
            style={InputStyles.container}
            open={open}
            value={value}
            items={products}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            listMode="SCROLLVIEW"
          />
        )}
        name="product_id"
      />
      {errors.product_id && <Text>This is required.</Text>}

      <Text> Monto deseado del crédito:* de 500 en 500Q</Text>
      <View style={{ marginBottom: 10 }}>
        <Controller
          control={control}
          rules={{
            required: true
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Slider
              value={+value} // set the current slider's value
              minimumValue={minValue} // Minimum value
              maximumValue={maxValue} // Maximum value
              step={500} // The step for the slider (0 means that the slider will handle any decimal value within the range [min, max])
              minimumTrackTintColor="#3EB290" // The track color before the current value
              maximumTrackTintColor="grey" // The track color after the current value
              thumbTintColor="#26C770" // The color of the slider's thumb
              trackHeight={5} // The track's height in pixel
              thumbSize={20} // The thumb's size in pixel
              onValueChange={onChange} // Called each time the value changed. The type is (value: number) => void
            />
          )}
          name="credit_amount"
        />
        {errors.credit_amount && <Text>This is required.</Text>}
      </View>
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />

      <Button title="Go Previous" onPress={() => previousStep()} />
      <Button title="Go Next" onPress={() => nextStep()} />
    </View>
  );
};

export default DatosCrédito;
