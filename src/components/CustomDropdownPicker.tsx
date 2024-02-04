import React, { useState } from "react";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import { InputStyles } from "../constants/theme";

const CustomDropdownPicker = ({
  value,
  items,
  onSelectItem
}: {
  value: any;
  items: ItemType<any>[];
  //   onChange?: any;
  onSelectItem?: any;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <DropDownPicker
      style={InputStyles.container}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={() => {}}
      placeholder="Seleccionar"
      listMode={items.length > 5 ? "MODAL" : "SCROLLVIEW"}
      onChangeValue={(e) => onSelectItem({ value: e })}
      onSelectItem={onSelectItem}
      dropDownDirection="TOP"
    />
  );
};

export default CustomDropdownPicker;
