//open close cart//
var cart = document.querySelector('.cart')
function openCart() {
    cart.classList.add("active")
}
function closeCart() {
    cart.classList.remove("active")
}

//open close wishlist//
var wishlist = document.querySelector('.wishlist');

function openWishlist() {
    wishlist.classList.add("active");
}

function closeWishlist() {
    wishlist.classList.remove("active");
}



//open close menu//
var menu = document.querySelector('#menu')
function open_menu() {
    menu.classList.add("active")
}
function close_menu() {
    menu.classList.remove("active")
}


/* add to wishlist*/
var all_products_json;
var items_in_wishlist = document.querySelector(".items_in_wishlist");
let currentUser = localStorage.getItem('currentUser');
let usersData = JSON.parse(localStorage.getItem('usersData')) || [];
let productWishlist = [];

// Initialize wishlist on page load if user is already logged in
document.addEventListener('DOMContentLoaded', () => {
    currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const userData = usersData.find(user => user.email === currentUser);
        productWishlist = userData ? userData.wishlist : [];
        getWishlistItem();
    }

    // Add event listener to the login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

// Function to add an item to the wishlist
function addToWishlist(id, btn) {
    const product = all_products_json.find(item => item.id === id);
    const wishlistItem = productWishlist.find(item => item.id === id);

    if (!wishlistItem) {
        productWishlist.push(product);
    }

    btn.classList.add("active");
    updateWishlistLocalStorage();
    getWishlistItem();
}

let countItem = document.querySelector('.fav-count-item');
let count_item_Wishlist = document.querySelector('.count_item_wishlist');

// Function to display wishlist items
function getWishlistItem() {
    let items = '';
    for (let i = 0; i < productWishlist.length; i++) {
        items += `<div class="item_wishlist">
            <img src="${productWishlist[i].img}" alt="picture">
            <div class="content">
                <h4>${productWishlist[i].name}</h4>
                <p class="price_cart">${productWishlist[i].price} EGP</p>
            </div>
            <button onClick="removeFromWishlist(${i})" class="delete_item"><i class="fa-solid fa-trash"></i></button>
        </div>`;
    }
    items_in_wishlist.innerHTML = items;
    countItem.innerHTML = productWishlist.length;
    count_item_Wishlist.innerHTML = `(${productWishlist.length} item(s) in wishlist)`;
}

// Function to remove an item from the wishlist
function removeFromWishlist(index) {
    productWishlist.splice(index, 1);
    updateWishlistLocalStorage();
    getWishlistItem();
    let addToWishlistButtons = document.querySelectorAll(".fa-solid.fa-heart");
    addToWishlistButtons.forEach((button, idx) => {
        button.classList.remove("active");
        productWishlist.forEach(product => {
            if (product.id === idx) {
                button.classList.add("active");
            }
        });
    });
}

// Function to update wishlist in localStorage
function updateWishlistLocalStorage() {
    if (currentUser) {
        const userIndex = usersData.findIndex(user => user.email === currentUser);
        if (userIndex > -1) {
            usersData[userIndex].wishlist = productWishlist;
        } else {
            usersData.push({ email: currentUser, wishlist: productWishlist });
        }
        localStorage.setItem('usersData', JSON.stringify(usersData));
    }
}

// Function to clear the wishlist
function clearWishlist() {
    productWishlist = [];
    updateWishlistLocalStorage();
    getWishlistItem();
}

// Function to handle login form submission
function handleLogin(event) {
    event.preventDefault(); // Prevent the default form submission

    const emailInput = document.getElementById('emailInput').value;
    const passwordInput = document.getElementById('passwordInput').value;

    // Here you would typically validate the user's credentials with a backend server
    // For this example, we'll simulate a user login with a static user ID based on the email
    const userId = emailInput; // Simple example, use email as user ID
    loginUser(userId);
}

// Function to log in the user
function loginUser(userId) {
    localStorage.setItem('currentUser', userId);
    currentUser = userId;
    const userData = usersData.find(user => user.email === currentUser);
    productWishlist = userData ? userData.wishlist : [];
    getWishlistItem();
}






///add products to cart  
var all_products_json;
var items_in_cart = document.querySelector('.items_in_cart');
let currentUser2 = localStorage.getItem('currentUser');
let usersData2 = JSON.parse(localStorage.getItem('usersData')) || [];
let product_cart = [];

// Initialize cart on page load if user is already logged in
document.addEventListener('DOMContentLoaded', () => {
    currentUser2 = localStorage.getItem('currentUser');
    if (currentUser2) {
        const userData2 = usersData.find(user => user.email === currentUser2);
        product_cart = userData2 ? userData2.cart : [];
        getCartItem();
    }
    
    // Add event listener to the login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

// Creates a new cart item by copying the product details and setting the initial quantity to 1
function add_to_cart(id, btn) {
    const product = all_products_json.find(item => item.id === id);
    const cartItem = product_cart.find(item => item.id === id);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        product_cart.push({ ...product, quantity: 1 });
    }

    btn.classList.add("active");
    updateLocalStorage();
    getCartItem();
}

let count_item = document.querySelector('.count-item'); // counter outside the cart
let count_item_cart = document.querySelector('.count_item_cart'); // counter inside the cart
let price_cart_total = document.querySelector('.price_cart_total'); // total price inside the cart
let price_cart_Head = document.querySelector('.price_cart_Head'); // total price outside the cart

function getCartItem() {
    let total_price = 0;
    let items_c = "";
    for (let i = 0; i < product_cart.length; i++) {
        items_c += `<div class="item_cart">
            <img src="${product_cart[i].img}" alt="picture">
            <div class="content">
                <h4>${product_cart[i].name}</h4>
                <p class="price_cart">${product_cart[i].price} EGP</p>
                <div class="quantity-controls">
                    <button onClick="changeQuantity(${product_cart[i].id}, 'decrease')">-</button>
                    <span>${product_cart[i].quantity}</span>
                    <button onClick="changeQuantity(${product_cart[i].id}, 'increase')">+</button>
                </div>
            </div>
            <button onClick="remove_from_cart(${i})" class="delete_item"><i class="fa-solid fa-trash"></i></button>
        </div>`;
        total_price += product_cart[i].price * product_cart[i].quantity;
    }
    items_in_cart.innerHTML = items_c; // display items in the cart
    price_cart_Head.innerHTML = total_price + " EGP"; // display total price outside the cart
    count_item.innerHTML = product_cart.length; // display number of items outside the cart
    count_item_cart.innerHTML = `(${product_cart.length} item(s) in cart)`; // display number of items inside the cart
    price_cart_total.innerHTML = total_price + " EGP"; // display total price inside the cart
}

function changeQuantity(productId, action) {
    const cartItem = product_cart.find(item => item.id === productId);

    if (action === 'increase') {
        cartItem.quantity++;
    } else if (action === 'decrease') {
        cartItem.quantity--;
        if (cartItem.quantity <= 0) {
            product_cart = product_cart.filter(item => item.id !== productId);
        }
    }

    updateLocalStorage();
    getCartItem();
}

function remove_from_cart(index) {
    product_cart.splice(index, 1);
    updateLocalStorage();
    getCartItem();
    let addToCartButtons = document.querySelectorAll(".fa-cart-plus");
    for (let i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].classList.remove("active");
        product_cart.forEach(product => {
            if (product.id == i) {
                addToCartButtons[i].classList.add("active");
            }
        });
    }
}

function updateLocalStorage() {
    if (currentUser2) {
        const userIndex = usersData.findIndex(user => user.email === currentUser2);
        if (userIndex > -1) {
            usersData[userIndex].cart = product_cart;
        } else {
            usersData.push({ email: currentUser2, cart: product_cart });
        }
        localStorage.setItem('usersData', JSON.stringify(usersData));
    }
}

function goToCheckout() {
    // Save cart items to localStorage
    updateLocalStorage();
    
    // Redirect to the checkout page
    window.location.href = 'checkout.html';
}

function handleLogin(event) {
    event.preventDefault(); // Prevent the default form submission
    

    const emailInput = document.getElementById('emailInput').value;
    const passwordInput = document.getElementById('passwordInput').value;

    // Here you would typically validate the user's credentials with a backend server
    // For this example, we'll simulate a user login with a static user ID based on the email
    const userId = emailInput; // Simple example, use email as user ID
    loginUser(userId);
}

function loginUser(userId) {
    

    localStorage.setItem('currentUser', userId);
    currentUser = userId;
    const userData = usersData.find(user => user.email === currentUser);
    product_cart = userData.cart;
    getCartItem();
}




// back to top js

let backToTop= document.querySelector('.back_to_top');

backToTop.addEventListener("click", function(){
 window.scrollTo(
    {
        top: 0,
        behavior: "smooth"
    }
 )
})


/*change item image*/

let bigImage = document.getElementById("bigImg")
function changeItemImage(img){
    bigImage.src = img
    

}

/*checkout */


