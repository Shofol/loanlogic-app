import React from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const CustomCheckbox = ({
  text,
  onchange
}: {
  text: string;
  onchange: any;
}) => {
  return (
    <BouncyCheckbox
      size={20}
      fillColor="#26C770"
      unfillColor="#FFFFFF"
      text={text}
      iconStyle={{ borderColor: "26C770" }}
      innerIconStyle={{ borderWidth: 2 }}
      textStyle={{
        textDecorationLine: "none"
      }}
      onPress={onchange}
    />
  );
};

export default CustomCheckbox;
