import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { baseURL } from "../api/config";
import { components } from "../components";
import { theme } from "../constants";
import { InputStyles } from "../constants/theme";

const SignIn: React.FC = ({ navigation }: any) => {
  const [rememberMe, setRememberMe] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (values: any) => {
    console.log(values);
    try {
      const response = await axios.post(baseURL + "/user/login", values);
      // toast.success(`Succesfully Logged In`);
      Toast.show({
        type: "info",
        text1: "Signed In Succesfully",
        position: "bottom"
      });
      await SecureStore.setItemAsync("secure_token", response.data.token);
      setTimeout(() => {
        navigation.navigate("TabNavigator");
      }, 100);
    } catch (error) {
      console.log(error);
    }
  };

  const renderHeader = () => {
    return <components.Header title="Sign in" goBack={true} />;
  };

  const renderContent = () => {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
      >
        <View style={{ paddingTop: theme.SIZES.height * 0.05 }}>
          <Text
            style={{
              textAlign: "center",
              ...theme.FONTS.H1,
              color: theme.COLORS.mainDark,
              marginBottom: 30
            }}
          >
            ¡Bienvenido a Gestiona!
          </Text>

          <View style={InputStyles.container}>
            <Controller
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="john@example.com"
                  style={InputStyles.input}
                  placeholderTextColor={"#868698"}
                  autoCapitalize="none"
                  // keyboardType={"email-address"}
                  onChangeText={onChange}
                  numberOfLines={1}
                  value={value}
                  onBlur={onBlur}
                />
              )}
              name="email"
            />
          </View>
          {errors.email && <Text>This is required.</Text>}

          <View style={InputStyles.container}>
            <Controller
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="*******"
                  secureTextEntry={true}
                  autoCapitalize="none"
                  style={InputStyles.input}
                  placeholderTextColor={"#868698"}
                  onChangeText={onChange}
                  numberOfLines={1}
                  value={value}
                  onBlur={onBlur}
                />
              )}
              name="password"
            />
          </View>
          {errors.password && <Text>This is required.</Text>}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 30
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center"
              }}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View
                style={{
                  width: 16,
                  height: 16,
                  borderWidth: 1,
                  borderColor: "#868698",
                  borderRadius: 4,
                  backgroundColor: theme.COLORS.white,
                  marginRight: 10,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {rememberMe && (
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 2,
                      backgroundColor: "#868698"
                    }}
                  />
                )}
              </View>
              <Text
                style={{
                  color: theme.COLORS.bodyTextColor,
                  ...theme.FONTS.Mulish_400Regular,
                  fontSize: 16,
                  lineHeight: 16 * 1.2
                }}
              >
                Recuérdame
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text
                style={{
                  ...theme.FONTS.Mulish_400Regular,
                  fontSize: 16,
                  color: theme.COLORS.linkColor,
                  lineHeight: 16 * 1.2
                }}
              >
                ¿Ha olvidado su contraseña?
              </Text>
            </TouchableOpacity>
          </View>
          <components.Button
            title="Sign in"
            onPress={handleSubmit(onSubmit)}
            containerStyle={{ marginBottom: 30 }}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 50
            }}
          >
            <Text
              style={{
                ...theme.FONTS.Mulish_400Regular,
                color: theme.COLORS.bodyTextColor,
                lineHeight: 16 * 1.6,
                fontSize: 16
              }}
            >
              No account?{" "}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text
                style={{
                  ...theme.FONTS.Mulish_400Regular,
                  color: theme.COLORS.linkColor,
                  lineHeight: 16 * 1.6,
                  fontSize: 16
                }}
              >
                Register now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.COLORS.bgColor }}>
      {renderHeader()}
      {renderContent()}
    </SafeAreaView>
  );
};

export default SignIn;
