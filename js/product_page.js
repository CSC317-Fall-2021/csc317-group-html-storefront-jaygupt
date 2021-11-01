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
  const productImageURL = product.imageURL;

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

  mainProductDivElement.appendChild(productSpecificationDivElement);

  // Create Element for Image, and Append it Wherever it is Needed
  const productImageElement = document.createElement("img");
  productImageElement.setAttribute("src", "../../" + productImageURL);
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
    const similarProductImageURL = similarProductInformation.imageURL;
    const similarProductPrice = similarProductInformation.price;

    const similarProductDivElement = document.createElement("div");
    similarProductDivElement.className = "similar-product";
    similarProductsDivElement.appendChild(similarProductDivElement);

    const similarProductAElement = document.createElement("a");
    similarProductAElement.setAttribute("href", similarProductPageURL);
    similarProductDivElement.appendChild(similarProductAElement);

    const similarProductImgElement = document.createElement("img");
    similarProductImgElement.className = "similar-product-image";
    similarProductImgElement.setAttribute("src", "../../" + similarProductImageURL);
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
  }
}