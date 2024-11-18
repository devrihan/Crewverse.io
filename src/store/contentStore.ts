import { create } from 'zustand';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface ContentStore {
  contents: any[];
  loading: boolean;
  error: string | null;
  createContent: (data: any) => Promise<void>;
  fetchUserContents: (userId: string) => Promise<void>;
}

export const useContentStore = create<ContentStore>((set) => ({
  contents: [],
  loading: false,
  error: null,

  createContent: async (data) => {
    try {
      set({ loading: true, error: null });
      await addDoc(collection(db, 'contents'), data);
      set((state) => ({
        contents: [...state.contents, data],
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to create content', loading: false });
    }
  },

  fetchUserContents: async (userId) => {
    try {
      set({ loading: true, error: null });
      const q = query(collection(db, 'contents'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const contents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      set({ contents, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch contents', loading: false });
    }
  },
}));