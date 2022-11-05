import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import StartPage from './components/StartPage';


export default function App() {

  const Stack = createNativeStackNavigator();


  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen 
          name="LoginPage" 
          component={LoginPage} 
          options={{title: 'Kiraudu sisään'}}
          />
          <Stack.Screen 
          name="StartPage" 
          component={StartPage} 
          options={{title: 'Tervetuloa Jaskaan'}}
          />
          <Stack.Screen 
          name="MainPage" 
          component={MainPage} 
          options={{title: 'MainPage'}}
          />
      </Stack.Navigator>
    </NavigationContainer>
 
   
  );
}