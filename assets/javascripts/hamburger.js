var links = document.querySelector('#links'),
    hamburger = document.querySelector('#hamburger'),
    sectionOne = document.querySelector('.swiper'),
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