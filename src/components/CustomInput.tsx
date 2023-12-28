import React from "react";
import { TextInput } from "react-native";
import { InputStyles } from "../constants/theme";

const CustomInput = ({
  placeholder,
  onChange,
  value,
  onBlur,
  secureTextEntry = false
}: {
  placeholder: string;
  onChange: any;
  value: string;
  onBlur: any;
  secureTextEntry?: boolean;
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={InputStyles.input}
      placeholderTextColor={"#868698"}
      autoCapitalize="none"
      onChangeText={onChange}
      value={value}
      onBlur={onBlur}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default CustomInput;
