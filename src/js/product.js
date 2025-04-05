import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// Create a new data source for tents
const dataSource = new ProductData("tents");

// Get the product ID from the url
const productId = getParam("product");

// Creat a new instance of ProductDetails
const productDetails = new ProductDetails(productId, dataSource);

// Start everything
productDetails.init();
