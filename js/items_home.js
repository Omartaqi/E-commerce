fetch('js/items.json')
    .then(response => response.json())
    .then(data => {

        const swiper_item_sale = document.getElementById('swiper_item_sale')

        const other_product_swipper = document.getElementById('swiper_item_product')
        const other_product_swipper2 = document.getElementById('swiper_item_product2')
        all_products_json = data;

        data.forEach(product => {

            if (product.old_price) {
                const percentDiscount = Math.floor((product.old_price - product.price) / product.old_price * 100);
                swiper_item_sale.innerHTML += `
                    <div class="product swiper-slide">

                        <div class="icons">
                            <span> <i onclick="add_to_cart(${product.id},this)" class="fa-solid fa-cart-plus"></i></span>
                            <span><i onclick="addToWishlist(${product.id},this)" class="fa-solid fa-heart"></i></span>
                            <span><i class="fa-solid fa-share"></i></span>
                        </div>

                        <span class="sale_present">${percentDiscount}%</span>

                        <div class="img_product">
                            <img src="${product.img}" alt="">
                            <img class="img_hover" src="${product.img_hover}" alt="">
                        </div>
                        <h3 class="name_product"><a href="item.html">${product.name}</a></h3>

                        <div class="stars">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>
                        <div class="price">
                            <p><span>${product.price}EGP</span></p>
                            <p class="old_price">${product.old_price}EGP</p>
                        </div>
                    </div>`
            }
        });


        // next_swipper 
        data.forEach(product => {

            other_product_swipper.innerHTML += `
         <div class="product swiper-slide">

                        <div class="icons">
                            <span> <i onclick="add_to_cart(${product.id},this)" class="fa-solid fa-cart-plus"></i></span>
                            <span><i onclick="addToWishlist(${product.id},this)" class="fa-solid fa-heart"></i></span>
                            <span><i class="fa-solid fa-share"></i></span>
                        </div>

                       

                        <div class="img_product">
                            <img src="${product.img}" alt="">
                            <img class="img_hover" src="${product.img_hover}" alt="">
                        </div>
                        <h3 class="name_product"><a href="#">${product.name}</a></h3>

                        <div class="stars">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>
                        <div class="price">
                            <p><span>${product.price}EGP</span></p>
                        </div>
                    </div>`
        }
        );
   //third swipper
   data.forEach(product => {

    other_product_swipper2.innerHTML += `
 <div class="product swiper-slide">

                <div class="icons">
                    <span> <i onclick="add_to_cart(${product.id},this)" class="fa-solid fa-cart-plus"></i></span>
                    <span><i onclick="addToWishlist(${product.id},this)" class="fa-solid fa-heart"></i></span>
                    <span><i class="fa-solid fa-share"></i></span>
                </div>

               

                <div class="img_product">
                    <img src="${product.img}" alt="">
                    <img class="img_hover" src="${product.img_hover}" alt="">
                </div>
                <h3 class="name_product"><a href="#">${product.name}</a></h3>

                <div class="stars">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                </div>
                <div class="price">
                    <p><span>${product.price}EGP</span></p>
                </div>
            </div>`
}
);
    })

 
     