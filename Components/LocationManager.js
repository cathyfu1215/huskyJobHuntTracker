import { View, Text, Pressable, Image, StyleSheet} from 'react-native';
import React from 'react';
import { useState, useEffect} from 'react';
import * as Location from 'expo-location';
import {mapsApiKey} from "@env";
import { Dimensions } from 'react-native';
import { useNavigation, useRoute} from '@react-navigation/native';
import { saveJobApplicationLocation } from '../Firebase/firebaseHelper';
import { fetchJobApplicationLocation } from '../Firebase/firebaseHelper';
import { auth } from '../Firebase/firebaseSetup';

const LocationManager = (props) => {
    // Verify permission.
    const [response, requestPermission] = Location.useForegroundPermissions();
    const [location, setLocation] = useState(null);
    const [mapUrl, setMapUrl] = useState(null);
    const windowWidth = Dimensions.get('window').width;
    const navigation = useNavigation();
    const route = useRoute(); // Access the route object to get params
    // const [applicationId, setApplicationId] = useState(null);
    const applicationId = props.jobApplicationRecordId;

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

  const saveLocationHandler = async () => {
     if (location) {
      console.log("Saving location:", location);
      console.log("User ID:", auth.currentUser.uid);
      console.log("Job Application Record ID:", applicationId);   
      await saveJobApplicationLocation(auth.currentUser.uid, applicationId, location);
     } else {
         Alert.alert("No location data to save.");
     }
 };

// Check if route.params exists and set location state
useEffect(() => {
   console.log("Received Job Application Record ID:", applicationId);
    if (route.params?.location) {
       const { latitude, longitude } = route.params.location;
       setLocation({ latitude, longitude });
       const url = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${latitude},${longitude}&key=${mapsApiKey}`;
       setMapUrl(url);
       console.log("Map's selected URL:", url);
     }
   }, [route.params]);

   useEffect(() => {
     const fetchUserLocation = async () => {
         try {
             const user = auth.currentUser;
             if (user) {
                 const locationData = await fetchJobApplicationLocation(user.uid, applicationId);
                 if (locationData) {
                     setLocation(locationData);
                     const url = `https://maps.googleapis.com/maps/api/staticmap?center=${locationData.latitude},${locationData.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${locationData.latitude},${locationData.longitude}&key=${mapsApiKey}`;
                     setMapUrl(url);
                 }
             } else {
                 console.log("User not authenticated");
             }
         } catch (err) {
             console.log("Error fetching user location:", err);
         }
     };
     fetchUserLocation();
 }, []);

  const isDetailMode = props.type === 'detail';

  return (
    <View style={{margin:10}}>
      {location && <Image source={{ uri: mapUrl }} style={{ width: windowWidth, height: 200}} />}
      <View style={styles.buttonContainer}>
        <Pressable onPress={locateUserHandler} style={styles.button}>
            <Text style={styles.text}>Display Current</Text>
            <Text style={styles.text}>Location</Text>
        </Pressable>
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
    }
  });

export default LocationManager;