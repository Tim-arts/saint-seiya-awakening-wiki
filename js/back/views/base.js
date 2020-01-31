document.addEventListener("DOMContentLoaded", () => {
    let sidebarToggleButton = document.getElementById("sidebar-collapse"),
        sidebar = document.getElementById("sidebar");
    
    sidebarToggleButton.addEventListener("click", function () {
        let iconElement = this.querySelector("i");
        
        if (sidebar.classList.contains("active")) {
            iconElement.innerHTML = "close";
        } else {
            iconElement.innerHTML = "menu";
        }
        
        sidebar.classList.toggle("active");
    });
});
