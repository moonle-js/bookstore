import dataBase from "./database.mjs"
import {ref, set, get, push, onValue} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"

var sendNoteToDB = document.querySelector('#sendNoteToDB')
var fullName = document.querySelector('#fullName')
var address = document.querySelector('#address')
var phonenumber = document.querySelector('#phonenumber')
var note = document.querySelector('#note')
var emaill = document.querySelector('#emaill')

var emailChecker = /\w+\@\w+\.\w+/g

var nameOfUser = localStorage.getItem('bookstoreUser')
if(nameOfUser){
    get(ref(dataBase, `users/joinedUsers/${nameOfUser}`)).then(result=>{
        if(result.exists()){
            document.querySelector('#fullNamee').value = `${result.val().name}`
            document.querySelector('#emaill').value = `${result.val().mailbox}`
        }
    })
}


sendNoteToDB.addEventListener('click', function(e){
    
    e.preventDefault()
    if(
        fullName.value.trim() &&
        emaill.value.trim() &&
        address.value.trim() &&
        note.value.trim() &&
        phonenumber.value.trim() && 
        emaill.value.match(emailChecker)
    ){
        var snapshot = push(ref(dataBase, `contactUs/`)).key
        set(ref(dataBase, `contactUs/${snapshot}/email`), `${emaill.value.trim()}`)
        set(ref(dataBase, `contactUs/${snapshot}/name`), `${fullName.value.trim()}`)
        set(ref(dataBase, `contactUs/${snapshot}/address`), `${address.value.trim()}`)
        set(ref(dataBase, `contactUs/${snapshot}/phone`), `${phonenumber.value.trim()}`)
        set(ref(dataBase, `contactUs/${snapshot}/note`), `${note.value.trim()}`)

        fullName.value = ""
        emaill.value = ""
        address.value = ""
        note.value = ""
        phonenumber.value = ''
    }else{
        alert('Please fill prompts correctly')
    }
})



