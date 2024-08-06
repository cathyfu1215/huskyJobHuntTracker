import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import SaveButton from '../Components/SaveButton';
import CancelButton from '../Components/CancelButton';
import { addJobApplication } from '../Firebase/firebaseHelper';
import styleHelper from '../styleHelper';
import { Rating } from 'react-native-ratings';
import  styles  from '../styleHelper';

const AddAJobApplication = ({ navigation,route,type }) => {

  console.log('type of this screen',type);
  const itemEditble = ((!type)||type==='edit')?true:false;
  console.log('itemEditble',itemEditble);

  console.log('route.params', route.params);
  const [companyName, setCompanyName] = useState(route.params?route.params.data.companyName:"");
  const [positionName, setPositionName] = useState(route.params?route.params.data.positionName:"");
  const [preferenceScore, setPreferenceScore] = useState(route.params?route.params.data.preferenceScore:5);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(route.params?route.params.data.status:"In Progress");
  const [items, setItems] = useState([
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Applied', value: 'Applied' },
    { label: 'Interviewing', value: 'Interviewing' },
    { label: 'Interviewed', value: 'Interviewed' },
    { label: 'Offer', value: 'Offer' },
    { label: 'Offer Accepted', value: 'Offer Accepted' },
    { label: 'Rejected', value: 'Rejected' }
  ]);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  function ratingCompleted(rating) {
    console.log("Rating is: " + rating);
    setPreferenceScore(rating);
  }

  const handleSave = async () => {
    if (companyName && positionName && preferenceScore && status && date) {
      navigation.goBack();
      try {

        // if the type is edit, then we need to update the existing record
        if(type && (type==='edit')){
          console.log('updating the record');
          await updateJobApplication(companyName, positionName, preferenceScore, status, date, route.params.data.id);
          return;
        }
        await addJobApplication(companyName, positionName, preferenceScore, status, date);
      } catch (error) {
        console.error("Error adding document: ", error);
      }
      
    } else {
      Alert.alert('Error', 'Please fill in all required fields');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Text style={styles.addEntryText}>Company *</Text>
          <TextInput
            style={styleHelper.textInput}
            placeholder="Enter company name"
            value={companyName}
            onChangeText={setCompanyName}
            editable={itemEditble}
          />

          <Text style={styles.addEntryText}>Position *</Text>
          <TextInput
            style={styleHelper.textInput}
            placeholder="Enter position name"
            value={positionName}
            onChangeText={setPositionName}
            editable={itemEditble}
          />

          <Text style={styles.addEntryText}>Preference Score *</Text>
          <Rating
            type='heart'
            ratingCount={10}
            imageSize={30}
            showRating
            onFinishRating={ratingCompleted}
            readonly={!itemEditble}
          />

          <Text style={styles.addEntryText}>Application Status *</Text>
          <View style={{ margin: 5 }}>
            <DropDownPicker
              open={open}
              value={status}
              items={items}
              setOpen={setOpen}
              setValue={setStatus}
              setItems={setItems}
              dropDownDirection="TOP"
              disabled={!itemEditble}
            />
          </View>

          <Text style={styles.addEntryText}>Date of Last Update *</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styleHelper.textInput}>
            <Text style={styles.dateText}>
              {date ? date.toDateString() : ''}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date || new Date()}
              mode="date"
              display="inline"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (event.type !== 'dismissed') {
                  setDate(selectedDate);
                }
              }}
              disabled={!itemEditble}
            />
          )}
          {itemEditble && <View style={styleHelper.saveCancelContainer}>
            <SaveButton onPress={handleSave} />
            <CancelButton onPress={() => navigation.goBack()} />
          </View>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};



export default AddAJobApplication;
