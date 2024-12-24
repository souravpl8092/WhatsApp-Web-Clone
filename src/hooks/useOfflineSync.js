import { useEffect } from "react";
import { useIndexedDB } from "./useIndexedDB";
import { useInstantDB } from "./useInstantDB";

const useOfflineSync = () => {
  const { storeContactInDB, storeMessageInDB } = useIndexedDB();
  const { sendMessageToDB, fetchMessages } = useInstantDB();

  const syncOfflineDataToInstantDB = async () => {
    const storedContacts = JSON.parse(localStorage.getItem("contacts") || "[]");
    for (const contact of storedContacts) {
      await storeContactInDB(contact);
    }

    const storedMessages = JSON.parse(localStorage.getItem("messages") || "[]");
    for (const message of storedMessages) {
      await sendMessageToDB(message.contactId, message.text);
    }

    localStorage.removeItem("contacts");
    localStorage.removeItem("messages");
  };

  useEffect(() => {
    const handleOnline = () => {
      console.log("Device is online, syncing data to InstantDB");
      syncOfflineDataToInstantDB();
    };

    const handleOffline = () => {
      console.log("Device is offline, saving data locally");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [storeContactInDB, sendMessageToDB]);

  return { syncOfflineDataToInstantDB };
};

export default useOfflineSync;
