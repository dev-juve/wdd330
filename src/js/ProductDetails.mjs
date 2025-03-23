import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource){
        this.productId = productId;
        this.dataSource = dataSource;
        this.product = {};
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);

        this.renderProductDetails();

        document.getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this))
    }

    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
        alert(`${this.product.NameWithoutBrand} added to cart successfully!`);
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
      }

}
    
    function productDetailsTemplate(product) {
      document.querySelector("h2").textContent = product.Brand.Name;
      document.querySelector("h3").textContent = product.NameWithoutBrand;
    
      const productImage = document.getElementById("productImage");
      productImage.src = product.Image;
      productImage.alt = product.NameWithoutBrand;
    
      document.getElementById("productPrice").textContent = product.FinalPrice;
      document.getElementById("productColor").textContent = product.Colors[0].ColorName;
      document.getElementById("productDesc").innerHTML = product.DescriptionHtmlSimple;
    
      document.getElementById("addToCart").dataset.id = product.Id;


    }

    /* renderProductDetails() {
        document.getElementById("brand-name").textContent = this.product.Brand.Name;
        document.getElementById("product-name").textContent = this.product.NameWithoutBrand;
        const productImage = document.getElementById("img");
        productImage.src = this.product.Image;
        productImage.alt = this.product.NameWithoutBrand;
        document.getElementById("product-card__price").textContent = `${this.product.ListPrice}`;
        document.getElementById("product__color").textContent = this.product.Colors.ColorName;
        document.getElementById("product__description").textContent = this.product.DescriptionHtmlS;
        document.getElementById("addToCart").setAttribute("data-id", this.product.Id);
    }*/