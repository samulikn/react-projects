import { useState, useEffect } from "react";

export type LocalStoragePropTypes = {
  key: string;
  initValue: string;
};

const getLocalValue = ({ key, initValue }: LocalStoragePropTypes) => {
  // if a value is already stored
  const localStorageString: string | null = localStorage.getItem(key);
  if (localStorageString) {
    const localStorageValue = JSON.parse(localStorageString);
    return localStorageValue;
  }

  return initValue;
};

const useLocalStorage = ({
  key,
  initValue,
}: LocalStoragePropTypes): [any, (value: any) => void] => {
  const [value, setValue] = useState(() => {
    return getLocalValue({ key, initValue });
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
