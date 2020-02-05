module.exports = {
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
        return str.toLowerCase().replace(expression, replacer);
    },
    applyPassive (bool, elements) {
        if (bool) {
            elements.cost.value = null;
            elements.cost.setAttribute("disabled", "disabled");
        } else {
            elements.cost.removeAttribute("disabled");
        }
    }
};
