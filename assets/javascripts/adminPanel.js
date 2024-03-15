// Importing database and functions from firebase and module js file
import dataBase from "./database.mjs";
import {set, get, ref, onValue, remove} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"
var refDB = ref(dataBase);

// detecting if user exists
const adminLoginButton = document.querySelector('#adminLoginButton');
const adminUsername = document.querySelector('#adminUsername')
const adminPassword = document.querySelector('#adminPassword')

function detectUser(valueFromPrompt, passwordFromPrompt){
    if(valueFromPrompt.trim() && passwordFromPrompt.trim()){
        var defValue = 0;
        get(ref(dataBase, 'users/admins/')).then(result => {
            if(result.exists()){
                for(let key in result.val()){
                    if(result.val()[key].name == valueFromPrompt.trim() && result.val()[key].password == passwordFromPrompt){
                        defValue++;
                    }
                }

            if(defValue == 0){
                alert('user netu')
            }else{
                // document.querySelector('#mainContentForAdmin').innerHTML = `
                //                                 <div id="adminMainPanel">
                //                                 <!-- Logo side for admin -->
                //                                 <div id="adminLogo">
                //                                     <a href="">
                //                                         <img 
                //                                         src="./assets/images/adminPanel/adminUserLogo.png" 
                //                                         alt="adminUser"
                //                                         title="adminUser">
                //                                         <p>
                //                                             Admin
                //                                         </p>
                //                                     </a>
                //                                 </div>

                //                                 <div id="adminMainPanelElements">
                //                                     <!-- Book adding section from API -->
                //                                     <div id="addBookSection">
                //                                         <h3>
                //                                             Add book
                //                                         </h3>
                //                                         <label for="valueFromAPI">
                //                                             Search book
                //                                         </label>
                //                                         <div id="searchElements">
                //                                             <input 
                //                                             type="text" 
                //                                             name="valueFromAPI" 
                //                                             id="valueFromAPI"
                //                                             placeholder="Add name of book">
                                                            
                //                                             <button id="valueFromAPIButton">
                //                                                 <img src="./assets/images/adminPanel/searchIcon.png" alt="">
                //                                             </button>
                                                            
                //                                         </div>
                //                                         <!-- Div with search results -->
                //                                         <div id="relatedSearches"></div>
                //                                         <!-- Div with search results -->
                                                        
                //                                     </div>
                //                                     <!-- end of book adding section from API -->

                //                                     <!-- Setting Books Initials -->
                //                                     <div id="bookFormSection">
                //                                         <label id="mainLabel" for="bookNameInput">
                //                                             Book form
                //                                         </label>

                //                                         <form class="bookFormCard">
                //                                             <div>
                //                                                 <label for="bookNameInput">
                //                                                     Book Name
                //                                                 </label>
                //                                                 <input type="text" id="bookNameInput" placeholder="Add name of Book">
                //                                             </div>

                //                                             <div>
                //                                                 <label for="authorNameInput">
                //                                                     Author Name
                //                                                 </label>
                //                                                 <input type="text" id="authorNameInput" placeholder="Add name of Author">
                //                                             </div>

                //                                             <div>
                //                                                 <label for="bookImageUrlInput">
                //                                                     Book Image Url
                //                                                 </label>
                //                                                 <input type="text" id="bookImageUrlInput" placeholder="Add path to Image of Book">
                //                                             </div>

                //                                             <div id="descriptionBlock">
                //                                                 <label for="bookDescription">
                //                                                     Description
                //                                                 </label>
                //                                                 <textarea 
                //                                                 type="text" 
                //                                                 id="bookDescription" 
                //                                                 placeholder="Add description to book"
                //                                                 ></textarea>
                //                                             </div>

                //                                             <div>
                //                                                 <label for="bookReleaseDate">
                //                                                     Book Type
                //                                                 </label>
                //                                                 <input type="number" id="bookReleaseDate" placeholder="Add release date">
                //                                             </div>

                //                                             <div id="newOrNotDiv">
                //                                                 <label for="newOrNot">New</label>
                //                                                 <input type="checkbox" id="newOrNot">
                //                                             </div>

                //                                             <div>
                //                                                 <label for="bookTypeInput">
                //                                                     Book Type
                //                                                 </label>
                //                                                 <select type="text" id="bookTypeInput" placeholder="Add Type of book">
                //                                                 </select>
                //                                             </div>

                //                                             <button id="addBookButton">
                //                                                 Add
                //                                             </button>
                //                                         </form>
                //                                     </div>
                //                                     <!-- Setting Books Initials -->

                                                    
                //                                 </div>
                //                             </div>`

                const elementOfScript = document.createElement('script')
                elementOfScript.setAttribute('src', './assets/javascripts/secondAdmin.js')
                document.querySelector('body').append(elementOfScript)
                defValue = 0;
                defValue = 0;
            }
            }
        })
    }
}

// adminLoginButton.addEventListener('click', function(e){
//     e.preventDefault();
//     detectUser(adminUsername.value, adminPassword.value)
//     adminUsername.value = ""
//     adminPassword.value = ""
// })

// window.addEventListener('keyup', function(e){
//     e.preventDefault();
//     if(e.key == 'Enter' && adminUsername.value && adminPassword.value ){
//         detectUser(adminUsername.value, adminPassword.value)
//         adminUsername.value = ""
//         adminPassword.value = ""
//     }
// })
// end of detecting admins


// Google Books API
const valueFromAPI = document.querySelector('#valueFromAPI')
const valueFromAPIButton = document.querySelector('#valueFromAPIButton')
// divs that will be fullfilled
const bookNameInput = document.querySelector('#bookNameInput')
const authorNameInput = document.querySelector('#authorNameInput')
const bookImageUrlInput = document.querySelector('#bookImageUrlInput')
const bookDescription = document.querySelector('#bookDescription')
const bookReleaseDate = document.querySelector('#bookReleaseDate')
const bookTypeInput = document.querySelector('#bookTypeInput')

valueFromAPIButton.addEventListener('click', function(e){
    if(valueFromAPI.value.trim()){
        searchBooks(valueFromAPI.value.trim())
    }
})

window.addEventListener('keyup', function(e){
    e.preventDefault();
    if(valueFromAPI.value.trim() && e.key != "Backspase"){
        document.querySelector('#relatedSearches').style.display = "flex"
        searchBooks(valueFromAPI.value.trim())
    }

    if(e.key == "Backspace"){
        document.querySelector('#relatedSearches').style.display = "none"
    }
})


function searchBooks(element) {
    var url = `https://www.googleapis.com/books/v1/volumes?q=${element}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.querySelector('#relatedSearches').innerHTML = ""
            for(let i in data.items){
                document.querySelector('#relatedSearches').innerHTML += `
                    <div id="${data.items[i].id}">${data.items[i].volumeInfo.title}</div>
                `
                document.querySelectorAll('#relatedSearches div').forEach(function(item){
                    item.addEventListener('click', function(){
                        console.log(this.id)
                        fetch(`https://www.googleapis.com/books/v1/volumes/${this.id}`)
                            .then(response => response.json())
                            .then(data => {
                                console.log(data)
                                //setting data to propmts
                                bookNameInput.value = `${data.volumeInfo.title}`
                                authorNameInput.value = `${data.volumeInfo.authors}`
                                bookImageUrlInput.value = `${data.volumeInfo.imageLinks.medium}`
                                bookDescription.value = `${data.volumeInfo.description}`
                                bookReleaseDate.value = `${data.volumeInfo.publishedDate}`


                                document.querySelector('#relatedSearches').style.display = "none"
                                document.querySelector('#relatedSearches').innerHTML = ""
                                document.querySelector('#relatedSearches').value = ""
                                valueFromAPI.value = ""
                                
                            })
                    })
                })
            }
        })
        .catch(error => {
            console.log("Error fetching data:", error);
        });
}



// Adding about us to firebase

var sendAboutForm = document.querySelector('#sendAboutForm')
var titleAboutStore = document.querySelector('#titleAboutStore')
var aboutImageURL = document.querySelector('#aboutImageURL')
var aboutDescription = document.querySelector('#aboutDescription')

sendAboutForm.addEventListener('click', function(e){
    e.preventDefault();
    if(titleAboutStore.value.trim(), aboutImageURL.value.trim(), aboutDescription.value.trim()){
        set(ref(dataBase, 'aboutUs/title'), titleAboutStore.value.trim())
        set(ref(dataBase, 'aboutUs/imageURL'), aboutImageURL.value.trim())
        set(ref(dataBase, 'aboutUs/description'), aboutDescription.value.trim())

        titleAboutStore.value = ""
        aboutImageURL.value = ""
        aboutDescription.value = ""
    }
})


// document.addEventListener('contextmenu', (e) => e.preventDefault());

// function ctrlShiftKey(e, keyCode) {
//   return e.ctrlKey && e.shiftKey && e.keyCode === keyCode.charCodeAt(0);
// }

// document.onkeydown = (e) => {
//   // Disable F12, Ctrl + Shift + I, Ctrl + Shift + J, Ctrl + U
//   if (
//     event.keyCode === 123 ||
//     ctrlShiftKey(e, 'I') ||
//     ctrlShiftKey(e, 'J') ||
//     ctrlShiftKey(e, 'C') ||
//     (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))
//   )
//     return false;
// };





// Join us Table

function getJoinedUsers(){
    onValue(ref(dataBase, 'users/joinedUsers'),async result => {
        if(result.exists()){
            var peremennaya = 1;
            document.querySelector("#joinUsTableBody").innerHTML = ""

            for(let keys in result.val()){
                
                await get(ref(dataBase, `users/joinedUsers/${keys}`)).then(data => {
                    document.querySelector("#joinUsTableBody").innerHTML += `
                        <tr>
                            <td>${peremennaya}</td>
                            <td>${data.val().name}</td>
                            <td>${data.val().mailbox}</td>
                        </tr>
                        `
                })

                peremennaya++;
            }

        }
    })
}




// Books Section

function getBookInformation(){
    onValue(ref(dataBase, 'books/'),async result => {
        if(result.exists()){
            var peremennaya = 1;
            document.querySelector("#BooksTableBody").innerHTML = ""

            for(let keys in result.val()){
                
                await get(ref(dataBase, `books/${keys}`)).then(data => {
                    document.querySelector("#BooksTableBody").innerHTML += `
                        <tr>
                            <td>${peremennaya}</td>
                            <td>${data.val().title}</td>
                            <td>${data.val().description}</td>
                            <td>${data.val().category}</td>
                            <td>${data.val().author}</td>
                            <td class="removable" id="${data.val().title}">Remove</td>
                        </tr>
                        `

                    document.querySelectorAll('.removable').forEach(function(item){
                        item.addEventListener('click', function(){
                            remove(ref(dataBase, `books/${item.id}`))
                        })
                    })
                })

                peremennaya++;
            }

        }
    })
}


// Adding new book type
var addingTypeForm = document.querySelector('#typeAddingInfo');
var newTypeInfoButton = document.querySelector('#newTypeInfoButton')

document.querySelector('#typeAddingBlock span').addEventListener('click', function(){
    if(addingTypeForm.style.display == "flex"){
        addingTypeForm.style.display = "none"
    }else{
        addingTypeForm.style.display = "flex"
    }
})

// Click other side for close the form
var clicksToWindowCount = 1;
window.addEventListener('click', function(e){
    if(e.target != addingTypeForm && e.target != addingTypeForm.querySelector('#newTypeInfo') && clicksToWindowCount > 1){
        addingTypeForm.style.display = "none"
        clicksToWindowCount = 0
    }
    clicksToWindowCount++;
})

newTypeInfoButton.addEventListener('click', async function(e){
    e.preventDefault();
    if(document.querySelector('#newTypeInfo').value.trim()){
        await set(ref(dataBase, `bookTypes/${document.querySelector('#newTypeInfo').value.trim()}`), `${document.querySelector('#newTypeInfo').value.trim()}`)
        addingTypeForm.style.display = "none"
    }else{
        alert('please fill the prompt')
    }
})

// take book types from firebase

function typeFromFirebase(){
    onValue(ref(dataBase, 'bookTypes/'), data => {
        document.querySelector('#bookTypeInput').innerHTML = ""
        for(let keys in data.val()){
            console.log(data.val()[keys])
            document.querySelector('#bookTypeInput').innerHTML += `
                <option>${data.val()[keys]}</option>
            `
        }
    })   
}

window.onload = function(){
    getJoinedUsers()
    getBookInformation()
    typeFromFirebase()
}