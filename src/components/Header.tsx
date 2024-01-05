import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

import { theme } from "../constants";
import { svg } from "../svg";

type Props = {
  containerStyle?: any;
  goBack?: boolean;
  burgerMenu?: boolean;
  title?: string;
  logo?: boolean;
  search?: boolean;
  bag?: boolean;
  border?: boolean;
  titleStyle?: any;
  arrowColor?: string;
  fileIcon?: boolean;
  goBackColor?: string;
};

const Header: React.FC<Props> = ({
  containerStyle,
  goBack,
  title,
  logo,
  search,
  bag,
  border,
  titleStyle,
  arrowColor,
  fileIcon,
  goBackColor
}) => {
  const navigation: any = useNavigation();

  const cartIsEmpty = () => {
    return Alert.alert(
      "Message",
      "Your cart is empty, add something to cart.",
      [
        {
          text: "OK"
        }
      ]
    );
  };

  return (
    <View
      style={{
        backgroundColor: theme.COLORS.linkColor,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 100,
        paddingTop: 30,
        borderBottomWidth: border ? 1 : 0,
        ...containerStyle
      }}
    >
      {goBack && (
        <View
          style={{
            position: "absolute",
            left: 0,
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            style={{
              paddingHorizontal: 20,
              paddingTop: 30
            }}
            onPress={() => navigation.goBack()}
          >
            <svg.GoBackSvg goBackColor={goBackColor} />
          </TouchableOpacity>
        </View>
      )}
      {title && (
        <Text
          style={{
            textAlign: "center",
            ...theme.FONTS.H4,
            color: theme.COLORS.white,
            ...titleStyle
          }}
        >
          {title}
        </Text>
      )}
      {search && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: theme.SIZES.width - 200
          }}
        >
          <View style={{ marginRight: 7 }}>
            {/* <svg.HeaderSearchSvg /> */}
          </View>

          <TextInput
            placeholder="Search"
            style={{ height: "100%", width: "100%" }}
          />
        </View>
      )}
      {fileIcon && (
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 0,
            height: "100%",
            justifyContent: "center",
            paddingLeft: 20
          }}
        >
          <View
            style={{
              paddingHorizontal: 20,
              flexDirection: "row",
              paddingVertical: 6
            }}
          >
            <svg.FileTextSvg />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
