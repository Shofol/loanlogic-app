import React, { useRef, useState } from "react";
import { Button, SafeAreaView, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { components } from "../components";
import { theme } from "../constants/theme";
import useLocation from "../utils/hooks/useLocation";
import GarantiaForm from "../components/GarantiaForm";
import Toast from "react-native-toast-message";
import api from "../api/api";

const Garantia: React.FC = ({ route, navigation }: any) => {
  const { id } = route.params;
  const location = useLocation();
  let formsToSubmit: any = [];
  const initialValue = {
    guarantee_item: "",
    description: "",
    model: "",
    serial_number: "",
    photo: [],
  };
  const [guarantees, setGuarantees] = useState([initialValue]);
  const formRefs = useRef<any>([]);

  const renderHeader = () => {
    return (
      <components.Header
        title={`Garantía (${id})`}
        goBack={true}
        goBackColor={theme.COLORS.white}
      />
    );
  };

  const handleNewEntry = () => {
    const tempArray = formRefs.current.map((ref: any) => ref.getGuarantee());
    tempArray.push(initialValue);
    setGuarantees(tempArray);
  };

  const handleRemove = (index: number) => {
    if (guarantees.length > 1) {
      const tempArray = [...guarantees];
      tempArray.splice(index, 1);
      setGuarantees(tempArray);
    } else {
      Toast.show({
        type: "error",
        text1: "Se requiere al menos una garantía.",
        position: "bottom",
        visibilityTime: 2000,
      });
    }
  };

  const onReset = () => {
    setGuarantees([]);
    setTimeout(() => {
      setGuarantees([initialValue]);
    }, );
    formsToSubmit = [];
  };

  const onSubmit = async (values: any) => {
    formsToSubmit = [];
    const form = new FormData();
    formRefs.current.map((ref: any) => {
      ref.submit();
    });

    setTimeout(async () => {
      if (formsToSubmit.length === guarantees.length) {
        formsToSubmit.forEach((guarantee: any, index: number) => {
          Object.keys(guarantee).forEach((key) => {
            if (key === "photo") {
              // Ensure photo is always an array
              if (!Array.isArray(guarantee[key])) {
                guarantee[key] = [guarantee[key]];
              }
              guarantee[key].forEach((file: any) => {
                form.append(`guarantees[${index}][${key}]`, file, file.name);
              });
            } else {
              form.append(`guarantees[${index}][${key}]`, guarantee[key]);
            }
          });
          form.append(
            `guarantees[${index}][guaranty_latitude]`,
            location?.coords.latitude.toString() as string
          );
          form.append(
            `guarantees[${index}][guaranty_longitude]`,
            location?.coords.longitude.toString() as string
          );
        });

        form.append("application_id", id);
        try {
          const response = await api.post("guarantee", form, {});
          Toast.show({
            type: "success",
            text1: response.data.message,
            position: "bottom",
            visibilityTime: 2000,
          });
          navigation.goBack();
        } catch (error) {
          console.log(error);
        }
      } else {
        Toast.show({
          type: "error",
          text1: `There's error in form`,
          position: "bottom",
          visibilityTime: 2000,
        });
      }
    });
  };

  return (
    <>
      {renderHeader()}
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.COLORS.bgColor }}>
        <ScrollView style={{ padding: 20 }}>
          {guarantees.map((guarantee, idx) => {
            return (
              <GarantiaForm
                key={idx}
                onFormSubmit={(values: any) => {
                  formsToSubmit.push(values);
                }}
                onRemove={() => handleRemove(idx)}
                ref={(el: any) => (formRefs.current[idx] = el)}
                init={guarantee}
              />
            );
          })}

          <View style={{ marginTop: 10, paddingBottom: 100 }}>
            <Button
              color={theme.COLORS.linkColor}
              title="Añadir garantía"
              onPress={() => handleNewEntry()}
            />
          </View>
        </ScrollView>
      </SafeAreaView>

      <View
        style={{
          position: "absolute",
          flexDirection: "row",
          justifyContent: "space-between",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <View style={{ flex: 1 }}>
          <Button
            color={theme.COLORS.linkColor}
            title="Guardar"
            onPress={onSubmit}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Button
            color={theme.COLORS.grey1}
            title="Descartar"
            onPress={onReset}
          />
        </View>
      </View>
    </>
  );
};

export default Garantia;
