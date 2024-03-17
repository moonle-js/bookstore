import dataBase from "../javascripts/database.mjs  ";
import {
  ref,
  set,
  get,
  onValue,
  remove,
  push,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

let swiperWrapper = document.querySelector("#all_swiper_books");
onValue(ref(dataBase, "/books"), (response) => {
  const result = response.val();
  swiperWrapper.innerHTML = "";

  for (const book in result) {
    swiperWrapper.innerHTML += `
        <div class="swiper-slide">
       <div class="catalog_swiper_card">
       <img class="swiper_img" src="${result[book].imageURL}" alt="">
       <h3 class="swiper_book">${result[book].title}</h3>
       <button class="swiper_btn">Read More</button>
       </div>
     </div> `;
  }
  swiper()
});

onValue(ref(dataBase, "/books"), (response) => {
  const result = response.val();
  swiperWrapper.innerHTML = "";

  for (const book in result) {
    if (result[book].new=="true") {
      console.log(result[book].new);
    swiperWrapper.innerHTML += `
        <div class="swiper-slide">
       <div class="catalog_swiper_card">
       <span>New</span>
       <img class="swiper_img" src="${result[book].imageURL}" alt="">
       <h3 class="swiper_book">${result[book].title}</h3>
       <button class="swiper_btn">Read More</button>
       </div>
     </div> `;
  }
  swiper()
};


function swiper() {
  const swiper_all = new Swiper(".swiper.swiper_catalog", {
    // Optional parameters
    slidesPerView: 5,
    direction: "horizontal",
    loop: true,
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    autoplay: {
      delay: 2000,
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      // when window width is >= 640px
      767: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
    },
  });
  

  const besteller_swiper  = new Swiper (".swiper.besteller_swiper_books",{
    // Optional parameters
    slidesPerView: 5,
    direction: "horizontal",
    loop: true,
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    autoplay: {
      delay: 2000,
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      // when window width is >= 640px
      767: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
    },

  });

  const new_swiper = new Swiper(".swiper.new_swiper_books",{
    // Optional parameters
    slidesPerView: 5,
    direction: "horizontal",
    loop: true,
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    autoplay: {
      delay: 2000,
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      // when window width is >= 640px
      767: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
    },
  });
};
});