module.exports = {
    constants: {
        urls: {
            skill: "https://res.cloudinary.com/dowdeo3ja/image/upload/f_auto,q_auto/v1/skills/default.png",
            cosmo: "https://res.cloudinary.com/dowdeo3ja/image/upload/f_auto,q_auto/v1/cosmos/default.png",
            saint: "https://res.cloudinary.com/dowdeo3ja/image/upload/f_auto,q_auto/v1/saints/default-portrait.png"
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
    resetDisplay (elements, className, count) {
        if (count > elements.length) count = elements.length;
        for (let i = 0; i < count; i++) {
            elements[i].classList.remove(className);
        }
    },
    convertToSlug (string, expression, replace) {
        let replaceValue = replace ? replace : "-";
        return string.trim().toLowerCase().replace(expression, replaceValue);
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
        wrapper.innerHTML = string.trim();
        
        return Array.from(wrapper.childNodes).filter(node => node.nodeName !== "#text");
    },
    hasClass (el, className) {
        return el.classList.contains(className);
    },
    updateSuggestions (options) {
        $.ajax({
            url: options.ajaxUrl,
            data: options.data,
            method: "POST",
            dataType: 'json',
            success: async function (response) {
                if (!response || response.length === 0) return options.update();
                
                function request () {
                    let data = response.data,
                        count = data.length;
                
                    if (count === 0) {
                        return null;
                    }
                
                    return new Promise (resolve => {
                        for (let i = 0; i < count; i++) {
                            $.post(options.partialUrl, {
                                name: data[i]._name
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
    addThumbnailIntoContainer (data, subfolder) {
        let div = this.convertStringToDOMElement(data.div)[0],
            image = document.createElement("img");
    
        if (subfolder) {
            image.src = "https://res.cloudinary.com/dowdeo3ja/image/upload/f_auto,q_auto/saints/" + data.slug + "/portrait.png";
        } else {
            image.src = "https://res.cloudinary.com/dowdeo3ja/image/upload/f_auto,q_auto/skills/" + data.slug + ".png";
        }
        
        div.insertAdjacentElement("afterbegin", image);
        
        // Replace the name slugged from DB by the name from the AJAX response
        data._name = div.innerText;
    
        return div;
    },
    getSelectMultipleValue (id) {
        let select = document.getElementById(id);
        return [...Array.from(select.querySelectorAll("option:checked"),e => e.value)];
    }
};
