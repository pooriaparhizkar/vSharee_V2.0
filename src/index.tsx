import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app' 
import 'firebase/analytics'
  const firebaseConfig = {
    apiKey: "AIzaSyBME7Yqe7AAyfIVW_7KQvx4CovAPL5GAcI",
    authDomain: "vsharee-624a6.firebaseapp.com",
    projectId: "vsharee-624a6",
    storageBucket: "vsharee-624a6.appspot.com",
    messagingSenderId: "335488443689",
    appId: "1:335488443689:web:2c8d9ac23668bde9f0c338",
    measurementId: "G-YZDHNZVENP"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
