import { db } from '../firebase/config';
import { collection, getDocs, addDoc, updateDoc, doc, getDoc, deleteDoc } from 'firebase/firestore';

const personsCollection = collection(db, 'persons');

const getAll = async () => {
  const snapshot = await getDocs(personsCollection);
  const persons = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return persons;
};

const create = async (newObject) => {
  const docRef = await addDoc(personsCollection, newObject);
  const docSnap = await getDoc(docRef);
  return { id: docRef.id, ...docSnap.data() };
};

const update = async (id, newObject) => {
  const personDoc = doc(db, 'persons', id);
  await updateDoc(personDoc, newObject);
  const updatedDoc = await getDoc(personDoc);
  return { id: updatedDoc.id, ...updatedDoc.data() };
};

const erase = async (id) => {
  const personDoc = doc(db, 'persons', id);
  await deleteDoc(personDoc);
  return { id };
};

export default { getAll, create, update, erase };
