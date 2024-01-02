import dayjs from "dayjs";
import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import { InputStyles, theme } from "../constants/theme";

const CustomDatePicker = ({
  value,
  onChange,
  defaultValue = dayjs(),
  defaultText = "Selecciona una fecha"
}: {
  value: any;
  onChange: any;
  defaultValue?: null | any;
  defaultText?: string;
}) => {
  const [date, setDate] = useState<any>(defaultValue);
  const [showDatePicker, setShowDatePicker] = useState(false);

  return (
    <>
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
        <Text
          style={{
            textTransform: "capitalize",
            color: theme.COLORS.bodyTextColor
          }}
        >
          {date
            ? dayjs(date).locale("es").format("MMMM, DD, YYYY")
            : defaultText}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        visible={showDatePicker}
        presentationStyle="fullScreen"
      >
        <View style={{ marginTop: "50%", marginBottom: "50%" }}>
          <DateTimePicker
            value={value}
            mode="date"
            locale="es"
            headerButtonColor={theme.COLORS.linkColor}
            selectedItemColor={theme.COLORS.linkColor}
            onValueChange={(date) => {
              if (date) {
                setDate(date);
                setShowDatePicker(false);
                onChange(date.toString().split(" ")[0]);
              }
            }}
          />
        </View>
      </Modal>
    </>
  );
};

export default CustomDatePicker;
