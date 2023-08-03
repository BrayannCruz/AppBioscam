import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View, Modal } from "react-native";
import { WebView } from "react-native-webview";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import CornerImages from "./CornerImages";



const MapScreen = () => {
  const [showSNIBMap, setShowSNIBMap] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { width, height } = Dimensions.get("window");


  const maps = [
    {
      name: "Mamíferos",
      url: "http://geoportal.conabio.gob.mx/#!f=estados.mx:9@m=mixto@l=anfibios,aves,invertebrados,mamiferos:1,reptiles",
    },
    {
      name: "Invertebrados",
      url: "http://geoportal.conabio.gob.mx/#!f=estados.mx:9@m=mixto@l=anfibios,aves,invertebrados:1,mamiferos,reptiles",
    },
    {
      name: "Anfibios",
      url: "http://geoportal.conabio.gob.mx/#!f=estados.mx:9@m=mixto@l=anfibios:1,aves,invertebrados,mamiferos,reptiles",
    },
    {
      name: "Reptiles",
      url: "http://geoportal.conabio.gob.mx/#!f=estados.mx:9@m=mixto@l=anfibios,aves,invertebrados,mamiferos,reptiles:1",
    },
    {
      name: "Aves",
      url: "http://geoportal.conabio.gob.mx/#!f=estados.mx:9@m=mixto@l=anfibios,aves:1,invertebrados,mamiferos,reptiles",
    },
    
  ];

  const toggleMap = (mapName) => {
    setShowSNIBMap(mapName);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setShowSNIBMap(null);
  };

  return (
    <LinearGradient colors={["#84DCC6", "#1C2B2D"]} style={styles.container}>
          <CornerImages />

      {maps.map((map) => (
        <TouchableOpacity
          key={map.name}
          style={styles.button}
          onPress={() => toggleMap(map.name)}
        >
          <Ionicons name="earth-outline" size={30} color="white" />
          <Text style={styles.buttonText}>Abrir mapa de {map.name}</Text>
        </TouchableOpacity>
      ))}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Ionicons name="close" size={30} color="black" />
            </TouchableOpacity>

            {showSNIBMap && (
              <WebView
                source={{
                  uri: maps.find((map) => map.name === showSNIBMap)?.url || "",
                }}
                style={{ width: width * 0.9, height: height * 0.7 }}
              />
            )}
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#080808",
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: "#F7F7F7",
    marginLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "90%",
    height: "70%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    alignSelf: "flex-end",
    margin: 10,
  },
  map: {
    width: "100%",
    flex: 1,
    marginTop: 20,
  },
});

export default MapScreen;
