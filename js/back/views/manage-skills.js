import Autocomplete from "autocompleter";

require("./base");
import Modal from "./../../shared/modules/ModalResponse";
import { resetDisplay } from "./../../shared/helpers";

document.addEventListener("DOMContentLoaded", () => {
    let deleteButtons = document.querySelectorAll(".skill-delete a"),
        modalElement = document.getElementById("response-modal"),
        modal = new Modal(modalElement),
        skillsElements = Array.from(document.getElementById("skills-container").querySelectorAll(".skill")),
        sortSkills = document.getElementById("sort-skills");
    
    deleteButtons.forEach(function (button) {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            
            let _this = this;
    
            modal.show({
                message: "deleteConfirmation",
                backdrop: "static",
                submitContent: "Yes",
                closeContent: "No",
                submit: () => {
                    let skillsElementsParent = _this.closest(".skill"),
                        href = _this.href,
                        data = {
                            _id: skillsElementsParent.getAttribute("data-id"),
                            slug: skillsElementsParent.getAttribute("data-slug")
                        };
    
                    $.post(href, {
                        data: data
                    }, (response) => {
                        if (response.success) {
                            skillsElementsParent.remove();
                        }
                    });
                }
            });
        });
    });
    
    Autocomplete({
        input: sortSkills,
        minLength: 3,
        debounceWaitMs: 100,
        className: "skills",
        fetch: (text) => {
            text = text.toLowerCase().replace(/["._' ]/g, "-");
            let suggestions = skills.filter(n => n.slug.toLowerCase().indexOf(text) > -1),
                results = (() => {
                    let results = [];
                    
                    for (let i = 0, iCount = suggestions.length; i < iCount; i++) {
                        for (let j = 0, jCount = skillsElements.length; j < jCount; j++) {
                            if (skillsElements[j].getAttribute("data-slug") === suggestions[i].slug) {
                                results.push(skillsElements[j]);
                            }
                        }
                    }
                    
                    return results;
                })();
            
            resetDisplay(skillsElements, "hide");
    
            skillsElements.forEach((element) => { element.classList.add("hide"); });
            results.forEach((result) => { result.classList.remove("hide"); });
        },
        onSelect: null,
        preventSubmit: true
    });
    
    sortSkills.addEventListener("keyup", function () {
        if (this.value.length <= 2) {
            resetDisplay(skillsElements, "hide");
        }
    });
});
