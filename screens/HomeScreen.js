import { Audio } from 'expo-av';
import { Color, } from "../GlobalStyles";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import { Image } from "expo-image";
import firebase from '../firebaseConfig';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';


const Home = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMusicPlaying, setMusicPlaying] = useState(false);
  const [isMusicMuted, setMusicMuted] = useState(false);
  const [isCameraVisible, setCameraVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };
  let cameraRef = null;

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  const handlePerfilPress = () => {
    navigation.navigate("Profile");
  };


  const handleOpenCamera = () => {
    setCameraVisible(true);
  };
  
  const handleCloseCamera = () => {
    setCameraVisible(false);
  };

  const handleTakePhoto = async () => {
    if (cameraRef) { // Acceder a la variable cameraRef sin el uso de useRef
      const photo = await cameraRef.takePictureAsync();
      setCapturedImage(photo);
    }
  };

  const handleMusicToggle = async () => {
    if (isMusicPlaying) {
      await Audio.setIsEnabledAsync(false);
    } else {
      await Audio.setIsEnabledAsync(true);
      const soundObject = new Audio.Sound();
      try {
        await soundObject.loadAsync(require("../assets/AmazingFuture.mp3"));
        await soundObject.playAsync();
      } catch (error) {
        console.error('Error al reproducir el audio:', error);
      }
    }
    setMusicPlaying(!isMusicPlaying);
  };
  const handleSaveToGallery = async () => {
    if (capturedImage) {
      await MediaLibrary.saveToLibraryAsync(capturedImage.uri);
      alert('Imagen guardada en la galería');
    }
  };
  const handleMusicMuteToggle = () => {
    setMusicMuted(!isMusicMuted);
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      shouldDuckAndroid: true,
      staysActiveInBackground: true,
      playThroughEarpieceAndroid: false,
    });
  };

  return (
    <View style={styles.inicio}>
      <ImageBackground
        style={styles.rectangleParent}
        resizeMode="cover"
        source={require("../assets/frame1.png")}
      >
        <View style={styles.contentContainer}>
        {isCameraVisible && (
          <Camera style={styles.camera} ref={cameraRef}>
            <View style={styles.cameraContainer}>
              <TouchableOpacity style={styles.cameraButton} onPress={handleTakePhoto}>
                <Text style={styles.cameraButtonText}>Tomar Foto</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        )}

        {capturedImage && (
          <View style={styles.previewContainer}>
            <Image source={{ uri: capturedImage.uri }} style={styles.previewImage} />
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveToGallery}>
              <Text style={styles.saveButtonText}>Guardar en Galería</Text>
            </TouchableOpacity>
          </View>
        )}
          <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={handleMusicToggle} style={styles.button}>
          <Text style={styles.buttonText}>
            {isMusicPlaying ? 'Pausar música' : 'Reproducir música'}
          </Text>
        </TouchableOpacity>
        </View>
        </View>

      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  framePosition: {
    width: 261,
    left: 50,
    position: "absolute",
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Fondo negro para el contenedor de la cámara
  },
  camera: {
    width: 250, // Ancho de la cámara
    height: 250, // Altura de la cámara
  },
  cameraButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
  especieLayout: {
    height: 36,
    textAlign: "center",
    color: Color.dimgray,
    width: 261,
    left: 50,
    position: "absolute",
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    width:70,
    backgroundColor:'#fff',
  },
  perfil1: {
    left: 82,
    fontSize: 26,
    textAlign: "center",
    width: 196,
    color: Color.dimgray,
    top: 135,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  
  frameChildLayout: {
    height: 0,
    width: 35,
    borderTopWidth: 0.3,
    left: 59,
    borderColor: "#000",
    borderStyle: "solid",
    position: "absolute",
  },
  frameChild: {
    top: 115,
    backgroundColor: Color.gainsboro,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 1.2845673561096191,
    },
    shadowRadius: 1.28,
    elevation: 1.28,
    shadowOpacity: 1,
    borderWidth: 0.3,
    width: 52,
    height: 41,
    borderColor: "#000",
    borderStyle: "solid",
    left: 50,
    position: "absolute",
  },
  frameItem: {
    top: 264,
    height: 148,
  },
  frameInner: {
    top: 505,
    height: 86,
  },
  imagenDeEspecie: {
    top: 413,
    fontSize: 15,
    height: 36,
    textAlign: "center",
    color: Color.dimgray,
    width: 261,
    left: 50,
    position: "absolute",
  },
  scrollView: {
    width: "100%",
    maxHeight: 200,
    marginTop: 450,
  },
  informacionDeDicha: {
    textAlign: "center",
    color: Color.dimgray,
    fontSize: 15,
    padding: 10,
  },
  especieDelMes: {
    top: 190,
    fontSize: 26,
  },
  lineView: {
    top: 127,
  },
  frameChild1: {
    top: 136,
  },
  frameChild2: {
    top: 144,
  },
  rectangleParent: {
    width: 360,
    height: 800,
  },
  inicio: {
    backgroundColor: Color.white,
    flex: 1,
    width: "100%",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    top: 115,
    backgroundColor: Color.gainsboro,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowOffset: {
      width: 0,
      height: 1.2845673561096191,
    },
    shadowRadius: 1.28,
    elevation: 1.28,
    shadowOpacity: 1,
    borderWidth: 0.3,
    width: 52,
    height: 41,
    borderColor: "#000",
    borderStyle: "solid",
    left: 50,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: Color.black,
    fontSize: 14,
  },
  sidebar: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 20,
  },
  sidebarButton: {
    marginBottom: 10,
    backgroundColor: Color.gainsboro,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  sidebarButtonText: {
    color: Color.black,
    fontSize: 16,
  },
});

export default Home;