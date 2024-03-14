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