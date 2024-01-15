import React, { useState } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import api from "../api/api";
import { theme } from "../constants";
import { svg } from "../svg";

const getStatusColor = (status: string) => {
  if (status) {
    if (status.includes("PENDING")) {
      return theme.COLORS.warning;
    } else if (status.includes("ACCEPTED")) {
      return theme.COLORS.green;
    } else if (status.includes("REFUSED")) {
      return theme.COLORS.mainDark;
    } else if (status.includes("ERROR")) {
      return theme.COLORS.danger;
    } else {
      return theme.COLORS.info;
    }
  }
};

const CoberturaItem: React.FC<any> = ({
  item,
  fetchData
}: {
  item: any;
  fetchData: () => void;
}) => {
  const [showOptions, setshowOptions] = useState(false);
  // const client: any = item;

  const handleAction = async (action: string) => {
    try {
      const response = await api.put(`tasks/address-validation/${item.id}`, {
        status: action === "accept" ? true : false
      });
      fetchData();
      Toast.show({
        type: "success",
        text1: `Successfully updated stats`
      });
    } catch (error) {
      Toast.show({
        type: "success",
        text1: `Failed to update stats`
      });
      console.log(error);
    }
    setshowOptions(false);
  };

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: theme.COLORS.white,
        borderRadius: 10,
        marginBottom: 10,
        padding: 10,
        flexDirection: "column"
      }}
    >
      <View
        // onPress={onPress}
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "center"
        }}
      >
        <View>
          <View
            style={{
              backgroundColor: getStatusColor(item.status),
              paddingHorizontal: 10,
              borderRadius: 5
            }}
          >
            <Text
              style={{
                ...theme.FONTS.Mulish_400Regular,
                fontSize: 10,
                lineHeight: 12 * 1.6,
                color: theme.COLORS.white
              }}
            >
              {`${item.status}`}
            </Text>
          </View>
          <Text
            style={{
              ...theme.FONTS.H6,
              color: theme.COLORS.mainDark
            }}
          >
            {item.client.name} {item.client.surname} ({item.id})
          </Text>

          <Text
            style={{
              ...theme.FONTS.Mulish_400Regular,
              fontSize: 12,
              lineHeight: 12 * 1.6,
              color: theme.COLORS.bodyTextColor
            }}
          >
            {`${item.user.name} ${item.user.family_name}`}
          </Text>
        </View>

        <View style={{ marginLeft: "auto" }}>
          <Text
            style={{
              ...theme.FONTS.H6,
              color: theme.COLORS.mainDark,
              textAlign: "right"
            }}
          >
            {item.client.department_of_residence}
          </Text>
          <Text
            style={{
              ...theme.FONTS.Mulish_400Regular,
              fontSize: 12,
              lineHeight: 12 * 1.6,
              color: theme.COLORS.bodyTextColor,
              textAlign: "right"
            }}
          >
            {item.client.residence_municipality}
          </Text>

          <Text
            style={{
              ...theme.FONTS.Mulish_400Regular,
              fontSize: 12,
              lineHeight: 12 * 1.6,
              color: theme.COLORS.bodyTextColor,
              textAlign: "right"
            }}
          >
            {item.client.residence_address}
          </Text>
        </View>
        <TouchableOpacity
          style={{ padding: 5 }}
          onPress={() => {
            setshowOptions(!showOptions);
          }}
        >
          <svg.MoreVerticalSvg></svg.MoreVerticalSvg>
        </TouchableOpacity>
      </View>

      {showOptions && (
        <View
          style={{
            backgroundColor: theme.COLORS.white,
            flexDirection: "column",
            position: "absolute",
            right: 30,
            top: 20,
            paddingVertical: 5,
            borderColor: theme.COLORS.bgColor,
            zIndex: 10,
            borderWidth: 1
          }}
        >
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
              borderBottomColor: theme.COLORS.bgColor,
              borderBottomWidth: 1
            }}
            onPress={() => handleAction("accept")}
          >
            <Text
              style={{
                color: theme.COLORS.bodyTextColor,
                paddingHorizontal: 20,
                paddingVertical: 5
              }}
            >
              Accpet
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: 10
            }}
            onPress={() => handleAction("reject")}
          >
            <Text
              style={{
                color: theme.COLORS.danger,
                paddingHorizontal: 20,
                paddingVertical: 5
              }}
            >
              Reject
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CoberturaItem;
