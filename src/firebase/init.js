import firebase from 'firebase'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyADnGvtd9L-0UP6aFlsHBT6l6QAHDnZHww",
    authDomain: "open-borders.firebaseapp.com",
    databaseURL: "https://open-borders.firebaseio.com",
    projectId: "open-borders",
    storageBucket: "open-borders.appspot.com",
    messagingSenderId: "124336946979"
};
const firebaseApp = firebase.initializeApp(config);

export default firebaseApp.firestore()