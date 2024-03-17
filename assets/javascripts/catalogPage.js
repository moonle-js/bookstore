import dataBase from "../javascripts/database.mjs  ";
import {
  ref,
  set,
  get,
  onValue,
  query,
  orderByChild,
  equalTo,
  remove,
  push,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

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

const besteller_swiper = new Swiper(".swiper.besteller_swiper_books", {
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

const new_swiper = new Swiper(".swiper.new_swiper_books", {
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

/* ======================== Firebase Methods ========================= */

let new_swiper_books = document.getElementById("new_swiper_book");
let swiperWrapper = document.getElementById("all_swiper_books");
let besteller_swiper_books = document.getElementById("besteller_swiper_books");

onValue(ref(dataBase, "books"), (response) => {
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
  swiper_all.update();
});



function convertData(d) {
  const newData = Object.entries(d);
  const myNewData = newData.map((arr) => {
    const newObj = {
      id: arr[0],
      ...arr[1],
    };
    return newObj;
  });
  return myNewData;
}
onValue(ref(dataBase, "books"), (response) => {

  const result = convertData(response.val());

  let filtered_data = result.filter((item) => {
    return item.new === "true";
  });

  let datalist = filtered_data
    .map((item) => {
      return `
    <div class="swiper-slide">
       <div class="catalog_swiper_card">
       <span>New</span>
       <img class="swiper_img" src="${item.imageURL}" alt="">
       <h3 class="swiper_book">${item.title}</h3>
       <button class="swiper_btn">Read More</button>
       </div>
     </div> `;
    })
    .join("");

  new_swiper_books.innerHTML = datalist;
  new_swiper.update();
});

onValue(ref(dataBase, "books"), (response) => {

  const result = convertData(response.val());

  let filtered_data = result.filter((item) => {
    return item.counter =15;
  });

  let datalist = filtered_data
    .map((item) => {
      return `
    <div class="swiper-slide">
       <div class="catalog_swiper_card">
       <span>New</span>
       <img class="swiper_img" src="${item.imageURL}" alt="">
       <h3 class="swiper_book">${item.title}</h3>
       <button class="swiper_btn">Read More</button>
       </div>
     </div> `;
    })
    .join("");

  besteller_swiper_books.innerHTML = datalist;
  besteller_swiper.update();
});

