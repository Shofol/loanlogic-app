import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../constants";
import { formatToFile } from "../utils/formatToFile";

const CustomFileUploader = ({
  onUpload
}: {
  onUpload: (files: any) => void;
}) => {
  const [documents, setDocuments] = useState([]);

  const pickDocument = async () => {
    let newUploadedFiles: any[] = [];

    let result = await DocumentPicker.getDocumentAsync({
      multiple: true
    });

    if (result.assets) {
      result.assets.map((item) => {
        newUploadedFiles = [...newUploadedFiles, formatToFile(item)];
      });
      setDocuments(newUploadedFiles as any);
      onUpload(newUploadedFiles as any);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          padding: 10,
          borderColor: theme.COLORS.green,
          borderWidth: 2,
          borderRadius: 5,
          borderStyle: "dashed"
        }}
        onPress={(e) => {
          pickDocument();
        }}
      >
        <View
          style={{
            backgroundColor: theme.COLORS.white,
            padding: 10,
            borderRadius: 5
          }}
        >
          <Text
            style={{
              fontSize: 14,
              textAlign: "center",
              fontWeight: "bold",
              color: theme.COLORS.bodyTextColor
            }}
          >
            Cargar Foto
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{ marginVertical: 15, flexDirection: "row", gap: 16 }}>
        {documents.length > 0 &&
          documents.map((item: any) => {
            const isImage = item.type.includes("image");
            return (
              <View key={item.name} style={{ alignItems: "center" }}>
                <Image
                  style={{ width: 50, height: 50 }}
                  source={
                    isImage
                      ? {
                          uri: item.uri
                        }
                      : require("../assets/icons/file.png")
                  }
                />
                <Text style={{ fontSize: 10, marginTop: 5 }}>
                  {`${item.name.substring(0, 7)}...${item.type.split("/")[1]}`}
                </Text>
              </View>
            );
          })}
      </View>
    </View>
  );
};

export default CustomFileUploader;
