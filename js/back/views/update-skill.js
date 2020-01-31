require("./base");

import helpers from "./../../shared/helpers";
import InputFile from "./../modules/InputFile";
import SelectVerification from "./../../front/modules/SelectVerification";
import Modal from "./../../shared/modules/ModalResponse";
import Autocomplete from "autocompleter";

document.addEventListener("DOMContentLoaded", () => {
    let form = document.getElementById("update-skill"),
        inputFile = document.getElementById("custom-file"),
        defaultImageSrc = inputFile.nextElementSibling.src,
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
        
        let selectVerificationConstructor = new SelectVerification([
        
        ]);
        
        data = {
        
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
    
    Autocomplete({
        input: document.getElementById("saint-link"),
        minLength: 3,
        emptyMsg: "There are no results that match this request",
        debounceWaitMs: 100,
        className: "saint",
        onSelect: (saint) => {
            let imageElement = this.input.parentElement.parentElement.querySelector("img"),
                imageSrc = "https://res.cloudinary.com/dowdeo3ja/image/upload/f_auto,q_auto/v1/saints/" + saint.slug + "/thumbnail.png";
            
            this.input.value = saint.name;
            helpers.updateThumbnail(imageElement, imageSrc);
        },
        fetch: (data, update) => {
            $.ajax({
                url: "../api/saints",
                data: {
                    data: data
                },
                method: "POST",
                dataType: 'json',
                success: function(response) {
                    update(response.data);
                },
                error: function (response) {
                    console.log(response);
                }
            });
        },
        render: (saint) => {
            let div = document.createElement("div");
            div.innerHTML = saint.name;
            
            return div;
        }
    });
    
    Autocomplete({
        input: document.getElementById("awakening-skill-link"),
        minLength: 3,
        emptyMsg: "There are no results that match this request",
        debounceWaitMs: 100,
        className: "skill",
        onSelect: (skill) => {
            let imageElement = this.input.parentElement.parentElement.querySelector("img"),
                imageSrc = "https://res.cloudinary.com/dowdeo3ja/image/upload/f_auto,q_auto/v1/skills/" + skill.slug + ".png";
    
            this.input.value = skill.name;
            helpers.updateThumbnail(imageElement, imageSrc);
        },
        fetch: (data, update) => {
            $.ajax({
                url: "../api/skills",
                data: {
                    data: data
                },
                method: "POST",
                dataType: 'json',
                success: function(response) {
                    update(response.data);
                },
                error: function (response) {
                    console.log(response);
                }
            });
        },
        render: (skill) => {
            let div = document.createElement("div");
            div.innerHTML = skill.name;
            
            return div;
        }
    });
});
