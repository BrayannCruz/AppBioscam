import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CornerImages from "./CornerImages";

// Tu array de imágenes aquí...
const images = [
  {
    id: 1,
    source: {
      uri: "https://github.com/LA0127/ACWEB/blob/master/COYOTE1.jpg?raw=true",
    },
    name: "Coyote",
    habitat: "Norte y Centroamérica",
    status: "Menor preocupación",
    funFact: "Son excelentes corredores.",
  },
  {
    id: 2,
    source: {
      uri: "https://github.com/LA0127/ACWEB/blob/master/AJOLOTE3.jpg?raw=true",
    },
    name: "Ajolote",
    habitat: "Lagos de Xochimilco, México",
    status: "En peligro crítico",
    funFact: "Pueden regenerar partes de su cuerpo.",
  },
  {
    id: 3,
    source: {
      uri: "https://github.com/LA0127/ACWEB/blob/master/1MAPACHETRESMARIAS.jpg?raw=true",
    },
    name: "Mapache de Tres Marías",
    habitat: "Islas Marías, México",
    status: "En peligro",
    funFact: "Es una especie endémica de las Islas Marías.",
  },
  {
    id: 4,
    source: {
      uri: "https://github.com/LA0127/ACWEB/blob/master/1MAPACHETRESMARIAS.jpg?raw=true",
    },
    name: "Mapache de Tres Marías",
    habitat: "Islas Marías, México",
    status: "En peligro",
    funFact: "Es una especie endémica de las Islas Marías.",
  },
  {
    id: 5,
    source: {
      uri: "https://github.com/LA0127/ACWEB/blob/master/1MAPACHETRESMARIAS.jpg?raw=true",
    },
    name: "Mapache de Tres Marías",
    habitat: "Islas Marías, México",
    status: "En peligro",
    funFact: "Es una especie endémica de las Islas Marías.",
  },
  {
    id: 6,
    source: {
      uri: "https://github.com/LA0127/ACWEB/blob/master/1MAPACHETRESMARIAS.jpg?raw=true",
    },
    name: "Mapache de Tres Marías",
    habitat: "Islas Marías, México",
    status: "En peligro",
    funFact: "Es una especie endémica de las Islas Marías.",
  },
  {
    id: 7,
    source: {
      uri: "https://github.com/LA0127/ACWEB/blob/master/1MAPACHETRESMARIAS.jpg?raw=true",
    },
    name: "Mapache de Tres Marías",
    habitat: "Islas Marías, México",
    status: "En peligro",
    funFact: "Es una especie endémica de las Islas Marías.",
  },

  // Agrega más imágenes según necesites...
];

const SpeciesList = () => {
  const [search, setSearch] = useState("");
  const [speciesData, setSpeciesData] = useState(images);

  const renderItem = (item) => (
    <View style={styles.item}>
      <Image source={item.source} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.funFact}</Text>
    </View>
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
    <LinearGradient colors={["#84DCC6", "#1C2B2D"]} style={styles.inicio}>
      <CornerImages />
      <View style={styles.container}>
        <TextInput
          style={styles.search}
          value={search}
          placeholder="Busca una especie..."
          onChangeText={(text) => searchFilter(text)}
        />
        <ScrollView style={styles.scrollView}>
          {speciesData.map((item) => renderItem(item))}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  inicio: {
    flex: 1,
    justifyContent: "center", // Centra los elementos en el eje cruzado
  },
  container: {
    alignItems: "center",
    alignSelf: "center",

  },
  search: {
    height: 30,
    width: 280, // Asegura que el campo de búsqueda ocupa todo el ancho posible
    borderWidth: 1,
    top: 220,
  },
  scrollView: {
    width: "85%",
    height: 100,
    top: 250,
    borderBottomColor: "rgba(255, 255, 255)",
    borderWidth: 1,
  },
  item: {
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default SpeciesList;
