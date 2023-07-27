import React, { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Touchable,
} from "react-native";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";
import CornerImages from "./TabsScreens/CornerImages";

const ChangePasswordScreen = () => {
  const [email, setEmail] = useState("");
  const auth = getAuth();

  const handlePassRecover = () => {
    if (email.trim() === "") {
      Alert.alert("Error", "Por favor, ingresa un correo electrónico.");
      return;
    }

    sendPasswordResetEmail(auth, email.trim())
      .then(() => {
        Alert.alert(
          "Éxito",
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

  return (
    <LinearGradient colors={["#84DCC6", "#1C2B2D"]} style={styles.inicio}>
      <CornerImages />
      <Text style={styles.text}>Ingresa tu correo electrónico:</Text>
      <TextInput
        style={styles.input}
        value={email}
        placeholder="some@example.com"
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={handlePassRecover} style={styles.button}>
        <View style={styles.innerButtonView}>
          <Text>Enviar Correo</Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  inicio: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    marginBottom: 10,
    fontSize: 20,
    color: "#fff",
    alignSelf: "center",
  },
  input: {
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
  },

  button: {
    borderRadius: 5,
    alignSelf: "center",
    width: "50%",
    height: "8%", // Reduzca la altura si está demasiado grande
    backgroundColor: "#C9E8E0",
    marginTop: 25,
    alignItems: "center", // Centra el texto y la vista interior verticalmente
    justifyContent: "center", // Centra el texto y la vista interior horizontalmente
  },
  innerButtonView: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    color: "#6FD3C3",
    fontWeight: "bold",
  },
});

export default ChangePasswordScreen;
