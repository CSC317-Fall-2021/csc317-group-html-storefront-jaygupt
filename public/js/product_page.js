function createSliderRadioButtons() {
  var sliderRadioButtons = "";
  for (var i = 1; i < 5; i++) {
    sliderRadioButtons += `<input type="radio" name="slider" id="slide${i}">`;
  }

  return sliderRadioButtons;
}

function createSlideContentDivs(productTitle, productImageURL) {
  var slideContentDivs = "";
  for (var i = 1; i < 5; i++) {
    slideContentDivs += `
    <div class="slide slide-${i}">
      <div class="slide-content">
        <img src="${productImageURL}" alt="${productTitle}">
      </div>
    </div>  
    `;
  }

  return slideContentDivs;
}

function createMiniImagesDiv(productTitle, productImageURL) {
  var miniImagesDiv = "";
  for (var i = 1; i < 5; i++) {
    miniImagesDiv += `
    <div class="mini-image">
      <label for="slide${i}" class="slide-${i}">
        <img src="${productImageURL}" alt="${productTitle}">
      </label>
    </div>
    `;
  }

  return miniImagesDiv;
}

function createSimilarProductsDiv(similarProductsData, productCategoryFolder) {
  var similarProductsDiv = "";
  for (var i = 0; i < similarProductsData.length; i++) {
    const similarProductID = similarProductsData[i].product_ID;
    const similarProductTitle = similarProductsData[i].name;
    const similarProductFile = similarProductsData[i].file_name;
    const similarProductPrice = similarProductsData[i].price;
    const similarProductImageURL = `../../images/product_images/${productCategoryFolder}/${similarProductFile}.jpg`;

    similarProductsDiv += `
    <div id=${similarProductID} class="similar-product">
      <a href="${similarProductFile}.html">
        <img class="similar-product-image" src="${similarProductImageURL}" alt="${similarProductTitle}">
      </a>
      <div class="similar-product-title product-title">${similarProductTitle}</div>
      <div class="similar-product-price">$${similarProductPrice}</div>
      <button class="btn add-to-cart">Add to Cart</button>
      <div class="increment-and-decrement" style="display:none">
        <button class="minus-btn">-</button>
        <input type="text" class="quantity" value="0" readonly="">
        <button class="plus-btn">+</button>
      </div>
    </div>
    `;
  }

  return similarProductsDiv;
}

async function createMainProductDivElement(mainProductDivElement, sliderRadioButtons, slideContentDivs, miniImagesDiv, productID, productTitle, productPrice, productDescription) {
  mainProductDivElement.innerHTML += 
    `<div id="slider">
      ${sliderRadioButtons}
      <div id="slides">
        <div id="overflow">
          <div class="inner">
            ${slideContentDivs}
          </div>
        </div>
      </div>
      <div id="miniImages">
        ${miniImagesDiv}
      </div>
    </div>
    <div id=${productID} class="product-specification">
      <div class="product-title">${productTitle}</div>
      <div class="product-price">Price: $${productPrice}</div>
      <div class="product-description">${productDescription}</div>
      <button class="btn add-to-cart">Add to Cart</button>
      <div class="increment-and-decrement" style="display: none">
        <button class="minus-btn">-</button>
        <input type="text" class="quantity" value="0" readonly>
        <button class="plus-btn">+</button>
      </div>
    </div>`;
}

async function appendToMainProductDiv(productName) {
  // await fetchData
  var productData = await fetchData(`/products/${productName}`);
  productData = productData[0];

  const productID = productData.product_ID;
  const productTitle = productData.name;
  const productCategory = productData.category;
  const productCategoryFolder = categoryToFolder[productCategory];
  const productFile = productData.file_name;
  const productPrice = productData.price;
  const productDescription = productData.description;
  const productImageURL = `../../images/product_images/${productCategoryFolder}/${productFile}.jpg`;

  const mainProductDivElement = document.getElementById("mainProduct");
  const sliderRadioButtons = createSliderRadioButtons();
  const slideContentDivs = createSlideContentDivs(productTitle, productImageURL);
  const miniImagesDiv = createMiniImagesDiv(productTitle, productImageURL);

  createMainProductDivElement(mainProductDivElement, sliderRadioButtons, slideContentDivs, miniImagesDiv, productID, productTitle, productPrice, productDescription);

  const similarProductsData = await fetchData(`/products/similarProducts/${productCategory}/${productTitle}`);
  const similarProductsDivElement = document.getElementsByClassName("similar-products")[0];
  similarProductsDivElement.innerHTML = createSimilarProductsDiv(similarProductsData, productCategoryFolder);

  addToCart();
}