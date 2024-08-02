import React from 'react'
import {View,Text} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import JobApplicationRecords from './JobApplicationRecords';
import Achievements from './Achievements';
import Setting from './Setting';
import  MyTabButton  from '../Components/MyTabButton';
import  AddEntryButton  from '../Components/AddEntryButton';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';



const Tab = createBottomTabNavigator();
function Home() {
    return (
        <Tab.Navigator >
      <Tab.Screen 
        name="JobApplicationRecords" 
        component={JobApplicationRecords} 
        options={({ navigation, route }) => ({
            tabBarButton: (props) => <MyTabButton {...props} navigation={navigation} name="JobApplicationRecords" logo={<FontAwesome name="list-ul" size={24} color="black" />}/>,
            headerRight:()=> {return  <AddEntryButton type="AddAJobApplication" 
            name={<View style={styles.addEntryView}>
            <Feather name="plus" size={24} color="black" />
            <FontAwesome name="list-ul" size={24} color="black" />
            
          </View>} navigation= {navigation} route={route} />}
           })}
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
