// Retrieve data from localStorage
let CategoryArry = JSON.parse(localStorage.getItem('Category')) || [];
let ProductArry = JSON.parse(localStorage.getItem('Product')) || [];

const products_dev = document.getElementById('products_dev');
const category_dev = document.getElementById('Category');
const brand_dev = document.getElementById('brand');

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

// Populate categories
CategoryArry.forEach(category => {
    category_dev.innerHTML += `
        <div class="item">
            <span>${category.category}</span>
            <input type="checkbox" class="filter-category" data-category="${category.category}">
        </div>`;
});

// Populate brands
const uniqueBrands = [...new Set(ProductArry.map(product => product.brand))];
uniqueBrands.forEach(brand => {
    brand_dev.innerHTML += `
        <div class="item">
            <span>${brand}</span>
            <input type="checkbox" class="filter-brand" data-brand="${brand}">
        </div>`;
});

// Function to display products
function displayProducts(products) {
    products_dev.innerHTML = ''; // Clear the container
    products.forEach(product => {
        const old_price_paragraph = product.old_price ? `<p class="old_price">${product.old_price} EGP</p>` : "";
        const percentDiscount_div = product.old_price ? `<span class="sale_present">${Math.floor((product.old_price - product.price) / product.old_price * 100)}%</span>` : '';

        products_dev.innerHTML += `
            <div class="product swiper-slide">
                <div class="icons">
                    <span><i onclick="add_to_cart(${product.id}, this)" class="fa-solid fa-cart-plus"></i></span>
                    <span><i onclick="addToWishlist(${product.id}, this)" class="fa-solid fa-heart"></i></span>
                    <span><i class="fa-solid fa-share"></i></span>
                </div>
                ${percentDiscount_div}
                <div class="img_product">
                    <img src="${product.img}" alt="">
                    <img class="img_hover" src="${product.img_hover}" alt="">
                </div>
                <h3 class="name_product"><a href="#" onclick="displayItem(${product.id})">${product.product}</a></h3>
                <div class="stars">
                    ${generateStars(product.rating)}
                </div>
                <div class="price">
                    <p><span>${product.price} EGP</span></p>
                    ${old_price_paragraph}
                </div>
            </div>`;
    });
}

// Filter function
function filterProducts() {
    const selectedCategories = Array.from(document.querySelectorAll('.filter-category:checked')).map(cb => cb.getAttribute('data-category'));
    const selectedBrands = Array.from(document.querySelectorAll('.filter-brand:checked')).map(cb => cb.getAttribute('data-brand'));

    const filteredProducts = ProductArry.filter(product => {
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
        return matchesCategory && matchesBrand;
    });

    displayProducts(filteredProducts);
}

// Event listeners for filters
document.querySelectorAll('.filter-category').forEach(checkbox => {
    checkbox.addEventListener('change', filterProducts);
});
document.querySelectorAll('.filter-brand').forEach(checkbox => {
    checkbox.addEventListener('change', filterProducts);
});

// Initial display
displayProducts(ProductArry);

function displayItem(productId) {
    window.location.href = `item.html?id=${productId}`;
}
