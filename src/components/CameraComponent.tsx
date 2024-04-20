import { Camera, CameraType } from "expo-camera";
import React, { useEffect, useRef, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CameraComponent = ({ onCapture }: { onCapture: (file: any) => void }) => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [image, setImage] = useState(null);
  const camRef = useRef<any>(null);

  useEffect(() => {
    // if (!permission) {
    //   // Camera permissions are still loading

    // }

    if (!permission?.granted) {
      requestPermission();
    }
  }, []);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const takePicture = async () => {
    if (camRef) {
      try {
        const image = await camRef.current.takePictureAsync();
        setImage(image.uri);
        onCapture(image.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Modal>
      <View style={styles.container}>
        <Camera style={styles.camera} type={type} ratio="16:9" ref={camRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Text style={styles.text}>Capturar imagen</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Cámara frontal</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  camera: {
    flex: 1,
    height: 500
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    marginTop: "100%",
    marginBottom: 20
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center"
  },
  text: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white"
  }
});

export default CameraComponent;
