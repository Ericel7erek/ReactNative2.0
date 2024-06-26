import { auth } from "./firebase";
import {
    sendEmailVerification,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    fetchSignInMethodsForEmail,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    sendPasswordResetEmail,
} from "firebase/auth";

export const signUp = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        sendEmailVerification(userCredential.user);
        const user = userCredential.user;
        await initializeUserData(user.uid, email);

        return user.uid;
    } catch (err) {
        return err.message;
    }
};

export const signIn = async (email, password) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;
        const u = await getUserById(user.uid);
        if (!u) {
            await initializeUserData(user.uid, email);
        }
        return user.uid;
    } catch (err) {
        return err.message;
    }
};

export const checkEmailAndPass = async (email, password) => {
    const r = await fetchSignInMethodsForEmail(auth, email);
    if (r.includes("google.com")) {
        return "google.com";
    }
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        return result.user.uid;
    } catch (err) {
        return err.message;
    }
};

export const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const u = await getUserById(user.uid);
    if (!u) {
        await initializeUserData(user.uid);
    }
    return user.uid;
};

const initializeUserData = async (uid, email) => {
    await setDoc(doc(db, "users", uid), {
        id: uid,
        email: email,
    });
};

export const logout = async () => {
    await signOut(auth);
};

//recover password
// export const sendPass = (email) => {
//     sendPasswordResetEmail(auth, email)
//         .then(() => {
//             return "Email sent";
//             // Password reset email sent!
//             // ..
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // ..
//         });
// };
