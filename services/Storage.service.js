import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import {storage} from './firebase';

export const uploadImage = async (file, uid) => {
    const storageRef = ref(storage, `/files/${uid}/${file.name}`);
    const uploadTask = uploadBytes(storageRef, file);
    uploadTask.then(async (data) => {
        const url = await getDownloadURL(data.ref);
        const colRef = collection(db, "users");
        await updateDoc(doc(colRef, uid), { uploadedPicture: url });
    })
}