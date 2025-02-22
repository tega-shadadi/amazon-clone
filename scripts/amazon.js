// Generate HTML for each individual product

let productsHTML = '';
products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars" src="images/ratings/rating-${(product.rating.stars) * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${((product.priceCents) / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select class="js-select">
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
  `;
});

// Display all products in a <div> container
document.querySelector(".products-grid").innerHTML = productsHTML;

// Add products to cart
const addButtons = document.querySelectorAll(".js-add-to-cart");

let timeoutId;
//Adding an event listener to the Add to Cart button
addButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;

    //Getting the selected number of products 
    // Get the correct product container
    const productContainer = button.closest(".product-container");

    let selectedValue=parseInt(productContainer.querySelector(".js-select").value)

    

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
    localStorage.setItem("cart", JSON.stringify(cart));

    let cartQuantity = 0
    cart.forEach((item)=>{
      cartQuantity += item.quantity
    })
    document.querySelector(".js-cart-quantity").innerHTML=`${cartQuantity}`
    //The Added to Cart messsage should disapear after 2 seconds
    clearTimeout(timeoutId);
    timeoutId=setTimeout(()=>{
      productContainer.querySelector(".added-to-cart").classList.remove("show-added-to-cart")
    },2000)
   
    productContainer.querySelector(".added-to-cart").classList.add("show-added-to-cart")
    
    console.log(cart);
  });
});




