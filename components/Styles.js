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
    
  allEventsList: {
    display: 'flex',
    flexDirection: 'row',
    padding:10,
    marginTop:5,
    marginBottom:10,
    width: '100%',
    justifyContent:'space-between',
    backgroundColor: '#ffffff',
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  
listText:{ //teksti ruutujen tekstien välit
  display: 'flex',
  padding: 10,
  
},
ScrollView: { // tausta johon tapahtuvat tulevat - iso nelio
  height:600,
  borderWidth: 2,
  borderRadius5: 0,
  borderColor: '#008000',
  padding:5,
  
},
centeredView: { //tapahtumien asettelu
  flex: 0,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 1,
  color:'#008000',
},

modalView: { // lisaa tapahtumasta aukeavan ponnahdus ikkunan speksit
  margin: 10,
  backgroundColor: '#ffffff',
  borderWidth: 2,
  borderColor: '#000000',
  borderRadius: 0,
  padding: 50,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 0,
  marginTop:110,
},


button: {
  margin: 10,
  borderRadius: 0,
  padding: 10,
  elevation: 2,
  marginBottom: 5,
  backgroundColor: '#008000'
},
buttonText: {
  color: "white"
},


textStyle: {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
},
modalText: { //ponnahdus ikkunan teksti
  marginTop:0,
  marginBottom: 5,
  textAlign: 'center',
},

baitWindowText: { // asiakas syöttää tietoa kenttaan
  margin: 10,
  borderRadius: 0,
  padding: 10,
  elevation: 2,
  marginBottom: 5,
  backgroundColor: '#ffffff',
},

heading: {  // yläpalkki sis.auto rekkari
      width: '96%',
      height: 25,
      backgroundColor: '#008000',
      marginTop:0,
      marginBottom:10,
      textAlign:'center',
      fontWeight: 'bold',
      fontSize: 16,
      color: 'white'

}
  
});