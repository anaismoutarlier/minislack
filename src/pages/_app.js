import "@/styles/globals.css";
import "sanitize.css";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  collection,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { firebaseConfig } from "@/firebase/config";
import { FirebaseContext } from "@/firebase/context";

const googleProvider = new GoogleAuthProvider();

export default function App({ Component, pageProps }) {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);
  const [db, setDb] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    setAuth(getAuth(app));
    setDb(getFirestore(app));
  }, []);

  useEffect(() => {
    if (auth) {
      const unsubscribe = auth.onAuthStateChanged(authUser => {
        setUser(authUser);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [auth]);

  useEffect(() => {
    if (db) {
      const q = query(collection(db, "messages"), orderBy("sentAt"));

      const unsubscribe = onSnapshot(q, data => {
        const messages = data.docs.map(doc => {
          const data = doc.data();
          data.sentAt = data.sentAt.toDate();
          return { id: doc.id, ...data };
        });
        setMessages(messages);
      });

      return () => unsubscribe();
    }
  }, [db]);

  const signin = async () => await signInWithPopup(auth, googleProvider);

  const signout = async () => await signOut(auth);

  const sendMessage = async content => {
    if (!db || !user || !content) return;
    const message = {
      content,
      sentAt: new Date(),
      user: {
        uid: user.uid,
        photoURL: user.photoURL,
        displayName: user.displayName,
      },
    };

    await addDoc(collection(db, "messages"), message);
  };

  return (
    <FirebaseContext.Provider
      value={{ signin, user, signout, sendMessage, messages }}
    >
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
}
