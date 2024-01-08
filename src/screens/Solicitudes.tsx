import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import { Wizard } from "react-use-wizard";
import api from "../api/api";
import { components } from "../components";
import { theme } from "../constants";
import Asalariado from "./Asalariado";
import DPINIT from "./DPINIT";
import DatosCrédito from "./DatosCrédito";
import DatosDelSolicitante from "./DatosDelSolicitante";
import NegocioPropio from "./NegocioPropio";
import Referencias from "./Referencias";

const Solicitudes: React.FC = ({ navigation }: any) => {
  const [valueToSubmit, setValueToSubmit] = useState({});
  const [occupation, setOccupation] = useState<string>("");
  const [isLastForm, setIsLastForm] = useState(false);

  const handleSubmitForm = async () => {
    const form = new FormData();
    let values: any = { ...valueToSubmit };
    values.created_from = "DASHBOARD";
    const user: any = await SecureStore.getItemAsync("user");
    values.userId = JSON.parse(user).id;
    Object.entries(values).map((pair: any) => {
      if (pair[0] === "photos_of_bills" || pair[0] === "photos_of_the_dpi") {
        values[`${pair[0]}`].map((file: any) => {
          form.append(pair[0], file);
        });
      } else if (pair[0] === "gurrentee_items") {
        form.append(pair[0], JSON.stringify(pair[1]));
      } else {
        form.append(pair[0], pair[1]);
      }
    });

    try {
      const response = await api.post("credit-application", form);
      Toast.show({
        type: "success",
        text1: response.data.message,
        position: "bottom",
        visibilityTime: 2000
      });
      // navigate(dashboardRoute);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLastForm) {
      handleSubmitForm();
    }
  }, [valueToSubmit]);

  const steps = [
    {
      id: "datos-crédito",
      title: "Datos crédito",
      content: (
        <DatosCrédito
          onOccupationSelect={(occupation) => {
            setOccupation(occupation);
          }}
          onSubmit={(value) => {
            setValueToSubmit({ ...valueToSubmit, ...value });
          }}
        />
      )
    },
    {
      id: "dpi-nit",
      title: "DPI/NIT",
      content: (
        <DPINIT
          onSubmit={(value: any) => {
            setValueToSubmit({ ...valueToSubmit, ...value });
          }}
        />
      )
    },
    {
      id: "datos-del-solicitante",
      title: "Datos del solicitante",
      content: (
        <DatosDelSolicitante
          occupation={occupation}
          onSubmit={(value) => {
            setValueToSubmit({ ...valueToSubmit, ...value });
          }}
        />
      )
    },
    {
      id: "asalariado",
      title: "Asalariado",
      content: (
        <Asalariado
          occupation={occupation}
          onSubmit={(value) => {
            setValueToSubmit({ ...valueToSubmit, ...value });
          }}
        />
      )
    },
    {
      id: "negocio-propio",
      title: "Negocio propio",
      content: (
        <NegocioPropio
          occupation={occupation}
          onSubmit={(value) => {
            setValueToSubmit({ ...valueToSubmit, ...value });
          }}
        />
      )
    },
    {
      id: "referencias",
      title: "Referencias",
      content: (
        <Referencias
          occupation={occupation}
          onPrevious={() => {
            setIsLastForm(false);
          }}
          onSubmit={(value) => {
            setValueToSubmit({ ...valueToSubmit, ...value });
            setTimeout(() => {
              setIsLastForm(true);
            }, 100);
          }}
        />
      )
    }
  ];

  const renderHeader = () => {
    return (
      <components.Header
        title="Solicitudes"
        goBack={true}
        goBackColor={theme.COLORS.white}
      />
    );
  };

  const renderContent = () => {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
      >
        <View style={{ paddingTop: theme.SIZES.height * 0.05 }}>
          <Wizard>
            {steps.map((step) => {
              return <View key={step?.id}>{step?.content}</View>;
            })}
          </Wizard>
        </View>
      </KeyboardAwareScrollView>
    );
  };

  return (
    <>
      {renderHeader()}
      {/* <SafeAreaView style={{ flex: 1, backgroundColor: theme.COLORS.bgColor }}> */}
      {renderContent()}
      {/* </SafeAreaView> */}
    </>
  );
};

export default Solicitudes;
