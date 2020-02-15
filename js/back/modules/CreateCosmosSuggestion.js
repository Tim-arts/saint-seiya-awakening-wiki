import Choices from "choices.js";
const helpers = require("./../../shared/helpers");
const cosmosTypes = require("./../../../fixtures/data/modules/cosmos-types");

export default class CreateCosmosSuggestion {
    constructor(el) {
        let _this = this;
        this.el = el;
        this.constants = (() => {
            let data = {};
            
            cosmosTypes.forEach(type => {
                type = type.toLowerCase();
                data[type] = type;
            });
            
            return data;
        })();
        this.suggestions = [];
        this.index = 0;
        this.selectors = {
            triggerModal: "trigger-modal",
            createSuggestion: "create-cosmos-suggestion",
            removeSuggestion: "remove-cosmos-suggestion",
            removeThumbnail: "remove-thumbnail"
        };
        this.container = el.querySelector(".suggestions");
        this.elements = [];
        
        document.addEventListener("click", function (e) {
            let target = e.target;
            
            if (helpers.hasClass(target, _this.selectors.triggerModal)) {
                _this.triggerModal(target);
            } else if (helpers.hasClass(target, _this.selectors.createSuggestion)) {
                _this.createSuggestion();
            } else if (helpers.hasClass(target, _this.selectors.removeSuggestion)) {
                let index = target.getAttribute("data-index");
                
                _this.removeElement(index);
                _this.removeSuggestion(index);
            } else if (helpers.hasClass(target, _this.selectors.removeThumbnail)) {
                _this.removeSuggestionThumbnail(target);
            }
        }, false);
    
        // Init elements
        this.suggestions[0] = {};
        this.getSuggestions().forEach(suggestion => {
            _this.addElement(suggestion);
        });
        
        return this;
    }
    
    addElement (HTMLElement) {
        let element = {
            suggestion: HTMLElement,
            name: {
                fr: HTMLElement.querySelector(".fr-name"),
                en: HTMLElement.querySelector(".en-name")
            },
            solar: HTMLElement.querySelector(".solar-cosmos"),
            lunar: HTMLElement.querySelector(".lunar-cosmos"),
            star: HTMLElement.querySelector(".star-cosmos"),
            legendary: HTMLElement.querySelector(".legendary-cosmos"),
            actions: {
                create: HTMLElement.querySelector(".actions .create-suggestion"),
                delete: HTMLElement.querySelector(".actions .remove-suggestion")
            },
            comments: {
                fr: HTMLElement.querySelector(".fr-comment"),
                en: HTMLElement.querySelector(".en-comment")
            }
        };
        
        this.elements.push(element);
    }
    
    removeElement (index) {
        this.elements[index].suggestion.remove();
        delete this.elements[index];
        
        for (let type in this.constants) {
            if (this.suggestions[index][this.constants[type]]) {
                this.suggestions[index][this.constants[type]].modal.remove();
            }
        }
    }
    
    addSuggestion (data) {
        for (let i = 0; i < data.index; i++) {
            if (!this.suggestions[i]) {
                this.suggestions[i] = null;
            }
        }
    
        this.suggestions[data.index][data.type] = {
            modal: data.modal,
            choice: data.choice,
            link: data.link
        }
    }
    
    removeSuggestion (index) {
        this.suggestions[index] = {};
    }
    
    getElementByIndexByType (index, type) {
        return this.elements[index][type];
    }
    
    getSuggestions () {
        return Array.from(this.container.querySelectorAll(".suggestion"));
    }
    
    createSuggestion () {
        let _this = this,
            data = {
                index: ++this.index,
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
            let HTMLElement = helpers.convertStringToDOMElement(response)[0];
            
            _this.addElement(HTMLElement);
            _this.container.appendChild(HTMLElement);
            // _this.transferStaticData(data.index);
        });
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
        
        if (this.suggestions[index][type]) {
            this.suggestions[index][type].choice.removeActiveItemsByValue(slug);
        }
        
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
        data.selected = this.convertThumbnailsToSlugs(data.index, data.type);
        data.modal = {
            id: "choice-" + data.type + "-cosmos-" + helpers.generateUuidv4(),
            title: "Add cosmo(s)",
        };
        data.modal.submitId = data.modal.id + "-submit";
        
        return data;
    }
    
    makeModal (link) {
        let _this = this,
            data = this.prepareData(link);
        
        (async function process () {
            return new Promise(resolve => {
                $.post("../../api/partials/generate-modal", data, (response) => {
                    let elements = _this.createModal(data, link, response);
                    
                    _this.addSuggestion({
                        index: data.index,
                        type: data.type,
                        modal: elements.modal,
                        choice: elements.choice,
                        link: link
                    });
                    
                    return resolve();
                });
            });
        })();
    }
    
    createModal (data, link, modalAsString) {
        let _this = this;
        let modal = helpers.convertStringToDOMElement(modalAsString)[0];
        let submit = modal.querySelector(".submit");
        let close = modal.querySelector(".close");
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
        let values;
        
        submit.addEventListener("click", function (e) {
            let currentIndex = this.getAttribute("data-index"),
                array = choice.getValue(true);
            if (array.length === 0) {
                return;
            }
            
            // Delete previous thumbnails
            _this.removeSuggestionThumbnails(currentIndex, data.type);
            
            (async function () {
                async function fetch (value) {
                    return new Promise (resolve => {
                        $.post("../../api/partials/add-thumbnail-cosmo-suggestion", {
                            index: currentIndex,
                            type: data.type,
                            slug: helpers.convertToSlug(value, /["._' ]/g, '-')
                        }, (response) => {
                            let thumbnail = helpers.convertStringToDOMElement(response)[0],
                                parent = _this.getElementByIndexByType(currentIndex, data.type);
                            parent.appendChild(thumbnail);
                            
                            return resolve();
                        });
                    });
                }
                
                for (const [idx, value] of array.entries()) {
                    await fetch(value);
                }
            })();
            
            e.preventDefault();
        });
    
        $(modal).on("show.bs.modal", () => {
            values = choice.getValue(true);
        });

        close.addEventListener("click", () => {
            let currentValues = choice.getValue(true);
            let comparison = currentValues.filter(n => !values.includes(n));
            
            comparison.forEach(value => {
                choice.removeActiveItemsByValue(value);
            });
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
    
    // transferStaticData (index) {
    //     // Move data
    //     this.elements[index].name.fr.childNodes[1].innerText = this.elements[0].name.fr.innerText;
    //     this.elements[index].name.en.childNodes[1].innerText = this.elements[0].name.en.innerText;
    //     this.elements[index].comments.fr.childNodes[1].innerText = this.elements[0].comments.fr.innerText;
    //     this.elements[index].comments.en.childNodes[1].innerText = this.elements[0].comments.en.innerText;
    //     this.suggestions[index] = this.suggestions[0];
    //
    //     // Update view
    //     for (let type in this.constants) {
    //         this.getSuggestionThumbnails(0, this.constants[type]).forEach(element => {
    //             element.remove();
    //         });
    //
    //         if (this.suggestions[index][type]) {
    //             this.updateSubmitIndex(index, this.constants[type]);
    //         }
    //     }
    //
    //     // Reset data
    //     this.removeSuggestion(0);
    //     this.elements[0].name.fr.childNodes[1].innerText = "";
    //     this.elements[0].name.en.childNodes[1].innerText = "";
    //     this.elements[0].comments.fr.childNodes[1].innerText = "";
    //     this.elements[0].comments.en.childNodes[1].innerText = "";
    // }
    
    updateSubmitIndex (index, type) {
        this.suggestions[index][type].modal.querySelector(".submit").setAttribute("data-index", index);
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
    
    getValue () {
        let _this = this,
            results = [];
        
        this.suggestions.forEach((suggestion, i) => {
            let data = {
                template_name: {
                    fr: _this.elements[i].name.fr.innerText,
                    en: _this.elements[i].name.en.innerText
                },
                comment: {
                    fr: _this.elements[i].comments.fr.innerText,
                    en: _this.elements[i].comments.en.innerText
                }
            };
            
            for (let type in _this.constants) {
                if (suggestion[_this.constants[type]]) {
                    data[_this.constants[type]] = suggestion[_this.constants[type]].choice.getValue(true);
                }
            }
            
            results.push(data);
        });
        
        return results;
    }
}
