require("./base");
import Modal from "./../../shared/modules/ModalResponse";

document.addEventListener("DOMContentLoaded", () => {
    let deleteButtons = document.querySelectorAll(".cosmo-delete a"),
        modalElement = document.getElementById("response-modal"),
        modal = new Modal(modalElement);
    
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
});
