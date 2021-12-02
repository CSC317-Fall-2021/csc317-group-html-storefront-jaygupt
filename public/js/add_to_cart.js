/* Pushes product to local storage when 'Add to Cart' button is clicked. */
async function addToCart() {
  const addToCartButtons = document.getElementsByClassName("add-to-cart");

  for (let i = 0; i < addToCartButtons.length; i++) {
    const addToCartButton = addToCartButtons[i];
    const correspondingIncrementAndDecrement = addToCartButton.nextElementSibling;
    const correspondingMinusButton = correspondingIncrementAndDecrement.firstElementChild;
    const correspondingPlusButton = correspondingIncrementAndDecrement.lastElementChild;
    const productID = addToCartButton.parentNode.id;
    
    addToCartButton.addEventListener("click", () => {
      // hide the "Add to Cart" button
      correspondingIncrementAndDecrement.style.display = "flex";
      addToCartButton.style.display = "none";
  
      // initial value is 1
      correspondingMinusButton.nextElementSibling.value = 1;

      // insert the product into the cart table: insert user_ID, product_ID, and quantity_bought (1)
      fetchData(`/products/insertProduct/${productID}`).then(result => {
        console.log(result);
      });
    });
  
    // if minus button is clicked
    correspondingMinusButton.addEventListener("click", () => { 
      // get the current quantity of the product
      var currentQuantity = correspondingMinusButton.nextElementSibling.value;

      currentQuantity--;

      // if the current quantity is 0, the user doesn't want the product
      if (currentQuantity == 0) {
        addToCartButton.style.display = "block";
        correspondingIncrementAndDecrement.style.display = "none";
      } else {
        correspondingMinusButton.nextElementSibling.value = currentQuantity; 
      }

      // update SQL database
      postData("/products/updateCart", {"productID": productID, "newQuantity": currentQuantity}).then(result => {
        console.log(result);
      });
    });
  
    // if plus button is clicked
    correspondingPlusButton.addEventListener("click", () => {
      // get the current quantity of the product
      var currentQuantity = correspondingMinusButton.nextElementSibling.value;
      
      // max is 10
      if (currentQuantity < 10) {
        currentQuantity++;

        correspondingMinusButton.nextElementSibling.value = currentQuantity;

        // update SQL database
        postData("/products/updateCart", {"productID": productID, "newQuantity": currentQuantity}).then(result => {
          console.log(result);
        });
      }
    });
  }
}