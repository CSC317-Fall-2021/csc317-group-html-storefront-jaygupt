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