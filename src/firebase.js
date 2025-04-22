import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNWlXrkGDhK9DqohnY2dHmvXaN0pzojU8",
  authDomain: "d-lane-cook-recipes.firebaseapp.com",
  projectId: "d-lane-cook-recipes",
  storageBucket: "d-lane-cook-recipes.appspot.com",
  messagingSenderId: "203080439891",
  appId: "1:203080439891:web:794c6d9d0309c5a7d88ea6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
