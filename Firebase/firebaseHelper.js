import { database } from "./firebaseSetup";
import { collection, addDoc } from 'firebase/firestore';

export const addJobApplication = async (companyName, positionName, preferenceScore, status, date) => {
    try {
      await addDoc(collection(database, 'jobApplicationRecords'), {
        companyName,
        positionName,
        preferenceScore,
        status,
        date,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };