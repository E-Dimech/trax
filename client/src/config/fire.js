import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC-ZfR1rr3xEESMkDnz_AoqwXyyEh4111s",
  authDomain: "trax-57508.firebaseapp.com",
  databaseURL: "https://trax-57508.firebaseio.com",
  projectId: "trax-57508",
  storageBucket: "trax-57508.appspot.com",
  messagingSenderId: "766748523509",
  appId: "1:766748523509:web:b2992cf1b654b4726dbebc",
  measurementId: "G-4956C08L3T",
};
const fire = firebase.initializeApp(firebaseConfig);
export default fire;
