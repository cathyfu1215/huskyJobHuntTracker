import React, { useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import SaveButton from '../Components/SaveButton';
import CancelButton from '../Components/CancelButton';
import { addJobApplication } from '../Firebase/firebaseHelper';

const AddAJobApplication = ({ navigation }) => {
  const [companyName, setCompanyName] = useState('');
  const [positionName, setPositionName] = useState('');
  const [preferenceScore, setPreferenceScore] = useState(1);
  const [status, setStatus] = useState('In Progress');
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = async () => {
    if (companyName && positionName && preferenceScore && status && date) {
      await addJobApplication(companyName, positionName, preferenceScore, status, date);
      navigation.goBack();
    } else {
      Alert.alert('Error', 'All fields are required.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text>Company Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter company name"
        value={companyName}
        onChangeText={setCompanyName}
      />

      <Text>Position Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter position name"
        value={positionName}
        onChangeText={setPositionName}
      />

      <Text>Preference Score</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter preference score"
        value={preferenceScore.toString()}
        onChangeText={(text) => setPreferenceScore(Number(text))}
        keyboardType="numeric"
      />

      <Text>Application Status</Text>
      <Picker
        selectedValue={status}
        style={styles.picker}
        onValueChange={(itemValue) => setStatus(itemValue)}
      >
        <Picker.Item label="In Progress" value="In Progress" />
        <Picker.Item label="Applied" value="Applied" />
        <Picker.Item label="Interviewing" value="Interviewing" />
        <Picker.Item label="Interviewed" value="Interviewed" />
        <Picker.Item label="Offer" value="Offer" />
        <Picker.Item label="Offer Accepted" value="Offer Accepted" />
        <Picker.Item label="Rejected" value="Rejected" />
      </Picker>

      <Text>Application Date</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
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
      {/* <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={(event, selectedDate) => setDate(selectedDate || date)}
      /> */}

      <View style={styles.buttonContainer}>
        <SaveButton onPress={handleSave} />
        <CancelButton onPress={() => navigation.goBack()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
  }
});

export default AddAJobApplication;
