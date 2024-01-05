import React from "react";
import { KeyboardTypeOptions, TextInput } from "react-native";
import { InputStyles } from "../constants/theme";

const CustomInput = ({
  placeholder,
  onChange,
  value,
  onBlur,
  secureTextEntry = false,
  keyboardType = "default"
}: {
  placeholder: string;
  onChange?: any;
  value: string | undefined;
  onBlur?: any;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
}) => {
  return (
    <TextInput
      keyboardType={keyboardType}
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
