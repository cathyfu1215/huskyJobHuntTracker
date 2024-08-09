import React, { useState, useCallback } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import NoteList from './NoteList';
import { fetchNotes } from '../Firebase/firebaseHelper';
import { auth } from '../Firebase/firebaseSetup';

function Notes(props) {
  //console.log('props in Notes', props); 
  const [notes, setNotes] = useState([]);
  const navigation = useNavigation();

  const getData = async () => {
    try {
      const data = await fetchNotes(auth.currentUser.uid, props.jobApplicationRecordId);
      return data;
    } catch (error) {
      console.error("Error fetching notes: ", error);
      return [];
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchData = async () => {
        const data = await getData();
        if (isActive && data && data.length > 0) {
          setNotes(data);
        }
      };

      fetchData();

      return () => {
        isActive = false;
      };
    }, [props.jobApplicationRecordId])
  );

  const handleAddNote = () => {
    navigation.navigate('AddANote', { jobApplicationRecordId: props.jobApplicationRecordId });
  };

  return (
    <View style={{ margin: 10, borderColor: 'black', borderWidth: 1, minHeight: '20%' }}>
      <Text>Notes</Text>
      <NoteList data={notes} jobApplicationRecordId={props.jobApplicationRecordId} />
      <Button title='Add a Note' style={{ backgroundColor: 'lightblue', margin: 10, borderRadius: 10 }} onPress={handleAddNote} disabled={props.type === 'detail'} />
    </View>
  );
}

export default Notes;
