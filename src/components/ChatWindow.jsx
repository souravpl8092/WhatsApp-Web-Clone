import React, { useState, useEffect } from "react";
import { useChat } from "../context/ChatContext";
import Message from "./Message";
import MessageInput from "./MessageInput";
import "./ChatWindow.css";

const ChatWindow = () => {
  const { state, dispatch } = useChat();
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    if (state.selectedContact) {
      dispatch({ type: "SET_MESSAGES", payload: state.selectedContact });
    }
  }, [state.selectedContact, dispatch]);

  const handleSendMessage = async (text) => {
    if (text.trim() && state.selectedContact) {
      const newMessage = {
        contactId: state.selectedContact.id,
        text: text,
        senderId: "current-user-id",
        timestamp: new Date().toISOString(),
      };

      dispatch({ type: "ADD_MESSAGE", payload: newMessage });
      setMessageText("");
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-box">
        <div className="chat-header">
          <h4>
            {state.selectedContact
              ? state.selectedContact.name
              : "Select a contact"}
          </h4>
        </div>

        <div className="chat-history">
          {state.selectedContact ? (
            state.messages.map((message) => (
              <Message key={message.timestamp} message={message} />
            ))
          ) : (
            <div>Select a contact to start chatting.</div>
          )}
        </div>
      </div>

      {/* Input for sending new messages */}
      {state.selectedContact && (
        <MessageInput
          messageText={messageText}
          setMessageText={setMessageText}
          onSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
};

export default ChatWindow;
