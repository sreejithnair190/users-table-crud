import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  getDocs,
  deleteDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4oeEDHCbNyEMuNBHlbWu9oxyXgtDgfNI",
  authDomain: "users-table-b49c4.firebaseapp.com",
  projectId: "users-table-b49c4",
  storageBucket: "users-table-b49c4.appspot.com",
  messagingSenderId: "594054656760",
  appId: "1:594054656760:web:7a6e81a3eee2614dc4010d",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();

export const userDocument = async (userData) => {
  const usersCollection = collection(db, "users");
  if (userData.id) {
    const userDocRef = doc(usersCollection, userData.id);
    try {
      await setDoc(userDocRef, userData, { merge: true });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  } else {
    try {
      const docRef = await addDoc(usersCollection, userData);
      userData.id = docRef.id;
      const userDocRef = doc(usersCollection, docRef.id);
      await setDoc(userDocRef, userData);
    } catch (error) {
      console.error("Error creating document: ", error);
    }
  }
};

export const getUsersDocument = async () => {
  try {
    const userCollection = collection(db, "users");
    const userQuerySnapshot = await getDocs(userCollection);

    const usersData = [];
    userQuerySnapshot.forEach((doc) => {
      usersData.push(doc.data());
    });

    return usersData;
  } catch (error) {
    console.error(error);
  }
};

export const deleteUserDocument = async (userId) => {
  const usersCollection = collection(db, "users");
  const userDocRef = doc(usersCollection, userId);

  try {
    await deleteDoc(userDocRef);
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};