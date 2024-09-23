// Function to get URL parameters
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

// Get productId from URL query parameters
const productId = getParameterByName('id');

// Fetch the product data from local storage
const productData = JSON.parse(localStorage.getItem('ProductData'));

// Ensure the data was fetched successfully
if (productData) {
    // Find the product by ID
    const product = productData.find(item => item.id === String(productId));

    // Check if the product exists
    if (product) {
        // Create HTML content with the product details
        const old_price_paragraph = product.old_price ? `<p class="old_price">${product.old_price} EGP</p>` : "";
        const percentDiscount_div = product.old_price ? `<span class="sale_present">${Math.floor((product.old_price - product.price) / product.old_price * 100)}%</span>` : '';

        // Populate HTML with the product details, including stars
        document.getElementById('item_detail').innerHTML = `
            <div class="container">
                <div class="img_item">
                    <div class="big_img">
                        <img id="bigImg" src="${product.img}" alt="">
                    </div>
                    <div class="sm_imgs">
                        <img onclick="changeItemImage(this.src)" src="${product.img}" alt="">
                        <img onclick="changeItemImage(this.src)" src="${product.img_hover}" alt="">
                    </div>
                </div>
                <div class="details_item">
                    <h1 class="name">${product.product}</h1>
                    <div class="stars">
                        ${generateStars(product.rating)}
                    </div>
                    <div class="price">
                        <p><span>${product.price} EGP</span></p>
                        ${old_price_paragraph}
                    </div>
                    ${percentDiscount_div}
                    <p class="text_p">${product.details}</p>
                    <h4>Hurry Up! Only ${product.quantity} products left in stock.</h4>
                    <button onclick="add_to_cart(${productId}, this)">Add to cart <i class="fa-solid fa-bag-shopping"></i></button>
                    <div class="icons">
                        <span><i onclick="addToWishlist(${productId}, this)" class="fa-regular fa-heart"></i></span>
                        <span><i class="fa-solid fa-sliders"></i></span>
                        <span><i class="fa-solid fa-print"></i></span>
                        <span><i class="fa-solid fa-share-nodes"></i></span>
                    </div>
                </div>
            </div>`;
    } else {
        console.error(`Product with id ${productId} not found.`);
    }
} else {
    console.error('No product data found in local storage.');
}

// Function to generate stars based on rating
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fa-solid fa-star"></i>';
        } else {
            stars += '<i class="fa-solid fa-star inactive"></i>';
        }
    }
    return stars;
}
