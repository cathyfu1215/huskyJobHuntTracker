import React from 'react'
import { View, Text, Pressable } from 'react-native';
import styles from '../styleHelper.js';
import PressableButton from './PressableButton';



/* This button is for either add an entry to activity or diet */

function AddEntryButton(props) {
  function handleAddEntry(){
 
    //console.log('add entry button pressed, props are: ', props);
    props.navigation.navigate(props.type,{isEdit:false, itemSpecial:false});
  }


  return (
    <View>
        <PressableButton pressedFunction={handleAddEntry} >
          <Text style={styles.buttonText}>{props.name}</Text>
        </PressableButton>

    </View>
  )
}

export default AddEntryButton