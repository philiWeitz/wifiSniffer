
import React from 'react';
import PropTypes from 'prop-types';

const SearchBox = ({ onInputChange }) => {

  return (
    <div>
      <input onChange={onInputChange} />
    </div>
  );

};


SearchBox.propTypes = {
  onInputChange: PropTypes.func.isRequired,
};


export default SearchBox;
