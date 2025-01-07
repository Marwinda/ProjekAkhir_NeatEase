import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyClMQTtKMNRp-_v16Q5JDIqde8xMkRpNOs",
    authDomain: "neatease-743f7.firebaseapp.com",
    projectId: "neatease-743f7",
    storageBucket: "neatease-743f7.firebasestorage.app",
    messagingSenderId: "157248078470",
    appId: "1:157248078470:web:b04c7d50d828c23b04c707"
  };


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };