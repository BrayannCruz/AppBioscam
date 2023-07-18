import React, { useState } from 'react';
import { View, Text, TouchableOpacity,TextInput, Button, Alert, StyleSheet,Dimensions} from 'react-native';
import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth';
import {initializeApp} from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function LoginEmail(){
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigation=useNavigation();
  
    const app=initializeApp(firebaseConfig);
    const auth=getAuth(app);
  
    const handleCreateAccount=()=>{
      createUserWithEmailAndPassword(auth,email,password)
      .then((userCredencial)=>{
          console.log("Cuenta Creada")
          const user=userCredencial.user;
          console.log(user);
      })
      .catch(error=>{
          console.log(error)
          Alert.alert(error.message)
      })
    }
  
    const handleSignIn=()=>{
      signInWithEmailAndPassword(auth,email,password)
      .then((userCredencial)=>{
          console.log("Bienvenido")
          const user=userCredencial.user;
          console.log(user);
          navigation.navigate('Home')
      })
      .catch(error=>{
          console.log(error)
          Alert.alert(error.message)
      })
    }
    return(
        <View>
            <View style={styles.input}>
                <TextInput onChangeText={(text)=>setEmail(text)} style={styles.input} placeholder='E-mail'/>
            </View>
            <View  style={styles.input}>
                <TextInput onChangeText={(text)=>setPassword(text)} style={styles.input} placeholder='Contraseña'/>
            </View>
            <View>
            <TouchableOpacity onPress={handleSignIn} style={[styles.button, {backgroundColor:'#000bbb'}]}>
                <Text style={{fontSize:17, fontWeight:'400', color:'white'}}>Ingresar</Text>
            </TouchableOpacity>
            </View>
            <View>
            <TouchableOpacity onPress={handleCreateAccount} style={[styles.button, {backgroundColor:'#000bbb'}]}>
                <Text style={{fontSize:17, fontWeight:'400', color:'white'}}>Registrarse</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex:1,
      justifyContent: 'center',
      borderTopWidth:50,
      borderTopColor:'#0E7348',
      alignItems:'center',
      borderStyle:'solid'
    },
    title:{
        backgroundColor:"#33AE7A",
        borderRadius:200,
        borderColor:'#fff',
        color:'#fff',
        width:200,
        height:60,
        justifyContent:'center',
        marginBottom:180,
        top:80,
        position:'absolute'
    },
    input:{
        backgroundColor:'#fff',
        borderRadius:8,
        marginBottom:10,
        borderColor:'#000',
        borderStyle:'solid',
        height:40,

    }
});
export default LoginEmail;