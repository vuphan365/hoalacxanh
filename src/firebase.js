import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyBjrnBaqfqRyJJmhFpg2iCy5Pxb1nZURK8",
  authDomain: "hoalacxanh-b55b9.firebaseapp.com",
  databaseURL: "https://hoalacxanh-b55b9.firebaseio.com",
  projectId: "hoalacxanh-b55b9",
  storageBucket: "hoalacxanh-b55b9.appspot.com",
  messagingSenderId: "584214746949"
};

export const firebaseApp = firebase.initializeApp(config);

export const storage = firebase.storage();
