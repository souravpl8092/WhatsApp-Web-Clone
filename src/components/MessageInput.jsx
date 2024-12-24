import React from "react";
import "./MessageInput.css";

const MessageInput = ({ messageText, setMessageText, onSendMessage }) => {
  const handleSendClick = () => {
    if (messageText.trim()) {
      onSendMessage(messageText);
    }
  };

  return (
    <div className="message-input">
      <input
        type="text"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSendClick}>Send</button>
    </div>
  );
};

export default MessageInput;
