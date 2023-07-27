import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseConfig";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./TabsScreens/HomeScreen";
import CreateUser from "./CreateUserScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

WebBrowser.maybeCompleteAuthSession();

const { width, height } = Dimensions.get("window");

function LoginScreen() {
  const [userInfo, setUserInfo] = React.useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "862986853928-2nvkki7n9552lult323k3vmm4v8esttf.apps.googleusercontent.com",
    iosClientId:
      "862986853928-v9d1o2bkk5e8fp0medkmpjf02rfvqth9.apps.googleusercontent.com",
    webClientId:
      "862986853928-c69p4mdpt2r0v3f86c6kh29ne81jl78d.apps.googleusercontent.com",
    expoClientId:
      "862986853928-c69p4mdpt2r0v3f86c6kh29ne81jl78d.apps.googleusercontent.com",
  });
  const [accessToken, setAccessToken] = React.useState();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showInputs, setShowInputs] = useState(false);
  const [auth, setAuth] = useState();
  const [requireRefresh, setRequireRefresh] = useState(false);
  const navigation = useNavigation();
  const app = initializeApp(firebaseConfig);

  const logout = async () => {
    await AuthSession.revokeAsync(
      {
        token: auth.accessToken,
      },
      {
        revocationEndpoint: "https://oauth2.googleapis.com/revoke",
      }
    );

    setAuth(undefined);
    setUserInfo(undefined);
    await AsyncStorage.removeItem("auth");
  };

  const handleCreateAccount = () => {
    navigation.navigate("Registrarse");
  };

  const handleSignInSubmit = () => {
    navigation.navigate("Ingresar");
  };

  React.useEffect(() => {
    (async function fetchUser() {
      await handleGoogleSignIn();
    })();
  }, [response]);

  async function handleGoogleSignIn() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success") {
        await getUserInfo(response.authentication.accessToken);
      }
      await getUserInfo();
    } else {
      setUserInfo(JSON.parse(user));
    }
  }
  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {}
  };

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <LinearGradient
          // Style del contenedor
          style={styles.background}
          // Colores del gradiente
          colors={["#C9E8E0", "#82D0B9"]}
          // Posición de inicio y fin
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1.8 }}
        >
          <View style={styles.title}>
            <Text
              style={{
                color: "#fff",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 40,
                fontStyle: "italic",
              }}
            >
              BIOSCAM
            </Text>
            <Image
              source={require("../assets/logo.png")}
              style={styles.logo}
            />
          </View>
          <View style={styles.login}>
            <View>
              <TouchableOpacity
                onPress={handleSignInSubmit}
                style={[styles.button, { paddingLeft: 30 }]}
              >
                <View style={styles.buttonContent}>
                  <Ionicons
                    name="person-circle-outline"
                    size={30}
                    color="white"
                    bottom={10}
                  />
                  <Text style={styles.iniciarsesionCC}>
                    Correo y Contraseña
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                title={auth ? "Get User Data" : "Login"}
                onPress={() => promptAsync()}
                style={[styles.button, { paddingLeft: 30 }]}
              >
                <View style={styles.buttonContent}>
                  <Ionicons
                    name="logo-google"
                    size={30}
                    color="white"
                    bottom={10}
                  />
                  <Text style={styles.iniciarsesionCC}>Cuenta de Google</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>¿Aun no tiene Cuenta?</Text>
            </View>
            <TouchableOpacity
              onPress={handleCreateAccount}
              style={styles.createAccountButton}
            >
              <Text style={styles.createAccountText}>Registrarse</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    width: 220, // change to desired width
    height: 220, // change to desired height
    alignSelf: "center",
    borderWidth: 1, // add this line
    borderRadius: 80,
    marginTop: 45,
  },
background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  title: {
    backgroundColor: "#0D819D",
    borderRadius: 20,
    color: "#fff",
    width: 200,
    height: 60,
    alignSelf: "center",
    marginTop: 100,
  },
  login: {
    width: "100%", // Ajusta el ancho en función del tamaño de la pantalla
    alignItems: "center", 
  },
  button: {
    backgroundColor: "#0D819D",
    marginBottom: 10,
    borderRadius: 20,
    paddingTop: 20,
    top: 300,
  },
  iniciarsesionCC: {
    color: "#FFFFFF",
    fontSize: 15,
    paddingLeft: 35,
    bottom: 10,
  },
  signInContainer: {
    alignContent: "center",
    alignItems: "center",
    marginVertical: 80,
  },
  signInText: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonContent: {
    width: 250,
    height: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  signUpContainer: {
    alignSelf: "center",
    paddingTop: 30,
    marginTop: 350,
  },
  signUpText: {
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
  },
  createAccountButton: {
    alignSelf: "center",
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20, // Añadido margen en la parte superior
  },
  createAccountText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#E02B2B",
  },
});

export default LoginScreen;
