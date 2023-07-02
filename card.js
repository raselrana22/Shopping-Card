/*
Mastering on React JS, Next JS & Prisma course
Assignment - 04, Module - 04
Submitted by Md. Rasel Rana, email: rasel.learn22@gmail.com
date: 04/07/2023
*/

"use strict"

// Product card displaying and others functions
let cardIcon = document.getElementById("card-icon");
let card = document.querySelector(".card");
let closeIcon = document.getElementById("close-card");

// Open card
cardIcon.onclick = () => {
    card.classList.add("active");
}
// card close
closeIcon.onclick = () => {
    card.classList.remove("active");
}


// Making the Ready function 
export default function ready() {
    // Add to the Item
    let addCard = document.getElementsByClassName("add-to-cart");
    for (let i = 0; i < addCard.length; i++) {
        let addBtn = addCard[i];
        addBtn.addEventListener("click", addBtnClicked)
    }

    // Remove item from card
    let removeCardButton = document.getElementsByClassName("card-remove");
    for (let i = 0; i < removeCardButton.length; i++) {
        let btn = removeCardButton[i];
        btn.addEventListener("click", removeCardItem)
    }

    // Quantity change 
    let quantityInputs = document.getElementsByClassName("card-quantity");
    for (let i = 0; i < quantityInputs.length; i++) {
        let inpQnt = quantityInputs[i];
        inpQnt.addEventListener("change", quantityChange);
    }

    // Clear button work
    document.getElementsByClassName("cardClearBtn")[0]
        .addEventListener("click", clearCard);

    // Buy button work
    document.getElementsByClassName("btn-buy")[0]
        .addEventListener("click", buyButtonClicked);
}


//Add items
function addBtnClicked(event) {
    let btn = event.target;
    let shopProduct = btn.parentElement;
    let title = shopProduct.getElementsByClassName("product-title")[0].innerText;
    let price = shopProduct.getElementsByClassName("price")[0].innerText;
    let productImg = shopProduct.getElementsByClassName("product-img")[0].src;
    addItemsToCard(title, price, productImg);
}

function addItemsToCard(title, price, productImg) {
    let cardShopBox = document.createElement("div");
    cardShopBox.classList.add("card-box");
    let cardItems = document.getElementsByClassName("card-container")[0];
    let cardItemName = cardItems.getElementsByClassName("card-product-title");
    for (let i = 0; i < cardItemName.length; i++) {
        if (cardItemName[i].innerText == title) {
            alert("You have already add this item");
            return;
        }
    }
    let cardBoxContent = `
                    <img src="${productImg}" alt="" class="card-img">
                    <div class="detail-box">
                        <div class="card-product-title">${title}</div>
                        <div class="card-price">${price}</div>
                        <div class="indTotal">
                            <input type="number" class="card-quantity" value="1">
                            <div class="indTotalDisplay"></div>
                        </div>
                    </div>
                    <i class='bx bxs-trash-alt card-remove'></i>`
    cardShopBox.innerHTML = cardBoxContent;
    cardItems.append(cardShopBox);
    cardShopBox.getElementsByClassName("card-remove")[0]
        .addEventListener("click", removeCardItem);
    cardShopBox.getElementsByClassName("card-quantity")[0]
        .addEventListener("change", quantityChange);

    updateTotal();
    clearBtnShow();
}

// Remove item fro card
function removeCardItem(event) {
    let removeBtnClk = event.target;
    removeBtnClk.parentElement.remove();
    updateTotal();
    clearBtnShow();
}


// Quantity change  
function quantityChange(event) {
    let inp = event.target;
    if (isNaN(inp.value) || inp.value <= 0) {
        inp.value = 1;
    }
    updateTotal();
}

// Clear card function
function clearCard() {
    let cardContent = document.getElementsByClassName("card-container")[0];
    while (cardContent.hasChildNodes()) {
        cardContent.removeChild(cardContent.firstChild);
    }
    updateTotal();
    clearBtnShow();
}

// Clear button display function
function clearBtnShow() {
    let cardContent = document.getElementsByClassName("card-container")[0];
    let cardClearBtn = document.getElementsByClassName("cardClearBtn")[0];
    if (cardContent.hasChildNodes()) {
        cardClearBtn.classList.add("active");
    } else {
        cardClearBtn.classList.remove("active");
    }
}

// buy button clicked function
function buyButtonClicked() {
    alert("Your order is placed");
    let cardContent = document.getElementsByClassName("card-container")[0];
    while (cardContent.hasChildNodes()) {
        cardContent.removeChild(cardContent.firstChild);
    }
    updateTotal();
    clearBtnShow();
}

// Update total price
function updateTotal() {
    let cardBoxes = document.getElementsByClassName("card-box");
    let indTotalTitleDisplay = document.getElementsByClassName("indTotalDisplay");
    var total = 0;

    for (let i = 0; i < cardBoxes.length; i++) {
        let cardBox = cardBoxes[i];
        let priceElement = cardBox.getElementsByClassName("card-price")[0];
        let quantityElement = cardBox.getElementsByClassName("card-quantity")[0];
        let price = parseFloat(priceElement.innerText.replace("৳", ""));
        let quantity = quantityElement.value;
        let individualTotal = quantity * price; // Ind total 
        // total = total + (quantity * price); // Total price display or
        total = total + individualTotal; // Accumulate individual totals for the overall total

        // Find the corresponding IndTotalTitleDisplay element for the current cardBox
        let IndTotal = indTotalTitleDisplay[i];
        IndTotal.innerText = "Total: ৳ " + individualTotal;
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("total-price")[0].innerText = "৳ " + total;

}
