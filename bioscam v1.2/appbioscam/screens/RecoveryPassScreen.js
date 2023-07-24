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
    <View style={styles.login}>
      <View style={{ marginTop: 130 }}>
        <Text
          style={{
            fontSize: 25,
            marginVertical: 20,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Iniciar Sesion
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontSize: 17,
            color: "black",
            alignSelf: "center",
            marginBottom: 10,
          }}
        >
          Correo
        </Text>
        <TextInput
          onChangeText={(text) => setEmail(text.trim())}
          style={styles.input}
          placeholder="some@example.com"
          value={email}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View>
        <Text
          style={{
            fontSize: 17,
            color: "black",
            alignSelf: "center",
            marginBottom: 10,
          }}
        >
          Contraseña
        </Text>
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
      <View>
        <Text style={{ fontSize: 15, color: "black", alignSelf: "center" }}>
          ¿Olvido su contraseña?
        </Text>
        <TouchableOpacity onPress={handlePassRecover}>
          <Text style={styles.botonRecuperar}>Recuperar</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity onPress={handleSignInSubmit}>
          <Text style={styles.botonIngresar}>Ingresar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  login: {
    flex: 1,
    backgroundColor: "#7BAC9B",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 15,
    height: 40,
    width: 300,
    alignSelf: "center",
  },
  botonRecuperar: {
    backgroundColor: "#26697B",
    fontSize: 15,
    marginTop: 5,
    color: "#6FD3C3",
    borderRadius: 50,
    width: 85,
    height: 23,
    textAlign: "center",
    fontWeight: "bold",
    alignSelf: "center",
  },
  botonIngresar: {
    backgroundColor: "#26697B",
    fontSize: 20,
    marginTop: 25,
    color: "#6FD3C3",
    borderRadius: 50,
    width: 115,
    height: 30,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default SignIn;
