import { useState } from 'react';

export const useInput = function () {
  const [value, setValue] = useState('');
  const onChange = e => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange,
  };
};
