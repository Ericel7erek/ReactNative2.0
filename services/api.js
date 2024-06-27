import { auth, db } from './firebase';
import {
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  fetchSignInMethodsForEmail,
  sendEmailVerification,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import {
  addDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection
} from 'firebase/firestore';


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
export const getCurrentUserId = async () => await auth.currentUser;
export const logout = async () => {
  await signOut(auth);
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
export const createEvent = async (id, Name, Date, Location) => {
  console.log(id, Name, Date, Location)

  await addDoc(collection(db, "eventos"), {
    userId: id,
    Name: Name,
    Date: Date,
    Location: Location
  });
};

const initializeUserData = async (uid, email) => {
  await setDoc(doc(db, "users", uid), {
    email: email
  });
};
export const getUserById = async (id) => {
  const docRef = doc(db, "users", id);
  const result = await getDoc(docRef);
  return result.data();
};
export const updateUser = async (id, obj) => {
  const docRef = doc(db, "users", id);
  await updateDoc(docRef, obj);
};

export const sendPass = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      return "Email sent";
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};
