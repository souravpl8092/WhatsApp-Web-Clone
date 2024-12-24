export const useIndexedDB = () => {
  const openDB = async () => {
    const db = await window.indexedDB.open("whatsappCloneDB", 1, (db) => {
      if (!db.objectStoreNames.contains("contacts")) {
        db.createObjectStore("contacts", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("messages")) {
        db.createObjectStore("messages", { keyPath: "id" });
      }
    });
    return db;
  };

  const storeContactInDB = (contact) => {
    const db = openDB();
    const transaction = db.transaction("contacts", "readwrite");
    transaction.objectStore("contacts").put(contact);

    let storedContacts = JSON.parse(localStorage.getItem("contacts") || "[]");
    storedContacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(storedContacts));
  };

  const storeMessageInDB = (message) => {
    const db = openDB();
    const transaction = db.transaction("messages", "readwrite");
    transaction.objectStore("messages").put(message);

    let storedMessages = JSON.parse(localStorage.getItem("messages") || "[]");
    storedMessages.push(message);
    localStorage.setItem("messages", JSON.stringify(storedMessages));
  };

  return { openDB, storeContactInDB, storeMessageInDB };
};
