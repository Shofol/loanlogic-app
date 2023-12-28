import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";

import * as SecureStore from "expo-secure-store";
import { components } from "../components";
import { theme } from "../constants";

const onboarding = [
  {
    id: "1",
    title: `Welcome to Gestiona!`,
    image: "../assets/logo.png",
    description: `Por favor, utilice su email y contraseña para conectarse`
  }
  // {
  //     id: "2",
  //     title: "Get a new card in a \nfew clicks!",
  //     image: "https://dl.dropbox.com/s/8px99xy2vfxldwc/03.png?dl=0",
  //     description: `Labore sunt culpa excepteur culpa \nipsum. Labore occaecat ex nisi mollit.`,
  // },
  // {
  //     id: "3",
  //     title: "Easy payments all \nover the world!",
  //     image: "https://dl.dropbox.com/s/zx9urfi46ty5sjt/04.png?dl=0",
  //     description: `Labore sunt culpa excepteur culpa \nipsum. Labore occaecat ex nisi mollit.`,
  // },
];

const Onboarding: React.FC = ({ navigation }: any) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const checkOnboarding = async () => {
    const status = await SecureStore.getItemAsync("onboarded");
    console.log(status);
    return status === "true";
  };

  useEffect(() => {
    console.log(checkOnboarding());
  }, []);

  function updateCurrentSlideIndex(e: any) {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / theme.SIZES.width);
    setCurrentSlideIndex(currentIndex);
  }

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        flex: 1
      }}
    >
      <FlatList
        data={onboarding}
        keyExtractor={(item) => item.id}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "white"
                // paddingTop: theme.SIZES.height * 0.08,
                // paddingBottom: theme.SIZES.height * 0.07,
                // paddingHorizontal: 20,
                // borderTopLeftRadius: 20,
                // borderTopRightRadius: 20
              }}
            >
              <View
                style={{
                  marginBottom: 20
                }}
              >
                <Image
                  source={require("../assets/logo.png")}
                  style={{ width: 100, height: 80 }}
                />
              </View>
              <Text
                style={{
                  textAlign: "center",
                  ...theme.FONTS.H3,
                  color: theme.COLORS.mainDark,
                  marginBottom: 18
                }}
              >
                {item.title}
              </Text>

              <Text
                style={{
                  textAlign: "center",
                  ...theme.FONTS.Mulish_500Medium,
                  color: theme.COLORS.mainDark,
                  marginBottom: 18
                }}
              >
                {item.description}
              </Text>

              {/* <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    marginBottom: 45
                  }}
                >
                  {onboarding.map((_, index) => {
                    return (
                      <View
                        key={index}
                        style={[
                          {
                            width: 8,
                            height: 8,
                            marginHorizontal: 5,
                            borderRadius: 50,
                            borderWidth: 3,
                            borderColor: "#D1D2DB"
                          },
                          currentSlideIndex == index && {
                            borderColor: theme.COLORS.mainDark
                          }
                        ]}
                      />
                    );
                  })}
                </View> */}
              <components.Button
                title="Get Started"
                onPress={async () => {
                  await SecureStore.setItemAsync("onboarded", "true");
                  navigation.navigate("SignIn");
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default Onboarding;
