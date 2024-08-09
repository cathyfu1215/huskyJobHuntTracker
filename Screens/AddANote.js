import React from 'react'
import { View, Text } from 'react-native'
import { TextInput } from 'react-native'
import ImageManager from '../Components/ImageManager'

function AddANote() {
  return (
    <View>
        <Text>text:</Text>
        <TextInput/>
        <Text>Add an Image</Text>
        <ImageManager modifyImageURI={null}/>
    </View>
  )
}

export default AddANote
