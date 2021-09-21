import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const config = {
    apiKey: "AIzaSyD8lloCg723Oc5ZQDizo3qTw7b17vk7AG4",
    authDomain: "crwn-db-b21df.firebaseapp.com",
    projectId: "crwn-db-b21df",
    storageBucket: "crwn-db-b21df.appspot.com",
    messagingSenderId: "655201804193",
    appId: "1:655201804193:web:e995c2a72ee2ac400ab5e0",
    measurementId: "G-YVF2VLWF0W"
  };

  export const createUserProfileDocument = async( userAuth,additionalData) => {
      if(!userAuth) return;
      const userRef = firestore.doc(`users/${userAuth.uid}`);
      const snapShot = await userRef.get();
      if(!snapShot.exists) {
          const { displayName, email } = userAuth;
          const createdAt = new Date();

          try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
          } catch(err){
            console.log(err.message, 'error creating user');
          }
        }
        return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;