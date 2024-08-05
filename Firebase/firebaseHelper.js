import { database } from "./firebaseSetup";
import { collection, addDoc, getDocs, orderBy, query} from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';

// Function to add a new job application to the database
export const addJobApplication = async (companyName, positionName, preferenceScore, status, date) => {
    try {
      const applicationDate = Timestamp.fromDate(new Date(date));
      await addDoc(collection(database, 'jobApplicationRecords'), {
        companyName,
        positionName,
        preferenceScore,
        status,
        date: applicationDate,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

// Function to get all job applications from the database
export const fetchJobApplications = async () => {
    try {
      const q = query(collection(database, 'jobApplicationRecords'), orderBy('date', 'desc'));
      const querySnapshot = await getDocs(q);
      const jobApplications = [];
      querySnapshot.forEach((doc) => {
        jobApplications.push({ id: doc.id, ...doc.data() });
      });
      return jobApplications;
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };
