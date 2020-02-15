require("./../base");

import InputFile from "./../modules/InputFile";
import SelectVerification from "./../../front/modules/SelectVerification";
import Modal from "./../../shared/modules/ModalResponse";
import helpers, { constants, generateUuidv4, convertToSlug } from "../../shared/helpers";

document.addEventListener("DOMContentLoaded", () => {
    /* Elements */
    let formElement = document.getElementById("update-cosmo");
    let inputFile = document.getElementById("custom-file");
    let avatarElement = document.getElementById("avatar");
    let selects = document.querySelectorAll("select");
    let modalElement = document.getElementById("response-modal");
    
    let _data = (() => {
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
                data._id = generateUuidv4();
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
    
    /* Constructors */
    let InputFileConstructor = new InputFile(inputFile, {
        img: document.getElementById("avatar"),
        size: 256
    });
    let ModalConstructor = new Modal(modalElement);
    
    /* Events */
    formElement.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let selectVerificationConstructor = new SelectVerification(document.querySelectorAll("select[required]"));
        let data = {
            "_id": _data._id,
            "name": {
                "en": document.getElementById("en-name").value,
                "fr": document.getElementById("fr-name").value
            },
            "slug": convertToSlug(document.getElementById("en-name").value, /["._' ]/g, "-"),
            "slug_underscore": convertToSlug(document.getElementById("en-name").value, /["-.' ]/g, "_"),
            "description": {
                "en": document.getElementById("en-description").value,
                "fr": document.getElementById("fr-description").value
            },
            "comment": {
                "en": document.getElementById("en-comment").value,
                "fr": document.getElementById("fr-comment").value
            },
            "basic_attributes": {
                "types": [
                    document.getElementById("cosmos-attributes-1").value,
                    document.getElementById("cosmos-attributes-2").value
                ],
                "values": {
                    "SS": {
                        "level_10": [
                            document.getElementById("ss-cosmos-attributes-value-1").value,
                            document.getElementById("ss-cosmos-attributes-value-2").value
                        ]
                    },
                    "S": {
                        "level_10": [
                            document.getElementById("s-cosmos-attributes-value-1").value,
                            document.getElementById("s-cosmos-attributes-value-2").value
                        ]
                    }
                }
            },
            "bonus_attributes": {
                "type": document.getElementById("bonus-attributes").value,
                "value": document.getElementById("bonus-attribute-value").value
            },
            "type": document.getElementById("cosmos-types").value,
            "obtainment_system": {
                "shrine": helpers.getSelectMultipleValue("obtainment-system-shrine"),
                "titans": helpers.getSelectMultipleValue("obtainment-system-titans"),
                "shop": !!document.getElementById("obtainment-system-shop").checked
            },
            "image": (() => {
                return avatarElement.src === constants.urls.cosmo ? null : InputFileConstructor.options.img.src;
            })(),
            "exclusive_cn": !!document.getElementById("exclusive-cn").checked
        };
        
        if (!hasChanged) {
            ModalConstructor.show({
                message: "noChanges",
                changeSubmitButton: "Close",
                hideCloseButton: true
            });
            
            return;
        }
        
        if (selectVerificationConstructor.indexOf(false) === -1) {
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
        } else {
            ModalConstructor.show({
                message: "selectMissing",
                hideCloseButton: true
            });
        }
    });
    
    formElement.addEventListener("input", () => {
        hasChanged = true;
    });
    window.onbeforeunload = () => {
        if (hasChanged) {
            return true;
        }
    };
    
    /* On load */
    selects.forEach((select) => {
        let link = select.previousElementSibling.querySelector("a");
        link.addEventListener("click", function (e) {
            select.selectedIndex = 0;
            e.preventDefault();
        });
    });
});
