import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditJobApplication from './Screens/EditJobApplication';
import AddAJobApplication from './Screens/AddAJobApplication';
import JobRecords from './Screens/JobRecords';
import Home from './Screens/Home';
import React, { useEffect, useState } from 'react';
import JobApplicationDetail from './Screens/JobApplicationDetail';
import Login from './Components/Login';
import Signup from './Components/Signup';
import styles from './styleHelper';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/firebaseSetup'; 
import AddANote from './Screens/AddANote';
import ForgetPassword from './Components/ForgetPassword';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

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

  const AuthStack = (
    <>
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
