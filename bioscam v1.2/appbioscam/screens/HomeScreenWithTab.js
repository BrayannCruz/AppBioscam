import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./TabsScreens/HomeScreen";
import MainScreen from "./TabsScreens/ScanScreen";
import Settings from "./TabsScreens/SettingsScreen"; // Archivo de pantalla
import About from "./TabsScreens/ProfileScreen"; //Archivo de pantalla
import MapScreen from "./TabsScreens/MapScreen";
import { BackHandler, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';


const Tab = createBottomTabNavigator();

function HomeScreenWithTab() {
  let lastBackButtonPress = 0;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => backHandler.remove();
  }, []);

  const handleBackPress = () => {
    const currentTime = new Date().getTime();

    if (currentTime - lastBackButtonPress < 2000) {
      // Si han pasado menos de 2 segundos desde la última vez que se presionó el botón de retroceso, mostramos el mensaje de confirmación
      showExitConfirmation();
    } else {
      // Si han pasado más de 2 segundos, actualizamos el tiempo del último botón de retroceso presionado
      lastBackButtonPress = currentTime;
    }

    // Indicamos que hemos manejado el evento del botón de retroceso
    return true;
  };

  const showExitConfirmation = () => {
    Alert.alert(
      "¿Ya te vas?",
      'Presiona "Jimon" para salir de la aplicación.',
      [
        { text: "Coto", style: "cancel", onPress: () => {} },
        { text: "Jimon", onPress: () => BackHandler.exitApp() },
      ]
    );
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#F0F0F0", // Cambia el color del ícono/texto de la pestaña activa
        tabBarInactiveTintColor: "#F0F0F0", // Cambia el color del ícono/texto de las pestañas inactivas
        tabBarActiveBackgroundColor: "#676B6C", // Cambia el color de fondo de la pestaña activa
        tabBarInactiveBackgroundColor: "#7E8182",
        headerTitleStyle: {
          color: "#0D819D",
        },
        headerStyle: {
          backgroundColor: "rgb(8,62,76)",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={30} color="white" />
          ),
          headerShown: false,
          headerStyle: {
            backgroundColor: "rgb(8,62,76)",
            height: 80,
          },
          headerTintColor: "rgb(8,62,76)",
        }}
      />
      <Tab.Screen
        name="MapScreen"
        component={MapScreen}
        options={{
          title: "Ubicación",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" size={30} color="white" />
          ),
          headerShown: false,
          headerStyle: {
            backgroundColor: "rgb(8,62,76)",
            height: 80,
          },
          headerTintColor: "rgb(8,62,76)",
        }}
      />
      <Tab.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          title: "Capturar",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="barcode-outline" size={30} color="white" />
          ),
          headerShown: false,
          headerStyle: {
            backgroundColor: "rgb(8,62,76)",
            height: 80,
          },
          headerTintColor: "rgb(8,62,76)",
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Especies",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-circle-outline" size={30} color="white" />
          ),
          headerShown: false,
          headerStyle: {
            backgroundColor: "rgb(8,62,76)",
            height: 80,
          },
          headerTintColor: "rgb(8,62,76)",
        }}
      />
      <Tab.Screen
        name="About"
        component={About}
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={30} color="white" />
          ),
          headerShown: false,
          headerStyle: {
            backgroundColor: "rgb(8,62,76)",
            height: 80,
          },
          headerTintColor: "rgb(8,62,76)",
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeScreenWithTab;
