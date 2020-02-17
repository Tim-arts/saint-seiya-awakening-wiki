require("./../base");

import InputFile from "./../modules/InputFile";
import Modal from "./../../shared/modules/ModalResponse";
import CreateCosmosSuggestion from "./../modules/CreateCosmosSuggestion";
import CreateSkillsSuggestion from "./../modules/CreateSkillsSuggestion";
import CompositeImage from "./../modules/CompositeImages";
import helpers from "./../../shared/helpers";

document.addEventListener("DOMContentLoaded", () => {
    /* Elements */
    let formElement = document.getElementById("update-saint");
    let avatarInputFileElement = document.getElementById("avatar-input");
    let avatarImgElement = document.getElementById("avatar-image");
    let modalElement = document.getElementById("response-modal");
    let cosmosSuggestionElement = document.getElementById("cosmos-suggestions");
    let skillsSuggestionsElement = document.getElementById("skills-suggestions");
    let compositeAvatarElement = document.getElementById("composite-avatar-container");
    let compositeLargeAvatarElement = document.getElementById("composite-large-avatar-container");
    
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
    
    /* Constructors */
    let AvatarConstructor = new InputFile(avatarInputFileElement, {
        img: avatarImgElement,
        size: 256
    });
    let CompositeAvatarConstructor = new CompositeImage(InputFile, compositeAvatarElement, {
        size: 1024,
        updateThumbnail: helpers.updateThumbnail
    });
    let CompositeLargeAvatarConstructor = new CompositeImage(InputFile, compositeLargeAvatarElement, {
        size: 1024,
        updateThumbnail: helpers.updateThumbnail,
        crop: {x: 60, y: 39, w: 136, h: 177}
    });
    let ModalConstructor = new Modal(modalElement);
    let SuggestionsConstructor = new CreateCosmosSuggestion(cosmosSuggestionElement);
    let SkillsConstructor = new CreateSkillsSuggestion(skillsSuggestionsElement);
    
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
        
        let data = {
            "_id": _data._id,
            "_date": Date.now(),
            "_name": {
                "en": document.getElementById("en-name").value,
                "fr": document.getElementById("fr-name").value
            },
            "lastUpdateTime": Date.now(),
            "comment": {
                "en": document.getElementById("en-comment").value,
                "fr": document.getElementById("fr-comment").value
            },
            "slug": helpers.convertToSlug(document.getElementById("en-name").value, /["._' ]/g, "-"),
            "slug_underscore": helpers.convertToSlug(document.getElementById("en-name").value, /["-.' ]/g, "_"),
            "image": (() => {
                let value = CompositeAvatarConstructor.getValue();
                if (value) return value;
                
                return avatarImgElement.src === helpers.constants.urls.saint ? null : AvatarConstructor.options.img.src;
            })(),
            "largeImage": CompositeLargeAvatarConstructor.getValue(),
            "rank": document.getElementById("ranks").value,
            "damage_type": document.getElementById("damage-types").value,
            "focus": helpers.getSelectMultipleValue("focus"),
            "roles": helpers.getSelectMultipleValue("roles"),
            "cosmos_suggestions": SuggestionsConstructor.getValue(),
            "skills_suggestions": SkillsConstructor.getValue(),
            "characteristics": [
                {
                    "hp": document.getElementById("characteristic-hp").value,
                    "p-atk": document.getElementById("characteristic-p.atk").value,
                    "c-atk": document.getElementById("characteristic-c.atk").value,
                    "p-def": document.getElementById("characteristic-p.def").value,
                    "c-def": document.getElementById("characteristic-c.def").value,
                    "speed": document.getElementById("characteristic-speed").value
                }
            ]
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
});
