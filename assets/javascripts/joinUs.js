var joinUs                  =           document.querySelector('#join_us'),
    joinUsText              =           document.querySelector("#join_us_p"),
    joinUsPanel             =           document.querySelector('#join_us_panel'),
    joinButton              =           document.querySelector("#join_button");
var fullName                =           document.querySelector('#fullname'),
    email                   =           document.querySelector('#email'),
    exit                    =           document.querySelector('.exit');


    
    function showNone(){
        email.value = "";
        fullName.value = "";
        joinUsPanel.style.display = "none";
    }
    function show(){
        fullName.value = "";
        email.value = "";
        joinUsPanel.style.display = "flex";
    }

    joinUs.onclick = show;
    joinUsText.onclick = show;
    exit.onclick = showNone;
    joinButton.onclick = showNone;

fullName.style.textTransform = "capitalize";



var links = document.querySelector('#links'),
    hamburger = document.querySelector('#hamburger'),
    sectionOne = document.querySelector('.sec_1'),
    image_nav = document.querySelector('#image_nav');



    hamburger.onclick = function() {
    
        if(sectionOne.style.marginTop === "200px"){
            sectionOne.style.marginTop = "50px";
        }else{
            sectionOne.style.marginTop = "200px";
        }

        links.classList.toggle('enable');
        

        if(links.classList.contains('enable')){
            image_nav.style.display = "inline-block";
        }else{
            image_nav.style.display = "none";
        }

        console.log(links.classList)

    };