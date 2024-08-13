import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    appContainer: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button:{
      backgroundColor: 'lightgrey',
      borderRadius: 5,
      alignItems: 'center',
      alignSelf: 'center',
      margin:5,
      padding:5,
      marginRight:10,
    },
    buttonText:{
      color: 'white',
    },
    tabButtonContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginLeft:25,
      marginRight:25,
      marginTop:5,
      marginBottom:5,
    },
    addEntryView: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    itemlistline: {
      flexDirection: 'row',
      padding: 10,
      margin: 10,
      backgroundColor: 'wheat',
      borderRadius: 5,
      textAlign: 'spread',
      fontWeight: 'bold',
      justifyContent: 'flex-start',
      //justifyContent: 'spread',
      alignContent: 'spread',
    },

    /* light and dark theme */
    itemContainer: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'start',
    },
    itemContainerDark: {
      flex: 1,
      backgroundColor: 'darkgrey',
      alignItems: 'center',
      justifyContent: 'start',
    },
    addEntryContainer: {
      flex: 1,
      alignItems: 'left',
      justifyContent: 'start',
      
      alignContent: 'center',
      justifyContent: 'start',
    },
    addEntryContainerDark: {
      flex: 1,
      alignItems: 'left',
      justifyContent: 'start',
     
      alignContent: 'center',
      justifyContent: 'start',
      backgroundColor: 'darkgrey',
    },


    /* end of light and dark theme */


    addEntryText:{
      fontSize: 15,
      color: 'black',
      margin: 10,
    },
    textInput:{
      height: 40,
      borderColor: 'black',
      borderWidth: 1,
      margin: 5,
      borderRadius: 10,
      justifyContent: 'space-between',
      width:'97%',
      padding:5,
    },
    saveCancelContainer:{
      flexDirection: 'row',
      justifyContent: 'center',
      margin: 10,
      width: '100%',
    },
    saveButton:{
      backgroundColor: 'lightblue',
      borderRadius: 10,
      alignItems: 'center',
      alignSelf: 'center',
      margin:30,
      padding:5,
      width: '30%',
      
    },
    cancelButton:{
      backgroundColor: 'lightpink',
      borderRadius: 10,
      alignItems: 'center',
      alignSelf: 'center',
      margin:30,
      padding:5,
      width: '30%',
    },
    cancelButtonText:{
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
    },
    textInputBig:{
      height: 40,
      borderColor: 'black',
      borderWidth: 1,
      margin: 5,
      borderRadius: 10,
      justifyContent: 'space-between',
      width:'97%',
      height: '30%',
    },
    toggleButtonContainer: {
      flexDirection: 'row',
      alignSelf: 'center',
      padding: 5,

    },
    editContainer: {
      flex: 1,
      alignContent: 'center',
      justifyContent: 'start',
    },
    dropdown: {
      backgroundColor: '#fff',
      borderColor: 'black',
    },
    dropdownText: {
      color: 'black',
    },
    dropdownPlaceholder: {
      color: 'black',
    },
    dropdownContainer: {
      backgroundColor: 'white',
    },  
    safeArea: {
      flex: 1,
    },
    scrollViewContent: {
      flexGrow: 1,
      padding: 16,
    },
    container: {
      flex: 1,
    },
    addEntryText: {
      marginBottom: 8,
    },
    dateText: {
      color: '#000',
    },
    locationButton: {
    width: 150, 
    height: 50,
    margin: 10,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, 
    },
    locationButtonText: {
      color: '#FFFFFF', 
      fontSize: 12, 
    },
  });