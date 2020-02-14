const helpers = require("./../../shared/helpers");

export default class CreateSkillsSuggestion {
    constructor (el) {
        let _this = this;
        this.el = el;
        this.selectors = {
            createPriority: "create-skills-suggestion",
            removePriority: "remove-skills-suggestion"
        };
        this.elements = {
            container: el.querySelector(".suggestion")
        };
        this.elements.prioritiesContainer = this.elements.container.querySelector(".priorities");
        this.elements.priorities = Array.from(this.elements.container.querySelectorAll(".priority"));
        this.elements.actions = {
            create: this.elements.container.querySelector(".actions .create-skills-suggestion"),
            delete: this.elements.container.querySelector(".actions .remove-skills-suggestion")
        };
        this.elements.comments = {
            fr: this.elements.container.querySelector(".fr-comment"),
            en: this.elements.container.querySelector(".en-comment")
        };
        this.index = 0;
        this.priorities = [];
    
        document.addEventListener("click", function (e) {
            let target = e.target;
        
            if (helpers.hasClass(target, _this.selectors.createPriority)) {
                _this.createPriority();
            } else if (helpers.hasClass(target, _this.selectors.removePriority)) {
                let index = target.getAttribute("data-index");
                _this.removePriority(index);
            }
        }, false);
    
        // Init elements
        Array.from(this.elements.priorities).forEach(priority => {
            _this.updatePriorities(priority);
        });
        
        return this;
    }
    
    updatePriorities (element_0, element_1) {
        this.priorities.push({
            priorityElement: element_0,
            removeElement: element_1
        });
    }
    
    prepareData () {
        return {
            index: ++this.index
        };
    }
    
    createPriority () {
        let _this = this,
            data = this.prepareData();
    
        $.post("../../api/partials/add-skill-suggestion-priority", data, (response) => {
            let HTMLElement = helpers.convertStringToDOMElement(response);
            
            _this.elements.prioritiesContainer.appendChild(HTMLElement[0]);
            _this.elements.actions.create.parentElement.appendChild(HTMLElement[1]);
            _this.updatePriorities(HTMLElement[0], HTMLElement[1]);
        });
    }
    
    removePriority (index) {
        this.priorities[index].priorityElement.remove();
        this.priorities[index].removeElement.remove();
    }
    
    getValue () {
        return {
            priorities: this.priorities.map(priority => priority.priorityElement.value),
            comment: {
                fr: this.elements.comments.fr.children[0].innerHTML.trim(),
                en: this.elements.comments.en.children[0].innerHTML.trim()
            }
        };
    }
}
