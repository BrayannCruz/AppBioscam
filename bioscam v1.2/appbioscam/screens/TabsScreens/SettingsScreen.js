import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CornerImages from "./CornerImages";
const images = [
  {
    id: 1,
    uri: "https://firebasestorage.googleapis.com/v0/b/appbioscam.appspot.com/o/imagenes%2Fimagenesrnc%2Fvalidation%2FAguilaReal%2FAR_10.jpg?alt=media&token=a685c13a-6f48-4590-a864-d04863adbb1a",
    name: "Águila Real",
    description:
      "El águila real es una especie de ave rapaz de la familia Accipitridae.",
  },
  {
    id: 2,
    uri: "https://firebasestorage.googleapis.com/v0/b/appbioscam.appspot.com/o/imagenes%2Fimagenesrnc%2Fvalidation%2FAjolote%2FAjo_106.jpg?alt=media&token=e21a1c19-a4ba-4db8-bd3f-29097b5ef174",
    name: "Ajolote",
    description:
      "El ajolote es una especie de salamandra de la familia Ambystomatidae.",
  },
  {
    id: 3,
    uri: "https://firebasestorage.googleapis.com/v0/b/appbioscam.appspot.com/o/imagenes%2Fimagenesrnc%2Fvalidation%2FCacomixtle%2FCac_108.jpg?alt=media&token=eba7baaa-1edd-499d-987e-3ef97c053a43",
    name: "Cacomixtle",
    description:
      "El cacomixtle es un pequeño mamífero carnívoro de la familia Procyonidae.",
  },
  {
    id: 4,
    uri: "https://firebasestorage.googleapis.com/v0/b/appbioscam.appspot.com/o/imagenes%2Fimagenesrnc%2Fvalidation%2FGuajolote%2FGuaj_138.jpg?alt=media&token=88e20cc8-b8de-429e-907a-728d616bdf16",
    name: "Guajolote",
    description:
      "El guajolote es una especie de ave galliforme de la familia Meleagrididae.",
  },
  {
    id: 5,
    uri: "https://firebasestorage.googleapis.com/v0/b/appbioscam.appspot.com/o/imagenes%2Fimagenesrnc%2Fvalidation%2FLoboMexicano%2FLob_167.jpg?alt=media&token=c37753f1-5415-436c-a1b4-622bcc31f66c",
    name: "Lobo Mexicano",
    description:
      "El lobo mexicano es una subespecie del lobo gris, perteneciente a la familia de los cánidos.",
  },
  {
    id: 6,
    uri: "https://firebasestorage.googleapis.com/v0/b/appbioscam.appspot.com/o/imagenes%2Fimagenesrnc%2Fvalidation%2FPericomexicano%2FPer_108.jpg?alt=media&token=4a8e9eff-c6c3-4e44-87e0-9b03d089a82e",
    name: "Perico Mexicano",
    description:
      "El perico mexicano es una especie de ave de la familia Psittacidae, originaria de México.",
  },
  {
    id: 7,
    uri: "https://firebasestorage.googleapis.com/v0/b/appbioscam.appspot.com/o/imagenes%2Fimagenesrnc%2Fvalidation%2FTarantula%2FTar_109.jpg?alt=media&token=df5b69e7-5286-4aea-8310-b1def66aabc0",
    name: "Tarántula",
    description:
      "Las tarántulas son un grupo de arañas grandes y a menudo peludas de la familia Theraphosidae.",
  },
  {
    id: 8,
    uri: "https://firebasestorage.googleapis.com/v0/b/appbioscam.appspot.com/o/imagenes%2Fimagenesrnc%2Fvalidation%2FTeporingo%2FTep_100.jpg?alt=media&token=57ac1281-9321-4a7e-9a69-c960effea2d7",
    name: "Teporingo",
    description:
      "El teporingo, también conocido como conejo zacatuche, es una especie de conejo endémico de México.",
  },
  {
    id: 9,
    uri: "https://firebasestorage.googleapis.com/v0/b/appbioscam.appspot.com/o/imagenes%2Fimagenesrnc%2Fvalidation%2FVivoraCascabel%2FVcas_120.jpg?alt=media&token=c5a84c35-9451-4542-86cd-6673e6b0d746",
    name: "Víbora de Cascabel",
    description:
      "Las víboras de cascabel son un grupo de serpientes venenosas, miembros del género Crotalus.",
  },
];

const SpeciesList = () => {
  const [search, setSearch] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [speciesData, setSpeciesData] = useState(images);

  const renderItem = (item) => (
    <TouchableOpacity onPress={() => setSelectedSpecies(item)}>
      <View style={styles.item}>
        <Image source={{ uri: item.uri }} style={styles.image} />
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const searchFilter = (text) => {
    if (text) {
      const newData = images.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setSpeciesData(newData);
      setSearch(text);
    } else {
      setSpeciesData(images);
      setSearch(text);
    }
  };

  return (
    <LinearGradient colors={["#84DCC6", "#1C2B2D"]} style={styles.container}>
      <CornerImages />
      <TextInput
        style={styles.search}
        value={search}
        placeholder="Busca una especie..."
        onChangeText={(text) => searchFilter(text)}
      />
      <ScrollView style={styles.scrollView}>
        {speciesData.map((item) => renderItem(item))}
      </ScrollView>
      {selectedSpecies && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={selectedSpecies !== null}
          onRequestClose={() => {
            setSelectedSpecies(null);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image
                source={{ uri: selectedSpecies.uri }}
                style={styles.image}
              />
              <Text style={styles.modalText}>{selectedSpecies.name}</Text>
              <Text style={styles.modalText}>
                {selectedSpecies.description}
              </Text>
              <TouchableOpacity
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setSelectedSpecies(null);
                }}
              >
                <Text style={styles.textStyle}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    marginHorizontal: 20,
  },
  item: {
    marginVertical: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
  },
  search: {
    height: 40,
    width: 280, // Asegura que el campo de búsqueda ocupa todo el ancho posible
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
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
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default SpeciesList;
