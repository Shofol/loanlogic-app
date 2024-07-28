import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker, { DateType } from "react-native-ui-datepicker";
import { InputStyles, theme } from "../constants/theme";

const CustomDatePicker = ({
  value,
  onChange,
  defaultValue = dayjs(),
  defaultText = "Seleccionar"
}: {
  value: any;
  onChange: any;
  defaultValue?: null | any;
  defaultText?: string;
}) => {
  const [date, setDate] = useState<any>(defaultValue);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (value) {
      setDate(value);
    }
  }, [value]);

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
          {dayjs(date).isValid()
            ? dayjs(date).locale("es").format("DD, MMMM, YYYY")
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
            mode="single"
            locale="es"
            headerButtonColor={theme.COLORS.linkColor}
            selectedItemColor={theme.COLORS.linkColor}
            // date={value}
            onChange={(params: { date: DateType }) => {
              if (params) {
                console.log(
                  new Date(params.date as string).toLocaleDateString("en-CA")
                );
                setDate(params.date);
                setShowDatePicker(false);
                onChange(
                  new Date(params.date as string).toLocaleDateString("en-CA")
                );
              }
            }}
          />
        </View>
      </Modal>
    </>
  );
};

export default CustomDatePicker;
