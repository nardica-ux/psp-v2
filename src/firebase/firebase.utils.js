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
    const type_id = typeId(collectionKey);
    function typeId(key) {
      switch (key) {
        default:
          break;
        case "meetings":
          return "meeting_id";
        case "users":
          return "user_id";
        case "evaluations":
          return "evaluation_id";
        case "meeting_comments":
          return "comment_id";
      }
    }
    meetingsSnap.forEach((doc) => {
      if (doc.exists) list.push({ ...doc.data(), [type_id]: doc.id });
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

export const updateMeetingFire = async (meeting) => {
  try {
    const { author, body, platform, goal, meeting_id, defineEvent } = meeting;
    const meetingRef = firestore.collection("meetings").doc(meeting_id);
    if (author) await meetingRef.update({ author });
    if (platform) await meetingRef.update({ platform });
    if (goal) await meetingRef.update({ goal });
    if (body) await meetingRef.update({ body });
    if (defineEvent) {
      let getMeeting = await meetingRef.get();
      let new_past = `${defineEvent.date} at ${defineEvent.time} ${defineEvent.zone}`;
      let meetingData = getMeeting.data();
      if (!meetingData.past_events) meetingData.past_events = [];
      await meetingRef.update({
        past_events: [...meetingData.past_events, new_past],
      });
    }
    const updatedEl = await meetingRef.get();
    const elWithId = { ...updatedEl.data(), meeting_id };
    return elWithId;
  } catch (err) {
    return err;
  }
};
export const createMeetingFire = async (payload) => {
  if (!payload) return;

  const meetingRef = firestore.collection("meetings").doc();
  const { author, goal, summary, platform, user_id } = payload;
  const createdAt = new Date().toString();
  const meeting_id = meetingRef.id;
  try {
    await meetingRef.set({
      meeting_id,
      user_id,
      author,
      goal,
      summary,
      createdAt,
      platform,
    });
    let meetingData = meetingRef.get();
    console.log(meetingData.data());
    return meetingData.data();
  } catch (err) {
    console.log("error creating meeting ", err.message);
  }
};

export const createUserProfile = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { email, uid, displayName } = user;
    if (displayName === undefined) displayName = additionalData.displayName;
    const createdAt = new Date().toString();
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
