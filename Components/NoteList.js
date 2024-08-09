import React from 'react';
import { Text, ScrollView, SafeAreaView, View, StyleSheet } from 'react-native';
import styles from '../styleHelper';
import { Pressable } from 'react-native';
import { Image } from 'react-native';

function NoteList({ data, navigation, route }) {

  function NoteLine({ item }) {
    // item is a note object , data is the list of note objects
    
    const handleDeleteNote = () => {
      console.log('delete note');
    }

    return (
      <View style={styles.itemContainer}>
        <View style={{flexDirection:'row',flex:1}}>
          <View style={{flexDirection:'row', marginRight:20,margin:10}}>
           <Image source={{uri: 'https://1000logos.net/wp-content/uploads/2022/02/Northeastern-Huskies-logo.png' ,width:30,height:30}}/>
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
