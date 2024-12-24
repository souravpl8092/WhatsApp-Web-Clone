import { useCallback } from "react";
import { init, id, i } from "@instantdb/react";

const APP_ID = process.env.REACT_APP_INSTANTDB_APP_ID;

const schema = i.schema({
  entities: {
    messages: i.entity({
      contactId: i.string(),
      text: i.string(),
      timestamp: i.string(),
    }),
  },
});

const db = init({ appId: APP_ID, schema });

export const useInstantDB = () => {
  const fetchMessages = useCallback(async (contactId) => {
    try {
      const { data, error, isLoading } = db.useQuery({
        messages: {
          where: {
            contactId: { $eq: contactId },
          },
        },
      });

      if (isLoading) return [];
      if (error) throw new Error(error.message);

      return data.messages;
    } catch (error) {
      console.error("Error fetching messages:", error);
      return [];
    }
  }, []);

  const sendMessageToDB = useCallback(async (contactId, text) => {
    try {
      const newMessage = {
        contactId,
        text,
        timestamp: new Date().toISOString(),
      };

      await db.transact([db.tx.messages[id()].update(newMessage)]);

      return newMessage;
    } catch (error) {
      console.error("Error sending message:", error);
      return null;
    }
  }, []);

  return { fetchMessages, sendMessageToDB };
};
