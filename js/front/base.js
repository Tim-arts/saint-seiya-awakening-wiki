const cookies = require("cookies-js");

document.addEventListener("DOMContentLoaded", () => {
    let lang = document.getElementById("pick-lang"),
        dropdownMenu = lang.nextElementSibling;
    
    lang.addEventListener("click", function (e) {
        e.preventDefault();
    });
    
    dropdownMenu.querySelectorAll(".dropdown-item").forEach((item) => {
        item.addEventListener("click", function (e) {
            let currentLanguage = this.getAttribute("data-language");
            cookies.set("lang", currentLanguage, {expires: 365});
    
            location.reload(true);
            
            e.preventDefault();
        })
    })
});
