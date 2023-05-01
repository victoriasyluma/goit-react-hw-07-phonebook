import PropTypes from 'prop-types';
import styles from './Filter.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setFiltered } from 'components/redux/contactsSlice';
import { getFilter } from 'components/redux/selector';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  return (
    <div className={styles.filter}>
      <h2>Contacts</h2>
      <p className={styles.title}>Find contacts by name</p>

      <input
        onChange={(e) => dispatch(setFiltered(e.target.value))}
        value={filter}
      />
    </div>
  );
};

export default Filter;

Filter.propTypes = {
  filter: PropTypes.string,
  onChange: PropTypes.func,
};
