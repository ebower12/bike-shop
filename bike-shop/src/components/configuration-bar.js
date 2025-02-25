import React from "react";
import { useReducer } from "react";
import Form from "react-bootstrap/Form";
import ConfigData from "../config-data";
import configReducer, { initialState } from "../reducers/configReducer";

export default function ConfigurationBar() {
  const [state, dispatch] = useReducer(configReducer, initialState);

  function handleRadioSelect(category, option) {
    dispatch({
      type: "update",
      options: {
        ...state.options,
        [category]: option,
      },
    });
  }

  try {
    const listOptions = () =>
      Object.keys(ConfigData).map((category) => {
        const options = ConfigData[category].map((option) => {
          return (
            <Form.Check
              type="radio"
              id={option}
              key={`${category}-${option}`}
              label={option}
              checked={state.options[category] === option}
              onChange={() => handleRadioSelect(category, option)}
            />
          );
        });

        return (
          <div key={category} style={{ display: "grid", justifyItems: "left" }}>
            <label>{category}</label>
            {options}
          </div>
        );
      });

    return <Form>{listOptions()}</Form>;
  } catch (err) {
    console.log(err);
  }
}
