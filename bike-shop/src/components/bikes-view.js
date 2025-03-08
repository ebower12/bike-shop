import { useState, useReducer, useEffect } from "react";
import Button from "react-bootstrap/Button";
import CloseButton from "react-bootstrap/CloseButton";
import NewBikeModal from "./new-bike-modal";
import bikesReducer, { initialBikesState } from "../reducers/bikesReducer";
import { getBikes, updateBikes } from "../Router";

function BikesView({ internal, addItemToCart, availableOptions }) {
  const [bikesState, bikesDispatch] = useReducer(
    bikesReducer,
    initialBikesState
  );
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    async function fetchData() {
      const result = await getBikes();

      bikesDispatch({
        type: "update",
        availableBikes: result,
      });
    }

    fetchData();
  }, []);

  const addNewBike = (newBikeState) => {
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

      bikesDispatch({
        type: "update",
        availableBikes: result,
      });
    }

    updateData();
  };

  const removeBike = (id) => {
    async function updateData() {
      const newBikes = bikesState.availableBikes.filter(
        (bike) => bike.id !== id
      );
      const result = await updateBikes(newBikes);

      bikesDispatch({
        type: "update",
        availableBikes: result,
      });
    }

    updateData();
  };

  return (
    <div style={{ paddingTop: "10%" }}>
      <h1>Available Bikes</h1>
      <div hidden={!internal}>
        <NewBikeModal
          showModal={showModal}
          handleClose={() => handleClose()}
          availableOptions={availableOptions}
          addNewBike={(newBikeState) => addNewBike(newBikeState)}
        />
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
            <CloseButton
              hidden={!internal}
              variant="white"
              onClick={() => removeBike(bike.id)}
            />
            <h2>{bike.name}</h2>
            <ul>
              {Object.keys(bike.parts).map((part) => (
                <li key={part}>{`${part}: ${bike.parts[part]}`}</li>
              ))}
            </ul>
            <Button
              hidden={internal}
              variant="primary"
              onClick={() => addItemToCart(bike)}
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
