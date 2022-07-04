import { useState, useCallback } from 'react';

const STATES = {
  Blue: 'primary',
  Green: 'success',
  Red: 'danger',
  Yellow: 'warning',
  Grey: 'secondary',
};

const useColorToHTML = (initialState = 'primary') => {
  const [state, setState] = useState(initialState);

  const setColor = (color) => {
    setState(STATES[color]);
  };

  const getColor = (color) => Object.keys(STATES).find((key) => STATES[key] === state);

  return {
    setColor,
    getColor,
  };
};

export default useColorToHTML;
