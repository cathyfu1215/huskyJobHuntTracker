import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import ImageManager from '../Components/ImageManager';
import SaveButton from '../Components/SaveButton';
import CancelButton from '../Components/CancelButton';
import { auth } from '../Firebase/firebaseSetup';
import { ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../Firebase/firebaseSetup';
import { addNote } from '../Firebase/firebaseHelper';

function AddANote(props) {
    const [text, setText] = useState('');
    const [imageURI, setImageURI] = useState(null);

    async function fetchAndUploadImage() {
        if (!imageURI) {
            console.error("Image URI is null or undefined");
            return;
        }

        try {
            const response = await fetch(imageURI);
            const blob = await response.blob();

            const imageName = imageURI.substring(imageURI.lastIndexOf('/') + 1);
            const imageRef = ref(storage, `images/${imageName}`);
            const uploadResult = await uploadBytesResumable(imageRef, blob);
            console.log("Image uploaded successfully: ", uploadResult);

            return uploadResult;
        } catch (error) {
            console.error("Error uploading image: ", error);
        }
    }

    const handleSaveNote = () => {
        console.log('save note');
        // console.log('text', text);
        // console.log('image', imageURI);
        // console.log('uid', auth.currentUser.uid);

        fetchAndUploadImage().then((uploadResult) => {
            if (uploadResult) {
                console.log('uploadResult.metadata.fullPath', uploadResult.metadata.fullPath);
            }
        }).catch((error) => {
            console.error("Error uploading image: ", error);
        });

        // console.log('uid:', auth.currentUser.uid);
        // console.log('jobApplicationRecordId:', props.jobApplicationRecordId);
        // console.log('text:', text);
        // console.log('imageURI:', imageURI);

        addNote(auth.currentUser.uid, props.jobApplicationRecordId, text, uploadResult.metadata.fullPath)
            .then(() => {
                console.log('note added');
                props.navigation.goBack();
            })
            .catch((error) => {
                console.error("Error adding note: ", error);
            });
    };

    const handleCancelNote = () => {
        props.navigation.goBack();
    };

    const modifyImageURI = (newURI) => {
        setImageURI(newURI);
    };

    return (
        <View style={{ flex: 1, alignItems: 'stretch' }}>
            <Text style={{ margin: 10 }}>text:</Text>
            <TextInput
                style={{ minHeight: '20%', borderColor: 'grey', borderRadius: 10, borderWidth: 2, margin: 10, padding: 10 }}
                value={text}
                onChangeText={setText}
            />
            <View style={{ minHeight: '20%', borderColor: 'grey', borderRadius: 10, borderWidth: 2, margin: 10 }}>
                <Text style={{ margin: 10 }}>Add an Image</Text>
                <ImageManager modifyImageURI={modifyImageURI} />
            </View>
            <View style={{ flexDirection: 'row' }}>
                <SaveButton onPress={handleSaveNote} />
                <CancelButton onPress={handleCancelNote} />
            </View>
        </View>
    );
}

export default AddANote;
