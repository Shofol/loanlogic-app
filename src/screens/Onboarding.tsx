import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const [isOnboarded, setIsOnboarded] = useState(true);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem("onboarded");
      if (value === "true") {
        navigation.navigate("SignIn");
        // value previously stored
      } else {
        setIsOnboarded(false);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    checkOnboarding();
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
      {!isOnboarded && (
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

                <components.Button
                  title="Get Started"
                  onPress={async () => {
                    try {
                      await AsyncStorage.setItem("onboarded", "true");
                    } catch (e) {
                      // saving error
                    }
                    navigation.navigate("SignIn");
                  }}
                />
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default Onboarding;
