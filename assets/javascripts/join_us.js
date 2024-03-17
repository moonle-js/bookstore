let joinBox = document.querySelector(".join_box");
let modalBackdrop = document.querySelector(".modal_backdrop");
let modalBox = document.querySelector(".modal_box");
let joinName = document.querySelector("#join_name");
let joinEmail = document.querySelector("#join_email");
let joinBtn = document.querySelector(".join_btn");

// display js

joinBox.addEventListener("click", function () {
  modalBackdrop.style.display = "block";
  modalBox.classList.add("show");
});

modalBackdrop.addEventListener("click", function () {
  modalBackdrop.style.display = "none";
  modalBox.classList.remove("show");
});


// Initialize Firebase


//write form on dataBase
function writePushJoinData(collection, data) {
  try {
    if (!collection) {
      alert("Required collection");
      return;
    }
    const contactRef = ref(dataBase, collection);
    push(contactRef, data);
  } catch (err) {
    console.log(err, "err");
  }
}

//submit join

joinBtn.addEventListener("click", function () {
  let name = joinName.value;
  let email = joinEmail.value;

  if (!name) {
    joinName.classList.add("is-invalid");
  } else {
    joinName.classList.remove("is-invalid");
  }
  if (!email) {
    joinEmail.classList.add("is-invalid");
  } else {
    joinEmail.classList.remove("is-invalid");
  }

  if (!name || !email) {
    return;
  }

  let data = {
    name,
    email,
  };

  writePushJoinData("join", data);

  setTimeout(() => {
    modalBackdrop.style.display = "none";
    modalBox.classList.remove("show");
  }, 500);

  joinName.value ="";
  joinEmail.value ="";
});

console.log("join");