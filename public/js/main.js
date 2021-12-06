// returns corresponding category folder
const categoryToFolder = {
  "Action Figures": "action_figures",
  "Board Games": "board_games",
  "Building Blocks": "building_blocks",
  "Cards": "cards",
  "Cars and Motorcycles": "cars_and_motorcycles"
}

// fetches data from mySQL database, given an endpoint
async function fetchData(endpoint) {
  try {
    let response = await fetch(endpoint);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

// posts data to mySQL database, given an endpoint & the data
async function postData(endpoint, data = {}) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  return response.json();
}

// Search Bar
const productSearchInput = document.getElementById("productSearch");
productSearchInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    window.location.replace(`/search?name=${productSearchInput.value}`);
  }
});