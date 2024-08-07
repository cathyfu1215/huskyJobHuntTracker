import { View, Text } from 'react-native'
import React from 'react'
import PressableButton from './PressableButton'
import { TextInput } from 'react-native'
import { useState } from 'react'
import {auth} from '../Firebase/firebaseSetup'
import { signInWithEmailAndPassword } from 'firebase/auth'

function Login(props) {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

    function handleForgetPassword(){
        console.log('forget password, deal with it later');
    }

    function jumpToSignup(){
        props.navigation.replace('Signup');
        // we don't need to put another screen to the stack
    }
    function handleLogin(){
        console.log('login');

        const emailPattern = /\S+@\S+\.\S+/;
        
        if(!emailPattern.test(email)){
            alert('Email is not in the right format');
            return;
        }
    
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log('user signed in',user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode,errorMessage);
            });
    }
  return (
    <View>
        <Text>log in</Text>
        <Text>Email Address</Text>
        <TextInput style={{borderWidth: 1, borderColor: 'black',marginTop:10,height:'15%'}}
        value={email} onChangeText={(text)=>setEmail(text)}/>
        <Text>Password</Text>
        <TextInput  style={{borderWidth: 1, borderColor: 'black',marginTop:10,height:'15%'}}
        value={password} onChangeText={(text)=>setPassword(text)}/>
        <PressableButton pressedFunction={handleLogin}><Text>Log In</Text></PressableButton>
        <PressableButton pressedFunction={handleForgetPassword}><Text>Forget Password?</Text></PressableButton>
        <PressableButton pressedFunction={jumpToSignup}><Text>New User? Create an account</Text></PressableButton>
    </View>
  )
}

export default Login