import  firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyCRJxdzuodYh3i3eydNsAE8xFjxSHWdW0w",
  authDomain: "blogtest-14ada.firebaseapp.com",
  projectId: "blogtest-14ada",
  storageBucket: "blogtest-14ada.appspot.com",
  messagingSenderId: "975556708270",
  appId: "1:975556708270:web:1920a6bc25386faae0aa3f",
  measurementId: "G-8P3KEKQ2EM"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  firebase.firestore();
  
  export default firebase