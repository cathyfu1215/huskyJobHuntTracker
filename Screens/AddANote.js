import React from 'react'
import { View, Text } from 'react-native'
import { TextInput } from 'react-native'
import ImageManager from '../Components/ImageManager'
import SaveButton from '../Components/SaveButton'
import CancelButton from '../Components/CancelButton'

function AddANote() {
  return (
    <View>
        <Text style={{margin:10}}>text:</Text>
        <TextInput style={{minHeight:'20%',borderColor:'grey',borderRadius:10,borderWidth:2,margin:10}}/>
        <Text style={{margin:10}}>Add an Image</Text>
        <ImageManager modifyImageURI={null}/>
        <View style={{flexDirection:'row'}}>
        <SaveButton onPress={null}/>
        <CancelButton onPress={null}/>
        </View>
    </View>
  )
}

export default AddANote
