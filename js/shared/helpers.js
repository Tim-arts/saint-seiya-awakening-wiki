import Choices from "choices.js";

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
    capitalize (string) {
        let result;
        
        if ((string.length === 2) && (string[0] === string[1])) {
            result = string.toUpperCase();
        } else {
            result = string.charAt(0).toUpperCase() + string.slice(1);
        }
        
        return result;
    },
    resetDisplay (elements, className) {
        elements.forEach((element) => {
            element.classList.remove(className);
        });
    },
    convertToSlug (string, expression, replacer) {
        return string.trim().toLowerCase().replace(expression, replacer);
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
    },
    convertStringToDOMElement (string) {
        let wrapper = document.createElement('div');
        wrapper.innerHTML= string;
    
        return wrapper.firstChild;
    },
    postRequest (options) {
        $.ajax({
            url: options.ajaxUrl,
            data: options.data,
            method: "POST",
            dataType: 'json',
            success: async function (response) {
                function request () {
                    let data = response.data,
                        count = data.length;
                
                    if (count === 0) {
                        return null;
                    }
                
                    return new Promise (resolve => {
                        for (let i = 0; i < count; i++) {
                            $.post(options.partialUrl, {
                                name: data[i].name
                            }, (response) => {
                                data[i].div = response;
        
                                if ((i + 1) === count) {
                                    return resolve(data);
                                }
                            });
                        }
                    });
                }
            
                options.update(await request());
            },
            error: function (response) {
                console.log(response);
            }
        });
    },
    returnTemplateElement (classes, attr) {
        const el = Choices.defaults.templates.choice.call(this, classes, attr);
        const span = document.createElement("span");
        const img = document.createElement("img");
        const slug = this.convertToSlug(attr.value, /["._' ]/g, '-');
    
        img.src = "https://res.cloudinary.com/dowdeo3ja/image/upload/f_auto,q_auto/v1/cosmos/" + slug + ".png";
    
        span.appendChild(img);
        el.insertAdjacentElement("afterbegin", span);
    
        return el;
    }
};
