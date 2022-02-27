import React, { createContext, useReducer, useState } from "react";
import { initialState, reducer, ACTIONS } from "../reducer/FavouriteReducer";
import useLocalStorage from "../hooks/useLocalStorage";

export const Context = createContext();

export default function FavouritesContextProvider({ children }) {
  const [data, setData] = useState([]);

  const { deleteValue, addValue, state, resetValue } = useLocalStorage(
    "favourites",
    initialState
  );
  const [favourites, dispatch] = useReducer(reducer, state);

  const like = (meal) => {
    dispatch({ type: ACTIONS.LIKE, payload: meal });
    addValue(meal);
  };

  const unlike = (meal) => {
    dispatch({ type: ACTIONS.UNLIKE, payload: meal });
    deleteValue(meal);
  };

  const reset = () => {
    dispatch({ type: ACTIONS.RESET });
    resetValue();
  };

  const value = {
    data,
    setData,
    favourites,
    like,
    unlike,
    reset
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
