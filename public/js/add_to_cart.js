/* Pushes product to local storage when 'Add to Cart' button is clicked. */

window.addEventListener("load", function() {
  const addToCartButtons = document.getElementsByClassName("add-to-cart");

  for (let i = 0; i < addToCartButtons.length; i++) {
    const addToCartButton = addToCartButtons[i];
    // console.log(addToCartButton);
    const correspondingIncrementAndDecrement = addToCartButton.nextElementSibling;
    const correspondingMinusButton = correspondingIncrementAndDecrement.firstElementChild;
    const correspondingPlusButton = correspondingIncrementAndDecrement.lastElementChild;
    const productName = addToCartButton.parentNode.getElementsByClassName("product-title")[0].textContent;
    
    addToCartButton.addEventListener("click", () => {
      // hide the "Add to Cart" button
      correspondingIncrementAndDecrement.style.display = "flex";
      addToCartButton.style.display = "none";
  
      // initial value is 1
      correspondingMinusButton.nextElementSibling.value = 1;
  
      cart.push(productName);
      quantities.push(1); // by default, each product starts out with a quantity of 1
      localStorage.setItem("cart", JSON.stringify(cart));
      localStorage.setItem("quantities", JSON.stringify(quantities));
    });
  
    // if minus button is clicked
    correspondingMinusButton.addEventListener("click", () => { 
      var currentQuantity = correspondingMinusButton.nextElementSibling.value;
        
      // find index of product in cart array
      const indexOfProduct = cart.indexOf(productName);
      
      // if the current quantity is 1, the user doesn't want the product
      if (currentQuantity == 1) {
        // update the cart and quantity in localStorage
  
        // splice both arrays, and set the new arrays in localStorage
        cart.splice(indexOfProduct, 1);
        quantities.splice(indexOfProduct, 1);
  
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("quantities", JSON.stringify(quantities));
  
        // show the original "Add to Cart" button
        addToCartButton.style.display = "block";
        correspondingIncrementAndDecrement.style.display = "none";
      } else {
        // update its quantity in quantities array
        quantities[indexOfProduct] = quantities[indexOfProduct] - 1;
  
        localStorage.setItem("quantities", JSON.stringify(quantities));
  
        currentQuantity--;
        correspondingMinusButton.nextElementSibling.value = currentQuantity; 
      }
    });
  
    // if plus button is clicked
    correspondingPlusButton.addEventListener("click", () => { 
      var currentQuantity = correspondingMinusButton.nextElementSibling.value;
      
      // max is 10
      if (currentQuantity < 10) {
        // find the index of the product and update its quantity in quantities array
        const indexOfProduct = cart.indexOf(productName);
        quantities[indexOfProduct] = quantities[indexOfProduct] + 1;
  
        localStorage.setItem("quantities", JSON.stringify(quantities));
        currentQuantity++; 
      }
    
      correspondingMinusButton.nextElementSibling.value = currentQuantity;
    });
  }
});