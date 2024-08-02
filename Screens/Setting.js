import React from 'react'
import {View,Text} from 'react-native'
import {Image} from 'react-native'
import { Avatar } from '@rneui/themed';
import PressableButton from '../Components/PressableButton';




function Setting() {
    return (
        <View style={{flex:1,flexDirection:'column',alignItems:'center'}}>
          <Text style={{fontWeight:'bold',margin:20}}>Setting</Text>
        <Avatar
          size={128}
          rounded
          icon={{ name: 'adb', type: 'material' }}
          containerStyle={{ backgroundColor: 'lightblue' }}
        >
          </Avatar>
          <View style={{
            alignItems:'flex-end',
            alignContent:'flex-start',
            flexDirection:'column',
            margin:20,
            }}>
          <PressableButton><Text style={{fontWeight:'bold',fontSize:30}}>sign up</Text></PressableButton>
          <PressableButton><Text style={{fontWeight:'bold',fontSize:30}}>Log in</Text></PressableButton>
          <PressableButton><Text style={{fontWeight:'bold',fontSize:30}}>toggle theme</Text></PressableButton>
          </View>
        </View>
        
      )
}

export default Setting
