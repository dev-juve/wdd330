import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.dataSource = dataSource;
        this.product = {};
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);

        this.renderProductDetails();

        // Adding event listener for the "Add to Cart" button
        document.getElementById("add-to-cart")
            .addEventListener("click", this.addProductToCart.bind(this));
    }

    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);

        // Create and show the success message
        const message = `${this.product.NameWithoutBrand} added to cart successfully!`;
        const banner = document.getElementById("message-banner");

        banner.textContent = message;
        banner.style.display = "block";
        banner.classList.add("show-banner"); // Optional: use a CSS class for transitions

        // Hide the banner after 3 seconds
        setTimeout(() => {
            banner.style.display = "none";
            banner.textContent = "";
            banner.classList.remove("show-banner");
        }, 3000);
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}

function productDetailsTemplate(product) {
    document.querySelector("h2").textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
    document.querySelector("#p-brand").textContent = product.Brand.Name;
    document.querySelector("#p-name").textContent = product.NameWithoutBrand;

    const productImage = document.querySelector("#p-image");
    productImage.src = product.Images.PrimaryExtraLarge;
    productImage.alt = product.NameWithoutBrand;

    const euroPrice = new Intl.NumberFormat("de-DE", {
        style: "currency", currency: "EUR",
    }).format(Number(product.FinalPrice) * 0.85);
    document.querySelector("#p-price").textContent = `${euroPrice}`;
    document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
    document.querySelector("#p-description").innerHTML = product.DescriptionHtmlSimple;

    document.querySelector("#add-to-cart").dataset.id = product.Id;
}
