const helpers = require("./../../shared/helpers");

export default class CreateSkillsSuggestion {
    constructor (el) {
        let _this = this;
        this.el = el;
        this.selectors = {
            createSuggestion: "create-skills-suggestion",
            removeSuggestion: "remove-skills-suggestion",
            createPriority: "create-skills-suggestion-priority"
        };
        this.container = el.querySelector(".suggestions");
        this.index = 0;
        this.suggestions = [];
    
        document.addEventListener("click", function (e) {
            let target = e.target;
            
            if (helpers.hasClass(target, _this.selectors.createSuggestion)) {
                _this.createSuggestion();
            } else if (helpers.hasClass(target, _this.selectors.removeSuggestion)) {
                let index = target.getAttribute("data-index");
                
                _this.deleteSuggestion(index);
            } else if (helpers.hasClass(target, _this.selectors.createPriority)) {
                let index = target.getAttribute("data-index");
                
                _this.createPriority(index);
            }
        }, false);
    
        // Init elements
        this.getSuggestions().forEach((suggestion) => {
            this._addSuggestion(suggestion);
        });
        
        return this;
    }
    
    getSuggestions () {
        return Array.from(this.container.querySelectorAll(".suggestion"));
    }
    
    _addPriorities (index, HTMLElement) {
        this.suggestions[index].priorities.push(HTMLElement);
    }
    
    _addSuggestion (HTMLElement) {
        let suggestion = {
            suggestion: HTMLElement,
            indexPriority: 0,
            prioritiesContainer: HTMLElement.querySelector(".priorities"),
            priorities: Array.from(HTMLElement.querySelectorAll(".priority")),
            actions: {
                create: HTMLElement.querySelector(".actions .create-skills-suggestion"),
                delete: HTMLElement.querySelector(".actions .remove-skills-suggestion")
            },
            comment: {
                fr: HTMLElement.querySelector(".fr-comment"),
                en: HTMLElement.querySelector(".en-comment")
            }
        };
        
        this.suggestions.push(suggestion);
    }
    
    _removeSuggestion (index) {
        this.suggestions[index] = {};
    }
    
    createSuggestion () {
        let _this = this,
            data = {
                index: ++this.index,
                indexPriority: 0,
                starter: true
            };
    
        $.post("../../api/partials/add-skills-suggestion", data, (response) => {
            let HTMLElement = helpers.convertStringToDOMElement(response)[0];
            
            _this._addSuggestion(HTMLElement);
            _this.container.appendChild(HTMLElement);
        });
    }
    
    deleteSuggestion (index) {
        this.suggestions[index].suggestion.remove();
        this._removeSuggestion(index);
    }
    
    createPriority (index) {
        let _this = this,
            data = {
                index: index,
                indexPriority: ++this.suggestions[index]["indexPriority"],
                starter: false
            };
        
        $.post("../../api/partials/add-skill-suggestion-priority", data, (response) => {
            let HTMLElement = helpers.convertStringToDOMElement(response)[0];
            
            _this.suggestions[data.index].prioritiesContainer.appendChild(HTMLElement);
            _this._addPriorities(data.index, HTMLElement);
        });
    }
    
    getValue () {
        let results = [];
        
        this.suggestions.forEach(suggestion => {
            results.push({
                priorities: (() => {
                    let data = [];
        
                    suggestion.priorities.forEach(priority => {
                        data.push(priority.value);
                    });
        
                    return data;
                })(),
                comment: {
                    fr: suggestion.comment.fr.children[0].innerHTML.trim(),
                    en: suggestion.comment.en.children[0].innerHTML.trim()
                }
            });
        });
        
        return results = results.filter(r => r.priorities.length >= 2 || (r.priorities[1] && r.priorities[1] !== ""));
    }
}
