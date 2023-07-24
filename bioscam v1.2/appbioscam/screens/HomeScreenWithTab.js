import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './TabsScreens/HomeScreen';
import MainScreen from './TabsScreens/ScanScreen';
import Settings from './TabsScreens/SettingsScreen'; // Archivo de pantalla
import About from './TabsScreens/AboutScreen'; //Archivo de pantalla

const Tab = createBottomTabNavigator();

function HomeScreenWithTab() {
  return (
    <Tab.Navigator
    initialRouteName="Home"
    screenOptions={({ route }) => ({
      tabBarActiveTintColor: '#F0F0F0', // Cambia el color del ícono/texto de la pestaña activa
      tabBarInactiveTintColor: '#F0F0F0', // Cambia el color del ícono/texto de las pestañas inactivas
      tabBarActiveBackgroundColor: '#676B6C', // Cambia el color de fondo de la pestaña activa
      tabBarInactiveBackgroundColor: '#7E8182',
      headerTitleStyle: {
        color: '#0D819D',
      },
      headerStyle: {
        backgroundColor: 'rgb(8,62,76)'
      },
    })}
  >
        <Tab.Screen 
          name="Home" 
          component={Home} 
          options={{
            title: 'Menu', 
            headerShown: false, 
            headerStyle: {
              backgroundColor: 'rgb(8,62,76)',
              height: 80,
            },
            headerTintColor: 'rgb(8,62,76)',  
          }}
        />
      <Tab.Screen 
        name="MainScreen" 
        component={MainScreen} 
        options={{
          title: 'Principal', 
          headerShown: false, 
          headerStyle: {
            backgroundColor: 'rgb(8,62,76)',
            height: 80,
          },
          headerTintColor: 'rgb(8,62,76)',  
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Configuraciones',
          headerShown: false,
          headerStyle: {
            backgroundColor: 'rgb(8,62,76)',
            height: 80,
          },
          headerTintColor: 'rgb(8,62,76)',  
        }}
      />
      <Tab.Screen
        name="About"
        component={About}
        options={{
          title: 'Acerca de',
          headerStyle: {
            backgroundColor: 'rgb(8,62,76)',
            height: 80,
          },
          headerTintColor: 'rgb(8,62,76)',  
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeScreenWithTab;
