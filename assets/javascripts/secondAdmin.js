import {set, get, ref, onValue} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"
import dataBase from "./database.mjs";

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




// adding book info to firebase
async function addBookToFireBase(bookName, author, imageURL, descriptionOf, releaseDate, typeOfBook){

    if(bookName, author, imageURL, descriptionOf, releaseDate){
        console.log('getdi')

            await set(ref(dataBase, `books/${bookName}/title`), `${bookName}`);
            await set(ref(dataBase, `books/${bookName}/author`), `${author}`);
            await set(ref(dataBase, `books/${bookName}/description`), `${descriptionOf}`);
            await set(ref(dataBase, `books/${bookName}/dateRelease`), `${releaseDate}`);
            await set(ref(dataBase, `books/${bookName}/imageURL`), `${imageURL}`);
        }else{
            alert('please full prompts')
        }
}
document.querySelector('#addBookButton').addEventListener('click', function(e){

    e.preventDefault();
    addBookToFireBase(
        bookNameInput.value.trim(),
        authorNameInput.value.trim(),
        bookImageUrlInput.value.trim(),
        bookDescription.value.trim(),
        bookReleaseDate.value.trim(),
    )
})