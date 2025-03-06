import "./css/internal.css";
import { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import NavBar from "./components/nav-bar";
import { ConfigContext } from "./contexts/ConfigContext";

function InternalApp() {
  const [newPartName, setNewPartName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("frame");
  const { configState, dispatch } = useContext(ConfigContext);

  function addPart() {
    dispatch({
      type: "updateAvailableOptions",
      availableOptions: {
        ...configState.availableOptions,
        [selectedCategory]: [
          ...configState.availableOptions[selectedCategory],
          newPartName,
        ],
      },
      selectedOptions: configState.selectedOptions,
    });
  }

  function removePart(category, option) {
    dispatch({
      type: "updateAvailableOptions",
      availableOptions: {
        ...configState.availableOptions,
        [category]: configState.availableOptions[category].filter(
          (part) => part !== option
        ),
      },
      selectedOptions: configState.selectedOptions,
    });
  }

  function toggleOutOfStock(category, option) {
    dispatch({
      type: "updateAvailableOptions",
      availableOptions: {
        ...configState.availableOptions,
        [category]: configState.availableOptions[category].map((part) => {
          if (part === option) {
            if (part.includes("(Out of Stock)")) {
              return part.replace(" (Out of Stock)", "");
            } else return `${part} (Out of Stock)`;
          } else return part;
        }),
      },
      selectedOptions: configState.selectedOptions,
    });
  }

  const currentOptions = () =>
    Object.keys(configState.availableOptions).map((category) => {
      const options = configState.availableOptions[category].map((option) => {
        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <li key={`${category}-${option}`}>{option}</li>
            <Button onClick={() => removePart(category, option)}>Remove</Button>
            <Form.Switch
              label="Out of stock"
              checked={option.includes("Out of Stock")}
              onClick={() => toggleOutOfStock(category, option)}
            />
          </div>
        );
      });

      return (
        <ul key={category} style={{ display: "grid", justifyItems: "left" }}>
          <label>{category}</label>
          {options}
        </ul>
      );
    });

  const currentCategories = () =>
    Object.keys(configState.availableOptions).map((category) => (
      <Dropdown.Item
        key={category}
        onClick={() => setSelectedCategory(category)}
      >
        {category}
      </Dropdown.Item>
    ));

  return (
    <div>
      <NavBar />
      <header
        className="internal-page"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <div>
          <h2>Current Options</h2>
          {currentOptions()}
        </div>
        <div>
          <Form>
            <InputGroup>
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary">
                  {selectedCategory}
                </Dropdown.Toggle>
                <Dropdown.Menu>{currentCategories()}</Dropdown.Menu>
              </Dropdown>
              <Form.Control
                placeholder="Add new part"
                value={newPartName}
                onChange={(input) => setNewPartName(input.target.value)}
              />
              <Button onClick={() => addPart()}>Submit</Button>
            </InputGroup>
          </Form>
        </div>
      </header>
    </div>
  );
}

export default InternalApp;
