import { cart,deleteItem,cartItems,updateDeliveryOption } from "../data/cart.js";

import { formatCurrency } from "./utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import {deliveryOptions} from '../data/deliveryOptions.js'


//update the quantity number from the cart and display it the top at the loading of a page
updateQuantity()
// Array to store selected products with their quantities

// Function to render cart items into HTML
function renderCartItems() {
  let cartHTML = "";


  cartItems.forEach((item) => {

    const deliveryOptionId = item.deliveryOptionId;

    let deliveryOption;

    deliveryOptions.forEach((option)=>{
      if (option.id === deliveryOptionId){
        deliveryOption = option;
      }
    })
    //calculating the date
    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays, 'days'

    );
    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );
   

    cartHTML += `
          <div class="cart-item-container js-cart-item-container js-cart-item-container-${item.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
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
                  <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${item.id}">
                   <!-- Update-->
                    <input class="quantity-input"></input><span class="save-quantity-link link-primary"> save  </span>
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${item.id}">
                    Delete
                  </span>
                </div>
              </div>
              

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>               
                ${deliveryOptionsHTML(item)}          
              </div>
          </div>
       </div>
    `;
  });

  document.querySelector(".js-order-summary").innerHTML = cartHTML;

  // Now, select the newly created elements and attach event listeners
  const deliveryOptionElements = document.querySelectorAll(".js-delivery-option");

  deliveryOptionElements.forEach((element) => {
    element.addEventListener("click", () => {
      console.log(element.dataset.productId);
      const productId = element.dataset.productId;
      const deliveryOptionId = element.dataset.deliveryOptionId;
      updateDeliveryOption(productId, deliveryOptionId);
      renderCartItems(); // Re-render the cart to reflect the changes
    });
  });


}

// Call the function to render the cart items
renderCartItems();

  const deleteButtons=document.querySelectorAll(".js-delete-link")
//Adding an event listener for delete button
  deleteButtons.forEach((button)=>{ 
    button.addEventListener('click',()=>{
      console.log("event listener working")
      console.log(button.dataset.productId)
      deleteItem(button.dataset.productId);
      const container=document.querySelector(`.js-cart-item-container-${button.dataset.productId}`);
      container.remove()
//Updating the checkout items at the top every after deleting an item
      updateQuantity()

  
    })
  })

//Update checkout items number
function updateQuantity(){
let cartQuantity = 0
    cart.forEach((item)=>{
      cartQuantity += item.quantity
    })
    document.querySelector(".js-quantity-items").innerHTML=`${cartQuantity} items`

}



//update Quantinty link
const updateLink=document.querySelectorAll(".js-update-quantity-link")
updateLink.forEach((link)=>{
  link.addEventListener('click',()=>{
      console.log(link.dataset.productId)

    document.querySelector(".quantity-input").classList.add("quantity-input-appear")
    document.querySelector(".save-quantity-link").classList.add("save-quantity-link-appear");
  });
});

//save-link in update
const saveLink=document.querySelectorAll(".save-quantity-link")
saveLink.forEach((link) => {
  link.addEventListener('click',()=>{
    
    document.querySelector(".quantity-input").classList.add("quantity-input-appear2");
      document.querySelector(".save-quantity-link").classList.add("save-quantity-link-appear2");
  })
})


  //Generating delivery option HTML
function deliveryOptionsHTML(item){

  let html='';


  deliveryOptions.forEach((deliveryOption)=>{

    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays, 'days'

    );
    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );
    const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;

    const isChecked = deliveryOption.id === item.deliveryOptionId
    
    html+=
    `
            
        <div class="delivery-option js-delivery-option"
        data-product-id="${item.id}"
        data-delivery-option-id="${deliveryOption.id}"

        >
            <input type="radio" ${isChecked?'checked':''}
               class="delivery-option-input"
              name="delivery-option-${item.id}">
               
                  <div>
                    <div class="delivery-option-date">
                      ${dateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} Shipping
                    </div>
                  </div>
                </div>
    `
  })
  return html
}
/*
document.querySelectorAll('.js-delivery-option').forEach((element)=>{
  element.addEventListener('click', ()=>{
    //Shorthand property just for practice
    console.log(element.dataset.productId)
    const productId = element.dataset.productId;
    const deliveryOptionId = element.dataset.deliveryOptionId;
    updateDeliveryOption(productId, deliveryOptionId);
  })
})*/