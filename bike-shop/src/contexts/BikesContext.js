import React, { createContext, useReducer, useEffect } from "react";
import bikesReducer, { initialState } from "../reducers/bikesReducer";

export const BikesContext = createContext();

const BikesProvider = ({ children }) => {
  const [bikesState, dispatch] = useReducer(bikesReducer, initialState, () => {
    const localData = localStorage.getItem("bikesState");
    return localData ? JSON.parse(localData) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("bikesState", JSON.stringify(bikesState));
  }, [bikesState]);

  return (
    <BikesContext.Provider value={{ bikesState, dispatch }}>
      {children}
    </BikesContext.Provider>
  );
};

export default BikesProvider;
