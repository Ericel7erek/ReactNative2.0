import { db } from "./firebase";
import { getDocs, collection, query, doc, addDoc } from "firebase/firestore";

export const getEvents = async () => {
    const colRef = collection(db, "eventos");
    const result = await getDocs(query(colRef));
    return getArrayFromCollection(result);
};

const getArrayFromCollection = (collection) => {
    return collection.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
    });
};

export const createEvent = async (id, Name, Date, Location) => {
    console.log(id, Name, Date, Location);

    await addDoc(collection(db, "eventos"), {
        userId: id,
        Name: Name,
        Date: Date,
        Location: Location,
    });
};
