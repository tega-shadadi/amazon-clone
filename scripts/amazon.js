//Generate HTML for each indiviadual product

let productsHTML=''
products.forEach((product)=>{
  productsHTML+=`
  
  <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${(product.rating.stars)*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${((product.priceCents)/100).toFixed(2)}
          </div>

          <div class="product-quantity-container">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id='${product.id}'>
            Add to Cart
          </button>
        </div>

  `
})
//display all products in a <div> container
document.querySelector(".products-grid").innerHTML=productsHTML
//Add products to cart
const addButtons=document.querySelectorAll(".js-add-to-cart");


addButtons.forEach((button)=>{

  button.addEventListener('click',()=>{
    const productId=button.dataset.productId

        // Check if the product already exists in the cart
    let existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += 1; // Increase quantity if found
    } else {
      cart.push({
        productId: productId,
        quantity: 1
      });
    }

    // Save the updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    console.log(cart);
  });

          
             console.log(cart)
            })


                 

