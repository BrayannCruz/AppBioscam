import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Dimensions,
  Image,
  BackHandler,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

function LoginScreen() {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [privacyPolicy, setPrivacyPolicy] = React.useState("");
  const navigation = useNavigation();

  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/LA0127/5bab97a8d49f61a5bb667d272ef9d672/raw/55de7b8c063210355b5d257ef1ec14febd18e052/txt",
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    )
      .then((response) => response.text())
      .then((data) => {
        setPrivacyPolicy(data);
      });
  }, []);

  const acceptPrivacy = () => {
    setModalVisible(false);
  };

  const rejectPrivacy = () => {
    setModalVisible(false);
    BackHandler.exitApp();
  };

  const handleCreateAccount = () => {
    navigation.navigate("Registrarse");
  };

  const handleSignInSubmit = () => {
    navigation.navigate("Ingresar");
  };

  return (
    <SafeAreaProvider>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView>
              <Text
                style={{
                  color: "#0F0F0F",
                  fontWeight: "bold",
                  fontSize: 13,
                  fontStyle: "italic",
                }}
              >
                {privacyPolicy}
              </Text>
            </ScrollView>

            <TouchableOpacity
              style={{ backgroundColor: "#0D819D", top: 10, borderRadius: 20, width: 100 }}
              onPress={acceptPrivacy}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 18,
                  fontStyle: "italic",
                }}
              >
                Aceptar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: "#0D819D", top: 20, borderRadius: 20, width: 100}}
              onPress={rejectPrivacy}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 18,
                  fontStyle: "italic",
                }}
              >
                Rechazar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <LinearGradient
          style={styles.background}
          colors={["#C9E8E0", "#82D0B9"]}
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
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={handleSignInSubmit}
              style={styles.button}
            >
              <Ionicons
                name="person-circle-outline"
                size={30}
                color="white"
              />
              <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>¿Aún no tiene Cuenta?</Text>
            </View>
            <TouchableOpacity
              onPress={handleCreateAccount}
              style={styles.createAccountButton}
            >
              <Text style={styles.createAccountText}>Registrarse</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.privacyText}>Aviso de privacidad</Text>
            </TouchableOpacity>
          
        </LinearGradient>
      </View>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
  },
  logo: {
    width: 220,
    height: 220,
    alignSelf: "center",
    borderWidth: 1,
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
  buttonContainer: {
    alignSelf: "center",
    marginTop: 300,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0D819D",
    borderRadius: 20,
    width: 200,
    height: 50,
    padding: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    marginLeft: 10,
    fontSize: 18,
  },
  signUpContainer: {
    alignItems: "center",
    alignSelf: "center",
    marginTop: 160,
  },
  signUpText: {
    color: "#F0F0F0",
    fontSize: 20,
  },
  createAccountButton: {
    marginTop: 10,
  },
  createAccountText: {
    alignSelf: "center",
    color: "#FF0000",
    fontSize: 20,
  },
  privacyText: {
    color: "#0F0F0F",
    fontSize: 15,
    paddingTop: 10,
    alignSelf: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default LoginScreen;
