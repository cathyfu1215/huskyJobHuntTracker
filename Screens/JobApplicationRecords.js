import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, Text } from 'react-native';
import ItemsList from '../Components/ItemList.js'
import { fetchJobApplications } from '../Firebase/firebaseHelper';

function JobApplicationRecords(props) {
  const [data, setData] = useState([]);

  const getData = async () => {
    const jobApplications = await fetchJobApplications();
    setData(jobApplications);
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  return (
    <SafeAreaView>
      <ItemsList data={data} navigation={props.navigation} route={props.route} />
    </SafeAreaView>
  );
}

export default JobApplicationRecords;

