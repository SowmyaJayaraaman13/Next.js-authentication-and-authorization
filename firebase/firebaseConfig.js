import firebase from "firebase/app";
import "firebase/firestore"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBC8tpOogDxz8JgPPJV8lQPSOj1vIlbja8",
  authDomain: "spike3-next-auth-demo-cc0f7.firebaseapp.com",
  projectId: "spike3-next-auth-demo-cc0f7",
  storageBucket: "spike3-next-auth-demo-cc0f7.appspot.com",
  messagingSenderId: "108342455663",
  appId: "1:108342455663:web:9eb813257a9669ca6f0c9a"
};


  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    // const db = firebase.firestore()
    firebase.firestore().settings({
      ignoreUndefinedProperties: true
    })
  }

  const db = firebase.firestore()


export { db }


// export const app = firebase.initializeApp(firebaseConfig)



