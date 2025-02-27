import "./css/internal.css";
import { useState, useReducer } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import SplitButton from "react-bootstrap/DropdownButton";
import InputGroup from "react-bootstrap/InputGroup";
import NavBar from "./components/nav-bar";
import configReducer, { initialState } from "./reducers/configReducer";

function InternalApp() {
  const [newPartName, setNewPartName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("frame");
  const [configState, dispatch] = useReducer(configReducer, initialState);

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

  const currentOptions = () =>
    Object.keys(configState.availableOptions).map((category) => {
      const options = configState.availableOptions[category].map((option) => {
        return <li key={`${category}-${option}`}>{option}</li>;
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
              <SplitButton variant="outline-secondary" title="Category">
                {currentCategories()}
              </SplitButton>
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
