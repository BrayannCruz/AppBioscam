import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, Alert, StyleSheet, Dimensions } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import * as WebBrowser from "expo-web-browser";
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './HomeScreen';
import CreateUser from './CreateUserScreen';
import SignIn from './SignInScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

WebBrowser.maybeCompleteAuthSession();

const { width, height } = Dimensions.get('window');


function LoginScreen  () {
    const [userInfo,setUserInfo]=React.useState(null);
    const [request,response,promptAsync]=Google.useAuthRequest({
        androidClientId:"862986853928-2nvkki7n9552lult323k3vmm4v8esttf.apps.googleusercontent.com",
        iosClientId:"862986853928-v9d1o2bkk5e8fp0medkmpjf02rfvqth9.apps.googleusercontent.com",
        webClientId:"862986853928-c69p4mdpt2r0v3f86c6kh29ne81jl78d.apps.googleusercontent.com",
        expoClientId:"862986853928-c69p4mdpt2r0v3f86c6kh29ne81jl78d.apps.googleusercontent.com"

    });
    const [accessToken,setAccessToken]=React.useState();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showInputs, setShowInputs] = useState(false);
  const [auth, setAuth] = useState();
  const [requireRefresh, setRequireRefresh] = useState(false);
  const navigation=useNavigation();
  const app=initializeApp(firebaseConfig);

  const logout = async () => {
    await AuthSession.revokeAsync({
      token: auth.accessToken
    }, {
      revocationEndpoint: "https://oauth2.googleapis.com/revoke"
    });

    setAuth(undefined);
    setUserInfo(undefined);
    await AsyncStorage.removeItem("auth");
  };

  const handleCreateAccount = () => {
    navigation.navigate('Registrarse');
    };


    const handleSignInSubmit = () => {
        navigation.navigate('Ingresar');
      };
    
  
  React.useEffect(()=>{
    handleGoogleSignIn();
  },[response])

  async function handleGoogleSignIn(){
    const user=await AsyncStorage.getItem("@user");
    if(!user){
        if(response?.type==="success"){
            await getUserInfo(response.authentication.accessToken);
        }
        await getUserInfo();
    }else{
        setUserInfo(JSON.parse(user));
    }
};
const getUserInfo=async(token)=>{
    if(!token) return;
    try{
        const response=await fetch(
            "https://www.googleapis.com/userinfo/v2/me",
            {
                headers:{Authorization:`Bearer ${token}`},
            }
        );
        const user=await response.json();
        await AsyncStorage.setItem("@user".JSON.stringify(user));
        setUserInfo(user);
    }catch(error){

    }
};
    
  return (
    <SafeAreaProvider>
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={{color:'#fff', textAlign:'center',fontWeight:'bold', fontSize:40, fontStyle:'italic'}}>BIOSCAM</Text>
            </View>
            <View style={styles.login}>
                <View style={{alignContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:25,marginVertical:20, fontWeight:'bold', textAlign:'center', backgroundColor: '22C59B'}}>Iniciar Sesión en Bioscam</Text>
                </View>
                <View styles={{marginBottom:180}}>
                    <TouchableOpacity onPress={handleSignInSubmit} style={[styles.button,{backgroundColor:'#22C59B'}]} >
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <Ionicons name="person-circle-outline" size={30} color="black" />
                            <Text style={{fontSize:16,fontWeight:'500', paddingLeft:20}}>Iniciar con Correo y Contraseña</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity title={auth ? "Get User Data": "Login"} 
                        onPress={()=>promptAsync()} style={[styles.button,{backgroundColor:'#22C59B'}]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                            <Ionicons name="logo-google" size={30} color="black" />
                            <Text style={{fontSize:16,fontWeight:'500',paddingLeft:60}}>Iniciar con Google</Text>
                        </View>
                    </TouchableOpacity>
                    
                </View>
                <View>
                    <Text style={{fontSize:14, paddingLeft:10, fontWeight:'400'}}>¿Aun no tiene Cuenta?
                        <TouchableOpacity onPress={handleCreateAccount} style={{alignItems:'stretch'}}>
                            <Text style={{fontSize:18, paddingLeft:10, fontWeight:'500', color:'#E02B2B'}}>Registrarse</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </View>
        </View>
    </SafeAreaProvider>
        
            
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
    login: {
        width:400,
        position:'absolute',
        padding:50
    },
    input:{
        backgroundColor:'#fff',
        borderRadius:8,
        marginBottom:10,
        borderColor:'#000',
        borderStyle:'solid',
        height:40,

    },
    button:{
        backgroundColor:'#E7F0EC',
        marginBottom:10,
        height:30,
        borderRadius:5,
        borderColor:'#000000',
        borderStyle:'solid'
    }
  });



export default LoginScreen;