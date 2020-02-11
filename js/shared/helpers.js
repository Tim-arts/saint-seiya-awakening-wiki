import Choices from "choices.js";
import Modal from "./modules/ModalResponse";

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
    updateSuggestions (options) {
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
    returnCustomDropdownTemplateElement (classes, attr) {
        const el = Choices.defaults.templates.dropdown.call(this, classes, attr);
        el.classList.add("static-dropdown");
        return el;
    },
    returnCustomChoiceTemplateElement (classes, attr) {
        const el = Choices.defaults.templates.choice.call(this, classes, attr);
        const span = document.createElement("span");
        const img = document.createElement("img");
        const slug = this.convertToSlug(attr.value, /["._' ]/g, '-');
    
        img.src = "https://res.cloudinary.com/dowdeo3ja/image/upload/f_auto,q_auto/v1/cosmos/" + slug + ".png";
    
        span.appendChild(img);
        el.insertAdjacentElement("afterbegin", span);
    
        return el;
    },
    async prepareMakeDynamicModal(self, dynamicModal, Choices) {
        let data = {};
        data.index = self.getAttribute("data-index");
        data.search = {
            type: self.getAttribute("data-type")
        };
        data.selectedElements = (() => {
            return Array.from(self.parentElement.parentElement.querySelectorAll(".image-container:not(.placeholder)")).map(x => x.getAttribute("data-slug"));
        });
        data.modal = {
            id: "choice-" + data.search.type + "-cosmos-" + data.index,
            title: "Add cosmo(s)",
        };
        data.modal.submitId = data.modal.id + "-submit";
    
        let elementAtIndex = window["Modal_Choices"]["choices--search-elements-" + data.search.type + "-" + data.index];
        if (elementAtIndex) {
            $(elementAtIndex.modal).modal({
                show: true,
                backdrop: "static",
                keyboard: false
            });
        
            return;
        }
    
        async function process () {
            function request () {
                return new Promise(resolve => {
                    $.post("../../api/partials/generate-modal", data, (response) => {
                        let dynamicModal = module.exports.convertStringToDOMElement(response);
                        document.body.appendChild(dynamicModal);
                    
                        let submit = document.getElementById(data.modal.submitId);
                        let select = document.getElementById("search-elements-" + data.search.type);
                        let Choice = new Choices(select, {
                            duplicateItemsAllowed: false,
                            searchFloor: 3,
                            searchResultLimit: 5,
                            removeItems: true,
                            removeItemButton: true,
                            itemSelectText: null,
                            callbackOnCreateTemplates: () => {
                                return {
                                    dropdown(classes, attr) {
                                        return module.exports.returnCustomDropdownTemplateElement(classes, attr);
                                    },
                                    choice(classes, attr) {
                                        return module.exports.returnCustomChoiceTemplateElement(classes, attr);
                                    }
                                }
                            }
                        });
                    
                        let elementAtIndex = window["Modal_Choices"][Choice._baseId + "-" + data.index];
                        if (!elementAtIndex) {
                            window["Modal_Choices"][Choice._baseId + "-" + data.index] = {
                                choice: Choice,
                                modal: dynamicModal
                            };
                        }
                        
                        submit.addEventListener("click", function () {
                            let array = Choice.getValue(true);
                            let parent = self.parentElement.parentElement;
                        
                            // Delete previous thumbnails
                            Array.from(parent.querySelectorAll(".image-container:not(.placeholder)")).forEach(entry => {
                                entry.remove();
                            });
                            
                            (async function () {
                                async function fetch (value) {
                                    return new Promise (resolve => {
                                        $.post("../../api/partials/add-thumbnail-cosmo-suggestion", {
                                            index: data.index,
                                            type: data.search.type,
                                            slug: module.exports.convertToSlug(value, /["._' ]/g, '-')
                                        }, (response) => {
                                            let thumbnail = module.exports.convertStringToDOMElement(response);
                                            parent.appendChild(thumbnail);
        
                                            return resolve();
                                        });
                                    });
                                }
                                
                                for (const [idx, value] of array.entries()) {
                                    await fetch(value);
                                }
                            })();
                        });
                    
                        $(dynamicModal).modal({
                            show: true,
                            backdrop: "static",
                            keyboard: false
                        });
                    
                        return resolve({
                            el: dynamicModal,
                            choice: Choice,
                            link: self
                        });
                    });
                });
            }
        
            return request();
        }
        
        return await process();
    }
};
