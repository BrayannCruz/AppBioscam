import {ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/IndexScreen';
import HomeScreenWithTab from './screens/HomeScreenWithTab'; 
import CreateUser from './screens/CreateUserScreen';
import { useEffect } from 'react';
import RecoveryPassScreen from './screens/RecoveryPassScreen';
import SignIn from './screens/LoginScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import DeleteAccountScreen from './screens/DeleteAccountScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Cargando..." component={LoadingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainLogin" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Registrarse" component={CreateUser} options={{ headerShown: false }} />
        <Stack.Screen name="Ingresar" component={SignIn} options={{ headerShown: false }}/>
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ 
          headerShown: true, 
          headerStyle: {
            backgroundColor: '#84DCC6', // color que quieras
          },
          headerTintColor: '#fff', // color del texto
        }}/>
        <Stack.Screen name="DeleteAccount" component={DeleteAccountScreen} options={{ 
          headerShown: true, 
          headerStyle: {
            backgroundColor: '#84DCC6', // color que quieras
          },
          headerTintColor: '#fff', // color del texto
        }}/>
        <Stack.Screen name="Home" component={HomeScreenWithTab} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function LoadingScreen({navigation}){
  useEffect(()=> {
    const timer=setTimeout(() => {
      if(timer<1000){
      navigation.navigate('MainLogin');
      }else{
        clearTimeout(timer);
      }
    }, 1000);

    return ()=>clearTimeout(timer);
  },[navigation]);

  return(
    <View style={styles.container}>
      <ActivityIndicator size="large"/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#228B22',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});