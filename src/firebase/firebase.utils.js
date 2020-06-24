import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCftkLfgFs5Dg6iNIzYJ13soSfhoYTQDRs",
  authDomain: "psp-groupsurvey.firebaseapp.com",
  databaseURL: "https://psp-groupsurvey.firebaseio.com",
  projectId: "psp-groupsurvey",
  storageBucket: "psp-groupsurvey.appspot.com",
  messagingSenderId: "928168471442",
  appId: "1:928168471442:web:357fcd1ae746e9bde26f4b",
  measurementId: "G-27WTCZXQ3K",
};

export const getBase = async (collectionKey) => {
  try {
    let meetingsSnap = await firestore.collection(collectionKey).get();
    let list = [];
    meetingsSnap.forEach((doc) => {
      if (doc.exists) list.push({ [doc.id]: doc.data() });
    });
    return list;
  } catch (err) {
    console.log(err.message);
  }
};

firebase.initializeApp(config);
export const firestore = firebase.firestore();
export default firebase;
