import axios from "axios";
const baseURL = "http://localhost:3001";

export async function getAvailableOptions() {
  const result = await axios.get(`${baseURL}/available-options`);
  return result.data;
}

export async function updateAvailableOptions(newOptions) {
  const result = await axios.put(`${baseURL}/available-options`, newOptions);
  return result.data;
}

export async function getCart() {
  const result = await axios.get(`${baseURL}/cart`);
  return result.data;
}

export async function updateCart(newCart) {
  const result = await axios.put(`${baseURL}/cart`, newCart);
  return result.data;
}

export async function getBikes() {
  const result = await axios.get(`${baseURL}/bikes`);
  return result.data;
}

export async function updateBikes(newBikes) {
  const result = await axios.put(`${baseURL}/bikes`, newBikes);
  return result.data;
}
