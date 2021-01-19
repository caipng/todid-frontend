import { useState } from 'react';

export const useInput = (initial: string = '') => {
  const [value, setValue] = useState(initial);
  const [error, setError] = useState({});

  return {
    value,
    setValue,
    setError,
    props: {
      value,
      ...error,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value);
        setError({});
      }
    }
  };
};
