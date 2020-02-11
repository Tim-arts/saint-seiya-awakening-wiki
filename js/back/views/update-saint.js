require("./../base");

import Sortable from "sortablejs";
import Choices from "choices.js";
import InputFile from "./../modules/InputFile";
import Modal from "./../../shared/modules/ModalResponse";
import helpers from "./../../shared/helpers";

document.addEventListener("DOMContentLoaded", () => {
    /* Elements */
    let formElement = document.getElementById("update-saint");
    let inputFileElement = document.getElementById("custom-file");
    let avatarElement = document.getElementById("avatar");
    let modalElement = document.getElementById("response-modal");
    
    let addSkillSuggestionPriority = document.getElementById("add-skills-suggestion-priority");
    
    let  _data = (() => {
        let isUpdate = formElement.hasAttribute("data-update"),
            data = {};
        
        if (isUpdate) {
            data._id = (() => {
                let url = document.URL,
                    array = url.split("/");
                
                return array[array.length - 1].substring(1);
            })();
            data.messageAction = () => {
                ModalConstructor.show({
                    message: "successfullyUpdated",
                    title: "Success!",
                    backdrop: "static",
                    submit: () => {
                        window.location.reload(true);
                    },
                    hideCloseButton: true
                });
            }
        } else {
            data._id = helpers.generateUuidv4();
            data.messageAction = () => {
                ModalConstructor.show({
                    message: "successfullyAdded",
                    title: "Success!",
                    backdrop: "static",
                    submit: () => {
                        window.location.reload(true);
                    },
                    hideCloseButton: true
                });
            };
        }
        
        return data;
    })();
    let hasChanged = false;
    let data;
    let dynamicModal;
    window["Modal_Choices"] = {};
    
    /* Constructors */
    let InputFileConstructor = new InputFile(inputFileElement, {
        img: avatarElement,
        size: 256
    });
    let ModalConstructor = new Modal(modalElement);
    
    /* Events */
    formElement.addEventListener("submit", (e) => {
        e.preventDefault();
        
        if (!hasChanged) {
            ModalConstructor.show({
                message: "noChanges",
                changeSubmitButton: "Close",
                hideCloseButton: true
            });
            
            return;
        }
        
        data = {
            "_id": _data._id,
            "name": {
                "en": document.getElementById("en-name").value,
                "fr": document.getElementById("fr-name").value
            },
            "slug": helpers.convertToSlug(document.getElementById("en-name").value, /["._' ]/g, "-"),
            "slug_underscore": helpers.convertToSlug(document.getElementById("en-name").value, /["-.' ]/g, "_"),
            "image": (() => {
                return avatarElement.src === helpers.constants.urls.cosmo ? null : InputFileConstructor.options.img.src;
            })()
        };
        
        $.post(formElement.getAttribute("action"), {
            data: data
        }, (response) => {
            if (response.error) {
                ModalConstructor.show({
                    message: "errorValidation",
                    hideCloseButton: true
                });
                
                return;
            }
            
            if (response.success) {
                hasChanged = false;
                _data.messageAction();
            }
        });
    });
    
    formElement.addEventListener("input", () => {
        hasChanged = true;
    });
    window.onbeforeunload = () => {
        if (hasChanged) {
            return true;
        }
    };
    
    addSkillSuggestionPriority.addEventListener("click", function () {
        let container = document.getElementById("skills-suggestions-container"),
            index = container.querySelectorAll(".skills-suggestion").length;
        
        $.post("../../api/partials/add-skill-suggestion", {
            index: index
        }, (response) => {
            container.insertAdjacentHTML("beforeend", response);
        });
    });
    
    $(document).on("click", ".suggestion .delete-image", function () {
        let index = this.getAttribute("data-index");
        let type = this.getAttribute("data-type");
        let slug = this.getAttribute("data-slug");
        let choice = window["Modal_Choices"]["choices--search-elements-" + type + "-" + index].choice;
        
        choice.removeActiveItemsByValue(slug);
        this.parentElement.remove();
    });
    $(document).on("click", ".suggestion .require-modal", function (e) {
        helpers.prepareMakeDynamicModal(this, dynamicModal, Choices).then((result) => {
            dynamicModal = result;
        });
        
        e.preventDefault();
    });
});
