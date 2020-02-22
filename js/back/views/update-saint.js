require("./../base");

import InputFile from "./../modules/InputFile";
import CompositeImage from "./../modules/CompositeImages";
import AddSkinThumbnail from "./../modules/AddSkinThumbnail";
import Modal from "./../../shared/modules/ModalResponse";
import CreateCosmosSuggestion from "./../modules/CreateCosmosSuggestion";
import CreateSkillsSuggestion from "./../modules/CreateSkillsSuggestion";

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
    let CompositeAvatarConstructor = new CompositeImage(InputFile, helpers.updateThumbnail, compositeAvatarElement, {
        size: 1024
    });
    let CompositeLargeAvatarConstructor = new CompositeImage(InputFile, helpers.updateThumbnail, compositeLargeAvatarElement, {
        size: 1024,
        crop: {x: 60, y: 39, w: 136, h: 177}
    });
    let ModalConstructor = new Modal(modalElement);
    let CosmosConstructor = new CreateCosmosSuggestion(cosmosSuggestionElement);
    let SkillsConstructor = new CreateSkillsSuggestion(skillsSuggestionsElement);
    
    let skinsContainer = (() => {
        let skins = document.getElementById("skins"),
            container = skins.querySelector(".skins"),
            input = skins.querySelector(".skin.starter input[type='file']"),
            img = skins.querySelector(".skin.starter img");
        
        new AddSkinThumbnail({
            container : container,
            input: input,
            img: img,
            size: 256,
            helpers: helpers,
            modal: ModalConstructor
        });
        
        return container;
    })();
    
    /* Events */
    formElement.addEventListener("submit", (e) => {
        e.preventDefault();
        
        let CosmosConstructorValue = CosmosConstructor.getValue(),
            SkillsConstructorValue = SkillsConstructor.getValue();
        
        if (CosmosConstructorValue.length > 0 || SkillsConstructorValue.length > 0) {
            hasChanged = true;
        }
        
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
            "slug": helpers.convertToSlug(document.getElementById("en-name").value, /["._' ]/g),
            "slug_underscore": helpers.convertToSlug(document.getElementById("en-name").value, /["-.' ]/g, "_"),
            "image": (() => {
                let value = CompositeAvatarConstructor.getValue();
                if (value) return value;
                
                return avatarImgElement.src === helpers.constants.urls.saint ? null : AvatarConstructor.options.img.src;
            })(),
            "largeImage": CompositeLargeAvatarConstructor.getValue(),
            "arayashiki": (() => {
                let container = document.getElementById("arayashiki-attributes");
                let letterElements = Array.from(container.querySelectorAll(".letter"));
                let object = {};
                
                letterElements.forEach(element => {
                    let key = element.getAttribute("data-letter");
                    let count = Number(element.getAttribute("data-count"));
                    let selects = element.querySelectorAll("select");
                    let inputs = element.querySelectorAll("input");
                    let obj = {};
                    
                    for (let i = 0; i < count; i++) {
                        let attribute = selects[i].value;
                        let value = inputs[i].value;
                        
                        if (attribute) {
                            obj[attribute] = value;
                        }
                    }
                    
                    object[key] = obj;
                });
                
                return object;
            })(),
            "rank": document.getElementById("ranks").value,
            "damage_type": document.getElementById("damage-types").value,
            "focus": helpers.getSelectMultipleValue("focus"),
            "roles": helpers.getSelectMultipleValue("roles"),
            "cosmos_suggestions": CosmosConstructorValue,
            "skills_suggestions": SkillsConstructorValue,
            "characteristics": [
                {
                    "hp": document.getElementById("characteristic-hp").value,
                    "p-atk": document.getElementById("characteristic-p.atk").value,
                    "c-atk": document.getElementById("characteristic-c.atk").value,
                    "p-def": document.getElementById("characteristic-p.def").value,
                    "c-def": document.getElementById("characteristic-c.def").value,
                    "speed": document.getElementById("characteristic-speed").value
                }
            ],
            "skins": (() => {
                let array = [];
                
                Array.from(skinsContainer.querySelectorAll(".skin:not(.starter)")).map(e => {
                    array.push({
                        "name": e.getAttribute("data-name"),
                        "img": e.querySelector("img").src
                    })
                });
                
                return array;
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
});
