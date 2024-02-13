import { RaisedButton } from "@/components";
import { FirebaseContext } from "@/context/FirebaseContext";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
export default function Login() {
  const { user, signin } = useContext(FirebaseContext);

  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/chat");
  }, [user]);
  return (
    <div className="login container">
      <RaisedButton size="large" onClick={signin}>
        LOGIN
      </RaisedButton>
    </div>
  );
}
