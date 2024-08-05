import React from 'react'
import { View, Text, Pressable } from 'react-native'
import AddAJobApplication from './AddAJobApplication.js';
import styles from '../styleHelper.js';
import PressableButton from '../Components/PressableButton.js';
import { useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { Alert } from 'react-native';
//import { deleteFromDB } from '../Firebase/fireStoreHelper.js';


function EditJobApplication(props) {

    console.log('props in EditJobApplication', props);
    console.log('in the route.params', props.route.params.data);
    function deleteHandler() {
       
          Alert.alert(
            // Title
            'Important',
            // Message
            'Are you sure you want to delete this entry?',
            [
              // Array of buttons
              {text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'YES', onPress: () => {
                //deleteFromDB(props.route.params.data.id, 'jobRecords');
                console.log('Delete Pressed', props.route.params.data.id, 'to be deleted');
                props.navigation.goBack();}},
            ]
          );
          
        }
      
      useEffect(() => {
        props.navigation.setOptions({
          headerRight: () => {
            return (
              <PressableButton pressedFunction={deleteHandler} >
                <Feather name="trash-2" size={24} color="black" />
              </PressableButton>
            );
          },
        });
      }, []);
      

     <AddAJobApplication navigation={props.navigation} route={props.route} />
     
     
     
    }



export default EditJobApplication
