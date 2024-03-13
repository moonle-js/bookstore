// Importing database and functions from firebase and module js file
import dataBase from "./database.mjs";
import {set, get, ref} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"
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
                alert('Please enter');
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

valueFromAPIButton.addEventListener('click', function(e){
    if(valueFromAPI.value.trim()){
        searchBooks(valueFromAPI.value.trim())
    }
})

function searchBooks(element) {
    var url = `https://www.googleapis.com/books/v1/volumes?q=${element}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.log("Error fetching data:", error);
        });
}