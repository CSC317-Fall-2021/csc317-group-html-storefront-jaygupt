/* Pushes product to local storage when 'Add to Cart' button is clicked. */

const addToCartButtons = document.getElementsByClassName("add-to-cart");

for (let i = 0; i < addToCartButtons.length; i++) {
  // const addToCartButton = addToCartButtons[i];
  // const correspondingIncrementAndDecrement = addToCartButton.nextSibling;
  // const correspondingMinusButton = correspondingIncrementAndDecrement.firstChild;
  // const correspondingPlusButton = correspondingIncrementAndDecrement.lastChild;
  // var currentQuantity = correspondingMinusButton.nextSibling.value; // to keep track of how much of the item the user wants
  // const productName = addToCartButton.parentNode.getElementsByClassName("product-title")[0].textContent;
  
  // addToCartButton.addEventListener("click", () => {
  //   // hide the "Add to Cart" button
  //   correspondingIncrementAndDecrement.style.display = "flex";
  //   addToCartButton.style.display = "none";

  //   // initial value is 1
  //   correspondingMinusButton.nextSibling.value = 1;

  //   cart.push(productName);
  //   quantities.push(1); // by default, each product starts out with a quantity of 1
  //   localStorage.setItem("cart", JSON.stringify(cart));
  //   localStorage.setItem("quantities", JSON.stringify(quantities));
  // });

  // // if minus button is clicked
  // correspondingMinusButton.addEventListener("click", () => { 
  //   var currentQuantity = correspondingMinusButton.nextSibling.value;
      
  //   // find index of product in cart array
  //   const indexOfProduct = cart.indexOf(productName);
    
  //   // if the current quantity is 1, the user doesn't want the product
  //   if (currentQuantity == 1) {
  //     // update the cart and quantity in localStorage

  //     // splice both arrays, and set the new arrays in localStorage
  //     cart.splice(indexOfProduct, 1);
  //     quantities.splice(indexOfProduct, 1);

  //     localStorage.setItem("cart", JSON.stringify(cart));
  //     localStorage.setItem("quantities", JSON.stringify(quantities));

  //     // show the original "Add to Cart" button
  //     addToCartButton.style.display = "block";
  //     correspondingIncrementAndDecrement.style.display = "none";
  //   } else {
  //     // update its quantity in quantities array
  //     quantities[indexOfProduct] = quantities[indexOfProduct] - 1;

  //     localStorage.setItem("quantities", JSON.stringify(quantities));

  //     currentQuantity--;
  //     correspondingMinusButton.nextSibling.value = currentQuantity; 
  //   }
  // });

  // // if plus button is clicked
  // correspondingPlusButton.addEventListener("click", () => {  
  //   var currentQuantity = correspondingMinusButton.nextSibling.value;
    
  //   // max is 10
  //   if (currentQuantity < 10) {
  //     // find the index of the product and update its quantity in quantities array
  //     const indexOfProduct = cart.indexOf(productName);
  //     quantities[indexOfProduct] = quantities[indexOfProduct] + 1;

  //     localStorage.setItem("quantities", JSON.stringify(quantities));
  //     currentQuantity++; 
  //   }
    
  //   correspondingMinusButton.nextSibling.value = currentQuantity;
  // });
}