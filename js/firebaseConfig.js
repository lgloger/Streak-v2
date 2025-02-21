import { initializeApp } from "firebase/app";
import {
  Platform,
} from "react-native";
import { getAuth, initializeAuth, browserLocalPersistence, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDHg_1fTVQwrWGEjImnZHzBNQ4JpqP3SRs",
  authDomain: "streak-95f55.firebaseapp.com",
  projectId: "streak-95f55",
  storageBucket: "streak-95f55.firebasestorage.app",
  messagingSenderId: "15795419485",
  appId: "1:15795419485:web:57db18daec7a4119b350b4",
  measurementId: "G-7D7EKDDRR0",
};

const app = initializeApp(firebaseConfig);

let auth;
if (Platform.OS === "web") {
  auth = getAuth(app);
  auth.setPersistence(browserLocalPersistence);
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

const db = getFirestore(app);

export { auth, db };