module.exports = {
    constants: {
        urls: {
            skill: "https://res.cloudinary.com/dowdeo3ja/image/upload/f_auto,q_auto/v1/skills/default.png",
            cosmo: "https://res.cloudinary.com/dowdeo3ja/image/upload/f_auto,q_auto/v1/cosmos/default.png",
            saint: "https://res.cloudinary.com/dowdeo3ja/image/upload/f_auto,q_auto/v1/saints/default.png"
        }
    },
    generateUuidv4 () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    updateThumbnail: (image, source) => {
        image.classList.add("anim-fade-out-short");
        
        // Preload image
        let tempImage = document.createElement("img");
        tempImage.src = source;
        
        setTimeout(function () {
            image.src = source;
            image.classList.remove("anim-fade-out-short");
            image.classList.add("anim-fade-in-short");
            tempImage = null;
        
            setTimeout(function () {
                image.classList.remove("anim-fade-in-short");
            }, 500)
        }, 500);
    },
    resetDisplay (elements, className) {
        elements.forEach((element) => {
            element.classList.remove(className);
        });
    },
    convertToSlug (str, expression, replacer) {
        return str.trim().toLowerCase().replace(expression, replacer);
    },
    applyPassive (bool, elements) {
        if (bool) {
            elements.cost.value = null;
            elements.cost.setAttribute("disabled", "disabled");
        } else {
            elements.cost.removeAttribute("disabled");
        }
    },
    displayElementsFromType (markers, value, type) {
        if (value === type) {
            markers.forEach((marker) => { marker.classList.add("hide"); });
        } else {
            markers.forEach((marker) => { marker.classList.remove("hide"); });
        }
    }
};
