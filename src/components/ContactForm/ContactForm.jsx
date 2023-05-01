import PropTypes from 'prop-types';
import styles from './ContactForm.module.scss';
import { useDispatch } from 'react-redux';
import { addContact } from 'components/redux/operations';

export const ContactForm = () => {
  const dispatch = useDispatch();

  const handleAddContact = (submitEvent) => {
    submitEvent.preventDefault();

    const form = submitEvent.target;

    dispatch(
      addContact({
        name: form.elements.name.value,
        phone: form.elements.number.value,
      })
    );

    form.reset();
  };

  return (
    <form onSubmit={handleAddContact} className={styles.form}>
      <h1>Phonebook</h1>
      <label>
        Name:
        <input
          // onChange={whenContactFormChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label>
        Number:
        <input
          // onChange={whenContactFormChange}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <button type="submit">Add Contact</button>
    </form>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
};
