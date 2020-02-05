require("./base");

import InputFile from "./../modules/InputFile";
import SelectVerification from "./../../front/modules/SelectVerification";
import Modal from "./../../shared/modules/ModalResponse";
import { generateUuidv4, convertToSlug } from "../../shared/helpers";

document.addEventListener("DOMContentLoaded", () => {
    /* Elements */
    let formElement = document.getElementById("update-cosmo");
    let inputFile = document.getElementById("custom-file");
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
    let data;
    
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
        
        data = {
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
            "basic_attributes": {
                "types": [
                    (() => {
                        let select = document.getElementById("cosmos-attributes-1");
                        return select.options[select.selectedIndex].value.toLowerCase();
                    })(),
                    (() => {
                        let select = document.getElementById("cosmos-attributes-2");
                        return select.options[select.selectedIndex].value.toLowerCase();
                    })()
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
                "type": (() => {
                    let select = document.getElementById("bonus-attributes");
                    return select.options[select.selectedIndex].value.toLowerCase();
                })(),
                "value": document.getElementById("bonus-attribute-value").value
            },
            "type": (() => {
                let select = document.getElementById("cosmos-types");
                return select.options[select.selectedIndex].value.toLowerCase();
            })(),
            "obtainment_system": {
                "shrine": (() => {
                    let select = document.getElementById("obtainment-system-shrine");
                    return select.selectedIndex !== 0 ? [...Array.from(select.querySelectorAll("option:checked"),e => e.value)] : null;
                })(),
                "titans": (() => {
                    let select = document.getElementById("obtainment-system-titans");
                    return select.selectedIndex !== 0 ? [...Array.from(select.querySelectorAll("option:checked"),e => e.value)] : null;
                })(),
                "shop": !!document.getElementById("obtainment-system-shop").checked
            },
            "image": (() => {
                return InputFileConstructor.options.img.src === inputFile.nextElementSibling.src ? null : InputFileConstructor.options.img.src;
            })(),
            "exclusive_cn": !!document.getElementById("exclusive-cn").checked
        };
        
        if (!hasChanged) {
            ModalConstructor.show({
                message: "noChanges",
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
    
    selects.forEach((select) => {
        let link = select.previousElementSibling.querySelector("a");
        link.addEventListener("click", function (e) {
            select.selectedIndex = 0;
            e.preventDefault();
        });
    });
});
