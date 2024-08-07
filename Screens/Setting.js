import React from 'react'
import {View,Text} from 'react-native'
import {Image} from 'react-native'
import { Avatar } from '@rneui/themed';
import PressableButton from '../Components/PressableButton';
import { auth } from '../Firebase/firebaseSetup';
import {signOut} from 'firebase/auth';




function Setting() {
    function handleLogout(){
        signOut(auth).then(() => {
            console.log('user signed out');
          }).catch((error) => {
            console.log('error signing out',error);
          });
    }
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
          
          <PressableButton pressedFunction={handleLogout}><Text style={{fontWeight:'bold',fontSize:30}}>Log out</Text></PressableButton>
          <PressableButton><Text style={{fontWeight:'bold',fontSize:30}}>toggle theme</Text></PressableButton>
          </View>
        </View>
        
      )
}

export default Setting
