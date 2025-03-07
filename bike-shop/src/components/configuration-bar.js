import { useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ConfigContext } from "../contexts/ConfigContext";

export default function ConfigurationBar({ addItemToCartState }) {
  const { configState, dispatch } = useContext(ConfigContext);

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

  function isValidConfig(category, option) {
    if (configState.selectedOptions.wheels === "Mountain") {
      return category === "frame" && option !== "Full-Suspension";
    } else if (configState.selectedOptions.wheels === "Fat Bike") {
      return category === "rimColor";
    } else return false;
  }

  function addItemToCart() {
    const newItem = {
      parts: {
        ...configState.selectedOptions,
      },
    };
    addItemToCartState(newItem);
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
                isValidConfig(category, option) ||
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
        <Button onClick={() => addItemToCart()}>Add to cart</Button>
      </Form>
    );
  } catch (err) {
    console.log(err);
  }
}
