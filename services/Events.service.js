import { db } from "./firebase";
import {
    getDocs,
    collection,
    query,
    doc,
    addDoc,
    getDoc,
} from "firebase/firestore";
import { InvitationType } from "@/common/Invitation_type";

export const getEvents = async () => {
    const colRef = collection(db, "eventos");
    const result = await getDocs(query(colRef));
    return getArrayFromCollection(result);
};

export const inviteUserToEvent = async (eventId, userId) => {
    console.log(eventId);
    console.log(userId);

    try {
        const eventRef = doc(db, "eventos", eventId);

        const eventSnap = await getDoc(eventRef);
        if (!eventSnap.exists()) {
            throw new Error(`Event with ID ${eventId} does not exist.`);
        }

        const event = eventSnap.data();

        const updatedInvitedUsers = [
            ...event.invitedUsers,
            { userId: userId, status: InvitationType.INVITED },
        ];

        await updateDoc(eventRef, {
            invitedUsers: updatedInvitedUsers,
        });

        console.log("User invited successfully!");
    } catch (error) {
        console.error("Error inviting user to event:", error);
        throw error;
    }
};

const getArrayFromCollection = (collection) => {
    return collection.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
    });
};

export const getEventById = async (eventId) => {
    try {
        const eventRef = doc(db, "eventos", eventId);
        const eventSnap = await getDoc(eventRef);

        if (eventSnap.exists()) {
            return { ...eventSnap.data(), id: eventSnap.id };
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching event:", error);
        throw error;
    }
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
