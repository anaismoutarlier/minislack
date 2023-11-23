import { RaisedButton } from "@/components";
import { useContext, useEffect } from "react";
import { FirebaseContext } from "@/firebase";
import { useRouter } from "next/router";
export default function Login() {
  const router = useRouter();
  const { user, login } = useContext(FirebaseContext);

  useEffect(() => {
    if (user) router.push("/chat");
  }, [user]);

  return (
    <div className="login container">
      <RaisedButton size="large" onClick={() => login("google")}>
        GOOGLE LOGIN
      </RaisedButton>
      <RaisedButton size="large" onClick={() => login("facebook")}>
        FACEBOOK LOGIN
      </RaisedButton>
    </div>
  );
}
