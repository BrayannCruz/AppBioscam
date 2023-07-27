import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import { Camera } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import * as FileSystem from "expo-file-system";
import CornerImages from "./CornerImages";
import * as MediaLibrary from "expo-media-library";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

export default function CapturarIcon() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } =
        await Camera.requestCameraPermissionsAsync();
      const { status: mediaLibStatus } =
        await MediaLibrary.requestPermissionsAsync();

      setHasCameraPermission(
        cameraStatus === "granted" && mediaLibStatus === "granted"
      );
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current && isCameraReady) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const asset = await MediaLibrary.createAssetAsync(data.uri);
      Alert.alert("¡Foto guardada!");
    }
  };

  useEffect(() => {
    return () => {
      setIsCameraReady(false);
    };
  }, []);

  if (hasCameraPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false) {
    return <Text>No se tiene acceso a la cámara</Text>;
  }

  return (
    <LinearGradient colors={["#84DCC6", "#1C2B2D"]} style={styles.inicio}>
      <CornerImages />
      <Text style={styles.title}>Título de tu aplicación</Text>
      <TouchableOpacity onPress={() => setIsCameraOpen(!isCameraOpen)} style={styles.btnAbrir}>
        <Text style={styles.abrir}>{isCameraOpen ? 'Cerrar cámara' : 'Abrir cámara'}</Text>
      </TouchableOpacity>
      {isCameraOpen && (
        <View style={styles.cameraContainer}>
          <Camera
            ref={cameraRef}
            style={styles.camera}
            type={type}
            onCameraReady={() => setIsCameraReady(true)}
          />
          <TouchableOpacity onPress={takePicture} style={styles.btnCapturar}>
            <Text style={styles.capturar}>¡Comienza a escanear!</Text>
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  inicio: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  cameraContainer: {
    width: WINDOW_WIDTH * 0.8, // 80% of the window width
    height: WINDOW_HEIGHT * 0.4, // 40% of the window height
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  camera: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  btnAbrir: {
    padding: 15,
    backgroundColor: "cadetblue",
    alignItems: "center",
    marginBottom: 20,
  },
  abrir: {
    color: "white",
    fontSize: 18,
  },
  btnCapturar: {
    position: "absolute",
    bottom: 0,
    padding: 15,
    width: "100%",
    backgroundColor: "cadetblue",
    alignItems: "center",
  },
  capturar: {
    color: "white",
    fontSize: 18,
    marginBottom: 5,
  },
});
