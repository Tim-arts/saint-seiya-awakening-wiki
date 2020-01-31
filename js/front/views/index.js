import "../base";
import BgSlider from "./../modules/BgSlider";

document.addEventListener("DOMContentLoaded", () => {
    let slideElements = document.querySelectorAll(".bg-slider");
    
    for (let slideElement of slideElements) {
        new BgSlider(slideElement);
    }
});
