import {
  getLocalStorage,
  setLocalStorage,
  loadHeaderFooter,
} from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");
  const productList = document.querySelector(".product-list");
  const cartFooter = document.querySelector(".cart-footer");

  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    productList.innerHTML = htmlItems.join("");

    // Show the cart footer
    cartFooter.classList.remove("hide");

    // Calculate and display the total
    const total = cartItems.reduce(
      (sum, item) => sum + Number(item.FinalPrice),
      0,
    );
    const totalElement = cartFooter.querySelector(".cart-total");
    totalElement.textContent = `Total: $${total.toFixed(2)}`;

    // Attach remove event listeners to each "X"
    attachRemoveListeners();
  } else {
    // Cart is empty
    productList.innerHTML = "<p>Your cart is empty.</p>";
    cartFooter.classList.add("hide"); // Hide the footer
  }
}

function cartItemTemplate(item) {
  
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Images.PrimaryExtraLarge}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <span class="remove-item" data-id="${item.Id}">X</span> <!-- Add "X" for removal -->
  </li>`;
}
function attachRemoveListeners() {
  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach((button) => {
    button.addEventListener("click", removeItemFromCart);
  });
}

function removeItemFromCart(event) {
  const itemId = event.target.getAttribute("data-id");

  // Get the current cart items from localStorage
  let cartItems = getLocalStorage("so-cart");

  // Filter out the item that was clicked
  cartItems = cartItems.filter((item) => item.Id !== itemId);

  // Update localStorage with the new cart items
  setLocalStorage("so-cart", cartItems);

  // Re-render the cart contents after removal
  renderCartContents();
}

// Initial render of the cart
renderCartContents();
