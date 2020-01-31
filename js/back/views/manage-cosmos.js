import helpers from "../../shared/helpers";

require("./base");
import Modal from "./../../shared/modules/ModalResponse";
import Autocomplete from "autocompleter";

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
        fetch: (text, update) => {
            text = text.toLowerCase();
            let suggestions = cosmos.filter(n => n.slug.toLowerCase().startsWith(text));
            
            update(suggestions);
        },
        render: (cosmo) => {
            console.log(1);
            let results = cosmosElements.filter(cosmoElement => cosmoElement.getAttribute("data-slug") === cosmo.slug);
            
            cosmosElements.forEach((element) => { element.classList.remove("hide"); });
            
            if (results.length > 0) {
                cosmosElements.forEach((element) => { element.classList.add("hide"); });
                results.forEach((result) => { result.classList.remove("hide"); });
            }
        }
    });
});
