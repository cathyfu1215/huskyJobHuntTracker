import React from 'react';
import { Text, ScrollView, SafeAreaView, View, StyleSheet } from 'react-native';
import styles from '../styleHelper';
import { Pressable } from 'react-native';
import { Image } from 'react-native';
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../Firebase/firebaseSetup";
import { useEffect, useState } from 'react';

function NoteList({ data, navigation, route }) {

  console.log('data in NoteList', data);
  

  function NoteLine({ item }) {
    // item is a note object , data is the list of note objects
    const reference = ref(storage, item.uri);
    console.log('item.uri', item.uri);
    const [imageURL, setImageURL] = useState("");
    useEffect(() => {
      getDownloadURL(reference)
        .then((url) => {
          setImageURL(url);
        })
        .catch((error) => {
          console.log('error downloading the image',error);
        });
    }, [item.uri]);
    
    const handleDeleteNote = () => {
      console.log('delete note');
    }

    return (
      <View style={styles.itemContainer}>
        <View style={{flexDirection:'row',flex:1}}>
          <View style={{flexDirection:'row', marginRight:20,margin:10}}>
           <Image source={{uri: imageURL?imageURL:'https://1000logos.net/wp-content/uploads/2022/02/Northeastern-Huskies-logo.png' ,width:30,height:30}}/>
           <Text style={{marginLeft:20}}>text: {item.text}</Text>
            
          </View>
          <Pressable style={{marginLeft:20,margin:10}}onPress={handleDeleteNote}>
            <Text>x</Text>
          </Pressable>
          </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        {data.map(item => (
          <NoteLine key={Math.random()} item={item} />))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default NoteList;
