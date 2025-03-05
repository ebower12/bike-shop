import React, { createContext, useReducer, useEffect } from "react";
import configReducer, { initialState } from "../reducers/configReducer";

export const ConfigContext = createContext();

const ConfigProvider = ({ children }) => {
  const [configState, dispatch] = useReducer(
    configReducer,
    initialState,
    () => {
      const localData = localStorage.getItem("configState");
      return localData ? JSON.parse(localData) : initialState;
    }
  );

  useEffect(() => {
    localStorage.setItem("configState", JSON.stringify(configState));
  }, [configState]);

  return (
    <ConfigContext.Provider value={{ configState, dispatch }}>
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigProvider;
