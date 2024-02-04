import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
// import { Wizard } from "react-use-wizard";
import Geolocation from "@react-native-community/geolocation";
import * as Location from "expo-location";
import api from "../api/api";
import { components } from "../components";
import { theme } from "../constants";
import Asalariado from "./Asalariado";
import DPINIT from "./DPINIT";
import DatosCredito from "./DatosCredito";
import DatosDelSolicitante from "./DatosDelSolicitante";
import NegocioPropio from "./NegocioPropio";
import Referencias from "./Referencias";

const Solicitudes: React.FC = ({ navigation }: any) => {
  const [valueToSubmit, setValueToSubmit] = useState({});
  const [occupation, setOccupation] = useState<string>("");
  const [isLastForm, setIsLastForm] = useState(false);
  const [dpiData, setDpiData] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      Geolocation.requestAuthorization(
        () => {
          Geolocation.getCurrentPosition(
            (position: {
              coords: {
                latitude: number;
                longitude: number;
                altitude: number | null;
                accuracy: number;
                altitudeAccuracy: number | null;
                heading: number | null;
                speed: number | null;
              };
              timestamp: number;
            }) => {
              setLocation(position);
            },
            (error: {
              code: number;
              message: string;
              PERMISSION_DENIED: number;
              POSITION_UNAVAILABLE: number;
              TIMEOUT: number;
            }) => {
              alert(error);
            }
          );
        },
        (error: {
          code: number;
          message: string;
          PERMISSION_DENIED: number;
          POSITION_UNAVAILABLE: number;
          TIMEOUT: number;
        }) => {
          alert(error.code);
        }
      );
    })();
  }, []);

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
      console.log(form);
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
          dpiData={dpiData}
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
          dpiData={dpiData}
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
          previousStep={(e?: number) => handlePreviousStep(e)}
          nextStep={(e?: number) => handleNextStep(e)}
          dpiData={dpiData}
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
          previousStep={(e?: number) => handlePreviousStep(e)}
          // nextStep={(e?: number) => handleNextStep(e)}
          dpiData={dpiData}
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

// try {
//   const granted = await PermissionsAndroid.request(
//     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//     {
//       title: "Example App",
//       message: "Example App access to your location ",
//       buttonPositive: "Confirm"
//     }
//   );
//   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//     try {
//       Geolocation.getCurrentPosition((info) => {
//         alert(info);
//         setLocation(info);
//       });
//     } catch (error) {
//       alert(error);
//     }
//     console.log("You can use the location");
//     alert("You can use the location");
//   } else {
//     console.log("location permission denied");
//     alert("Location permission denied");
//   }
// } catch (err) {
//   console.warn(err);
// }
