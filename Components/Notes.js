import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { Image } from 'react-native'
import { useState } from 'react'
import NoteList from './NoteList'
import { useNavigation } from '@react-navigation/native'

function Notes(props) {

    //design: 
    //one job record could have one notes item
    //one notes item could have mulyiple note items, rendered as a list
    //one note item could have an image and a text

  const [notes, setNotes] = useState([{text:'note1',image:'null'},{text:'note2',image:'null'}]);
  const navigation = useNavigation();

//   const getData = async () => {
//     try{
//     const notes = await fetchNotes(auth.currentUser.uid, props.route.params.data.id);
//     setNotes(notes);}
//     catch (error) {
//       console.error("Error fetching notes: ", error);
//     }
//   };

//   useFocusEffect(
//     useCallback(() => {
//       getData();
//     }, [])
//   );

  const handleAddNote = () => {
    navigation.navigate('AddANote');
  }
  return (
   <View style={{margin:20, borderColor:'black',borderWidth:2,minHeight:'20%'}}>
        <Text>Notes</Text>
    
      <NoteList data={notes} navigation={props.navigation} route={props.route} />
      <Pressable style={{backgroundColor:'lightblue',margin:10, borderRadius:10}} onPress={handleAddNote}>
        <Text style={{alignSelf:'center'}}>Add A Note</Text>
      </Pressable>
    
        
   </View>
  )
}

export default Notes
