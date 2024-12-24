import React, { useEffect } from "react";
import { useChat } from "../context/ChatContext";
import "./ContactList.css";

const demoContacts = [
  {
    id: "0",
    name: "John Doe",
    lastMessage: "Hey, how are you?",
    lastMessageTime: "2024-12-24T12:30:00",
    avatar: "https://randomuser.me/api/portraits/men/0.jpg",
  },
  {
    id: "1",
    name: "Jane Smith",
    lastMessage: "Let’s catch up soon!",
    lastMessageTime: "2024-12-24T11:15:00",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: "2",
    name: "Alice Cooper",
    lastMessage: "How was the meeting?",
    lastMessageTime: "2024-12-24T10:00:00",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: "3",
    name: "Bob Marley",
    lastMessage: "What’s up?",
    lastMessageTime: "2024-12-24T08:15:00",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: "4",
    name: "Charlie Puth",
    lastMessage: "Let’s hang out soon!",
    lastMessageTime: "2024-12-24T07:30:00",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
  },
];

const ContactList = () => {
  const { state, dispatch } = useChat();

  useEffect(() => {
    // Dispatch demo contacts when the component is mounted
    dispatch({ type: "SET_CONTACTS", payload: demoContacts });
  }, [dispatch]);

  const handleContactClick = (contact) => {
    dispatch({ type: "SET_SELECTED_CONTACT", payload: contact });
  };

  return (
    <div className="contact-list">
      {state.contacts.length > 0 ? (
        state.contacts.map((contact) => (
          <div
            key={contact.id}
            className="contact-item"
            onClick={() => handleContactClick(contact)}
          >
            <div className="contact-avatar">
              <img src={contact.avatar} alt={contact.name} />
            </div>
            <div className="contact-info">
              <div className="contact-name">{contact.name}</div>
              <div className="contact-last-message">{contact.lastMessage}</div>
            </div>
          </div>
        ))
      ) : (
        <div className="no-contacts">No contacts available</div>
      )}
    </div>
  );
};

export default ContactList;
