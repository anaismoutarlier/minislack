import "@/styles/globals.css";
import "sanitize.css";
import { firebaseConfig } from "@/config/firebaseConfig";
import { FirebaseContext } from "@/context/FirebaseContext";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";

const googleProvider = new GoogleAuthProvider();

export default function App({ Component, pageProps }) {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    console.log(auth);
    setAuth(auth);
  }, []);

  useEffect(() => {
    if (auth) {
      const unsubscribe = auth.onAuthStateChanged(authUser => {
        console.log(authUser);
        setUser(authUser);
      });
      return () => {
        unsubscribe();
      };
    }
  }, [auth]);

  const signin = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const signout = async () => {
    await signOut(auth);
  };

  return (
    <FirebaseContext.Provider value={{ signin, user, signout }}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
}
