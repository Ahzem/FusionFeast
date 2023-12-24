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



function generateCartTable() {
  let cartTableHTML = '';

  // Generate the table
  cartTableHTML += '<table>';

  // Generate table rows for each item
  cartItems.forEach((item, index) => {
    cartTableHTML += '<tr>';
    cartTableHTML += `<td style="width: 250px;">${item.name}</td>`;
    cartTableHTML += `<td style="width: 100px;">${item.quantity}</td>`;
    cartTableHTML += `<td style="width: 120px;">$${(item.price * item.quantity).toFixed(2)}</td>`;
    cartTableHTML += `<td style="width: 100px;"><button class="remove-btn" onclick="removeItem(${index})">Remove</button></td>`;
    cartTableHTML += '</tr>';
  });

  // Generate the table footer
  cartTableHTML += '</table>';

  return cartTableHTML;
}

function updateCart() {
  const cartCount = document.getElementById('cart-count');
  const cartList1 = document.getElementById('cart-items'); // First place to display cart
  const cartList2 = document.getElementById('cart-items-1'); // Second place to display cart
  const quantityTotal = document.getElementById('quantity');
  const quantityTotal1 = document.getElementById('quantity-1');
  const totalSpan = document.getElementById('cart-total');
  const totalSpan1 = document.getElementById('cart-total-1');

  // Update cart count
  cartCount.textContent = cartItems.length;

  // Clear previous items
  cartList1.innerHTML = '';
  cartList2.innerHTML = '';

  // Populate the cart with the updated items
  cartList1.innerHTML = generateCartTable();
  cartList2.innerHTML = generateCartTable();


  // Update quantity total
  quantityTotal.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Update quantity total
  quantityTotal1.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Update total
  totalSpan.textContent = cartTotal.toFixed(2);

  // Update total
  totalSpan1.textContent = cartTotal.toFixed(2);
}



function toggleCartPopup() {
  const cartPopup = document.getElementById('cart-popup');
  cartPopup.style.display = cartPopup.style.display === 'block' ? 'none' : 'block';
}

function hideCartPopup() {
  document.getElementById('cart-popup').style.display = 'none';
  document.getElementById('checkout-popup').style.display = 'none';
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

function toggleCheckoutPopup() {
  const cartPopup = document.getElementById('checkout-popup');
  cartPopup.style.visibility = cartPopup.style.visibility === 'visible' ? 'hidden' : 'visible';
  document.getElementById('cart-popup').style.display = 'none';
  document.getElementById('.checkout-popup').style.display = 'block';
}

function hideCheckoutPopup() {
  document.getElementById('checkout-popup').style.visibility = 'hidden';
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


function saveOrderToDatabase(cardDetails) {
  const orderData = {
    cartItems: cartItems,
    cartTotal: cartTotal,
    cardDetails: cardDetails,
  };

  // Make an AJAX request to the PHP endpoint
  fetch('save_order.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
  })
  .then(response => response.text())
  .then(data => {
      console.log(data); // Log the response from the server
      // Handle any further actions based on the server response
  })
  .catch((error) => {
      console.error('Error:', error);
  });
}

function submitCardDetails() {
  // Get card details from the form
  const cardNumber = document.getElementById('card-number').value;
  const cardHolder = document.getElementById('card-holder').value;
  const cardExpiry = document.getElementById('card-expiry').value;
  const cardCVV = document.getElementById('card-cvv').value;

  // Check if any of the fields are empty
  if (!cardNumber || !cardHolder || !cardExpiry || !cardCVV) {
    alert("Please fill in all the card details.");
    return;
  }

  // Assemble card details
  const cardDetails = {
    cardNumber: cardNumber,
    cardHolder: cardHolder,
    cardExpiry: cardExpiry,
    cardCVV: cardCVV,
  };

  // Save the order to the database
  saveOrderToDatabase(cardDetails);
}


