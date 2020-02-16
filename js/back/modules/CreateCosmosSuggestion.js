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
                e.preventDefault();
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
        this.getSuggestions().forEach((suggestion, i) => {
            let index = suggestion.getAttribute("data-index");
            
            _this.addElement(suggestion);
            
            for (let type in _this.constants) {
                let array = _this.getSuggestionThumbnails(index, _this.constants[type]);
                
                if (array.length > 0) {
                    let target = _this.elements[i].elements[type].querySelector(".placeholder a");
                    _this.triggerModal(target, true);
                }
            }
        });
        
        return this;
    }
    
    addElement (HTMLElement) {
        let object = {
            suggestion: HTMLElement,
            name: {
                fr: HTMLElement.querySelector(".fr-name"),
                en: HTMLElement.querySelector(".en-name")
            },
            elements: {
                solar: HTMLElement.querySelector(".solar-cosmos"),
                lunar: HTMLElement.querySelector(".lunar-cosmos"),
                star: HTMLElement.querySelector(".star-cosmos"),
                legendary: HTMLElement.querySelector(".legendary-cosmos"),
                actions: {
                    create: HTMLElement.querySelector(".actions .create-cosmos-suggestion"),
                    delete: HTMLElement.querySelector(".actions .remove-cosmos-suggestion")
                }
            },
            comment: {
                fr: HTMLElement.querySelector(".fr-comment"),
                en: HTMLElement.querySelector(".en-comment")
            }
        };
        
        this.elements.push(object);
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
        
        if (!this.suggestions[data.index]) {
            this.suggestions[data.index] = {};
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
        return this.elements[index].elements[type];
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
            _this.transferStaticData(data.index);
        });
    }
    
    triggerModal (link, init) {
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
        
        this.makeModal(link, init);
    }
    
    getSuggestionThumbnails (index, type) {
        return Array.from(this.elements[index].elements[type].querySelectorAll(".image-container:not(.placeholder)"))
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
        data.selectedElements = this.getValues(link);
        
        return data;
    }
    
    makeModal (link, init) {
        let _this = this,
            data = this.prepareData(link);
        
        (async function process () {
            return new Promise(resolve => {
                $.post("../../api/partials/generate-modal", data, (response) => {
                    let elements = _this.createModal(data, link, response, init);
                    
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
    
    createModal (data, link, modalAsString, init) {
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
        
        if (!init) {
            $(modal).modal({
                show: true,
                backdrop: "static",
                keyboard: false
            });
        }
        
        return {
            modal: modal,
            choice: choice
        };
    }
    
    transferStaticData (index) {
        // Move data
        this.elements[index].name.fr.childNodes[1].innerText = this.elements[0].name.fr.innerText;
        this.elements[index].name.en.childNodes[1].innerText = this.elements[0].name.en.innerText;
        this.elements[index].comment.fr.childNodes[1].innerText = this.elements[0].comment.fr.innerText;
        this.elements[index].comment.en.childNodes[1].innerText = this.elements[0].comment.en.innerText;
        this.suggestions[index] = this.suggestions[0];
        
        // Update view
        for (let type in this.constants) {
            this.getSuggestionThumbnails(0, this.constants[type]).forEach(element => {
                element.remove();
            });
            
            if (this.suggestions[index][type]) {
                this.updateSubmitIndex(index, this.constants[type]);
            }
        }
        
        // Reset data
        this.removeSuggestion(0);
        this.elements[0].name.fr.childNodes[1].innerText = "";
        this.elements[0].name.en.childNodes[1].innerText = "";
        this.elements[0].comment.fr.childNodes[1].innerText = "";
        this.elements[0].comment.en.childNodes[1].innerText = "";
    }
    
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
                    fr: _this.elements[i].comment.fr.innerText,
                    en: _this.elements[i].comment.en.innerText
                },
                elements: {}
            };
            
            for (let type in _this.constants) {
                if (suggestion[_this.constants[type]]) {
                    data.elements[_this.constants[type]] = suggestion[_this.constants[type]].choice.getValue(true);
                }
            }
            
            results.push(data);
        });
        
        // If at least one suggestion has a thumbnail
        return results = results.filter((r) => Object.keys(_this.constants).map(c => r.elements[c]).some(r => typeof r === 'object'));
    }
    
    getValues (link) {
        return Array.from(link.parentElement.parentElement.querySelectorAll(".image-container:not(.placeholder)")).map(e => e.getAttribute("data-slug"));
    }
}
