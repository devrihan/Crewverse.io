import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface ProfileData {
  displayName: string;
  bio: string;
  website: string;
  twitter: string;
}

export const updateProfile = async (userId: string, data: ProfileData) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, data);
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};