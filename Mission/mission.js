const themeSelector = document.querySelector("#valuetheme")
function changeTheme(){
    const imgupdate = document.getElementsByClassName('logo')[0];
    const bodyclass = document.body.classList;
    if (themeSelector.value === "Dark"){
        bodyclass.add("dark");
        imgupdate.setAttribute("src", "pic/byui-logo_white.png");
        
        
    }
    else  {
        bodyclass.remove("dark");
        imgupdate.setAttribute("src", "pic/byui-logo_blue.webp");
    
    }
}

themeSelector.addEventListener('change', changeTheme)