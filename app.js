/*
Mastering on React JS, Next JS & Prisma course
Assignment - 04, Module - 04
Submitted by Md. Rasel Rana, email: rasel.learn22@gmail.com
date: 04/07/2023
*/

"use strict"

import products from "./product.js";
import ready from "./card.js";

// Display the products
const shopContent = document.getElementsByClassName("shop-content")[0];
// // Loop through the products array and create a div for each product
products.forEach(product => {
    const productBox = document.createElement("div");
    productBox.classList.add("product-box");
    productBox.innerHTML = `
    <img class="product-img" src="${product.imageUrl}" alt="${product.name}">
    <h2 class="product-title">${product.name}</h2>
    <span class="price">&#2547 ${product.price}</span>
    <button class="add-to-cart">Add to Cart</button>
    `;
    shopContent.appendChild(productBox);
});


// Card working function 
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

