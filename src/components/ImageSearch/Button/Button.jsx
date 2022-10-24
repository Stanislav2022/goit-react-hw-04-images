import css from "./Button.module.css"
import PropTypes from 'prop-types';

export default function Button( {onClick}) {
  return (
      <button className={css.btn} onClick={onClick}>Loade nore </button>
  )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
