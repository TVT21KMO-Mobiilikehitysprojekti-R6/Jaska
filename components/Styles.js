import {Platform, StyleSheet} from 'react-native';
import Constants from 'expo-constants';

export default  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
      alignItems: 'center',
      // justifyContent: 'center',
    },
    buttonText: {
      color: "white"
    },
    allEventsList: {
      display: 'flex',
      flexDirection: 'row',
      padding:10,
      marginTop:5,
      marginBottom:10,
      width: '90%',
      backgroundColor: '#fffacd',
      borderColor: '#ff4500',
      borderWidth: 1,
      borderRadius: 20,
      marginLeft: 10,
      marginRight: 10,
    },
listText:{
  display: 'flex',
  padding: 10,
},
ScrollView: {
  height:600,
  borderWidth: 1,
  borderRadius5: 5,
  borderColor: '#ff4500',
  padding:20,

},
centeredView: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 22,
},
modalView: {
  margin: 20,
  backgroundColor: 'white',
  borderRadius: 20,
  padding: 35,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},
button: {
  margin: 10,
  borderRadius: 20,
  padding: 10,
  elevation: 2,
  marginBottom: 5,
  backgroundColor: '#2196F3'
},
textStyle: {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
},
modalText: {
  marginBottom: 15,
  textAlign: 'center',
},
  
});