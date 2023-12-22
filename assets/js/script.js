'use strict';



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const menuToggleBtn = document.querySelector("[data-menu-toggle-btn]");

menuToggleBtn.addEventListener("click", function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
});

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    navbar.classList.toggle("active");
    menuToggleBtn.classList.toggle("active");
  });
}



/**
 * header sticky & back to top
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * search box toggle
 */

const searchBtn = document.querySelector("[data-search-btn]");
const searchContainer = document.querySelector("[data-search-container]");
const searchSubmitBtn = document.querySelector("[data-search-submit-btn]");
const searchCloseBtn = document.querySelector("[data-search-close-btn]");

const searchBoxElems = [searchBtn, searchSubmitBtn, searchCloseBtn];

for (let i = 0; i < searchBoxElems.length; i++) {
  searchBoxElems[i].addEventListener("click", function () {
    searchContainer.classList.toggle("active");
    document.body.classList.toggle("active");
  });
}



/**
 * move cycle on scroll
 */

const deliveryBoy = document.querySelector("[data-delivery-boy]");

let deliveryBoyMove = -80;
let lastScrollPos = 0;

window.addEventListener("scroll", function () {

  let deliveryBoyTopPos = deliveryBoy.getBoundingClientRect().top;

  if (deliveryBoyTopPos < 500 && deliveryBoyTopPos > -250) {
    let activeScrollPos = window.scrollY;

    if (lastScrollPos < activeScrollPos) {
      deliveryBoyMove += 1;
    } else {
      deliveryBoyMove -= 1;
    }

    lastScrollPos = activeScrollPos;
    deliveryBoy.style.transform = `translateX(${deliveryBoyMove}px)`;
  }

});









let cartItems = [];
let cartTotal = 0;

function addToCart(itemName, itemPrice) {
  // Check if the item is already in the cart
  const existingItem = cartItems.find(item => item.name === itemName);

  if (existingItem) {
    // If the item is already in the cart, increase the quantity
    existingItem.quantity += 1;
  } else {
    // If the item is not in the cart, add it with quantity 1
    cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
  }

  cartTotal += itemPrice;
  updateCart();
}

function removeItem(index) {
  const removedItem = cartItems.splice(index, 1)[0];
  cartTotal -= removedItem.price * removedItem.quantity;
  updateCart();
}

function updateCart() {
  const cartCount = document.getElementById('cart-count');
  const cartList = document.getElementById('cart-items');
  const totalSpan = document.getElementById('cart-total');

  // Update cart count
  cartCount.textContent = cartItems.length;

  // Clear previous items
  cartList.innerHTML = '';

  // Populate the cart with the updated items
  cartItems.forEach((item, index) => {
    const tableRow = document.createElement('tr');
  
    // Name cell
    const nameCell = document.createElement('td');
    nameCell.textContent = item.name;
    nameCell.style.width = '250px';
    tableRow.appendChild(nameCell);
  
    // Quantity cell
    const quantityCell = document.createElement('td');
    quantityCell.textContent = item.quantity;
    quantityCell.style.width = '100px';
    tableRow.appendChild(quantityCell);
  
    // Price cell
    const priceCell = document.createElement('td');
    priceCell.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
    priceCell.style.width = '100px';
    tableRow.appendChild(priceCell);

    
  
    // Remove button cell
    const removeButtonCell = document.createElement('td');
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-btn';
    removeButton.style.width = '100px';
    removeButton.onclick = () => removeItem(index);
    removeButtonCell.appendChild(removeButton);
    tableRow.appendChild(removeButtonCell);
    cartList.appendChild(tableRow);
    
    const braekrow = document.createElement('br');
    cartList.appendChild(braekrow);
  });
  

  // Update total
  totalSpan.textContent = cartTotal.toFixed(2);
}

function toggleCartPopup() {
  const cartPopup = document.getElementById('cart-popup');
  cartPopup.style.display = cartPopup.style.display === 'block' ? 'none' : 'block';
}

function hideCartPopup() {
  document.getElementById('cart-popup').style.display = 'none';
}

function toggleSignUpPopup() {
	const cartPopup = document.getElementById('sign-up-popup');
	cartPopup.style.display = cartPopup.style.display === 'block' ? 'none' : 'block';
  document.getElementById('sign-in-popup').style.display = 'none';
  document.getElementById('banner-logo').style.display = 'none';
  document.getElementById('signup-btn').style.display = 'none';
  document.getElementById('signin-btn').style.display = 'block';
  document.getElementById('cencel-btn').style.display = 'block';
}

function toggleSignInPopup() {
	const cartPopup = document.getElementById('sign-in-popup');
	cartPopup.style.display = cartPopup.style.display === 'block' ? 'none' : 'block';
	document.getElementById('sign-up-popup').style.display = 'none';
  document.getElementById('banner-logo').style.display = 'none';
  document.getElementById('signup-btn').style.display = 'block';
  document.getElementById('signin-btn').style.display = 'none';
  document.getElementById('cencel-btn').style.display = 'block';
}

function toggleLogoPopup() {
  const cartPopup = document.getElementById('banner-logo');
  cartPopup.style.display = cartPopup.style.display === 'block' ? 'none' : 'block';
  document.getElementById('sign-up-popup').style.display = 'none';
  document.getElementById('sign-in-popup').style.display = 'none';
  document.getElementById('banner-logo').style.display = 'block';
  document.getElementById('signup-btn').style.display = 'block';
  document.getElementById('signin-btn').style.display = 'block';
  document.getElementById('cencel-btn').style.display = 'none';
}


function filterItems(category) {
  var foodItems = document.querySelectorAll("#food-menu .food-menu-card");

  for (var i = 0; i < foodItems.length; i++) {
      if (category === 'all' || foodItems[i].classList.contains(category)) {
          foodItems[i].style.display = "block";
      } else {
          foodItems[i].style.display = "none";
      }
  }
}







