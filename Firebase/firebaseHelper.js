import { database } from "./firebaseSetup";
import { collection, getDoc, addDoc, getDocs, orderBy, query, deleteDoc, doc, updateDoc,setDoc} from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';

// Function to add a new job application to the database
export const addJobApplication = async (uid,companyName, positionName, preferenceScore, status, date) => {
    try {
      const applicationDate = Timestamp.fromDate(new Date(date));
      await addDoc(collection(database,'users',uid,'jobApplicationRecords'), {
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
export const fetchJobApplications = async (uid) => {
    try {
      const q = query(collection(database,'users',uid,'jobApplicationRecords'), orderBy('date', 'desc'));
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
  export const deleteJobApplication = async (uid,id) => {
    try {
      await deleteDoc(doc(database,'users',uid,'jobApplicationRecords', id));
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

// Function to update a job application in the database
export const updateJobApplication = async (uid,id, companyName, positionName, preferenceScore, status, date) => {
  try {
    const applicationDate = Timestamp.fromDate(new Date(date));
    await updateDoc(doc(database,'users',uid,'jobApplicationRecords', id), {
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
export const addUser = async (userEmail,uid) => {
  
    const name='default name';
    const profilePicture=null;
    let numJobsSaved=0;
    let numJobsApplied=0;
    let numJobsInterviewed=0;
    let numJobsOffered=0;
    let numJobsRejected=0;
    //badges earned and achievements should also be collections 
    try {   
      await setDoc(doc(database, 'users',uid), {
        // we use setDoc instead of addDoc because we want to specify the document id
        // it should be the same as the auth uid of the same user
        name,
        userEmail,
        profilePicture,
        numJobsSaved,
        numJobsApplied,
        numJobsInterviewed,
        numJobsOffered,
        numJobsRejected,
      });
      console.log("User successfully added!, uid: ",uid);
  } catch (error) {
    console.error("Error adding the user: ", error);
  }
};


export const fetchUser = async (uid) => {
  try {
    // Create a reference to the user document with the provided uid
    const userRef = doc(database, 'users', uid);

    // Fetch the data for the user document
    const querySnapshot = await getDoc(userRef); // Use getDoc for a single document

    // Check if the document exists
    if (querySnapshot.exists) {
      return querySnapshot.data(); // Return the user data
    } else {
      console.warn("User with UID", uid, "not found");
      return null; // Or handle the case where the user is not found
    }
  } catch (error) {
    console.error("Error fetching user: ", error);
  }
};