import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './HomeScreen';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const navigation = useNavigation();
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
  
    const handleSignInSubmit = () => {
      signInWithEmailAndPassword(auth, email.trim(), password)
        .then((userCredential) => {
          console.log('Bienvenido');
          const user = userCredential.user;
          console.log(user);
          navigation.navigate('Home');
        })
        .catch((error) => {
          console.log(error);
          Alert.alert('Error', error.message);
        });
    };

    const handePassRecover=()=>{

    }

  useEffect(() => {
    const handleAlertClose = () => {
      setShowAlert(false);
      setEmail('');
      setPassword('');
      
    };

    if (showAlert) {
      Alert.alert('Bienvenido', [
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
            <Text style={{fontSize:25,marginVertical:20, fontWeight:'bold', textAlign:'center'}}>Iniciar Sesion en Bioscam</Text>
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
      <View>
            <Text style={{fontSize:16, paddingRight:20, fontWeight:'400'}}>¿Olvido su contraseña?
                <TouchableOpacity onPress={''} style={{alignItems:'flex-start'}}>
                    <Text style={{fontSize:16, paddingLeft:10, fontWeight:'500', color:'#E02B2B'}}>Recuperar</Text>
                </TouchableOpacity>
            </Text>
        </View>
      <View style={{left:220, top:10}}>
        <TouchableOpacity onPress={handleSignInSubmit} style={[styles.button]}>
          <Text style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>Ingresar</Text>
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

export default SignIn;