var data = {
  "products": [
    {
      "name": "Captain America",
      "price": 15.78,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi dolore officiis consequuntur laborum ad dolorem veritatis tenetur praesentium saepe fugiat! Laboriosam laborum veniam architecto aliquam commodi adipisci doloribus, quis sapiente earum voluptatem quas voluptate fugiat! Error officiis odio praesentium dolorum?",
      "imageURL": "images/product_images/action_figures/captain_america.jpeg"
    },
    {
      "name": "Batman",
      "price": 29.99,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi dolore officiis consequuntur laborum ad dolorem veritatis tenetur praesentium saepe fugiat! Laboriosam laborum veniam architecto aliquam commodi adipisci doloribus, quis sapiente earum voluptatem quas voluptate fugiat! Error officiis odio praesentium dolorum?",
      "imageURL": "images/product_images/action_figures/batman.jpg"
    },
    {
      "name": "Spider Man",
      "price": 28.88,
      "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi dolore officiis consequuntur laborum ad dolorem veritatis tenetur praesentium saepe fugiat! Laboriosam laborum veniam architecto aliquam commodi adipisci doloribus, quis sapiente earum voluptatem quas voluptate fugiat! Error officiis odio praesentium dolorum?",
      "imageURL": "images/product_images/action_figures/spider_man.jpeg"
    }
  ]
}

const productsArray = data.products;

function findProduct(productName) {
  for (let i = 0; i < productsArray.length; i++) {
    if (productsArray[i]["name"] == productName) {
      return productsArray[i];
    }
  }
}

/* Alerts when Leaving Page and Search Input has Content (Beginning) */
// get the product search input element
if (document.getElementById("productSearch") !== null) {
  const beforeUnloadListener = (event) => {
    event.preventDefault();

    // custom message can't be modified
    return event.returnValue = "Leave site?";
  };

  const productSearchInput = document.getElementById("productSearch");

  // add an event listener such that an alert triggers if search has content 
  // and window is being closed/going to a new tab
  productSearchInput.addEventListener("input", event => {
    if (event.target.value !== "") {
        // add the event listener
        addEventListener("beforeunload", beforeUnloadListener, {capture: true});
    } else {
        // remove the event listener when search is empty
        removeEventListener("beforeunload", beforeUnloadListener, {capture: true});
    }
  });
}
/* Alerts when Leaving Page and Search Input has Content (Ending) */