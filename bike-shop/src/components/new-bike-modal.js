import { useState, useContext, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import CloseButton from "react-bootstrap/CloseButton";
import { BikesContext } from "../contexts/BikesContext";
import { updateBikes } from "../Router";

function NewBikeModal({ showModal, handleClose, availableOptions }) {
  const { bikesState, dispatch } = useContext(BikesContext);
  const [newBikeState, setNewBikeState] = useState({
    name: "",
    parts: {},
  });

  const handleAddNewBike = () => {
    async function updateData() {
      const newBikes = [
        ...bikesState.availableBikes,
        {
          id: bikesState.availableBikes.length + 1,
          name: newBikeState.name,
          parts: newBikeState.parts,
        },
      ];
      const result = await updateBikes(newBikes);

      dispatch({
        type: "update",
        availableBikes: result,
      });
    }

    updateData();
    handleClose();
  };

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
    Object.keys(availableOptions).map((category) => {
      const options = availableOptions[category].map((option) => {
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
