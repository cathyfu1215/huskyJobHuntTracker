import { View, Text, Pressable, Image, StyleSheet, Alert} from 'react-native';
import React from 'react';
import { useState, useEffect} from 'react';
import * as Location from 'expo-location';
import {mapsApiKey} from "@env";
import { Dimensions } from 'react-native';
import { useNavigation, useRoute} from '@react-navigation/native';
import { saveJobApplicationLocation } from '../Firebase/firebaseHelper';
import { fetchJobApplicationLocation } from '../Firebase/firebaseHelper';
import { saveHomeLocation } from '../Firebase/firebaseHelper';
import { fetchHomeLocation } from '../Firebase/firebaseHelper';
import { auth } from '../Firebase/firebaseSetup';

const LocationManager = () => {
    // Verify permission.
    const [response, requestPermission] = Location.useForegroundPermissions();
    // State variable for company location
    const [location, setLocation] = useState(null);
    // State variable for home location
    const [homeLocation, setHomeLocation] = useState(null);
    const [mapUrl, setMapUrl] = useState(null);
    const windowWidth = Dimensions.get('window').width;
    const navigation = useNavigation();
    const route = useRoute();
    const [applicationId, setApplicationId] = useState(null);

    const verifyPermission = async () => {
        console.log(response);
        if (response.granted) {
            return true;
        }
        const permissionResponse = await requestPermission();
        return permissionResponse.granted;
      }
    
  const locateUserHandler = async () => {
    try {
        const hasPermission = await verifyPermission();
        if (!hasPermission) {
        Alert.alert("You need to give permission to continue.");
        return;
        }
      const currentPosition = await Location.getCurrentPositionAsync();
      console.log("User's location:", currentPosition);

      setLocation({latitude:currentPosition.coords.latitude, longitude:currentPosition.coords.longitude});
      const url = `https://maps.googleapis.com/maps/api/staticmap?center=${currentPosition.coords.latitude},${currentPosition.coords.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${currentPosition.coords.latitude},${currentPosition.coords.longitude}&key=${mapsApiKey}`;
      setMapUrl(url);
      console.log("Map static URL:", url);
    } catch (err) {
      console.log("Error getting location", err);
    }
  };

  // Function for saving company location.
  const saveLocationHandler = async () => {
     if (location) {
      console.log("Saving comapny location:", location);
      console.log("User ID:", auth.currentUser.uid);
      console.log("Job Application Record ID:", applicationId);   
      await saveJobApplicationLocation(auth.currentUser.uid, applicationId, location);
     } else {
         Alert.alert("No company location data to save.");
     }
 };

 // Function for saving home location.
 const saveHomeLocationHandler = async () => {
  if (location) {
      console.log("Saving home location:", location);
      console.log("User ID:", auth.currentUser.uid);
      console.log("Job Application Record ID:", applicationId); 
      await saveHomeLocation(auth.currentUser.uid, applicationId, location);
  } else {
      Alert.alert("No home location data to save.");
  }
};

  const displayCompanyLocationHandler = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
          const locationData = await fetchJobApplicationLocation(user.uid, route.params.jobApplicationRecordId);
          if (locationData) {
              setLocation(locationData);
              const url = `https://maps.googleapis.com/maps/api/staticmap?center=${locationData.latitude},${locationData.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${locationData.latitude},${locationData.longitude}&key=${mapsApiKey}`;
              setMapUrl(url);
          } else {
             Alert.alert("You need to set the company's location in the edit mode first.");
          }
      } else {
          console.log("User not authenticated");
      }
  } catch (err) {
      console.log("Error fetching user location:", err);
  }
  };

  // Function to display home location.
  const displayHomeLocationHandler = async () => {
    try {
        const user = auth.currentUser;
        if (user) {
            const homeData = await fetchHomeLocation(user.uid, route.params.jobApplicationRecordId);
            if (homeData) {
                setHomeLocation(homeData);
                const url = `https://maps.googleapis.com/maps/api/staticmap?center=${homeData.latitude},${homeData.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:blue%7Clabel:H%7C${homeData.latitude},${homeData.longitude}&key=${mapsApiKey}`;
                setMapUrl(url);
            } else {
                Alert.alert("You need to set your home location in the edit mode first.");
            }
        } else {
            console.log("User not authenticated");
        }
    } catch (err) {
        console.log("Error fetching home location:", err);
    }
};

// Function for displaying both company and home location.
const viewAllLocationsHandler = () => {
  if (location || homeLocation) {
      const markers = [];
      if (location) markers.push(`color:red%7Clabel:Company%7C${location.latitude},${location.longitude}`);
      if (homeLocation) markers.push(`color:blue%7Clabel:Home%7C${homeLocation.latitude},${homeLocation.longitude}`);
      const url = `https://maps.googleapis.com/maps/api/staticmap?size=400x200&maptype=roadmap&markers=${markers.join('&')}&key=${mapsApiKey}`;
      setMapUrl(url);
  } else {
      Alert.alert("You need to set the company and home location in the edit mode first.");
  }
};

// Check if route.params exists and set location state
useEffect(() => {
   setApplicationId(route.params?.jobApplicationRecordId);
   console.log("Received Job Application Record ID:", applicationId);
    if (route.params?.location) {
       const { latitude, longitude } = route.params.location;
       setLocation({ latitude, longitude });
       const url = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${latitude},${longitude}&key=${mapsApiKey}`;
       setMapUrl(url);
       console.log("Map's selected URL:", url);
     }
   }, [route.params]);

   // UseEffect to fetch company and home location
   useEffect(() => {
    const fetchUserLocations = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                const locationData = await fetchJobApplicationLocation(user.uid, route.params.jobApplicationRecordId);
                const homeData = await fetchHomeLocation(user.uid, route.params.jobApplicationRecordId);

                if (locationData || homeData) {
                    setLocation(locationData);
                    setHomeLocation(homeData);

                    const markers = [];
                    if (locationData) markers.push(`color:red%7Clabel:Company%7C${locationData.latitude},${locationData.longitude}`);
                    if (homeData) markers.push(`color:blue%7Clabel:Home%7C${homeData.latitude},${homeData.longitude}`);
                    const url = `https://maps.googleapis.com/maps/api/staticmap?size=400x200&maptype=roadmap&markers=${markers.join('&')}&key=${mapsApiKey}`;
                    setMapUrl(url);
                } else {
                    console.log("No locations found. Please set locations first.");
                }
            } else {
                console.log("User not authenticated");
            }
        } catch (err) {
            console.log("Error fetching locations:", err);
        }
    };
    fetchUserLocations();
}, [route.params]);

//    useEffect(() => {
//      const fetchUserLocation = async () => {
//          try {
//              const user = auth.currentUser;
//              if (user) {
//                  const locationData = await fetchJobApplicationLocation(user.uid, route.params.jobApplicationRecordId);
//                  if (locationData) {
//                      setLocation(locationData);
//                      const url = `https://maps.googleapis.com/maps/api/staticmap?center=${locationData.latitude},${locationData.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${locationData.latitude},${locationData.longitude}&key=${mapsApiKey}`;
//                      setMapUrl(url);
//                  }
//              } else {
//                  console.log("User not authenticated");
//              }
//          } catch (err) {
//              console.log("Error fetching user location:", err);
//          }
//      };
//      fetchUserLocation();
//  }, []);

  const isDetailMode = route.params.type === 'detail';

  return (
    <View style={{margin:10}}>
      {location && <Image source={{ uri: mapUrl }} style={{ width: windowWidth, height: 200}} />}
      <View style={styles.buttonContainer}>
        <Pressable onPress={locateUserHandler} style={styles.button}>
            <Text style={styles.text}>Display Current</Text>
            <Text style={styles.text}>Location</Text>
        </Pressable>
        <Pressable onPress={displayCompanyLocationHandler} style={styles.button}>
            <Text style={styles.text}>Display Company</Text>
            <Text style={styles.text}>Location</Text>
        </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable onPress={displayHomeLocationHandler} style={styles.button}>
              <Text style={styles.text}>Display Home</Text>
              <Text style={styles.text}>Location</Text>
          </Pressable>
          <Pressable onPress={viewAllLocationsHandler} style={styles.button}>
              <Text style={styles.text}>View All</Text>
              <Text style={styles.text}>Locations</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
        <Pressable onPress={() => navigation.navigate('Map', {jobApplicationRecordId: applicationId})} style={[
            styles.button,
            isDetailMode && styles.disabledButton
          ]} disabled={isDetailMode}>
            <Text style={styles.text}>Edit Company</Text>
            <Text style={styles.text}>Location</Text>
        </Pressable>
        <Pressable onPress={saveLocationHandler} style={[
            styles.button,
            isDetailMode && styles.disabledButton
          ]} disabled={isDetailMode}>
            <Text style={styles.text}>Save Company</Text>
            <Text style={styles.text}>Location</Text>
        </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={() => navigation.navigate('Map', {isHomeLocation: true})}
            style={[styles.button,isDetailMode && styles.disabledButton]}
            disabled={isDetailMode}>
              <Text style={styles.text}>Edit Home</Text>
              <Text style={styles.text}>Location</Text>
          </Pressable>
        </View>
        <View style={styles.textView}>
          {isDetailMode && <Text>In this page you can only browse your current and the company's location. You can edit the company's location in edit mode.</Text>}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    button: {
      width: 150, 
      height: 50,
      margin: 10,
      backgroundColor: '#007BFF',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10, 
    },
    disabledButton: {
    width: 150,
    height: 50,
    margin: 10,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
    text: {
      color: '#FFFFFF', 
      fontSize: 12, 
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    textView: {
      margin: 10,
      padding: 10,
      alignItems: 'center',
    }
  });

export default LocationManager;