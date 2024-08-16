import React from 'react';
import { Text, ScrollView, SafeAreaView, View, StyleSheet } from 'react-native';
import styles from '../styleHelper';
import { Pressable } from 'react-native';
import { Image } from 'react-native';
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../Firebase/firebaseSetup";
import { useEffect, useState } from 'react';
import { deleteNote } from '../Firebase/firebaseHelper';
import { auth } from '../Firebase/firebaseSetup';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import Feather from '@expo/vector-icons/Feather';


function NoteList({ data,jobApplicationRecordId }) {

  //console.log('data in NoteList', data);
  const navigation = useNavigation();
  
  

  function NoteLine({ item }) {
    const [imageURL, setImageURL] = useState("");
    // item is a note object , data is the list of note objects
    if(!item.uri){
      //console.log('no uri in the note',item);
    }
    else{
    const reference = ref(storage, item.uri);
    //console.log('item.uri', item.uri);
    
    useEffect(() => {
      getDownloadURL(reference)
        .then((url) => {
          setImageURL(url);
        })
        .catch((error) => {
          console.log('error downloading the image',error);
        });
    }, [item.uri]);}
    
    const handleDeleteNote = () => {
      //create an alert to confirm the deletion, if yes, delete the note
      Alert.alert(
        'Warning',
        'Are you sure you want to delete this entry?',
        [
          {text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'YES', onPress: () => {
            deleteNote(auth.currentUser.uid,jobApplicationRecordId,item.id);
            console.log('item.id',item.id,'note deleted');
            navigation.popToTop();
          }},
        ]
      );
      
     
      
    }

    return (
      <View style={styles.itemContainer}>
        <View style={{flexDirection:'row',flex:1}}>
          <View style={{flexDirection:'row', marginRight:20,margin:10}}>
           <Image source={{uri: imageURL?imageURL:'https://1000logos.net/wp-content/uploads/2022/02/Northeastern-Huskies-logo.png' ,width:50,height:50}}/>
           <Text style={{marginLeft:20}}>{item.text}</Text>
            
          </View>
          <Pressable style={{marginLeft:20,margin:10}}onPress={handleDeleteNote}>
          <Feather name="trash-2" size={24} color="black" />
          </Pressable>
          </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
        {data.map(item => (
          <NoteLine key={item.id} item={item} />))}
    </View>
  );
}

export default NoteList;
