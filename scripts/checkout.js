import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js"

// Array to store selected products with their quantities
const cartItems = [];


//Get items from cart and search products array in ../data/products.js using id 
//and return them and stored them to cartItems array but with the quantity from the cart
cart.forEach((cartItem) => {
    //get the Id
    const id=cartItem.productId

    //search in products
    const product=products.find((product)=>id===product.id);
    console.log(product)   
    //return that product
    //push it in cartItems along with cart.quantity
    if (product) {
      // Create a new object that includes the product details and the quantity
      const productWithQuantity = {
        ...product,
        quantity: cartItem.quantity
      };
  
      // Push the new object into the cartItems array
      cartItems.push(productWithQuantity);
    }

})

// Now `cartItems` contains the selected products along with their quantities
console.log(cartItems); // Check if the products are correctly matched

// Function to render cart items into HTML
function renderCartItems() {
  let cartHTML = "";

  cartItems.forEach((item) => {
    cartHTML += `
          <div class="cart-item-container js-cart-item-container">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${item.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${item.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(item.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${item.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${item.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${item.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${item.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>

    `;
  });

  document.querySelector(".js-order-summary").innerHTML = cartHTML;
}

// Call the function to render the cart items
renderCartItems();
