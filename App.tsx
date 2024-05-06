if (__DEV__) {
  import("./ReactotronConfig").then(() => console.log("Reactotron Configured"));
}
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Provider } from "react-redux";
import store from "./src/store/store";

import {
  Mulish_400Regular,
  Mulish_500Medium,
  Mulish_600SemiBold,
  Mulish_700Bold
} from "@expo-google-fonts/mulish";

import Toast from "react-native-toast-message";
import StackNavigator from "./src/navigation/StackNavigator";

const App: React.FC = () => {
  let [fontsLoaded] = useFonts({
    Mulish_400Regular,
    Mulish_500Medium,
    Mulish_600SemiBold,
    Mulish_700Bold
  });

  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <SafeAreaProvider>
          <Provider store={store}>
            <StackNavigator />
            <Toast />
          </Provider>
        </SafeAreaProvider>
      </NavigationContainer>
    );
  } else {
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    );
  }
};

export default App;
