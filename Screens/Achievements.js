import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, Image } from 'react-native';
import { Avatar, Badge } from '@rneui/themed';
import { auth } from '../Firebase/firebaseSetup'; 
import { fetchUser } from '../Firebase/firebaseHelper';
import QuickChart from 'quickchart-js';

function Achievements() {
  const [user, setUser] = useState({});
  const [chartUrl, setChartUrl] = useState('');

  const getUser = async () => {
    try {
      const user = await fetchUser(auth.currentUser.uid); // Call fetchUser
      setUser(user);
    } catch (error) {
      console.error("Error fetching current user: ", error);
    }
  };

  useEffect(() => {
    getUser();

    const chart = new QuickChart();
    chart.setWidth(500);
    chart.setHeight(300);
    chart.setVersion('2.9.4');
    chart.setConfig({
      type: 'pie',
      data: {
        labels: ['Applied', 'Interviewed', 'Offered', 'Rejected'],
        datasets: [{ data: [100, 20, 5, 15] }],
      },
    });

    setChartUrl(chart.getUrl());
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flex: 3, marginTop: 20, marginRight: 10, marginLeft: 20 }}>
              <Avatar
                size={130}
                rounded
                source={{ uri: 'https://1000logos.net/wp-content/uploads/2022/02/Northeastern-Huskies-logo.png' }}
                title="husky"
                containerStyle={{ backgroundColor: 'grey' }}
              />
            </View>
            <View style={{ flex: 2, flexDirection: 'column', marginTop: 20, marginLeft: -50 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{auth.currentUser.displayName || 'default name'}</Text>
              <Text style={{ fontSize: 15 }}>{auth.currentUser.email}</Text>
            </View>
          </View>

          <View style={{ borderWidth: 2, borderColor: 'grey', margin: 20, padding: 10, width: '90%', flex: 1 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 17, margin: 5 }}>User Statistics</Text>
            <Text>Number of Jobs Saved: {user.numJobsSaved}</Text>
            <Text>Number of Jobs Applied: {user.numJobsApplied}</Text>
            <Text>Number of Jobs Interviewed: {user.numJobsInterviewed}</Text>
            <Text>Number of Jobs Offered: {user.numJobsOffered}</Text>
            <Text>Number of Jobs Rejected: {user.numJobsRejected}</Text>
          </View>

          <View style={{ borderWidth: 2, borderColor: 'grey', margin: 20, padding: 10, width: '90%', flex: 1 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 17, margin: 5 }}>Badges</Text>
            <View>
              <Badge textStyle={{ fontWeight: 'bold' }} value="Prime User" status="success" />
              <Badge textStyle={{ fontWeight: 'bold' }} value="Applied for 100 jobs" status="error" />
              <Badge textStyle={{ fontWeight: 'bold' }} value="Interviewed for 50 jobs" status="success" />
              <Badge textStyle={{ fontWeight: 'bold' }} value="Been using this app for 100 days" status="primary" />
              <Badge textStyle={{ fontWeight: 'bold' }} value="Super Administrator" status="warning" />
            </View>
          </View>

          <View style={{ borderWidth: 2, borderColor: 'grey', margin: 20, padding: 10, width: '90%' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 17, margin: 5 }}>Collectables</Text>
            <View style={{ flexDirection: 'row', alignContent: 'space-evenly' }}>
              <Avatar
                size={60}
                rounded
                source={{ uri: 'https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo-500x281.jpg' }}
                title="apple"
                containerStyle={{ backgroundColor: 'grey' }}
              />
              <Avatar
                size={60}
                rounded
                source={{ uri: 'https://1000logos.net/wp-content/uploads/2016/10/Batman-Logo-2011-500x281.png' }}
                title="batman"
                containerStyle={{ backgroundColor: 'grey' }}
              />
              <Avatar
                size={60}
                rounded
                source={{ uri: 'https://1000logos.net/wp-content/uploads/2018/08/Hogwarts-Logo-500x281.jpg' }}
                title="wizard"
                containerStyle={{ backgroundColor: 'grey' }}
              />
            </View>
          </View>

          {/* Display the pie chart */}
          {chartUrl ? (
            <Image
              source={{ uri: chartUrl }}
              style={{ width: 500, height: 300 }}
            />
          ) : (
            <Text>Loading chart...</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Achievements;
