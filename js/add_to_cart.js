/* Pushes product to local storage when 'Add to Cart' button is clicked. */
const addToCartButtons = document.getElementsByClassName("add-to-cart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

for (let i = 0; i < addToCartButtons.length; i++) {
  const addToCartButton = addToCartButtons[i];
  const productName = addToCartButton.parentNode.getElementsByClassName("product-title")[0].textContent;
  
  addToCartButton.addEventListener("click", () => {  
    cart.push(productName);
    localStorage.setItem("cart", JSON.stringify(cart));
  });
}