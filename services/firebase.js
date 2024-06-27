import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
    getAuth,
    setPersistence,
    browserLocalPersistence,
    initializeAuth,
    getReactNativePersistence,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_API_KEY,
    authDomain: `${process.env.EXPO_PUBLIC_PROJECT_ID}.firebaseapp.com`,
    projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
    storageBucket: `${process.env.EXPO_PUBLIC_PROJECT_ID}.appspot.com`,
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();
export const storage = getStorage(firebaseApp);
export const auth = initializeAuth(firebaseApp, {
    persistence: getReactNativePersistence(AsyncStorage),
});
