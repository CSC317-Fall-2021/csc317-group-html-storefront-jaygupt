/* Pushes product to local storage when 'Add to Cart' button is clicked. */
const addToCartButtons = document.getElementsByClassName("add-to-cart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let quantities = JSON.parse(localStorage.getItem("quantities")) || [];

for (let i = 0; i < addToCartButtons.length; i++) {
  const addToCartButton = addToCartButtons[i];
  const productName = addToCartButton.parentNode.getElementsByClassName("product-title")[0].textContent;
  
  addToCartButton.addEventListener("click", () => {  
    cart.push(productName);
    quantities.push(1); // by default, each product starts out with a quantity of 1
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("quantities", JSON.stringify(quantities));
    location.reload();
  });
}