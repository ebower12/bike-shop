let bikes = {
  availableBikes: [],
};

export function getBikes() {
  return bikes;
}

export function updateBikes(newBikes) {
  bikes = newBikes;
  return bikes;
}
