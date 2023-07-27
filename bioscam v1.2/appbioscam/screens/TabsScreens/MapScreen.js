import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import { WebView } from "react-native-webview";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";
import CornerImages from "./CornerImages";
import { Ionicons } from '@expo/vector-icons';


const MapScreen = () => {
  const { width, height } = useWindowDimensions();
  const [userLocation, setUserLocation] = useState(null);
  const [showUserLocation, setShowUserLocation] = useState(false);
  const [showSNIBMap, setShowSNIBMap] = useState(false);

  useEffect(() => {
    // Función para obtener la ubicación actual del usuario
    const getUserLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permiso de ubicación no concedido");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    getUserLocation();
  }, []);

  return (
    <LinearGradient colors={["#84DCC6", "#1C2B2D"]} style={styles.container}>
      <CornerImages />
      {/* Botones para mostrar mapas */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowSNIBMap(!showSNIBMap)}
      >
        <Ionicons name="earth-outline" size={30} color="white" />
        <Text style={styles.buttonText}>Abrir mapa por zonas</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowUserLocation(!showUserLocation)}
      >
        <Ionicons name="earth-outline" size={30} color="white" />
        <Text style={styles.buttonText}>Abrir mapa de tu ubicación</Text>
      </TouchableOpacity>

      {showSNIBMap && (
        <View style={styles.upperMapContainer}>
          <WebView
            source={{ uri: "http://geoportal.conabio.gob.mx/#!f=estados.mx:9@m=satelite@l=anfibios:1,aves:1,plantas,protoctistas:1,invertebrados:1,mamiferos:1,peces:1,reptiles:1" }}
            style={{
              width: width * 0.9,
              height: height * 0.12,
              borderRadius: 10,
            }} // map size reduced
          />
        </View>
      )}

      {/* Sección inferior: Mapa de ubicación actual del usuario */}
      {showUserLocation && userLocation && (
        <View style={styles.lowerMapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={userLocation} title="Tu ubicación" />
          </MapView>
        </View>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  upperMapContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  lowerMapContainer: {
    flex: 1,
    alignItems: "center",
  },
  map: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center", // Added to center buttons
    alignItems: "center", // Added to center buttons
  },
  button: {
    flexDirection: "row", // Added to display icon and text in a row
    justifyContent: "center", // Added to center the content
    alignItems: "center", // Added to center the content
    backgroundColor: "#080808",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: "#F7F7F7",
    marginLeft: 10, // Added to give some space between the icon and the text
  },
});

export default MapScreen;
