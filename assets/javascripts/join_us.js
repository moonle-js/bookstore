var joinUs                  =           document.querySelector('#join_us'),
    joinUsText              =           document.querySelector("#join_us_p"),
    joinUsPanel             =           document.querySelector('#join_us_panel'),
    joinButton              =           document.querySelector("#join_button");
var fullName                =           document.querySelector('#fullname'),
    email                   =           document.querySelector('#email')


    
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

    document.addEventListener('click', function(e){
        // Documentde her hansisa bir yere basanda join us itmelidir
        //  e.targer != joinUs 
    })

    joinUs.onclick = show;
    joinUsText.onclick = show;
    joinButton.onclick = showNone;

fullName.style.textTransform = "capitalize";