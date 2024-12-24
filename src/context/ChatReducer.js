const chatReducer = (state, action) => {
  switch (action.type) {
    case "SET_MESSAGES":
      const contactMessages = state.demoMessages.find(
        (contact) => contact.contactId === action.payload.id
      );
      return {
        ...state,
        messages: contactMessages ? contactMessages.messages : [],
      };
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case "SET_SELECTED_CONTACT":
      return {
        ...state,
        selectedContact: action.payload,
      };
    case "SET_CONTACTS":
      return {
        ...state,
        contacts: action.payload,
      };
    default:
      return state;
  }
};

export default chatReducer;
