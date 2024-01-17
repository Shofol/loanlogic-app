import BouncyCheckboxGroup, {
  ICheckboxButton
} from "react-native-bouncy-checkbox-group";

import React, { useEffect, useState } from "react";

const CustomCheckboxGroup = ({
  data,
  onSelect
}: {
  data: InitialCheckboxValue[];
  onSelect: (value: MegedChekboxProps) => void;
}) => {
  const [staticData, setStaticData] = useState<ICheckboxButton[]>([]);
  const checkboxProps = {
    size: 20,
    fillColor: "#26C770",
    unfillColor: "#FFFFFF",
    iconStyle: { borderColor: "26C770" },
    innerIconStyle: { borderWidth: 2 },
    style: { marginRight: 20 },
    textStyle: {
      textDecorationLine: "none"
    }
  };

  useEffect(() => {
    const tempData = data.map((item: InitialCheckboxValue) => {
      return { ...item, ...checkboxProps };
    });
    setStaticData(tempData as MegedChekboxProps[]);
  }, [data]);

  return (
    <BouncyCheckboxGroup
      data={staticData}
      onChange={(selectedItem: any) => {
        onSelect(selectedItem);
      }}
    />
  );
};

type MegedChekboxProps = InitialCheckboxValue & ICheckboxButton;

type InitialCheckboxValue = {
  id: string;
  text: string;
  value: string | number | boolean;
};

export default CustomCheckboxGroup;
