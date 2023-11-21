import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { firebaseConfig } from "./config";

const provider = new GoogleAuthProvider();

export const useFirebase = () => {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // connexion initiale a Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    setAuth(auth);
  }, []);

  useEffect(() => {
    if (auth) {
      const unsubscribe = auth.onAuthStateChanged(authUser => {
        setUser(authUser);
      });

      return () => unsubscribe();
    }
  }, [auth]);

  const login = async () => await signInWithPopup(auth, provider);

  const logout = async () => await signOut(auth);

  return {
    user,
    login,
    logout,
  };
};
