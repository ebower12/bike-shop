import { useReducer, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import configReducer, { initialConfigState } from "../reducers/configReducer";
import { getAvailableOptions } from "../Router";

export default function ConfigurationBar({ addItemToCart }) {
  const [configState, dispatch] = useReducer(configReducer, initialConfigState);

  useEffect(() => {
    async function fetchData() {
      const result = await getAvailableOptions();

      dispatch({
        type: "update",
        availableOptions: result,
        selectedOptions: configState.selectedOptions,
      });
    }

    fetchData();
  }, []);

  function handleRadioSelect(category, option) {
    dispatch({
      type: "update",
      availableOptions: configState.availableOptions,
      selectedOptions: {
        ...configState.selectedOptions,
        [category]: option,
      },
    });
  }

  function inValidConfig(category, option) {
    if (configState.selectedOptions.wheels === "Mountain") {
      return category === "frame" && option !== "Full-Suspension";
    } else if (configState.selectedOptions.wheels === "Fat Bike") {
      return category === "rimColor";
    } else return false;
  }

  function addItemToCartProp() {
    const newItem = {
      id: Math.random(),
      parts: {
        ...configState.selectedOptions,
      },
    };
    addItemToCart(newItem);
  }

  try {
    const listOptions = () =>
      Object.keys(configState.availableOptions).map((category) => {
        const options = configState.availableOptions[category].map((option) => {
          return (
            <Form.Check
              type="radio"
              id={option}
              label={option}
              key={`${category}-${option}`}
              disabled={
                inValidConfig(category, option) ||
                option.includes("Out of Stock")
              }
              checked={configState.selectedOptions[category] === option}
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

    return (
      <Form>
        {listOptions()}
        <Button onClick={() => addItemToCartProp()}>Add to cart</Button>
      </Form>
    );
  } catch (err) {
    console.log(err);
  }
}
