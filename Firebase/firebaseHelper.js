import { database } from "./firebaseSetup";
import { collection, addDoc, getDocs, orderBy, query, deleteDoc, doc, updateDoc} from 'firebase/firestore';
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

  // Function to delete a job application from the database
  export const deleteJobApplication = async (id) => {
    try {
      await deleteDoc(doc(database, 'jobApplicationRecords', id));
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

// Function to update a job application in the database
export const updateJobApplication = async (id, companyName, positionName, preferenceScore, status, date) => {
  try {
    const applicationDate = Timestamp.fromDate(new Date(date));
    await updateDoc(doc(database, 'jobApplicationRecords', id), {
      companyName,
      positionName,
      preferenceScore,
      status,
      date: applicationDate,
    });
    console.log("Document successfully updated!");
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};



// Function to add a new user to the database
export const addUser = async (userEmail) => {
  
    const name='default name';
    const profilePicture=null;
    let numJobsSaved=0;
    let numJobsApplied=0;
    let numJobsInterviewed=0;
    let numJobsOffered=0;
    let numJobsRejected=0;
    //badges earned and achievements should also be collections 
    try {   
      await addDoc(collection(database, 'users'), {
        name,
        userEmail,
        profilePicture,
        numJobsSaved,
        numJobsApplied,
        numJobsInterviewed,
        numJobsOffered,
        numJobsRejected,
      });
      console.log("User successfully added!");
  } catch (error) {
    console.error("Error adding the user: ", error);
  }
};