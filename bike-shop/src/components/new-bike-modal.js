import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CloseButton from "react-bootstrap/CloseButton";

function NewBikeModal({
  showModal,
  handleClose,
  availableOptions,
  addNewBike,
}) {
  const [newBikeState, setNewBikeState] = useState({
    name: "",
    parts: {},
  });

  function handleAddNewBike() {
    addNewBike(newBikeState);
    handleClose();
  }

  function handleRadioSelect(category, option) {
    setNewBikeState({
      ...newBikeState,
      parts: {
        ...newBikeState.parts,
        [category]: option,
      },
    });
  }

  function handleBikeName(e) {
    setNewBikeState({
      ...newBikeState,
      name: e.target.value,
    });
  }

  function inValidConfig(category, option) {
    if (newBikeState.parts.wheels === "Mountain") {
      return category === "frame" && option !== "Full-Suspension";
    } else if (newBikeState.parts.wheels === "Fat Bike") {
      return category === "rimColor";
    } else return false;
  }

  const listOptions = () =>
    Object.keys(availableOptions).map((category) => {
      const options = availableOptions[category].map((option) => {
        return (
          <Form.Check
            type="radio"
            id={option}
            label={option}
            key={`${category}-${option}`}
            disabled={
              inValidConfig(category, option) || option.includes("Out of Stock")
            }
            checked={newBikeState.parts[category] === option}
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
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Add New Bike</Modal.Title>
        <CloseButton onClick={handleClose} />
      </Modal.Header>
      <Modal.Body>
        {listOptions()}
        <Form.Control
          type="text"
          placeholder="Bike Name"
          onChange={(e) => handleBikeName(e)}
          value={newBikeState.name}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleAddNewBike()}>Add Bike</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewBikeModal;
