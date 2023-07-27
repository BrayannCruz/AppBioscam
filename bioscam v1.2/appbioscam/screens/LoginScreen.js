import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  StyleSheet,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { sendPasswordResetEmail } from "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigation = useNavigation();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleSignInSubmit = () => {
    signInWithEmailAndPassword(auth, email.trim(), password)
      .then((userCredential) => {
        console.log("Bienvenido");
        const user = userCredential.user;
        console.log(user);
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Error", error.message);
      });
  };

  const handlePassRecover = () => {
    if (email.trim() === "") {
      Alert.alert("Error", "Por favor, ingresa un correo electrónico.");
      return;
    }

    sendPasswordResetEmail(auth, email.trim())
      .then(() => {
        Alert.alert(
          "Exito",
          "Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña. Revisa tu correo."
        );
        // Limpia el estado del correo electrónico después de enviar el correo
        setEmail("");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert(
          "Error",
          "No se pudo enviar el correo electrónico de restablecimiento de contraseña"
        );
      });
  };

  useEffect(() => {
    const handleAlertClose = () => {
      setShowAlert(false);
      setEmail("");
      setPassword("");
    };

    if (showAlert) {
      Alert.alert("Bienvenido", [
        {
          text: "OK",
          onPress: handleAlertClose,
        },
      ]);
    }
  }, [showAlert]);

  return (
    <LinearGradient
      // Aplicamos el gradiente al contenedor externo
      style={styles.container}
      colors={["#26D0CE", "#1A2980"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1.3 }}
    >
      <View>
        <Text style={styles.title}>¡Inicia Sesión!</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Correo</Text>
        <TextInput
          onChangeText={(text) => setEmail(text.trim())}
          style={styles.input}
          placeholder="some@example.com"
          value={email}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          onChangeText={(text) => setPassword(text.trim())}
          style={styles.input}
          placeholder="****************"
          secureTextEntry={true}
          value={password}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSignInSubmit}>
          <Text style={styles.button}>Ingresar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handlePassRecover}>
          <Text style={styles.button}>Recuperar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 30,
    color: "#fff",
    marginBottom: 50,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 5,
    height: 45,
    paddingHorizontal: 15,
    fontSize: 18,
  },
  button: {
    fontSize: 20,
    color: "#6FD3C3",
    marginTop: 25,
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
});

export default SignIn;
