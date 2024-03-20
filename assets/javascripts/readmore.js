import dataBase from "./database.mjs";
import {set, get, ref, onValue, remove} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"


window.addEventListener('load', function(){
    var searchParams = new URLSearchParams(window.location.search);
    var selectedBook = searchParams.get('selectedBook');
    
    get(ref(dataBase, `books/`)).then(data => {
        if(data.exists()){
            for(let key in data.val()){

                if(data.val()[key].title == selectedBook){
                    console.log(data.val()[key])
                    document.querySelector('#mainSEction').innerHTML = `
                        <div id="leftSide">
                            <h1>
                                ${data.val()[key].title}
                            </h1>
                            <p>
                                ${data.val()[key].description}
                            </p>
                        </div>

                        <div id="rightSide">
                            <img src="${data.val()[key].imageURL}" alt="">
                        </div>
                    `
                }
            }
        }
    })

})