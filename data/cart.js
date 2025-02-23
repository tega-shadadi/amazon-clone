export const cart = [];

// Retrieve the cart from localStorage at the beginning
const storedCart = localStorage.getItem("cart");
if (storedCart) {
  const parsedCart = JSON.parse(storedCart);
  cart.length = 0; // Clear the existing cart array
  cart.push(...parsedCart); // Populate it with the parsed data
  console.log("Cart loaded from localStorage:", cart);
} else {
  console.log("No cart found in localStorage, starting with an empty cart.");
}

export function addToCart(productContainer, productId) {
  // Getting the selected number of products
  let selectedValue = parseInt(productContainer.querySelector(".js-select").value);

  // Check if the product already exists in the cart
  let existingItem = cart.find(item => item.productId === productId);

  if (existingItem) {
    existingItem.quantity += selectedValue; // Increase quantity if found
  } else {
    cart.push({
      productId: productId,
      quantity: selectedValue
    });
  }

  // Save the updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  console.log("Cart updated and saved to localStorage:", cart);
}

console.log("Initial cart state:", cart);





