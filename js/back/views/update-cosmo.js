require("./base");

import InputFile from "./../modules/InputFile";
import SelectVerification from "./../../front/modules/SelectVerification";
import Modal from "./../../shared/modules/ModalResponse";
import helpers from "../../shared/helpers";

document.addEventListener("DOMContentLoaded", () => {
    let form = document.getElementById("update-cosmo"),
        inputFile = document.getElementById("custom-file"),
        defaultImageSrc = inputFile.nextElementSibling.src,
        selects = document.querySelectorAll("select"),
        inputFileConstructor = new InputFile(inputFile, {
            img: document.getElementById("avatar"),
            size: 256
        }),
        modalElement = document.getElementById("response-modal"),
        modal = new Modal(modalElement),
        _data = (() => {
            let isUpdate = form.hasAttribute("data-update"),
                data = {};
            
            if (isUpdate) {
                data._id = (() => {
                    let url = document.URL,
                        array = url.split("/");
                    
                    return array[array.length - 1].substring(1);
                })();
                data.messageAction = () => {
                    modal.show({
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
                    modal.show({
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
        })(),
        hasChanged = false,
        data;
    
    form
        .addEventListener("submit", (e) => {
        e.preventDefault();
        
        let selectVerificationConstructor = new SelectVerification(document.querySelectorAll("select[required]"));
        
        data = {
            "_id": _data._id,
            "name": {
                "en": document.getElementById("en-name").value,
                "fr": document.getElementById("fr-name").value
            },
            "slug": helpers.convertToSlug(document.getElementById("en-name").value, /["._' ]/g, "-"),
            "slug_underscore": helpers.convertToSlug(document.getElementById("en-name").value, /["-.' ]/g, "_"),
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
                return inputFileConstructor.options.img.src === defaultImageSrc ? null : inputFileConstructor.options.img.src;
            })(),
            "exclusive_cn": !!document.getElementById("exclusive-cn").checked
        };
        
        if (!hasChanged) {
            modal.show({
                message: "noChanges",
                hideCloseButton: true
            });
            
            return;
        }
        
        if (selectVerificationConstructor.indexOf(false) === -1) {
            $.post(form.getAttribute("action"), {
                data: data
            }, (response) => {
                if (response.error) {
                    modal.show({
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
            modal.show({
                message: "selectMissing",
                hideCloseButton: true
            });
        }
    });
    
    form.addEventListener("input", () => {
        hasChanged = true;
    });
    
    selects.forEach((select) => {
        let link = select.previousElementSibling.querySelector("a");
        link.addEventListener("click", function (e) {
            select.selectedIndex = 0;
            e.preventDefault();
        });
    });
    
    window.onbeforeunload = () => {
        if (hasChanged) {
            return true;
        }
    };
});
