import dataBase from "./database.mjs";
import {set, get, ref, onValue,push, remove} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"


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
document.querySelector('#goBackButton').addEventListener('click', function(){
    window.location = "/assets/pages/catalogPage.html"
})


// comment

let commentForm = document.querySelector(".comment_form")
let commentTitle =document.querySelector("#commentInput")
let addComment = document.querySelector("#addComment")
let commentList = document.querySelector(".comment_list")

// addComment.addEventListener('click', function(e){
//     e.preventDefault();
//      let commentTitle = document.querySelector("#commentInput");
    
//      if (commentTitle.value.trim()){
//         set(ref(dataBase,'books/comment')).then(snapshot =>{
//             if (snapshot.exists()) {
               
//             }
//         })

//      }
     
// });

function showAnonimComments(snapshot) {
    let commentTitle = document.querySelector("#commentInput");
    let snapshot = push(ref(dataBase,'/books'))
    set (ref(dataBase,`'books/comment`), commentTitle.value);
    document.querySelector("#commentInput").innerHTML = "";
    get (ref(dataBase,`'books/comment`).then(response => {


        for(let keys in snapshot.val()){
            if(snapshot.val()[keys]){
                document.querySelector(".comment_list").innerHTML += `
                <ul class="comment_list">
                <li>
                    <div class="user_comment">
                        <h4 id="anonimPerson">${snapshot.val()[keys]}</h4>
                        <span id= "dateTime">${snapshot.val()[keys]}</span>
                        <p id= "commentTitle">${snapshot.val()[keys]}</p>
                    </div>
                </li>

                </ul>
                `
                return
            }
            
        }

    }));
    

};