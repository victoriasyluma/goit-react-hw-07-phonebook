import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './operations';

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contactsState',
  initialState,

  reducers: {
    setFiltered(state, { payload: filter }) {
      state.filter = filter;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state, action) => {
        state.contacts.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.items = action.payload;
        state.contacts.isLoading = false;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.contacts.error = action.payload;
        state.contacts.isLoading = false;
      })
      .addCase(addContact.pending, (state, action) => {
        state.contacts.isLoading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.items = [...state.contacts.items, action.payload];
        state.contacts.isLoading = false;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.contacts.error = action.payload;
        state.contacts.isLoading = false;
      })
      .addCase(deleteContact.pending, (state, action) => {
        state.contacts.isLoading = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.items = state.contacts.items.filter(
          (contact) => contact.id !== action.payload
        );
        state.contacts.isLoading = false;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.contacts.error = action.payload;
        state.contacts.isLoading = false;
      })

      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.contacts.isLoading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state, action) => {
          state.contacts.isLoading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.contacts.isLoading = false;
        }
      );
  },
});

export const { setFiltered } = contactsSlice.actions;
export const contactReducer = contactsSlice.reducer;
