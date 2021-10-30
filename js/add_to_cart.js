/* Pushes main product to local storage when 'Add to Cart' button is clicked. */

// TODO: Might Need to Modify This Due to New Variables on Individual Product Pages
// selects the entire main product div
const mainProduct = document.getElementById("mainProduct");

// selects the product specification portion of the main product div
const mainProductSpecification = mainProduct.getElementsByClassName("product-specification")[0];

// get product name, price, image, and description using product specification
const mainProductName = mainProductSpecification.getElementsByClassName("product-title")[0].textContent;
const mainProductPrice = mainProductSpecification.getElementsByClassName("product-price")[0].textContent;
const mainProductDescription = mainProductSpecification.getElementsByClassName("product-description")[0].textContent;
const mainProductImage = mainProduct.getElementsByClassName("slide-content")[0].getElementsByTagName("img")[0].src;

// selects the add to cart button of the main product div
const atcMainProduct = mainProductSpecification.getElementsByClassName("btn")[0];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

atcMainProduct.addEventListener("click", () => {
  // console.log(`Name: ${mainProductName}`);
  // console.log(`Price: ${mainProductPrice}`);
  // console.log(`Description: ${mainProductDescription}`);
  // console.log(`Image: ${mainProductImage}`);

  productInformation = [mainProductName, mainProductPrice, mainProductDescription, mainProductImage];

  cart.push(productInformation);

  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
});