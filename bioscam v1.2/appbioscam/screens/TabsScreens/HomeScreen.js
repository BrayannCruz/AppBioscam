import React from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  Image,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { LinearGradient } from "expo-linear-gradient"; // import corrected
import CornerImages from "./CornerImages";

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
  // Agrega más imágenes según necesites...
];

const Home = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const carouselRef = React.useRef(null);

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image source={item.source} style={{ width: 200, height: 200 }} />
      </View>
    );
  };

  return (
    <LinearGradient colors={["#84DCC6", "#1C2B2D"]} style={styles.inicio}>
      <CornerImages />
      <Text style={styles.title}>Especies del Mes</Text>
      <View style={styles.carousel}>
        <Carousel
          layout={"default"}
          ref={carouselRef}
          data={images}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={200}
          renderItem={renderItem}
          onSnapToItem={(index) => setActiveIndex(index)}
          loop={true}
        />
      </View>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.textInfo}>
          Nombre: {images[activeIndex].name}
          {"\n"}
          Hábitat: {images[activeIndex].habitat}
          {"\n"}
          Estado de conservación: {images[activeIndex].status}
          {"\n"}
          Dato interesante: {images[activeIndex].funFact}
        </Text>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  inicio: {
    flex: 1,
    // Elimina el color de fondo ya que ahora usas un gradiente
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 170,
    color: "#fff", // Cambia esto si necesitas otro color para el texto
  },
  carousel: {
    flex: 1,
    marginTop: 50,
  },
  scrollView: {
    flex: 1,
    margin: 20,
  },
  textInfo: {
    fontSize: 15,
    textAlign: "justify",
    color: "#fff", // Cambia esto si necesitas otro color para el texto
  },
});

export default Home;
