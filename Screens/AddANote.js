import React from 'react'
import { View, Text } from 'react-native'
import { TextInput } from 'react-native'
import ImageManager from '../Components/ImageManager'
import SaveButton from '../Components/SaveButton'
import CancelButton from '../Components/CancelButton'

function AddANote(props) {

    const handleSaveNote = () => {
        console.log('save note');
    }
    const handleCancelNote = () => {
        props.navigation.goBack();
    }
  return (
    <View>
        <Text style={{margin:10}}>text:</Text>
        <TextInput style={{minHeight:'20%',borderColor:'grey',borderRadius:10,borderWidth:2,margin:10}}/>
        <Text style={{margin:10}}>Add an Image</Text>
        <ImageManager modifyImageURI={null}/>
        <View style={{flexDirection:'row'}}>
        <SaveButton onPress={handleSaveNote}/>
        <CancelButton onPress={handleCancelNote}/>
        </View>
    </View>
  )
}

export default AddANote
