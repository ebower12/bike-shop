import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import NewBikeModal from "./new-bike-modal";
import { BikesContext } from "../contexts/BikesContext";

function BikesView({ internal, addItemToCartState }) {
  const [showModal, setShowModal] = useState(false);
  const { bikesState, dispatch } = useContext(BikesContext);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  function removeBike(id) {
    dispatch({
      type: "update",
      availableBikes: bikesState.availableBikes.filter(
        (bike) => bike.id !== id
      ),
    });
  }

  return (
    <div style={{ paddingTop: "10%" }}>
      <h1>Available Bikes</h1>
      <div hidden={!internal}>
        <NewBikeModal showModal={showModal} handleClose={() => handleClose()} />
        <Button onClick={handleShow}>Add Bike</Button>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {bikesState.availableBikes.map((bike) => (
          <div
            key={bike.id}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              margin: "10px",
            }}
          >
            <CloseButton variant="white" onClick={() => removeBike(bike.id)} />
            <h2>{bike.name}</h2>
            <ul>
              {Object.keys(bike.parts).map((part) => (
                <li key={part}>{`${part}: ${bike.parts[part]}`}</li>
              ))}
            </ul>
            <Button
              hidden={internal}
              variant="primary"
              onClick={() => addItemToCartState(bike)}
            >
              Add to Cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BikesView;
