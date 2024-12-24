import React from "react";
import "./Message.css";
const Message = ({ message }) => {
  return (
    <div
      className={`message ${
        message.senderId === "current-user-id" ? "sent" : "received"
      }`}
    >
      <div className="message-text">{message.text}</div>
      <div className="message-timestamp">
        {new Date(message.timestamp).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </div>
    </div>
  );
};

export default Message;
