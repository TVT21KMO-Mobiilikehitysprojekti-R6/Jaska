import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import StartPage from './components/StartPage';
import AddNewEvent from './components/AddNewEvent';
import { firestone } from './firebase/Config'


export default function App() {

  const Stack = createNativeStackNavigator();
//const [logged, setLogged] = useState(false);

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
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
          <Stack.Screen 
          name="AddNewEvent" 
          component={AddNewEvent} 
          options={{title: 'Luo uusi tapahtuma'}}
          />
      </Stack.Navigator>
    </NavigationContainer>
 
 
  );
}