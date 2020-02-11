require("./../base");

import Autocomplete from "autocompleter";
import Modal from "./../../shared/modules/ModalResponse";
import { constants, convertToSlug, resetDisplay } from "./../../shared/helpers";

document.addEventListener("DOMContentLoaded", () => {
    /* Elements */
    let deleteButtonElements = document.querySelectorAll(".element-delete a");
    let modalElement = document.getElementById("response-modal");
    let elements = Array.from(document.getElementById("elements-container").querySelectorAll(".element"));
    let sortElements = document.getElementById("sort-elements");
    
    /* Constructors */
    let ModalConstructor = new Modal(modalElement);
    
    /* Events */
    deleteButtonElements.forEach(function (button) {
        button.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            
            let _this = this;
    
            ModalConstructor.show({
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
    
    sortElements.addEventListener("keyup", function () {
        if (this.value.length <= 2) {
            resetDisplay(elements, "hide");
        }
    });
    
    elements.forEach((element) => {
        element.querySelector("img").addEventListener("error", function () {
            this.src = constants.urls.skill;
            this.onerror = null;
        });
    });
    
    /* On load */
    Autocomplete({
        input: sortElements,
        minLength: 3,
        debounceWaitMs: 100,
        className: "elements",
        fetch: (text) => {
            text = convertToSlug(text, /["._' ]/g, "-");
            let suggestions = elements.filter(n => n.slug.toLowerCase().indexOf(text) > -1),
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
});
