export const getContacts = (state) => {
  const { contactsState } = state;

  return contactsState.contacts;
};

export const getFilter = (state) => {
  const { contactsState } = state;

  return contactsState.filter;
};

export const getIsLoadingContacts = (state) => state.contacts.isLoading;
