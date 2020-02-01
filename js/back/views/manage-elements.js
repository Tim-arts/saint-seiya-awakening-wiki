import Autocomplete from "autocompleter";

require("./base");
import Modal from "./../../shared/modules/ModalResponse";
import { resetDisplay } from "./../../shared/helpers";

document.addEventListener("DOMContentLoaded", () => {
    let deleteButtons = document.querySelectorAll(".element-delete a"),
        modalElement = document.getElementById("response-modal"),
        modal = new Modal(modalElement),
        elements = Array.from(document.getElementById("elements-container").querySelectorAll(".element")),
        sortElements = document.getElementById("sort-elements");
    
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
                    let elementParent = _this.closest(".element"),
                        href = _this.href,
                        data = {
                            _id: elementParent.getAttribute("data-id"),
                            slug: elementParent.getAttribute("data-slug")
                        };
    
                    $.post(href, {
                        data: data
                    }, (response) => {
                        if (response.success) {
                            elementParent.remove();
                        }
                    });
                }
            });
        });
    });
    
    Autocomplete({
        input: sortElements,
        minLength: 3,
        debounceWaitMs: 100,
        className: "elements",
        fetch: (text) => {
            text = text.toLowerCase().replace(/["._' ]/g, "-");
            let suggestions = elementsFromDB.filter(n => n.slug.toLowerCase().indexOf(text) > -1),
                results = (() => {
                    let results = [];
                    
                    for (let i = 0, iCount = suggestions.length; i < iCount; i++) {
                        for (let j = 0, jCount = elements.length; j < jCount; j++) {
                            if (elements[j].getAttribute("data-slug") === suggestions[i].slug) {
                                results.push(elements[j]);
                            }
                        }
                    }
                    
                    return results;
                })();
            
            resetDisplay(elements, "hide");
    
            elements.forEach((element) => { element.classList.add("hide"); });
            results.forEach((result) => { result.classList.remove("hide"); });
        },
        onSelect: null,
        preventSubmit: true
    });
    
    sortElements.addEventListener("keyup", function () {
        if (this.value.length <= 2) {
            resetDisplay(elements, "hide");
        }
    });
});
