import { db, auth } from "./firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const getUserById = async (id) => {
    const docRef = doc(db, "users", id);
    const result = await getDoc(docRef);
    return result.data();
};
export const updateUser = async (id, obj) => {
    const docRef = doc(db, "users", id);
    await updateDoc(docRef, obj);
};

export const getCurrentUserId = async () => await auth.currentUser;
