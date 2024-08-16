import React, { useState, useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Avatar } from '@rneui/themed';
import PressableButton from '../Components/PressableButton';
import { auth } from '../Firebase/firebaseSetup';
import { signOut, getAuth, updateProfile } from 'firebase/auth';

function Setting() {
  const [name, setName] = useState(auth.currentUser.displayName);
  const [displayName, setDisplayName] = useState(auth.currentUser.displayName);

  useEffect(() => {
    setDisplayName(auth.currentUser.displayName);
  }, [auth.currentUser.displayName]);

  function handleLogout() {
    signOut(auth).then(() => {
      console.log('user signed out');
    }).catch((error) => {
      console.log('error signing out', error);
    });
  }

  function handleChangeName() {
    const user = getAuth();
    updateProfile(auth.currentUser, {
      displayName: name,
    }).then(() => {
      console.log('name changed to: ', name);
      setDisplayName(name); // Update the displayed name immediately
    }).catch((error) => {
      console.log('error changing name: ', error);
    });
  }

  function handleChangeProfilePicture() {
    console.log('will be implemented later');
  }

  return (
    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
      <View style={{ flex: 1, margin: 20, flexDirection: 'row' }}>
        <View style={{ flex: 1, marginRight: 10, marginLeft: 20 }}>
          <Avatar
            size={130}
            rounded
            source={{ uri: auth.currentUser.photoURL || 'https://1000logos.net/wp-content/uploads/2022/02/Northeastern-Huskies-logo.png' }}
            title="husky"
            containerStyle={{ backgroundColor: 'grey' }}
          />
        </View>
        <View style={{ flex: 2, flexDirection: 'column', marginTop: 40, marginLeft: 50 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{displayName || 'default name'}</Text>
          <Text style={{ fontSize: 15 }}>{auth.currentUser.email}</Text>
        </View>
      </View>
      <View style={{ flex: 1, margin: 20, marginTop: -200, alignItems: 'center' }}>
        <TextInput value={name} onChangeText={setName} style={{ borderWidth: 1, borderColor: 'grey', padding: 10, width: '90%', borderRadius: 10 }} />
        <PressableButton pressedFunction={handleChangeName}><Text style={{ fontWeight: 'bold', fontSize: 30 }}>change name</Text></PressableButton>
        <PressableButton pressedFunction={handleChangeProfilePicture}><Text style={{ fontWeight: 'bold', fontSize: 30 }}>change profile picture</Text></PressableButton>
        <Text>* Will be implemented later</Text>
        <PressableButton pressedFunction={handleLogout}><Text style={{ fontWeight: 'bold', fontSize: 30 }}>Log out</Text></PressableButton>
      </View>
    </View>
  );
}

export default Setting;
