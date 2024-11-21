import { create } from 'zustand';
import { collection, addDoc, updateDoc, doc, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface Post {
  id: string;
  content: string;
  userId: string;
  userName: string;
  createdAt: string;
  likes: number;
  comments: Comment[];
  tag:string;
}

interface Comment {
  id: string;
  content: string;
  userId: string;
  userName: string;
  createdAt: string;
}

interface CommunityStore {
  posts: Post[];
  loading: boolean;
  error: string | null;
  createPost: (data: Omit<Post, 'id'>) => Promise<void>;
  likePost: (postId: string) => Promise<void>;
  fetchPosts: () => Promise<void>;
}

export const useCommunityStore = create<CommunityStore>((set, get) => ({
  posts: [],
  loading: false,
  error: null,

  createPost: async (data) => {
    try {
      set({ loading: true, error: null });
      const docRef = await addDoc(collection(db, 'posts'), data);
      set((state) => ({
        posts: [{ ...data, id: docRef.id }, ...state.posts],
        loading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to create post', loading: false });
    }
  },

  likePost: async (postId) => {
    try {
      const postRef = doc(db, 'posts', postId);
      const post = get().posts.find((p) => p.id === postId);
      if (post) {
        await updateDoc(postRef, { likes: post.likes + 1 });
        set((state) => ({
          posts: state.posts.map((p) =>
            p.id === postId ? { ...p, likes: p.likes + 1 } : p
          ),
        }));
      }
    } catch (error) {
      set({ error: 'Failed to like post' });
    }
  },

  fetchPosts: async () => {
    try {
      set({ loading: true, error: null });
      const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const posts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
      set({ posts, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch posts', loading: false });
    }
  },
}));