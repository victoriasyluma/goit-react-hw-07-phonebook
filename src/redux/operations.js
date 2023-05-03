import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setFiltered } from './contactsSlice';

axios.defaults.baseURL = 'https://644f7eefba9f39c6ab64f515.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async ({ name, phone }, thunkAPI) => {
    try {
      const contact = { name, phone };

      const response = await axios.post('/contacts', contact);

      thunkAPI.dispatch(setFiltered(''));

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },

  {
    condition: ({ name }, thunkAPI) => {
      const { contactsState } = thunkAPI.getState();

      const {
        contacts: { items },
      } = contactsState;

      const names = new Set(items.map((contact) => contact.name.toLowerCase()));

      if (names.has(name.toLowerCase())) {
        alert(`${name} is already in contacts`);
        return false;
      }

      return true;
    },
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      await axios.delete(`/contacts/${contactId}`);

      return contactId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
