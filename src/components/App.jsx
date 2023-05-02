import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

import { getContacts, getFilter } from '../redux/selector';
import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts } from '../redux/operations';
import { useEffect } from 'react';

export const App = () => {
  const { items: contacts } = useSelector(getContacts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filter = useSelector(getFilter);
  const renderContacts = () => {
    if (filter) {
      const normalizedFilter = filter.toLowerCase();
      const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
      return filteredContacts;
    }
    return contacts;
  };

  return (
    <div>
      <ContactForm />

      <Filter />

      <ContactList contacts={renderContacts()} />
    </div>
  );
};
