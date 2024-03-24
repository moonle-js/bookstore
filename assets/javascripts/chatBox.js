import dataBase from "./database.mjs";
import {set, get, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"

function openForm() {
    document.getElementById("myForm").style.display = "block";
  }
  
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

document.querySelector('.open-button').onclick = openForm
document.querySelector('.cancel').onclick = closeForm

var sendMessageToChat = document.querySelector('#sendMessageToChat')
var messageContent = document.querySelector('#messageContent')




  sendMessageToChat.addEventListener('click',async function(e){
    e.preventDefault();
    
    await get(ref(dataBase, 'joinedUser')).then(async data => {
      if(data.exists()){
        if(data.val() == "0" || data.val() == localStorage.getItem('bookstoreUser')){
          if(localStorage.getItem('bookstoreUser') && messageContent.value.trim()){
            await set(ref(dataBase, `joinedUser`), localStorage.getItem('bookstoreUser'))
            var snapshot = push(ref(dataBase, 'chat')).key
            await set(ref(dataBase, `chat/${snapshot}/message`), messageContent.value.trim())
            await set(ref(dataBase, `chat/${snapshot}/sender`), localStorage.getItem('bookstoreUser'))
          }      
        }else{
          alert('server is full')
        }
      }
    })
    
  })

  window.addEventListener('beforeunload', function(){
    set(ref(dataBase, 'joinedUser'), '0')
    set(ref(dataBase, 'chat'), '0')
  })