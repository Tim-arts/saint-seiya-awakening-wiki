import Choices from "choices.js";
const helpers = require("./../../shared/helpers");

export default class CreateSuggestionCosmos {
    constructor(el) {
        let _this = this;
        this.el = el;
        this.constants = {
            solar: "solar",
            lunar: "lunar",
            star: "star",
            legendary: "legendary"
        };
        this.suggestions = [];
        this.selectors = {
            triggerModal: "trigger-modal",
            addSuggestion: "add-suggestion",
            removeSuggestion: "remove-suggestion",
            removeThumbnail: "remove-thumbnail"
        };
        this.container = el.querySelector(".suggestions");
        this.elements = (() => {
            let data = [];
            
            Array.from(this.getSuggestions()).forEach(suggestion => {
                let object = {
                    solar: suggestion.querySelector(".solar-cosmos"),
                    lunar: suggestion.querySelector(".lunar-cosmos"),
                    star: suggestion.querySelector(".star-cosmos"),
                    legendary: suggestion.querySelector(".legendary-cosmos"),
                    actions: {
                        add: suggestion.querySelector(".actions .add-suggestion"),
                        delete: suggestion.querySelector(".actions .remove-suggestion")
                    }
                };
                
                data.push(object);
            });
            
            return data;
        })();
        
        document.addEventListener("click", function (e) {
            let target = e.target;
            
            if (helpers.hasClass(target, _this.selectors.triggerModal)) {
                _this.triggerModal(target);
            } else if (helpers.hasClass(target, _this.selectors.addSuggestion)) {
                _this.addSuggestion()
            } else if (helpers.hasClass(target, _this.selectors.removeSuggestion)) {
                _this.removeSuggestion();
            } else if (helpers.hasClass(target, _this.selectors.removeThumbnail)) {
                _this.removeSuggestionThumbnail(target);
            }
        }, false);
        
        return this;
    }
    
    addElement (index) {
    
    }
    
    removeElement (index) {
    
    }
    
    getElementByIndexByType (index, type) {
        return this.elements[index][type];
    }
    
    getSuggestions () {
        return this.container.querySelectorAll(".suggestion");
    }
    
    addSuggestion () {
        let _this = this,
            data = {
                index: this.getSuggestions().length,
                starter: false,
                elements: {
                    solar: (() => {
                        let elements = this.getSuggestionThumbnails(0, this.constants.solar);
                        elements = elements.map(x => x.getAttribute("data-slug"));
                        
                        return elements;
                    })(),
                    lunar: (() => {
                        let elements = this.getSuggestionThumbnails(0, this.constants.lunar);
                        elements = elements.map(x => x.getAttribute("data-slug"));
                        
                        return elements;
                    })(),
                    star: (() => {
                        let elements = this.getSuggestionThumbnails(0, this.constants.star);
                        elements = elements.map(x => x.getAttribute("data-slug"));
                        
                        return elements;
                    })(),
                    legendary: (() => {
                        let elements = this.getSuggestionThumbnails(0, this.constants.legendary);
                        elements = elements.map(x => x.getAttribute("data-slug"));
                        
                        return elements;
                    })()
                }
            };
        
        $.post("../../api/partials/add-cosmos-suggestion", data, (response) => {
            let HTMLElement = helpers.convertStringToDOMElement(response);
            
            _this.suggestions.push({
                solar: HTMLElement.querySelector(".solar-cosmos"),
                lunar: HTMLElement.querySelector(".lunar-cosmos"),
                star: HTMLElement.querySelector(".star-cosmos"),
                legendary: HTMLElement.querySelector(".legendary-cosmos"),
                actions: {
                    add: HTMLElement.querySelector(".actions .add-suggestion"),
                    delete: HTMLElement.querySelector(".actions .remove-suggestion")
                }
            });
            _this.transferStaticData(data.index);
            _this.container.appendChild(HTMLElement);
        });
    }
    
    removeSuggestion () {
    
    }
    
    triggerModal (link) {
        let index = link.getAttribute("data-index"),
            type = link.getAttribute("data-type");
        
        if (this.suggestions[index] && this.suggestions[index][type]) {
            $(this.suggestions[index][type].modal).modal({
                show: true,
                backdrop: "static",
                keyboard: false
            });
            
            return;
        }
        
        this.makeModal(link);
    }
    
    getSuggestionThumbnails (index, type) {
        return Array.from(this.elements[index][type].querySelectorAll(".image-container:not(.placeholder)"))
    }
    
    removeSuggestionThumbnail (link) {
        let index = link.getAttribute("data-index");
        let type = link.getAttribute("data-type");
        let slug = link.getAttribute("data-slug");
        
        this.suggestions[index][type].choice.removeActiveItemsByValue(slug);
        link.parentElement.remove();
    }
    
    removeSuggestionThumbnails (index, type) {
        this.getSuggestionThumbnails(index, type).forEach(thumbnail => {
            thumbnail.remove();
        });
    }
    
    convertThumbnailsToSlugs (index, type) {
        return this.getSuggestionThumbnails(index, type).map(x => x.getAttribute("data-slug"));
    }
    
    prepareData (link) {
        let data = {};
        data.index = link.getAttribute("data-index");
        data.type = link.getAttribute("data-type");
        data.slugs = this.convertThumbnailsToSlugs(data.index, data.type);
        data.modal = {
            id: "choice-" + data.type + "-cosmos-" + data.index,
            title: "Add cosmo(s)",
        };
        data.modal.submitId = data.modal.id + "-submit";
        
        return data;
    }
    
    makeModal (link) {
        let _this = this,
            data = this.prepareData(link);
        
        // "choices--search-elements-" + data.type + "-" + data.index
        
        (async function process () {
            return new Promise(resolve => {
                $.post("../../api/partials/generate-modal", data, (response) => {
                    let elements = _this.createModal(data, link, response);
                    
                    _this.suggestions[data.index] = {
                        [data.type]: {
                            modal: elements.modal,
                            choice: elements.choice,
                            link: link
                        }
                    };
                    
                    return resolve(_this.suggestions[data.index][data.type]);
                });
            });
        })();
    }
    
    createModal (data, link, modalAsString) {
        let _this = this;
        let modal = helpers.convertStringToDOMElement(modalAsString);
        let submit = modal.querySelector(".submit");
        let select = modal.querySelector("select");
        let choice = new Choices(select, {
            duplicateItemsAllowed: false,
            searchFloor: 3,
            searchResultLimit: 5,
            removeItems: true,
            removeItemButton: true,
            itemSelectText: null,
            callbackOnCreateTemplates: () => {
                return {
                    dropdown(classes, attr) {
                        return _this.returnCustomDropdownTemplateElement(classes, attr);
                    },
                    choice(classes, attr) {
                        return _this.returnCustomChoiceTemplateElement(classes, attr);
                    }
                }
            }
        });
        
        submit.addEventListener("click", function () {
            let array = choice.getValue(true);
            
            if (array.length === 0) {
                return;
            }
            
            // Delete previous thumbnails
            _this.removeSuggestionThumbnails(data.index, data.type);
            
            (async function () {
                async function fetch (value) {
                    return new Promise (resolve => {
                        $.post("../../api/partials/add-thumbnail-cosmo-suggestion", {
                            index: data.index,
                            type: data.type,
                            slug: helpers.convertToSlug(value, /["._' ]/g, '-')
                        }, (response) => {
                            let thumbnail = helpers.convertStringToDOMElement(response),
                                parent = _this.getElementByIndexByType(data.index, data.type);
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
        
        document.body.appendChild(modal);
        $(modal).modal({
            show: true,
            backdrop: "static",
            keyboard: false
        });
        
        return {
            modal: modal,
            choice: choice
        };
    }
    
    transferStaticData (index) {
        // Clear view
        for (let key in this.constants) {
            this.getSuggestionThumbnails(0, this.constants[key]).forEach(element => {
                element.remove();
            });
        }
    }
    
    returnCustomDropdownTemplateElement (classes, attr) {
        const el = Choices.defaults.templates.dropdown.call(this, classes, attr);
        el.classList.add("static-dropdown");
        return el;
    }
    
    returnCustomChoiceTemplateElement (classes, attr) {
        const el = Choices.defaults.templates.choice.call(this, classes, attr);
        const span = document.createElement("span");
        const img = document.createElement("img");
        const slug = helpers.convertToSlug(attr.value, /["._' ]/g, '-');
        
        img.src = "https://res.cloudinary.com/dowdeo3ja/image/upload/f_auto,q_auto/v1/cosmos/" + slug + ".png";
        
        span.appendChild(img);
        el.insertAdjacentElement("afterbegin", span);
        
        return el;
    }
}
