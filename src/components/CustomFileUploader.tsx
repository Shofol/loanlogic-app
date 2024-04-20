import * as DocumentPicker from "expo-document-picker";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../constants";
import { formatToFile } from "../utils/formatToFile";
import CameraComponent from "./CameraComponent";

const CustomFileUploader = ({
  uploadedDocs,
  onUpload
}: {
  uploadedDocs?: any[];
  onUpload: (files: any) => void;
}) => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    if (uploadedDocs && uploadedDocs?.length > 0) {
      setDocuments(uploadedDocs);
    }
  }, [uploadedDocs]);

  const onCapture = (file: any) => {
    const splittedFileName = file.toString().split("/");
    const newDocuments = [
      formatToFile({
        name: splittedFileName[splittedFileName.length - 1]
          ? splittedFileName[splittedFileName.length - 1]
          : "Untitled",
        uri: file,
        mimeType: "image/jpeg"
      })
    ];
    console.log(newDocuments);
    setDocuments([...documents, ...newDocuments]);
    onUpload([...documents, ...newDocuments]);
    setShowCamera(false);
  };

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
    <>
      <View>
        <View style={{ flex: 1, flexDirection: "row", gap: 10 }}>
          {/* <TouchableOpacity
            style={{
              padding: 10,
              borderColor: theme.COLORS.green,
              borderWidth: 2,
              borderRadius: 5,
              borderStyle: "dashed",
              flex: 1
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
          </TouchableOpacity> */}

          <TouchableOpacity
            style={{
              padding: 10,
              borderColor: theme.COLORS.green,
              borderWidth: 2,
              borderRadius: 5,
              flex: 1,
              borderStyle: "dashed"
            }}
            onPress={(e) => {
              setShowCamera(true);
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
                Capturar imagen
              </Text>
            </View>
          </TouchableOpacity>
        </View>

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
                    {`${item.name.substring(0, 7)}...${
                      item.type.split("/")[1]
                    }`}
                  </Text>
                </View>
              );
            })}
        </View>
      </View>
      {showCamera && (
        <CameraComponent
          onCapture={(file) => {
            onCapture(file);
          }}
        />
      )}
    </>
  );
};

export default CustomFileUploader;
