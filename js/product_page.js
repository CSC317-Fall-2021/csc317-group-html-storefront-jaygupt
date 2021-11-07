function appendToMainProductDiv(productName) {
  // Create Element for Slider (Left Side)
  const sliderDivElement = document.createElement("div");
  sliderDivElement.setAttribute("id", "slider");
  const mainProductDivElement = document.getElementById("mainProduct");
  mainProductDivElement.appendChild(sliderDivElement);

  // Create Radio Input Elements & Append them to sliderDivElement
  for (let i = 1; i < 5; i++) {
    const radioInputSliderElement = document.createElement("input");
    radioInputSliderElement.setAttribute("type", "radio");
    radioInputSliderElement.setAttribute("name", "slider");
    radioInputSliderElement.setAttribute("id", "slide" + i);

    if (i == 1) {
      radioInputSliderElement.checked = true;
    }

    sliderDivElement.appendChild(radioInputSliderElement);
  }

  // Create Element for Main Product Image (Left Side)
  const slidesDivElement = document.createElement("div");
  slidesDivElement.setAttribute("id", "slides");
  sliderDivElement.appendChild(slidesDivElement);

  const overflowDivElement = document.createElement("div");
  overflowDivElement.setAttribute("id", "overflow");
  slidesDivElement.appendChild(overflowDivElement);

  const innerDivElement = document.createElement("div");
  innerDivElement.className = "inner";
  overflowDivElement.appendChild(innerDivElement);

  for (var i = 1; i < 5; i++) {
    const slideClassDivElement = document.createElement("div");
    slideClassDivElement.classList.add("slide", "slide-" + i);
    innerDivElement.appendChild(slideClassDivElement);

    const slideContentDivElement = document.createElement("div");
    slideContentDivElement.className = "slide-content";

    slideClassDivElement.appendChild(slideContentDivElement);
  }

  const product = findProduct(productName);
  const productPrice = product.price;
  const productDescription = product.description;
  const productimageSrc = product.imageSrc;

  // Create Element for Product Specification (On Right Side)
  const productSpecificationDivElement = document.createElement("div");
  productSpecificationDivElement.className = "product-specification";

  const productTitleDivElement = document.createElement("div");
  productTitleDivElement.className = "product-title";
  productTitleDivElement.textContent = productName;
  productSpecificationDivElement.appendChild(productTitleDivElement);

  const productPriceDivElement = document.createElement("div");
  productPriceDivElement.className = "product-price";
  productPriceDivElement.textContent = "Price: $" + productPrice;
  productSpecificationDivElement.appendChild(productPriceDivElement);

  const productDescriptionDivElement = document.createElement("div");
  productDescriptionDivElement.className = "product-description";
  productDescriptionDivElement.textContent = productDescription;
  productSpecificationDivElement.appendChild(productDescriptionDivElement);

  const mainAddToCartButton = document.createElement("button");
  mainAddToCartButton.classList.add("btn", "add-to-cart");

  mainAddToCartButton.textContent = "Add to Cart";
  productSpecificationDivElement.appendChild(mainAddToCartButton);

  // check to see if product is in cart already
  const productInCart = cart.includes(productName)
  // by default, itemQuantity is 0
  var itemQuantity = 0;

  // find quantity of item using cart and quantities array (if it is in cart)
  if (productInCart) {
    const indexOfProduct = cart.indexOf(productName); // find index of product in cart array
    itemQuantity = quantities[indexOfProduct];
  }

  /* 
  <div class="increment-and-decrement">
      <button class="minus-btn">-</button>
      <input type="text" class="quantity" value="1" readonly>
      <button class="plus-btn">+</button>
  </div>
  */
  const incrementAndDecrementDivElement = document.createElement("div");
  productSpecificationDivElement.appendChild(incrementAndDecrementDivElement);
  incrementAndDecrementDivElement.className = "increment-and-decrement";

  // if product is not in cart yet, do not show the increment/decrement counter
  if (!productInCart) {
    incrementAndDecrementDivElement.setAttribute("style", "display:none");
  } else {
    // product is in cart; hide the main add to cart button
    mainAddToCartButton.setAttribute("style", "display: none");
  }

  const minusButton = document.createElement("button");
  incrementAndDecrementDivElement.appendChild(minusButton);
  minusButton.className = "minus-btn";
  minusButton.textContent = "-";
  const quantityInputElement = document.createElement("input");
  incrementAndDecrementDivElement.appendChild(quantityInputElement);
  quantityInputElement.setAttribute("type", "text");
  quantityInputElement.setAttribute("class", "quantity");
  quantityInputElement.setAttribute("value", itemQuantity);
  quantityInputElement.readOnly = true;
  const plusButton = document.createElement("button");
  incrementAndDecrementDivElement.appendChild(plusButton);
  plusButton.className = "plus-btn";
  plusButton.textContent = "+";

  mainProductDivElement.appendChild(productSpecificationDivElement);

  // Create Element for Image, and Append it Wherever it is Needed
  const productImageElement = document.createElement("img");
  productImageElement.setAttribute("src", "../../" + productimageSrc);
  productImageElement.setAttribute("alt", productName);

  const slideContents = document.getElementsByClassName("slide-content");

  // TODO: Submit as Issue Faced: Couldn't simply use append Child; 
  // had to use cloneNode method as appendChild was only appending the last
  // image element
  for (let i = 0; i < slideContents.length; i++) {
    slideContents[i].appendChild(productImageElement.cloneNode(true));
  }

  // Do the same for Mini Image Elements
  const miniImagesDivElement = document.createElement("div");
  miniImagesDivElement.setAttribute("id", "miniImages");

  // append the mini images to the miniImagesDivElement
  for (var i = 1; i < 5; i++) {
    const miniImageDivElement = document.createElement("div");
    miniImageDivElement.className = "mini-image";
    miniImagesDivElement.appendChild(miniImageDivElement);

    const miniImageLabelElement = document.createElement("label");
    miniImageDivElement.appendChild(miniImageLabelElement);

    miniImageLabelElement.setAttribute("for", "slide" + i);
    miniImageLabelElement.className = "slide-" + i;
    miniImageLabelElement.appendChild(productImageElement.cloneNode(true));
  }

  sliderDivElement.appendChild(miniImagesDivElement);

  /* Use DOM to Add to Similar Products Div Element */
  const similarProductsDivElement = document.getElementsByClassName("similar-products")[0];
  const similarProductsArray = findSimilarProducts(productName);

  for (let i = 0; i < similarProductsArray.length; i++) {
    const similarProductName = similarProductsArray[i];
    const similarProductInformation = findProduct(similarProductName);
    const similarProductPageURL = similarProductInformation.pageURL;
    const similarProductimageSrc = similarProductInformation.imageSrc;
    const similarProductPrice = similarProductInformation.price;

    const similarProductDivElement = document.createElement("div");
    similarProductDivElement.className = "similar-product";
    similarProductsDivElement.appendChild(similarProductDivElement);

    const similarProductAElement = document.createElement("a");
    similarProductAElement.setAttribute("href", similarProductPageURL);
    similarProductDivElement.appendChild(similarProductAElement);

    const similarProductImgElement = document.createElement("img");
    similarProductImgElement.className = "similar-product-image";
    similarProductImgElement.setAttribute("src", "../../" + similarProductimageSrc);
    similarProductImgElement.setAttribute("alt", similarProductName);
    similarProductAElement.appendChild(similarProductImgElement);

    const similarProductTitleDivElement = document.createElement("div");
    similarProductTitleDivElement.classList.add("similar-product-title", "product-title");
    similarProductTitleDivElement.textContent = similarProductName;
    similarProductDivElement.appendChild(similarProductTitleDivElement);

    const similarProductPriceDivElement = document.createElement("div");
    similarProductPriceDivElement.className = "similar-product-price";
    similarProductPriceDivElement.textContent = "$" + similarProductPrice;
    similarProductDivElement.appendChild(similarProductPriceDivElement);

    const similarProductAddToCartButton = document.createElement("button");
    similarProductAddToCartButton.classList.add("btn", "add-to-cart");
    similarProductAddToCartButton.textContent = "Add to Cart";
    similarProductDivElement.appendChild(similarProductAddToCartButton);

    // check to see if product is in cart already
    const productInCart = cart.includes(similarProductName)
    // by default, itemQuantity is 0
    var itemQuantity = 0;

    // find quantity of item using cart and quantities array (if it is in cart)
    if (productInCart) {
      const indexOfProduct = cart.indexOf(similarProductName); // find index of product in cart array
      itemQuantity = quantities[indexOfProduct];
    }

    /* 
    <div class="increment-and-decrement">
        <button class="minus-btn">-</button>
        <input type="text" class="quantity" value="1" readonly>
        <button class="plus-btn">+</button>
    </div>
    */
    const incrementAndDecrementDivElement = document.createElement("div");
    similarProductDivElement.appendChild(incrementAndDecrementDivElement);
    incrementAndDecrementDivElement.className = "increment-and-decrement";

    // if product is not in cart yet, do not show the increment/decrement counter
    if (!productInCart) {
      incrementAndDecrementDivElement.setAttribute("style", "display:none");
    } else {
      // product is in cart; hide the similar product add to cart button
      similarProductAddToCartButton.setAttribute("style", "display: none");
    }

    const minusButton = document.createElement("button");
    incrementAndDecrementDivElement.appendChild(minusButton);
    minusButton.className = "minus-btn";
    minusButton.textContent = "-";
    const quantityInputElement = document.createElement("input");
    incrementAndDecrementDivElement.appendChild(quantityInputElement);
    quantityInputElement.setAttribute("type", "text");
    quantityInputElement.setAttribute("class", "quantity");
    quantityInputElement.setAttribute("value", itemQuantity);
    quantityInputElement.readOnly = true;
    const plusButton = document.createElement("button");
    incrementAndDecrementDivElement.appendChild(plusButton);
    plusButton.className = "plus-btn";
    plusButton.textContent = "+";
  }
}