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
            var addingData = {
              message: `${messageContent.value.trim()}`,
              sender: `${localStorage.getItem('bookstoreUser')}`
            }
            await set(ref(dataBase, `chat/${snapshot}/`), addingData)
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

  onValue(ref(dataBase, 'chat'),async data => {
    if(data.exists()){
      document.querySelector('#allMessages').innerHTML = " "

      for(let keys in data.val()){
        if(data.val()[keys] == "0"){
          document.querySelector('#allMessages').innerHTML = " "
        }else{
          var nameOFSender = '';
          if(data.val()[keys].sender == "admin"){
            nameOFSender = "Admin"
          }else{
            nameOFSender = 'Siz'
          }
          document.querySelector('#allMessages').innerHTML += `
              <div>${nameOFSender} : ${data.val()[keys].message}</div>
          `
        }
        
      }
    }
  })