import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import {
  deleteAccount,
  reauthenticateWithCredential,
  EmailAuthProvider,
  getAuth,
} from "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";
import CornerImages from "./TabsScreens/CornerImages";

const DeleteAccountScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const handleDeleteAccount = () => {
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert(
        "Error",
        "Por favor, ingresa un correo electrónico y contraseña."
      );
      return;
    }

    const user = auth.currentUser;

    if (user) {
      const credential = EmailAuthProvider.credential(email, password);

      reauthenticateWithCredential(user, credential)
        .then(() => {
          user
            .delete()
            .then(function () {
              Alert.alert("Éxito", "Cuenta eliminada con éxito");
            })
            .catch(function (error) {
              console.log(error);
              Alert.alert("Error", "No se pudo eliminar la cuenta");
            });
        })
        .catch((error) => {
          console.log(error);
          Alert.alert("Error", "La autenticación falló, intente de nuevo");
        });
    }
  };

  return (
    <LinearGradient colors={["#84DCC6", "#1C2B2D"]} style={styles.inicio}>
      <CornerImages />
      <Text style={styles.text}>Ingresa tu correo electrónico:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <Text style={styles.text}>Ingresa tu contraseña:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Eliminar Cuenta" onPress={handleDeleteAccount} />
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
});

export default DeleteAccountScreen;
