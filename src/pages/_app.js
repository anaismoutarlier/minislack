import "@/styles/globals.css";
import "sanitize.css";
import { useFirebase, FirebaseContext } from "@/firebase";

export default function App({ Component, pageProps }) {
  const firebase = useFirebase();
  return (
    <FirebaseContext.Provider value={firebase}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
}
