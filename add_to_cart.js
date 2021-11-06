/*increments or decrements based on selection*/
function start(ths){
  ths.parentElement.style.display = 'none';
  ths.parentElement.nextElementSibling.classList.remove("disabled");
}

function add(ths){
  var input = ths.previousElementSibling;
  input.value = Number(input.value)+1;
}

function minus(ths){
  var input = ths.nextElementSibling;
  var counter = Number(input.value)-1;
  if(counter == 0){
    ths.parentElement.previousElementSibling.style.display = 'block';
    ths.parentElement.classList.add("disabled");
    return false;
  }
  input.value = counter;
}


/* Pushes product to local storage when 'Add to Cart' button is clicked. */
const addToCartButtons = document.querySelectorAll(".add-to-cart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

for (let i = 0; i < addToCartButtons.length; i++) {
  const addToCartButton = addToCartButtons[i];
  const productName = addToCartButton.parentElement.parentElement.parentElement.querySelector(".product-title").innerHTML;
  
  addToCartButton.addEventListener("click", function(){  
    cart.push(productName);
    localStorage.setItem("cart", JSON.stringify(cart));
    // location.reload();
  });
}