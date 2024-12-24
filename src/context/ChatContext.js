import React, { createContext, useContext, useReducer } from "react";
import chatReducer from "./ChatReducer";

const demoMessages = [
  {
    contactId: "0",
    messages: [
      {
        senderId: "0",
        text: "Hey, how are you?",
        timestamp: "2024-12-24T12:30:00",
      },
      {
        senderId: "current-user-id",
        text: "I'm good, thanks!",
        timestamp: "2024-12-24T12:31:00",
      },
    ],
  },
  {
    contactId: "1",
    messages: [
      {
        senderId: "1",
        text: "Let’s catch up soon!",
        timestamp: "2024-12-24T11:15:00",
      },
      {
        senderId: "current-user-id",
        text: "Yes, we should!",
        timestamp: "2024-12-24T11:20:00",
      },
    ],
  },
  {
    contactId: "2",
    messages: [
      {
        senderId: "2",
        text: "How was the meeting?",
        timestamp: "2024-12-24T10:00:00",
      },
      {
        senderId: "current-user-id",
        text: "It went great, thanks for asking!",
        timestamp: "2024-12-24T10:05:00",
      },
    ],
  },
  {
    contactId: "3",
    messages: [
      { senderId: "3", text: "What’s up?", timestamp: "2024-12-24T08:15:00" },
      {
        senderId: "current-user-id",
        text: "Not much, you?",
        timestamp: "2024-12-24T08:20:00",
      },
    ],
  },
  {
    contactId: "4",
    messages: [
      {
        senderId: "4",
        text: "Let’s hang out soon!",
        timestamp: "2024-12-24T07:30:00",
      },
      {
        senderId: "current-user-id",
        text: "Looking forward to it!",
        timestamp: "2024-12-24T07:35:00",
      },
    ],
  },
];

const initialState = {
  selectedContact: null,
  messages: [],
  contacts: [], 
  demoMessages: demoMessages,
};

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  return useContext(ChatContext);
};
