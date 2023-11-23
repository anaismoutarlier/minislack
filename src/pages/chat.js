import { RaisedButton, Message } from "@/components";
import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "@/firebase";
import { useRouter } from "next/router";

export default function Chat() {
  const router = useRouter();
  const { user, logout, addMessage, messages } = useContext(FirebaseContext);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user]);

  const handleChange = e => setContent(e.target.value);

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await addMessage(content);
    if (res) setContent("");
  };

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
          {messages.map(message => (
            <Message
              key={message.id}
              message={message}
              isOwnMessage={message.user.uid === user.uid}
            />
          ))}
        </div>
        <form className="input-container" onSubmit={handleSubmit}>
          <input
            placeholder="Enter your message here"
            onChange={handleChange}
            value={content}
          />
          <RaisedButton type="submit">SEND</RaisedButton>
        </form>
      </div>
    </div>
  );
}
