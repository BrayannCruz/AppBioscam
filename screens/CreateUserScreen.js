import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './HomeScreen';

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
    <View style={styles.login}>
        <View>
            <Text style={{fontSize:25,marginVertical:20, fontWeight:'bold', textAlign:'center'}}>Registrarse en Bioscam</Text>
        </View>
      <View>
        <Text style={{ fontSize: 17, fontWeight: '400', color: 'black' }}>Correo</Text>
        <TextInput
          onChangeText={(text) => setEmail(text.trim())}
          style={styles.input}
          placeholder="E-mail"
          value={email}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View>
        <Text style={{ fontSize: 17, fontWeight: '400', color: 'black' }}>Contraseña</Text>
        <TextInput
          onChangeText={(text) => setPassword(text.trim())}
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
          value={password}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>
      <View style={{left:200}}>
        <TouchableOpacity onPress={handleCreateAccount} style={[styles.button]}>
          <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  login: {
    width: 400,
    position: 'absolute',
    padding: 50,
    top:150
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    borderColor: '#000',
    borderStyle: 'solid',
    height: 40,
  },
  button: {
    backgroundColor: '#3BB863',
    marginBottom: 10,
    height: 30,
    width:80,
    alignItems:'center',
    justifyContent:'center',
    borderRadius: 5,
    borderColor: '#000000',
    borderStyle: 'solid',
  },
});

export default CreateUser;