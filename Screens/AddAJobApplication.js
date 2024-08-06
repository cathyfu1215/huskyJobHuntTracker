import React, { useState } from 'react';
import { View, Text, TextInput, Alert, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import SaveButton from '../Components/SaveButton';
import CancelButton from '../Components/CancelButton';
import { addJobApplication, updateJobApplication} from '../Firebase/firebaseHelper';
import styleHelper from '../styleHelper';
import { Rating } from 'react-native-ratings';
import  styles  from '../styleHelper';

const AddAJobApplication = ({ navigation,route }) => {

  console.log('route.params', route.params);
  // Check if it is edit mode.
  const isEditMode = route.params && route.params.data;
  const [companyName, setCompanyName] = useState(isEditMode?route.params.data.companyName:"");
  const [positionName, setPositionName] = useState(isEditMode?route.params.data.positionName:"");
  const [preferenceScore, setPreferenceScore] = useState(isEditMode?route.params.data.preferenceScore:5);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(isEditMode?route.params.data.status:"In Progress");
  const [items, setItems] = useState([
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Applied', value: 'Applied' },
    { label: 'Interviewing', value: 'Interviewing' },
    { label: 'Interviewed', value: 'Interviewed' },
    { label: 'Offer', value: 'Offer' },
    { label: 'Offer Accepted', value: 'Offer Accepted' },
    { label: 'Rejected', value: 'Rejected' }
  ]);
  const [date, setDate] = useState(isEditMode ? route.params.data.date.toDate():new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  function ratingCompleted(rating) {
    console.log("Rating is: " + rating);
    setPreferenceScore(rating);
  }

  const handleSave = async () => {
    if (companyName && positionName && preferenceScore && status && date) {
      navigation.goBack();
      try {
        if (isEditMode) {
          await updateJobApplication(route.params.data.id, companyName, positionName, preferenceScore, status, date);
        } else {
        await addJobApplication(companyName, positionName, preferenceScore, status, date);
      }
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
          />

          <Text style={styles.addEntryText}>Position *</Text>
          <TextInput
            style={styleHelper.textInput}
            placeholder="Enter position name"
            value={positionName}
            onChangeText={setPositionName}
          />

          <Text style={styles.addEntryText}>Preference Score *</Text>
          <Rating
            type='heart'
            ratingCount={10}
            imageSize={30}
            showRating
            onFinishRating={ratingCompleted}
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
            />
          )}
          <View style={styleHelper.saveCancelContainer}>
            <SaveButton onPress={handleSave} />
            <CancelButton onPress={() => navigation.goBack()} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};



export default AddAJobApplication;
