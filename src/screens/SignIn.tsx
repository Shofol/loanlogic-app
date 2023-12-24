import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

import { components } from "../components";
import { theme } from "../constants";
import { svg } from "../svg";

const SignIn: React.FC = ({ navigation }: any) => {
  const [rememberMe, setRememberMe] = useState(false);

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
          <components.InputField
            placeholder="cristinawolf@mail.com"
            containerStyle={{ marginBottom: 14 }}
            icon={<svg.CheckSvg />}
          />
          <components.InputField
            placeholder="••••••"
            icon={
              <TouchableOpacity>
                <svg.EyeOffSvg />
              </TouchableOpacity>
            }
            secureTextEntry={true}
            containerStyle={{ marginBottom: 20 }}
          />
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
            onPress={() => navigation.navigate("TabNavigator")}
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
