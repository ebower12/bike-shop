import "./css/internal.css";
import { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import Dropdown from "react-bootstrap/Dropdown";
import InputGroup from "react-bootstrap/InputGroup";
import NavBar from "./components/nav-bar";
import BikesView from "./components/bikes-view";
import { ConfigContext } from "./contexts/ConfigContext";

function InternalApp() {
  const [newPartName, setNewPartName] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");
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

  function addCatergory(category) {
    dispatch({
      type: "updateAvailableOptions",
      availableOptions: {
        ...configState.availableOptions,
        [category]: [],
      },
      selectedOptions: configState.selectedOptions,
    });
  }

  function removeCategory(category) {
    const newAvailableOptions = { ...configState.availableOptions };
    delete newAvailableOptions[category];
    dispatch({
      type: "updateAvailableOptions",
      availableOptions: newAvailableOptions,
      selectedOptions: configState.selectedOptions,
    });
  }

  const currentOptions = () =>
    Object.keys(configState.availableOptions).map((category) => {
      const options = configState.availableOptions[category].map((option) => {
        return (
          <div
            key={`${category}-${option}`}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <CloseButton
                variant="white"
                onClick={() => removePart(category, option)}
              />
              <Form.Switch
                defaultChecked={!option.includes("Out of Stock")}
                onClick={() => toggleOutOfStock(category, option)}
              />
            </div>
            <li>{option}</li>
          </div>
        );
      });

      return (
        <ul
          key={category}
          style={{
            display: "grid",
            listStyleType: "none",
          }}
        >
          <div style={{ alignItems: "center", display: "flex" }}>
            <CloseButton
              variant="white"
              onClick={() => removeCategory(category)}
            />
            <label style={{ fontSize: 32 }}>{category}</label>
          </div>
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
        <div style={{ padding: 20, flexBasis: "50%" }}>
          <h2>Current Options</h2>
          {currentOptions()}
        </div>
        <div
          style={{
            marginTop: "10%",
            marginLeft: "10%",
            flexBasis: "50%",
          }}
        >
          <Form>
            <InputGroup>
              <Form.Control
                maxLength={16}
                placeholder="Add new category"
                onChange={(input) => setNewCategoryName(input.target.value)}
              />
              <Button onClick={() => addCatergory(newCategoryName)}>
                Add Category
              </Button>
            </InputGroup>
            <InputGroup>
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary">
                  {selectedCategory}
                </Dropdown.Toggle>
                <Dropdown.Menu>{currentCategories()}</Dropdown.Menu>
              </Dropdown>
              <Form.Control
                maxLength={16}
                placeholder="Add new part"
                value={newPartName}
                onChange={(input) => setNewPartName(input.target.value)}
              />
              <Button onClick={() => addPart()}>Submit</Button>
            </InputGroup>
          </Form>
          <BikesView internal={true} />
        </div>
      </header>
    </div>
  );
}

export default InternalApp;
