import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import CornerImages from "./CornerImages";

const ProfileScreen = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userAlias, setUserAlias] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
        const alias = user.email.substring(0, user.email.indexOf("@"));
        setUserAlias(alias);
      } else {
        console.log("No user is signed in.");
      }
    });
  }, []);

  const handleChangePassword = () => {
    navigation.navigate("ChangePassword", { email: userEmail });
  };

  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigation.navigate("MainLogin");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAccount = () => {
    navigation.navigate("DeleteAccount", { email: userEmail });
  };

  return (
    <LinearGradient colors={["#84DCC6", "#1C2B2D"]} style={styles.inicio}>
      <CornerImages />
      <Text style={styles.text}>Alias: {userAlias}</Text>
      <Text style={styles.text}>Correo: {userEmail}</Text>
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Cambiar Contraseña</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
        <Text style={styles.buttonText}>Eliminar Cuenta</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  inicio: {
    flex: 1,
  },
  text: {
    top: 200,
    alignSelf: "center",
    fontSize: 20,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#0D819D',
    top: 200,
    padding: 10,
    borderRadius: 10,
    margin: 10,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#F7F7F7',
    textAlign: 'center',
  },
});

export default ProfileScreen;
