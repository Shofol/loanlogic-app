import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import api from "../api/api";
import { components } from "../components";
import { theme } from "../constants";
import { DPIContext } from "../utils/contexts/DPIContext";
import useLocation from "../utils/hooks/useLocation";
import Asalariado from "./Asalariado";
import DPINIT from "./DPINIT";
import DatosCredito from "./DatosCredito";
import DatosDelSolicitante from "./DatosDelSolicitante";
import NegocioPropio from "./NegocioPropio";
import Referencias from "./Referencias";

const Solicitudes = (props: any) => {
  const [valueToSubmit, setValueToSubmit] = useState({});
  const [occupation, setOccupation] = useState<string>("");
  const [isLastForm, setIsLastForm] = useState(false);
  const [dpiData, setDpiData] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const location = useLocation();

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

    form.append(
      "application_latitude",
      location?.coords.latitude.toString() as string
    );

    form.append(
      "application_longitude",
      location?.coords.longitude.toString() as string
    );

    try {
      const response = await api.post("credit-application", form);
      Toast.show({
        type: "success",
        text1: response.data.message,
        position: "bottom",
        visibilityTime: 2000
      });
      props.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isLastForm) {
      handleSubmitForm();
    }
  }, [valueToSubmit]);

  const handlePreviousStep = (value?: number) => {
    if (!value) {
      setCurrentStep(currentStep - 1);
    } else {
      setCurrentStep(value);
    }
  };

  const handleNextStep = (value?: number) => {
    if (!value) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(value);
    }
  };

  const steps = [
    {
      id: "datos-crédito",
      title: "Datos crédito",
      content: (
        <DatosCredito
          previousStep={(e?: number) => handlePreviousStep(e)}
          nextStep={(e?: number) => handleNextStep(e)}
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
          previousStep={(e?: number) => handlePreviousStep(e)}
          nextStep={(e?: number) => handleNextStep(e)}
          onLoadDPIData={(dpiData: any) => {
            setDpiData(dpiData);
          }}
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
          location={location!}
          previousStep={(e?: number) => handlePreviousStep(e)}
          nextStep={(e?: number) => handleNextStep(e)}
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
          previousStep={(e?: number) => handlePreviousStep(e)}
          nextStep={(e?: number) => handleNextStep(e)}
          occupation={occupation}
          location={location!}
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
          previousStep={(e?: number) => handlePreviousStep(e)}
          nextStep={(e?: number) => handleNextStep(e)}
          occupation={occupation}
          location={location!}
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
          previousStep={(e?: number) => {
            setIsLastForm(false);
            setTimeout(() => {
              handlePreviousStep(e);
            }, 100);
          }}
          occupation={occupation}
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
        <DPIContext.Provider value={dpiData}>
          <View style={{ paddingTop: theme.SIZES.height * 0.05 }}>
            {steps.map((step, index) => {
              return (
                <View
                  style={{ display: index === currentStep ? "flex" : "none" }}
                  key={step?.id}
                >
                  {step?.content}
                </View>
              );
            })}
          </View>
        </DPIContext.Provider>
      </KeyboardAwareScrollView>
    );
  };

  return (
    <>
      {renderHeader()}
      {renderContent()}
    </>
  );
};

export default Solicitudes;
