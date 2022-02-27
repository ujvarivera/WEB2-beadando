import { useEffect, useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [state, setState] = useState(
    () => JSON.parse(localStorage.getItem(key)) || initialValue
  );

  useEffect(() => {
    if (state) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [state]);

  const deleteValue = (meal) => {
    setState(state.filter((s) => s !== meal));
  };

  const addValue = (meal) => {
    setState([...state, meal]);
  };

  const resetValue = () => {
    setState(initialValue);
  };

  return { state, addValue, deleteValue, resetValue };
};

export default useLocalStorage;
