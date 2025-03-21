import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Get the product ID from the url
const productId = getParam("product");

// Create a new data source for tents
const dataSource = new ProductData("tents");

// Creat a new instance of ProductDetails
const productDetails = new ProductDetails(productId, dataSource);

// Start everything
productDetails.init();

/* function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
  
}
  */
// add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
