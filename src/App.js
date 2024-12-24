import React, { useEffect } from "react";
import useOfflineSync from "./hooks/useOfflineSync";
import ContactList from "./components/ContactList";
import ChatWindow from "./components/ChatWindow";
import "./App.css";

const App = () => {
  const { syncOfflineDataToInstantDB } = useOfflineSync();

  useEffect(() => {
    if (navigator.onLine) {
      syncOfflineDataToInstantDB();
    }
  }, [syncOfflineDataToInstantDB]);

  return (
    <>
      <div className="header">WhatsApp Web Clone</div>
      <div className="app">
        <div className="sidebar">
          <ContactList />
        </div>
        <div className="chat-area">
          <ChatWindow />
        </div>
      </div>
    </>
  );
};

export default App;
