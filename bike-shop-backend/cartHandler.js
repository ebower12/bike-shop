let cart = {
  cartItems: [],
};

export function getCart() {
  return cart;
}

export function updateCart(newCart) {
  cart = newCart;
  return cart;
}
