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
        <Text style={styles.title}>Iniciar Sesion</Text>
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

      <View style={styles.recoverContainer}>
        <Text style={styles.label}>¿Olvido su contraseña?</Text>
        <TouchableOpacity onPress={handlePassRecover}>
          <Text style={styles.recoverButton}>Recuperar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signInContainer}>
        <TouchableOpacity onPress={handleSignInSubmit}>
          <Text style={styles.signInButton}>Ingresar</Text>
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
    paddingHorizontal: 30, // Añadido para dar algo de margen en los lados
  },
  title: {
    fontSize: 25,
    marginVertical: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff", // Cambiado a blanco para que sea visible sobre el gradiente
  },
  inputContainer: {
    marginBottom: 20, // Añadido para dar algo de espacio entre los campos
  },
  label: {
    fontSize: 17,
    color: "#fff", // Cambiado a blanco para que sea visible sobre el gradiente
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    height: 40,
    width: 300, // Cambiado para que ocupe todo el espacio disponible
    paddingHorizontal: 10, // Añadido para dar algo de margen a la izquierda del texto
  },
  recoverContainer: {
    alignItems: "center", // Centrado horizontal
    marginBottom: 20, // Añadido para dar algo de espacio después del botón de recuperación
  },
  recoverButton: {
    backgroundColor: "#26697B",
    fontSize: 15,
    marginTop: 5,
    color: "#6FD3C3",
    borderRadius: 50,
    width: 85,
    height: 23,
    textAlign: "center",
    fontWeight: "bold",
    justifyContent: "center", // Añadido para centrar verticalmente
  },
  signInContainer: {
    alignItems: "center", // Centrado horizontal
  },
  signInButton: {
    backgroundColor: "#26697B",
    fontSize: 20,
    marginTop: 25,
    color: "#6FD3C3",
    borderRadius: 50,
    width: 115,
    height: 30,
    textAlign: "center",
    fontWeight: "bold",
    justifyContent: "center", // Añadido para centrar verticalmente
  },
});

export default SignIn;
