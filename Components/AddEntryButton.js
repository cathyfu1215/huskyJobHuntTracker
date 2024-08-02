import React from 'react'
import { View, Text, Pressable } from 'react-native';




/* This button is for either add an entry to activity or diet */

function AddEntryButton(props) {
  function handleAddEntry(){
 
    props.navigation.navigate(props.type);
  }


  return (
    <View>
        <Pressable style={{margin:12}} onPress={handleAddEntry} >
          <Text>{props.name}</Text>
        </Pressable>

    </View>
  )
}

export default AddEntryButton