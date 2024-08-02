import React from 'react'
import {View,Text} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JobApplicationRecords from './JobApplicationRecords';
import Achievements from './Achievements';
import Setting from './Setting';


const Tab = createBottomTabNavigator();
function Home() {
    return (
        <Tab.Navigator >
      <Tab.Screen 
        name="JobApplicationRecords" 
        component={JobApplicationRecords} 
      />
       <Tab.Screen 
        name="Achievements" 
        component={Achievements} 
      />
      <Tab.Screen 
          name="Setting" 
          component={Setting}
          
      />
    </Tab.Navigator>
      )
}

export default Home
