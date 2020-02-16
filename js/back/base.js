const cookies = require("cookies-js");

document.addEventListener("DOMContentLoaded", () => {
    let sidebarToggleButton = document.getElementById("sidebar-collapse"),
        sidebar = document.getElementById("sidebar"),
        languagesButtons = Array.from(document.querySelectorAll(".language")),
        goTopElement = document.getElementById("go-top");
    
    sidebarToggleButton.addEventListener("click", function () {
        let iconElement = this.querySelector("i");
        
        if (sidebar.classList.contains("active")) {
            iconElement.innerHTML = "close";
        } else {
            iconElement.innerHTML = "menu";
        }
        
        sidebar.classList.toggle("active");
    });
    
    languagesButtons.forEach(button => {
        button.addEventListener("click", function (e) {
            let currentLanguage = this.getAttribute("data-language");
            cookies.set("lang", currentLanguage, {expires: 365});
    
            location.reload(true);
    
            e.preventDefault();
        });
    });
    
    goTopElement.addEventListener("click", () => {
        $(sidebar.nextElementSibling).animate({
            scrollTop: 0
        }, 200);
    });
});
