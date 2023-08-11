import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
} from "react-native";
import { Camera } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import CornerImages from "./CornerImages";
import * as MediaLibrary from "expo-media-library";
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from "expo-file-system";
import axios from 'axios';
const API_BASE_URL = 'http://127.0.0.1:8000/api';
//const API_BASE_URL = 'https://rncbioscam-production.up.railway.app/api';

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

const askForGalleryPermission = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('No se tienen permisos para acceder a la galería.');
  }
};

export default function CapturarIcon() {
  const closeCamera = () => {
    setIsCameraOpen(false);
  };
  const [apiResponse, setApiResponse] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
      const { status: mediaLibStatus } = await MediaLibrary.requestPermissionsAsync();

      setHasCameraPermission(cameraStatus === "granted" && mediaLibStatus === "granted");
      askForGalleryPermission(); // Llamamos a la función para pedir permisos a la galería
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current && isCameraReady) {
      const options = { quality: 0.5, base64: true };
      try {
        const data = await cameraRef.current.takePictureAsync(options);
        if (!data.cancelled) {
          // Redimensionar la imagen seleccionada a 100x100
          try {
            // Tu código para redimensionar la imagen...
  
            // Crear un objeto FormData para enviar la imagen en el cuerpo de la solicitud
            const imageData = new FormData();
            imageData.append('imagen', {
              name: 'image.jpg',
              type: 'image/jpeg',
            });
  
            setData(data);
  
            // Mostrar la solicitud POST antes de enviarla a la API
            console.log('Solicitud POST a la API:', imageData);
  
            // Llamada a la API enviando la imagen como parametro.
            try {
              console.log('Enviando solicitud POST a la API...');
              console.log(`${API_BASE_URL}/consulta_rnc`, imageData);
              const response = await axios.post(`${API_BASE_URL}/consulta_rnc`, imageData);
              console.log('Respuesta de la API:', response.data);
              setApiResponse(response.data);
              Alert.alert('¡Foto guardada!');
            } catch (error) {
              console.log('Error en la solicitud POST:', error);
              Alert.alert('Error al enviar la imagen a la API: ' + error.message);
            }
          } catch (error) {
            console.log('Error al redimensionar la imagen:', error);
            Alert.alert('Error al redimensionar la imagen: ' + error.message);
          }
        }
        closeCamera();
      } catch (error) {
        console.log('Error al tomar la foto:', error);
        Alert.alert('Error al tomar la foto: ' + error.message);
      }
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
          {data ? (
            <Image source={{ uri: data.uri }} style={styles.previewImage} />
          ) : (
            <Camera
              ref={cameraRef}
              style={styles.camera}
              type={type}
              onCameraReady={() => setIsCameraReady(true)}
            />
          )}
          <TouchableOpacity onPress={takePicture} style={styles.btnCapturar}>
            <Text style={styles.capturar}>¡Comienza a escanear!</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Display the API response */}
      {apiResponse && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseTitle}>API Response:</Text>
          <Text style={styles.responseData}>{JSON.stringify(apiResponse, null, 2)}</Text>
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
  responseContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    width: WINDOW_WIDTH * 0.8,
    maxHeight: WINDOW_HEIGHT * 0.3,
    overflow: 'scroll',
  },
  responseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  responseData: {
    fontSize: 16,
  },
});