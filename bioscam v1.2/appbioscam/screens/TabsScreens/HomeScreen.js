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
        uri: "https://firebasestorage.googleapis.com/v0/b/appbioscam.appspot.com/o/imagenes%2Fimagenesrnc%2Fvalidation%2FAguilaReal%2FAR_10.jpg?alt=media&token=a685c13a-6f48-4590-a864-d04863adbb1a",
    },
    name: "Águila Real",
    habitat: "América del Norte, Europa y Asia",
    status: "Menor preocupación",
    funFact: "Es el ave nacional de México.",
},
{
    id: 2,
    source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/appbioscam.appspot.com/o/imagenes%2Fimagenesrnc%2Fvalidation%2FAjolote%2FAjo_106.jpg?alt=media&token=e21a1c19-a4ba-4db8-bd3f-29097b5ef174",
    },
    name: "Ajolote",
    habitat: "Lagos de Xochimilco, México",
    status: "En peligro crítico",
    funFact: "Pueden regenerar partes de su cuerpo.",
},
{
    id: 3,
    source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/appbioscam.appspot.com/o/imagenes%2Fimagenesrnc%2Fvalidation%2FCacomixtle%2FCac_108.jpg?alt=media&token=eba7baaa-1edd-499d-987e-3ef97c053a43",
    },
    name: "Cacomixtle",
    habitat: "América del Norte",
    status: "Menor preocupación",
    funFact: "Es un excelente trepador.",
},
{
    id: 4,
    source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/appbioscam.appspot.com/o/imagenes%2Fimagenesrnc%2Fvalidation%2FGuajolote%2FGuaj_138.jpg?alt=media&token=88e20cc8-b8de-429e-907a-728d616bdf16",
    },
    name: "Guajolote",
    habitat: "México",
    status: "Menor preocupación",
    funFact: "Fue domesticado por los indígenas mexicanos.",
},
{
    id: 5,
    source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/appbioscam.appspot.com/o/imagenes%2Fimagenesrnc%2Fvalidation%2FLoboMexicano%2FLob_167.jpg?alt=media&token=c37753f1-5415-436c-a1b4-622bcc31f66c",
    },
    name: "Lobo Mexicano",
    habitat: "México y Estados Unidos del Sur",
    status: "En peligro",
    funFact: "Es la subespecie más meridional del lobo gris.",
},
{
    id: 6,
    source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/appbioscam.appspot.com/o/imagenes%2Fimagenesrnc%2Fvalidation%2FPericomexicano%2FPer_108.jpg?alt=media&token=4a8e9eff-c6c3-4e44-87e0-9b03d089a82e",
    },
    name: "Perico Mexicano",
    habitat: "México",
    status: "Vulnerable",
    funFact: "Es conocido por su colorido plumaje.",
},
{
    id: 7,
    source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/appbioscam.appspot.com/o/imagenes%2Fimagenesrnc%2Fvalidation%2FTarantula%2FTar_109.jpg?alt=media&token=df5b69e7-5286-4aea-8310-b1def66aabc0",
    },
    name: "Tarántula",
    habitat: "América, África, Asia y Europa",
    status: "Depende de la especie",
    funFact: "Algunas pueden vivir hasta 25 años.",
},
{
    id: 8,
    source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/appbioscam.appspot.com/o/imagenes%2Fimagenesrnc%2Fvalidation%2FTeporingo%2FTep_100.jpg?alt=media&token=57ac1281-9321-4a7e-9a69-c960effea2d7",
    },
    name: "Teporingo",
    habitat: "Montañas de México",
    status: "En peligro",
    funFact: "Es uno de los conejos más pequeños del mundo.",
},
{
    id: 9,
    source: {
        uri: "https://firebasestorage.googleapis.com/v0/b/appbioscam.appspot.com/o/imagenes%2Fimagenesrnc%2Fvalidation%2FVivoraCascabel%2FVcas_120.jpg?alt=media&token=c5a84c35-9451-4542-86cd-6673e6b0d746",
    },
    name: "Víbora de Cascabel",
    habitat: "América",
    status: "Depende de la especie",
    funFact: "Es conocida por su cascabel en la punta de la cola.",
}

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
