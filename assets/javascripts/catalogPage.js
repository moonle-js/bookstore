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
    nextEl: ".all_swiper-button-next",
    prevEl: ".all_swiper-button-prev",
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


// firebase for all books

onValue(ref(dataBase, "books"), data => {
  if(data.exists()){
    document.querySelector('#all_swiper_books').innerHTML = ""
    for(let keys in data.val()){
      console.log('salam')
      if(data.val()[keys].new == "true"){
        document.querySelector('#all_swiper_books').innerHTML += `
        <div class="swiper-slide">
          <div class="catalog_swiper_card">
          <span>New</span>
          <img class="swiper_img" src="${data.val()[keys].imageURL}" alt="">
          <h3 class="swiper_book">${data.val()[keys].title}</h3>
          <button class="swiper_btn">Read More</button>
          </div>
        </div> `
      }else{
        document.querySelector('#all_swiper_books').innerHTML += `
        <div class="swiper-slide">
          <div class="catalog_swiper_card">
          <img class="swiper_img" src="${data.val()[keys].imageURL}" alt="">
          <h3 class="swiper_book">${data.val()[keys].title}</h3>
          <button class="swiper_btn">Read More</button>
          </div>
        </div> `
      }
        
        swiper_all.update()
    }
  }
})

function showSelectedCategory(categoryName){
  get(ref(dataBase, `bookTypes/${categoryName}`)).then(data => {
    if(data.exists()){
      document.querySelector('#category_swiper').innerHTML = `
          <h2 class="catalog_title">${data.val()}</h2>
        `
      onValue(ref(dataBase, 'books/'), result => {
        if(result.exists()){
          document.querySelector('#selected_swiper_books').innerHTML = ""
          for(let key in result.val()){
            if(result.val()[key].category == categoryName){
              if(result.val()[key].new == "true"){
                document.querySelector('#selected_swiper_books').innerHTML += `
                <div class="swiper-slide">
                  <div class="catalog_swiper_card">
                  <span>New</span>
                  <img class="swiper_img" src="${result.val()[key].imageURL}" alt="">
                  <h3 class="swiper_book">${result.val()[key].title}</h3>
                  <button class="swiper_btn">Read More</button>
                  </div>
                </div> 
                `
              }else{
                document.querySelector('#selected_swiper_books').innerHTML += `
                <div class="swiper-slide">
                  <div class="catalog_swiper_card">
                  <img class="swiper_img" src="${result.val()[key].imageURL}" alt="">
                  <h3 class="swiper_book">${result.val()[key].title}</h3>
                  <button class="swiper_btn">Read More</button>
                  </div>
                </div> 
                `
              }
              
              selected_release_swiper.update()
            }
          }
        }
      })
    }
  })
}

// Show All Categories from Firebase
function getCategories(){
  onValue(ref(dataBase, 'bookTypes/'), result => {
    if(result.exists()){
      document.querySelector('#catalog_categories').innerHTML = ''
      for(let key in result.val()){
        document.querySelector('#catalog_categories').innerHTML += `
          <li>
            <button class="showThisCategory" id="${result.val()[key]}">${result.val()[key]}</button>
          </li>
        `
        document.querySelectorAll('.showThisCategory').forEach(function(item){
          item.addEventListener('click', function(e){
            window.scroll(0, 600)
            console.log('salam')
            showSelectedCategory(`${this.id}`)
          })
        })
      }
    }
  })
}
getCategories()


// ++++++++++++++++++++++++++++Swiper for new books ++++++++++++++++++++++++++++


const new_release_swiper = new Swiper(".swiper.new_swiper_catalog", {
  // Optional parameters
  slidesPerView: 5,
  direction: "horizontal",
  loop: true,
  // Navigation arrows
  navigation: {
    nextEl: ".new_swiper-button-next",
    prevEl: ".new_swiper-button-prev",
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

// Adding new releases
onValue(ref(dataBase, "books/"), data => {
  if(data.exists()){

    document.querySelector('#new_swiper_books').innerHTML = ""
    for(let keys in data.val()){
      if(data.val()[keys].new == "true"){
        
        document.querySelector('#new_swiper_books').innerHTML += `
        <div class="swiper-slide">
          <div class="catalog_swiper_card">
          <span>New</span>
          <img class="swiper_img" src="${data.val()[keys].imageURL}" alt="">
          <h3 class="swiper_book">${data.val()[keys].title}</h3>
          <button class="swiper_btn">Read More</button>
          </div>
        </div> `
        new_release_swiper.update();
      }
    }
  }
})


// Categories swiper
const selected_release_swiper = new Swiper(".swiper.selected_swiper_catalog", {
  // Optional parameters
  slidesPerView: 5,
  direction: "horizontal",
  loop: true,
  // Navigation arrows
  navigation: {
    nextEl: ".selected_swiper-button-next",
    prevEl: ".selected_swiper-button-prev",
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


function showBestSellers(){
  get(ref(dataBase, 'books/')).then(result => {
    if(result.exists()){
      document.querySelector('#selected_swiper_books').innerHTML = ""
      for(let key in result.val()){
        console.log(result.val()[key])
        if(result.val()[key].counter >= 10){
          if(result.val()[key].new == "true"){
            document.querySelector('#selected_swiper_books').innerHTML += `
            <div class="swiper-slide">
              <div class="catalog_swiper_card">
              <span>New</span>
              <img class="swiper_img" src="${result.val()[key].imageURL}" alt="">
              <h3 class="swiper_book">${result.val()[key].title}</h3>
              <button class="swiper_btn">Read More</button>
              </div>
            </div>
            `
          }else{
            document.querySelector('#selected_swiper_books').innerHTML += `
            <div class="swiper-slide">
              <div class="catalog_swiper_card">
              <img class="swiper_img" src="${result.val()[key].imageURL}" alt="">
              <h3 class="swiper_book">${result.val()[key].title}</h3>
              <button class="swiper_btn">Read More</button>
              </div>
            </div>
            `
          }
          selected_release_swiper.update()
        }
      }
    }
  })
}

showBestSellers()