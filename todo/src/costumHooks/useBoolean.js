import { useState, useCallback } from 'react';

const useBoolean = (initialState = false) => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(
    (newValue) => {
      if (newValue !== undefined) {
        setState(newValue);
      } else {
        setState((prev) => !prev);
      }
    },
    [setState],
  );

  return [state, toggle];
};

export default useBoolean;
