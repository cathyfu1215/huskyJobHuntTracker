import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import SaveButton from '../Components/SaveButton';
import CancelButton from '../Components/CancelButton';
import { addJobApplication } from '../Firebase/firebaseHelper';
import styleHelper from '../styleHelper';

const AddAJobApplication = ({ navigation }) => {
  const [companyName, setCompanyName] = useState('');
  const [positionName, setPositionName] = useState('');
  const [preferenceScore, setPreferenceScore] = useState(1);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [items, setItems] = useState([
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Applied', value: 'Applied' },
    { label: 'Interviewing', value: 'Interviewing' },
    { label: 'Interviewed', value: 'Interviewed' },
    { label: 'Offer', value: 'Offer' },
    { label: 'Offer Accepted', value: 'Offer Accepted' },
    { label: 'Rejected', value: 'Rejected' }
  ]);
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = async () => {
    if (companyName && positionName && preferenceScore && status && date) {
      await addJobApplication(companyName, positionName, preferenceScore, status, date);
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Please fill in all required fields');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Company*</Text>
      <TextInput
        style={styleHelper.textInput}
        placeholder="Enter company name"
        value={companyName}
        onChangeText={setCompanyName}
      />

      <Text>Position*</Text>
      <TextInput
        style={styleHelper.textInput}
        placeholder="Enter position name"
        value={positionName}
        onChangeText={setPositionName}
      />

      <Text>Preference Score*</Text>
      <TextInput
        style={styleHelper.textInput}
        placeholder="Enter preference score"
        value={preferenceScore}
        onChangeText={setPreferenceScore}
        keyboardType="numeric"
      />

      <Text>Application Status*</Text>
      <View>
      <DropDownPicker
          open={open}
          value={status}
          items={items}
          setOpen={setOpen}
          setValue={setStatus}
          setItems={setItems}
          placeholder="Select a status"
          style={styleHelper.dropdown}
          textStyle={styleHelper.dropdownText}
          placeholderStyle={styleHelper.dropdownPlaceholder}
          dropDownContainerStyle={styleHelper.dropdownContainer}
      />
       </View>

      <Text>Application Date*</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styleHelper.textInput}>
          <Text style={styles.dateText}>
            {date ? date.toDateString() : ''}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
            <DateTimePicker
              value={date || new Date()} // Show current date if no date selected
              mode="date"
              display="inline"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (event.type !== 'dismissed') { // Ensure date is set only if not dismissed
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default AddAJobApplication;
