



window.addEventListener('resize', () => {
    const windowWidth = window.innerWidth;
    const pictureUpdate = document.getElementById("myImage");

        

    if (windowWidth <= 650) {
        const autohide = document.querySelector("Menu");
        autohide.classList.add("hide");
        pictureUpdate.src = "pictures/norris-sm.jpeg"; 
    } 
    else {
        const autounhide = document.querySelector("Menu");
        autounhide.classList.remove("hide"); 
        autounhide.classList.add("menu");
        pictureUpdate.src = "pictures/norris-full.jpeg"; 
          
}
}
)





const menuButton = document.querySelector(".menu_button");
function toggleofmenu() {
    const menu = document.querySelector("Menu");
    menu.classList.toggle("hide");
}

menuButton.addEventListener("click", toggleofmenu)
 



function openViewer(event) {
    const viewer = document.querySelector('.viewer');
    const viewerImg = viewer.querySelector('img');

    if (viewer && viewerImg) {
        viewerImg.src = event.target.src;


        viewer.classList.add('show');
    } else {
        console.error("Viewer or viewer image not found!");
    }
}

function closeViewer() {
    const viewer = document.querySelector('.viewer');
    
    if (viewer) {
        viewer.classList.remove('show');
    } else {
        console.error("Viewer not found!");
    }
}


function initializeGallery() {
    const galleryImages = document.querySelectorAll('.gallery img');
    const pictureUpdate = document.getElementById("myImage");
    pictureUpdate.src = "pictures/norris-full.jpeg"; 
    
    if (galleryImages.length > 0) {
        galleryImages.forEach((image) => {
            image.addEventListener('click', openViewer);
        });

        const closeButton = document.querySelector('.close-viewer');
        if (closeButton) {
            closeButton.addEventListener('click', closeViewer);
        } else {
            console.error("Close button not found!");
        }
    } else {
        console.error("No gallery images found!");
    }
}


window.addEventListener('DOMContentLoaded', initializeGallery);
