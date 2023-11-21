import { RaisedButton, Message } from "@/components";
import { useContext, useEffect } from "react";
import { FirebaseContext } from "@/firebase";
import { useRouter } from "next/router";

export default function Chat() {
  const router = useRouter();
  const { user, logout } = useContext(FirebaseContext);

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  return (
    <div className="chat container">
      <div className="sider">
        {user && (
          <div>
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="sider-avatar"
            />
            <h2>{user.displayName}</h2>
            <h3>{user.email}</h3>
          </div>
        )}
        <RaisedButton onClick={logout}>LOGOUT</RaisedButton>
      </div>
      <div className="content">
        <div className="message-container">
          <Message
            message={{
              content: "Hello there",
              sentAt: Date.now() - 400000,
              user: {
                id: 1,
                displayName: "Anais Moutarlier",
                photoURL: "",
              },
            }}
            isOwnMessage={true}
          />
          <Message
            message={{
              content: "Welcome to MiniSlack",
              sentAt: Date.now() - 2000,
              user: {
                id: 1,
                displayName: "Anais Moutarlier",
                photoURL: "",
              },
            }}
            isOwnMessage={false}
          />
        </div>
        <form className="input-container">
          <input placeholder="Enter your message here" />
          <RaisedButton type="submit">SEND</RaisedButton>
        </form>
      </div>
    </div>
  );
}
