import React, { useState } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

import { Wizard } from "react-use-wizard";
import { components } from "../components";
import { theme } from "../constants";
import Asalariado from "./Asalariado";
import DPINIT from "./DPINIT";
import DatosCrédito from "./DatosCrédito";
import DatosDelSolicitante from "./DatosDelSolicitante";
import NegocioPropio from "./NegocioPropio";
import Referencias from "./Referencias";

const Solicitudes: React.FC = ({ navigation }: any) => {
  const [stepper, setStepper] = useState(null);
  const [valueToSubmit, setValueToSubmit] = useState({});
  const [occupation, setOccupation] = useState<string | null>(null);
  // const [willSkip5, setWillSkip5] = useState(false);
  const [isLastForm, setIsLastForm] = useState(false);
  const [dpiData, setDpiData] = useState(null);

  const steps = [
    {
      id: "datos-crédito",
      title: "Datos crédito",
      //   icon: <CreditCard size={16} />,
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
      //   icon: <FileText size={16} />,
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
      //   icon: <User size={16} />,
      content: (
        <DatosDelSolicitante
          occupation={occupation}
          onSubmit={(value) => {
            setValueToSubmit({ ...valueToSubmit, ...value });
          }}
        />
      )
    },
    // occupation !== "BUSINESS" && occupation !== "NOINCOME"

    {
      id: "asalariado",
      title: "Asalariado",
      //   icon: <Gift size={16} />,
      content: (
        <Asalariado
          data={dpiData}
          stepper={stepper}
          occupation={occupation}
          onSubmit={(value) => {
            setValueToSubmit({ ...valueToSubmit, ...value });
          }}
        />
      )
    },
    // occupation !== "SALARIED" && occupation !== "NOINCOME"
    {
      id: "negocio-propio",
      title: "Negocio propio",
      //   icon: <Briefcase size={16} />,
      content: (
        <NegocioPropio
          data={dpiData}
          stepper={stepper}
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
      //   icon: <Globe size={16} />,
      content: (
        <Referencias
          data={dpiData}
          stepper={stepper}
          onPrevious={() => {
            setIsLastForm(false);
          }}
          onSubmit={(value) => {
            setIsLastForm(true);
            setTimeout(() => {
              setValueToSubmit({ ...valueToSubmit, ...value });
            }, 100);
          }}
        />
      )
    }
  ];

  const renderHeader = () => {
    return <components.Header title="Solicitudes" goBack={true} />;
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

  //   const Step2 = () => {
  //     const { handleStep, previousStep, nextStep } = useWizard();

  //     handleStep(() => {
  //       alert("Going to step 2");
  //     });

  //     return (
  //       <View>
  //         {/* <button onClick={() => previousStep()}>
  //           <Text>Previous ⏮️</Text>
  //         </button>
  //         <button onClick={() => nextStep()}>Next ⏭</button> */}
  //         <Text>Step 2</Text>

  //         <Button title="Go Previous" onPress={() => previousStep()} />
  //         <Button title="Go Next" onPress={() => nextStep()} />
  //       </View>
  //     );
  //   };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.COLORS.bgColor }}>
      {renderHeader()}
      {renderContent()}
    </SafeAreaView>
  );
};

export default Solicitudes;
