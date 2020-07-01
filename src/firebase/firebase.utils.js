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

export const updateCurrentUser = async (user) => {
  const { type, displayName, id, moto, about, lastLogged } = user;
  try {
    const userRef = firestore.collection("users").doc(id);
    if (type) await userRef.update({ type });
    if (displayName) await userRef.update({ displayName });
    if (moto) await userRef.update({ moto });
    if (about) await userRef.update({ about });
    if (lastLogged) await userRef.update({ lastLogged });
    return userRef;
  } catch (err) {
    return false;
  }
};

export const createUserProfile = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { email, uid, displayName } = user;
    if (displayName === undefined) displayName = additionalData.displayName;
    const createdAt = new Date().toLocaleTimeString();
    try {
      await userRef.set({
        id: uid,
        type: "user",
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (err) {
      console.log("error creating user ", err.message);
    }
  }
  return userRef;
};

export const getCurrentUser = () => {
  return new Promise((resove, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resove(userAuth);
    }, reject);
  });
};

firebase.initializeApp(config);
export const firestore = firebase.firestore();
export const auth = firebase.auth();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
