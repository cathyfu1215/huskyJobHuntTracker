import React from 'react'
import {View, Text, ScrollView} from 'react-native'
import { Avatar } from '@rneui/themed';
import { useState } from 'react';

function Achievements() {
  return (
    <ScrollView>
      <View style={{flex:1,flexDirection:'column',alignItems:'center'}}>
        
        <Avatar
            size={128}
            rounded
            source={{ uri: 'https://randomuser.me/api/portraits/women/29.jpg' }}
            title="Bj"
            containerStyle={{ backgroundColor: 'grey' }}
          >
            <Avatar.Accessory size={23} />
          </Avatar>
        
         <View style={{borderWidth:2,borderColor:'grey',margin:20,padding:10,height:'20%',width:'80%'}}>
         <Text>Data Visualization</Text>
         </View>

         <View style={{borderWidth:2,borderColor:'grey',margin:20,padding:10,height:'20%',width:'80%'}}>
         <Text>Achievement Logs</Text>
         </View>

         <View style={{borderWidth:2,borderColor:'grey',margin:20,padding:10,height:'20%',width:'80%'}}>
         <Text>Badges</Text>
         </View>

         <View style={{borderWidth:2,borderColor:'grey',margin:20,padding:10,height:'20%',width:'80%'}}>
         <Text>Collectibles</Text>
         </View>
          
      </View>
    </ScrollView>
  )
}

export default Achievements
