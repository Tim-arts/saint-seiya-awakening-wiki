require("./base");
import Modal from "./../../shared/modules/ModalResponse";
import Autocomplete from "autocompleter";
import { resetDisplay } from "./../../shared/helpers";

document.addEventListener("DOMContentLoaded", () => {
    let deleteButtons = document.querySelectorAll(".cosmo-delete a"),
        modalElement = document.getElementById("response-modal"),
        modal = new Modal(modalElement),
        cosmosElements = Array.from(document.getElementById("cosmos-container").querySelectorAll(".cosmo")),
        sortCosmos = document.getElementById("sort-cosmos");
    
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
                    let cosmosElementsParent = _this.closest(".cosmo"),
                        href = _this.href,
                        data = {
                            _id: cosmosElementsParent.getAttribute("data-id"),
                            slug: cosmosElementsParent.getAttribute("data-slug")
                        };
    
                    $.post(href, {
                        data: data
                    }, (response) => {
                        if (response.success) {
                            cosmosElementsParent.remove();
                        }
                    });
                }
            });
        });
    });
    
    Autocomplete({
        input: sortCosmos,
        minLength: 3,
        debounceWaitMs: 100,
        className: "cosmos",
        fetch: (text) => {
            text = text.toLowerCase().replace(/["._' ]/g, "-");
            let suggestions = cosmos.filter(n => n.slug.toLowerCase().indexOf(text) > -1),
                results = (() => {
                    let results = [];
                    
                    for (let i = 0, iCount = suggestions.length; i < iCount; i++) {
                        for (let j = 0, jCount = cosmosElements.length; j < jCount; j++) {
                            if (cosmosElements[j].getAttribute("data-slug") === suggestions[i].slug) {
                                results.push(cosmosElements[j]);
                            }
                        }
                    }
                    
                    return results;
                })();
    
            resetDisplay(cosmosElements, "hide");
    
            cosmosElements.forEach((element) => { element.classList.add("hide"); });
            results.forEach((result) => { result.classList.remove("hide"); });
        },
        onSelect: null,
        preventSubmit: true
    });
    
    sortCosmos.addEventListener("keyup", function () {
        if (this.value.length <= 2) {
            resetDisplay(cosmosElements, "hide");
        }
    });
});
