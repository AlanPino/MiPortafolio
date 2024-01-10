import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js'

const firebaseConfig = {
    apiKey: "AIzaSyDue0ao4uWf7FFdJkEHsTrXE8Dwrpoo1AY",
    authDomain: "alanpinoportafolio.firebaseapp.com",
    projectId: "alanpinoportafolio",
    storageBucket: "alanpinoportafolio.appspot.com",
    messagingSenderId: "177795181282",
    appId: "1:177795181282:web:64fb5a67116ba164224cbb"
};

const app = initializeApp(firebaseConfig);

export default app;