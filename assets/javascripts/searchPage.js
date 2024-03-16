import dataBase from "../javascripts/database.mjs  ";
import {
  ref,
  set,
  get,
  onValue,
  remove,
  push,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

document.querySelector('#searchBookButton').addEventListener('click', function(e){
    e.preventDefault();
    var book = '';
    get(ref(dataBase, 'isShownBook')).then(data => {
        if(data.exists()){
            book = data.val().name
        }
    })

    get(ref(dataBase, 'books/')).then( response => {
        if(response.exists()){
            for(let keys in response.val()){
                if(response.val()[keys].isShown == "true" && response.val()[keys].title == book ){
                    document.querySelector('.rightSide').innerHTML = `
                    <div id="bookImageDetails">
                        <img src="${response.val()[keys].imageURL}" alt="">
                    </div>

                    <div id="addedInfo">
                        <p>${response.val()[keys].title}</p>

                        <h5 id="titleDetails">
                            ${response.val()[keys].title}
                        </h5>

                        <p id="authorDetails">
                            ${response.val()[keys].author}
                        </p>

                        <p id="descriptionDetails">
                            ${response.val()[keys].description}
                        </p>
                    </div>
                        
                    `
                    response.val()[keys].isShown = "false"
                }
            }
        }
    })
})