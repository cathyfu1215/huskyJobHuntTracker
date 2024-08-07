import { View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import PressableButton from './PressableButton'
import {auth} from '../Firebase/firebaseSetup'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react'
import {addUser} from '../Firebase/firebaseHelper'

function Signup(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function jumpToLogin(){
        props.navigation.replace('Login');
    }

    function handleRegister(){
        console.log('some validation...');
        console.log('registering');
        console.log('auth',auth);

        // check if password and confirm password match
        if(password !== confirmPassword){
            alert('Passwords do not match');
            return;
        }

        // password length should be at least 6
        if(password.length < 6){
            alert('Password should be at least 6 characters');
            return;
        }

        // check if email is in the right format using regular expression
        const emailPattern = /\S+@\S+\.\S+/;
        if(!emailPattern.test(email)){
            alert('Email is not in the right format');
            return;
        }
    
        
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode,errorMessage); // alert the error message to the user
            });

        //add this user to our database: Users collection, give it an id,
        // store email, name, profile picture, etc.
        addUser(email)
        .then(()=>{
            console.log('user added to the database',email);
        })
        .catch((error)=>{
            console.log('error adding user to the database',error);
        });


    }
  return (
    <View>
        <Text>signup</Text>
        <Text>Email Address</Text>
        <TextInput style={{borderWidth: 1, borderColor: 'black',marginTop:10, height:'15%'}}
        onChangeText={(text)=>{setEmail(text)}}
        value={email} />
        <Text>Password</Text>
        <TextInput  style={{borderWidth: 1, borderColor: 'black',marginTop:10,height:'15%'}}
        onChangeText={(text)=>{setPassword(text)}}
        value={password}/>
        <Text>Confirm Password</Text>
        <TextInput  style={{borderWidth: 1, borderColor: 'black',marginTop:10,height:'15%'}}
        onChangeText={(text)=>{setConfirmPassword(text)}}
        value={confirmPassword}
        />
        <PressableButton pressedFunction={handleRegister}><Text>Register</Text></PressableButton>
        <PressableButton pressedFunction={jumpToLogin}><Text>Already Registered? Login</Text></PressableButton>
    </View>
  )
}

export default Signup