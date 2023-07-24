import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const CreateUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const navigation=useNavigation();


  const handleCreateAccount = () => {
    if (password.trim().length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
      Alert.alert('Error', 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.');
      return;
    }

    createUserWithEmailAndPassword(auth, email.trim(), password.trim())
      .then((userCredential) => {
        console.log('Cuenta Creada');
        const user = userCredential.user;
        console.log(user);
        setShowAlert(true);
        navigation.navigate('Home');
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('Error', error.message);
      });
  };

  useEffect(() => {
    const handleAlertClose = () => {
      setShowAlert(false);
      setEmail('');
      setPassword('');
      
    };

    if (showAlert) {
      Alert.alert('Registro Exitoso', 'Tu cuenta ha sido creada exitosamente.', [
        {
          text: 'OK',
          onPress: handleAlertClose,
        },
      ]);
    }
  }, [showAlert]);


  return (
    <LinearGradient
        style={styles.login}
        colors={["#26D0CE", "#1A2980"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1.3 }}
      >
        <View style={{ marginTop: 130 }}>
            <Text style={styles.title}>Registrarse en Bioscam</Text>
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
            <TouchableOpacity onPress={handleCreateAccount}>
              <Text style={styles.button}>Registrarse</Text>
            </TouchableOpacity>
        </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  login: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    marginVertical: 20, 
    fontWeight:'bold', 
    textAlign:'center',
    color: 'white'
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 17, 
    color: 'white', 
    alignSelf:'center', 
    marginBottom: 10 
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 40,
    width: 300,
    alignSelf: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center'
  },
  button: {
    backgroundColor: "#26697B",
    fontSize: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: '#6FD3C3',
    borderRadius: 50,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});


export default CreateUser;