import {products, getProduct} from './products.js';




export let cart = [
  {
   productId:'bc2847e9-5323-403f-b7cf-57fde044a955',
   quantity: 2,
   deliveryOptionId: '2'
  },
  {
    productId:'aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f',
    quantity: 3,
    deliveryOptionId:'3'
   },];

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

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
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

    }
);
  }

  

  // Save the updated cart to localStorage
  
  saveToStorage()
  
  console.log("Cart updated and saved to localStorage:", cart);
}

console.log("Initial cart state:", cart);
//function to delete item in the cart

const newCart=[]

export function deleteItem(productId) {
  cart = cart.filter(item => item.productId !== productId);
  // Save the updated cart to localStorage
  saveToStorage()
  console.log("Item deleted and cart updated:", cart);
}


// Array to store selected products with their quantities
export const cartItems = [];


//Get items from cart and search products array in ../data/products.js using id 
//and return them and stored them to cartItems array but with the quantity from the cart
cart.forEach((cartItem) => {
    //get the Id
    const id=cartItem.productId
    //console.log(cartItem)
    //search in products
    
    const product=getProduct(id);
        
    //return that product
    //push it in cartItems along with cart.quantity
    if (product) {
      // Create a new object that includes the product details and the quantity
      const productWithQuantity = {
        ...product,
        quantity: cartItem.quantity,
        deliveryOptionId: cartItem.deliveryOptionId || deliveryOptions[0].id 
      };
  
      // Push the new object into the cartItems array
      cartItems.push(productWithQuantity);
    }

})

// Now `cartItems` contains the selected products along with their quantities
//console.log(cartItems); // Check if the products are correctly matched



export function updateDeliveryOption(productId, deliveryOptionId){
  
     
      let matchingItem;
      //search in products
      cart.forEach((cartItem)=>{
        
        if (productId === cartItem.productId){
          matchingItem = cartItem;
         
        }
      })
       
      matchingItem.deliveryOptionId = deliveryOptionId;

     // Rebuild cartItems to reflect the changes
      cartItems.length = 0; // Clear the old data
      cart.forEach(cartItem => {
        const product = products.find(product => product.id === cartItem.productId);
        if (product) {
          cartItems.push({
            ...product,
            quantity: cartItem.quantity,
            deliveryOptionId: cartItem.deliveryOptionId
          });
        }
      })

      
      saveToStorage()
}


