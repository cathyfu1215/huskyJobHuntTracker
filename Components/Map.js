/**
 * This file is for loading an interactive map
 */
import React from 'react';
import { View, StyleSheet, Pressable, Text} from 'react-native';
import MapView, {Marker}from 'react-native-maps';
import { useState } from 'react';
import { useNavigation} from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const Map = () => {
  const[selectedLocation, setSelectedLocation] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  };

  const handleSaveLocation = () => {
    if (selectedLocation) {
      if (route.params.isHomeLocation) {
        navigation.navigate('Location Info', { homeLocation: selectedLocation, isHomeLocation: true, jobApplicationRecordId: route.params.jobApplicationRecordId});
    } else {
        navigation.navigate('Location Info', { location: selectedLocation, jobApplicationRecordId: route.params.jobApplicationRecordId });
    }
    // navigation.navigate('Location Info', { location: selectedLocation, jobApplicationRecordId: route.params.jobApplicationRecordId });
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 49.2806135,
          longitude: -123.1159178,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={handleMapPress}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} />
        )}
      </MapView>
      <Pressable onPress={handleSaveLocation} style={
            selectedLocation? styles.button: styles.disabledButton} disabled={!selectedLocation}>
            <Text style={styles.text}>{route.params.isHomeLocation ? "Save Home Mark" : "Save Company Mark"}</Text>
        </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
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
});

export default Map;