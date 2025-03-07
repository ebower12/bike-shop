let availableOptions = {
  availableOptions: {
    frame: ["Full-Suspension", "Diamond", "Step-Through"],
    finish: ["Matte", "Shiny"],
    wheels: ["Road", "Mountain", "Fat Bike"],
    rimColor: ["Red", "Black", "Blue"],
    chain: ["Single-Speed", "8-Speed"],
  },
};

export function getAvailableOptions() {
  return availableOptions;
}

export function updateAvailableOptions(newOptions) {
  availableOptions = newOptions;
  return availableOptions;
}
