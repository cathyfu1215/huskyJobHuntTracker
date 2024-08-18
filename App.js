import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditJobApplication from './Screens/EditJobApplication';
import AddAJobApplication from './Screens/AddAJobApplication';
import JobRecords from './Screens/JobRecords';
import Home from './Screens/Home';
import React, { useEffect, useState, useRef} from 'react';
import JobApplicationDetail from './Screens/JobApplicationDetail';
import Login from './Components/Login';
import Signup from './Components/Signup';
import styles from './styleHelper';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/firebaseSetup'; 
import AddANote from './Screens/AddANote';
import AddATodo from './Screens/AddATodo';
import ForgetPassword from './Components/ForgetPassword';

import Map from './Components/Map';
import LocationManager from './Components/LocationManager';

import EncourageSignUp from './Screens/EncourageSignUp';

import * as Notifications from 'expo-notifications';


const Stack = createNativeStackNavigator();

// Set notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const [user, setUser] = useState(null);
  // Variable to store the notification listener
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //console.log('User is signed in', user);
        setUser(user);
      } else {
        //console.log('User is signed out');
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // UseEffect to set up the notification listener
  // We added two listners: notificationListener and responseListener
  useEffect(() => {
    //registerForPushNotificationsAsync();

    //listener receives a function
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("User has tapped the notification");
      console.log('data in the content',response.notification.request.content.data);
      console.log('url',response.notification.request.content.data.url);
      Linking.openURL(response.notification.request.content.data.url);

      
    });

    return () => {//the clean up function
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const AuthStack = (
    <>
      <Stack.Screen name="EncourageSignUp" component={EncourageSignUp} options={{headerShown:false}} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword}  />
    </>
  );

  const AppStack = (
    <>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="AddAJobApplication" component={AddAJobApplication} />
      <Stack.Screen name="JobApplicationDetail" component={JobApplicationDetail} />
      <Stack.Screen name="EditJobApplication" component={EditJobApplication} />
      <Stack.Screen name="JobRecords" component={JobRecords} />
      <Stack.Screen name="AddANote" component={AddANote} />
      <Stack.Screen name="AddATodo" component={AddATodo} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="Location Info" component={LocationManager} />
    </>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: styles.headerStyle,
          headerTitleStyle: styles.headerTitleStyle,
        }}
      >
        {(user!==null) ? AppStack : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
