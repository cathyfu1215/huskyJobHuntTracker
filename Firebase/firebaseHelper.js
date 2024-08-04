import { database } from "./firebaseSetup";
import { collection, addDoc } from 'firebase/firestore';

// Function to add a new job application to the database
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

// Function to get all job applications from the database
export const fetchJobApplications = async () => {
    try {
      const querySnapshot = await getDocs(collection(database, 'jobApplicationRecords'));
      const jobApplications = [];
      querySnapshot.forEach((doc) => {
        jobApplications.push({ id: doc.id, ...doc.data() });
      });
      return jobApplications;
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };