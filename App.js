import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './components/LoginPage';
import MainPage from './components/MainPage';
import StartPage from './components/StartPage';
import AddNewEvent from './components/AddNewEvent';
import { firestone } from './firebase/Config'
import editCar from './components/EditCar';
import Maintenance from './components/Maintenance';


export default function App() {

  const Stack = createNativeStackNavigator();
//const [logged, setLogged] = useState(false);

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
        <Stack.Screen 
          name="LoginPage" 
          component={LoginPage} 
          options={{title: 'Kirjaudu sisään'}}
          />
          <Stack.Screen 
          name="StartPage" 
          component={StartPage} 
          options={{title: 'Tervetuloa Jaskaan'}}
          />
          <Stack.Screen 
          name="MainPage" 
          component={MainPage} 
          options={{title: 'Tapahtumat'}}
          />
          <Stack.Screen 
          name="AddNewEvent" 
          component={AddNewEvent} 
          options={{title: 'Luo uusi tapahtuma'}}
          />
          <Stack.Screen 
          name="editCar" 
          component={editCar} 
          options={{title: 'Auton Tiedot'}}
          />
          <Stack.Screen 
          name="maintenance" 
          component={Maintenance} 
          options={{title: 'Muokkaa autoa'}}
          />
          

      </Stack.Navigator>
    </NavigationContainer>
 
 
  );
}