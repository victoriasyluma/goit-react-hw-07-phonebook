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

      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.items = action.payload;
      })

      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.items = [...state.contacts.items, action.payload];
      })

      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.items = state.contacts.items.filter(
          (contact) => contact.id !== action.payload
        );
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
