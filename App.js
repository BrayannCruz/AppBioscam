import {ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import Home from './screens/HomeScreen';
import CreateUser from './screens/CreateUserScreen';
import { useEffect } from 'react';
import SignIn from './screens/SignInScreen';

const Stack=createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Cargando..." component={LoadingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainLogin" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Registrarse" component={CreateUser} options={{ headerShown: true }} />
        <Stack.Screen name="Ingresar" component={SignIn} options={{ headerShown: true }}/>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
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
