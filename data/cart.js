export let cart = [];

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
    existingItem.quantity += selectedValue;
     // Increase quantity if found
     
  } else {
    cart.push({
      productId: productId,
      quantity: selectedValue,
      deliveryOptionId: '1'

    },
  {
   productId:'bc2847e9-5323-403f-b7cf-57fde044a955',
   quantity: 2,
   deliveryOptionId: '2'
  },
  {
    productId:'aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f',
    quantity: 3,
    deliveryOptionId:'3'
   },
);
  }

  // Save the updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  console.log("Cart updated and saved to localStorage:", cart);
}

console.log("Initial cart state:", cart);
//function to delete item in the cart

const newCart=[]

export function deleteItem(productId) {
  cart = cart.filter(item => item.productId !== productId);
  // Save the updated cart to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  console.log("Item deleted and cart updated:", cart);
}




