import { db, auth } from "./firebase";
import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    getDocs,
    collection,
    query,
} from "firebase/firestore";

export const getUserById = async (id) => {
    const docRef = doc(db, "users", id);
    const result = await getDoc(docRef);
    return result.data();
};
export const updateUser = async (id, obj) => {
    const docRef = doc(db, "users", id);
    await updateDoc(docRef, obj);
};

export const getUsers = async () => {
    const colRef = collection(db, "users");
    const result = await getDocs(query(colRef));
    return getArrayFromCollection(result);
};

const getArrayFromCollection = (collection) => {
    return collection.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
    });
};

export const getCurrentUserId = async () => await auth.currentUser;
