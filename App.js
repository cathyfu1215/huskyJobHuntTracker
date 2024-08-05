import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditJobApplication from './Screens/EditJobApplication';
import AddAJobApplication from './Screens/AddAJobApplication';
import JobApplicationRecords from './Screens/JobApplicationRecords';
import Home from './Screens/Home';
import React from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName='Home'
     screenOptions={{
      tabBarStyle: {
        backgroundColor: 'lightblue', 
      },
      headerStyle: {
        backgroundColor:'lightblue',
      },}}
     >
      <Stack.Screen name="Home" component={Home}
       options={{headerShown: false}}/>

      <Stack.Screen name="AddAJobApplication" component={AddAJobApplication}/>
      <Stack.Screen name="EditJobApplication" component={EditJobApplication} />
      <Stack.Screen name="JobApplicationRecords" component={JobApplicationRecords} />
                                             
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
