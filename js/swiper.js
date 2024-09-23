/* Swiper slider for side-bar */
var swiper1 = new Swiper(".slide-swp", {
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
        clickable: true
    },
    autoplay: {
        delay: 2500
    },
    loop: true
});

/* Swiper slider for sale-side */
var swiper2 = new Swiper(".sale_sec", {
    
    slidesPerView: 5,
    spaceBetween: 30,
    autoplay: {
        delay: 3000
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    loop: true,
    breakpoints:{
        1600:{
            slidesPerView:5,
        },
        1200:{
            slidesPerView:4,
            spaceBetween: 30,
        },
        700:{
            slidesPerView:3,
            spaceBetween: 15,
        },
        
        0:{
            slidesPerView:2,
            spaceBetween: 10,
        },
    }
});
 /*product swipper */
 var swiper = new Swiper(".product_swip", {
    
    slidesPerView: 4,
    spaceBetween: 30,
    autoplay: {
        delay: 3000
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    loop: true,
    breakpoints:{
        1600:{
            slidesPerView:4,
        },
        1500:{
            slidesPerView:3,
            
        },
        900:{
            slidesPerView:2,
            spaceBetween: 30,
        },
        700:{
            slidesPerView:3,
            spaceBetween: 15,
        },
        
        0:{
            slidesPerView:2,
            spaceBetween: 10,
        },
    }
});
