import React, { useEffect } from 'react'
import {View, Text, ScrollView} from 'react-native'
import { Avatar } from '@rneui/themed';
import { useState } from 'react';
import { auth } from '../Firebase/firebaseSetup'; 
import { fetchUser } from '../Firebase/firebaseHelper';

function Achievements() {
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const user = await fetchUser(auth.currentUser.uid); // Call fetchUser
      setUser(user);
    } catch (error) {
      console.error("Error fetching current user: ", error);
    }
  };

  useEffect(() => {
    getUser();
  } ,[]);

  return (
    <ScrollView>
      <View style={{flex:1,flexDirection:'column',alignItems:'center'}}>
      <View style={{flex:1 ,flexDirection:'row',alignItems: 'center',justifyContent:'center'}}>
      <View style={{flex:3, marginTop:20, marginRight:10,marginLeft:20}}>
        <Avatar
            size={130}
            rounded
            source={{ uri: 'https://1000logos.net/wp-content/uploads/2022/02/Northeastern-Huskies-logo.png' }}
            title="husky"
            containerStyle={{ backgroundColor: 'grey' }}
          >
            <Avatar.Accessory size={23} />
          </Avatar>
          </View>
      <View style={{flex:2,flexDirection:'column',marginTop:20, marginLeft:-50}}>
      <Text>{user.name}</Text>
      <Text>{auth.currentUser.email}</Text>
      
      </View>
      </View>

         <View style={{borderWidth:2,borderColor:'grey',margin:20,padding:10,height:'30%',width:'80%'}}>
         <Text>Number of Jobs Saved: {user.numJobsSaved}</Text>
         <Text>Number of Jobs Applied: {user.numJobsApplied}</Text>
         <Text>Number of Jobs Interviewed: {user.numJobsInterviewed}</Text>
         <Text>Number of Jobs Offered: {user.numJobsOffered}</Text>
         <Text>Number of Jobs Rejected: {user.numJobsRejected}</Text>
         </View>

         {/* <View style={{borderWidth:2,borderColor:'grey',margin:20,padding:10,height:'20%',width:'80%'}}>
         <Text>Achievement Logs</Text>
         </View> */}

         <View style={{borderWidth:2,borderColor:'grey',margin:20,padding:10,height:'30%',width:'80%'}}>
         <Text>Badges</Text>
         </View>

         {/* <View style={{borderWidth:2,borderColor:'grey',margin:20,padding:10,height:'20%',width:'80%'}}>
         <Text>Collectibles</Text>
         </View> */}
          
      </View>
    </ScrollView>
  )
}

export default Achievements
