import { RaisedButton, Message } from "@/components";
import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import { FirebaseContext } from "@/firebase/context";
export default function Chat() {
  const { user, signout, sendMessage, messages } = useContext(FirebaseContext);
  const [newMessage, setNewMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  const handleChange = e => setNewMessage(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();
    await sendMessage(newMessage);
    setNewMessage("");
  };

  return !user ? null : (
    <div className="chat container">
      <div className="sider">
        <div>
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="sider-avatar"
          />
          <h2>{user.displayName}</h2>
          <h3>{user.email}</h3>
        </div>
        <RaisedButton onClick={signout}>LOGOUT</RaisedButton>
      </div>
      <div className="content">
        <div className="message-container">
          {messages.map(message => {
            return (
              <Message
                key={message.id}
                message={message}
                isOwnMessage={message.user.uid === user.uid}
              />
            );
          })}
        </div>
        <form className="input-container" onSubmit={handleSubmit}>
          <input
            placeholder="Enter your message here"
            value={newMessage}
            onChange={handleChange}
          />
          <RaisedButton type="submit">SEND</RaisedButton>
        </form>
      </div>
    </div>
  );
}
