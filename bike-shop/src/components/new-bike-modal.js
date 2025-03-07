import { useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CloseButton from "react-bootstrap/CloseButton";
import { BikesContext } from "../contexts/BikesContext";
import { ConfigContext } from "../contexts/ConfigContext";

function NewBikeModal({ showModal, handleClose }) {
  const { bikesState, dispatch } = useContext(BikesContext);
  const { configState } = useContext(ConfigContext);

  const [newBikeState, setNewBikeState] = useState({
    name: "",
    parts: {},
  });

  function handleAddNewBike() {
    dispatch({
      type: "update",
      availableBikes: [
        ...bikesState.availableBikes,
        {
          id: bikesState.availableBikes.length + 1,
          name: newBikeState.name,
          parts: newBikeState.parts,
        },
      ],
    });

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

  const listOptions = () =>
    Object.keys(configState.availableOptions).map((category) => {
      const options = configState.availableOptions[category].map((option) => {
        return (
          <Form.Check
            type="radio"
            id={option}
            label={option}
            key={`${category}-${option}`}
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
