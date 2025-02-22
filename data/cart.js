export const cart=[];
//cart=localStorage.getItem("cart",JSON.parse(cart))
//console.log(cart);
export function addToCart(productContainer,productId){
  //Getting the selected number of products 
    

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
    localStorage.setItem("cart", JSON.stringify(cart));}