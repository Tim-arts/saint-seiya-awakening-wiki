require("./../base");

import InputFile from "./../modules/InputFile";
import Modal from "./../../shared/modules/ModalResponse";
import CreateCosmosSuggestion from "./../modules/CreateCosmosSuggestion";
import CreateSkillsSuggestion from "./../modules/CreateSkillsSuggestion";
import helpers from "./../../shared/helpers";

document.addEventListener("DOMContentLoaded", () => {
    /* Elements */
    let formElement = document.getElementById("update-saint");
    let inputFileElement = document.getElementById("custom-file");
    let largeAvatarElement = document.getElementById("large-avatar-input");
    let largeAvatarMaskElement = document.getElementById("large-avatar-mask-input");
    let avatarElement = document.getElementById("avatar");
    let largeAvatarImgElement = document.getElementById("large-avatar");
    let largeAvatarMaskImgElement = document.getElementById("large-avatar-mask");
    let largeAvatarResultElement = document.getElementById("large-avatar-result");
    let modalElement = document.getElementById("response-modal");
    let cosmosSuggestionElement = document.getElementById("cosmos-suggestions");
    let skillsSuggestionsElement = document.getElementById("skills-suggestions");
    let startProcessComposition = document.getElementById("start-process-processing");
    
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
    let AvatarConstructor = new InputFile(inputFileElement, {
        img: avatarElement,
        size: 256
    });
    let LargeAvatarConstructor = new InputFile(largeAvatarElement, {
        img: largeAvatarImgElement,
        size: 1024
    });
    let LargeAvatarMaskConstructor = new InputFile(largeAvatarMaskElement, {
        img: largeAvatarMaskImgElement,
        size: 1024
    });
    let ModalConstructor = new Modal(modalElement);
    let SuggestionsConstructor = new CreateCosmosSuggestion(cosmosSuggestionElement);
    let SkillsConstructor = new CreateSkillsSuggestion(skillsSuggestionsElement);
    
    /* Events */
    formElement.addEventListener("submit", () => {
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
            "name": {
                "en": document.getElementById("en-name").value,
                "fr": document.getElementById("fr-name").value
            },
            "comment": {
                "en": document.getElementById("en-comment").value,
                "fr": document.getElementById("fr-comment").value
            },
            "slug": helpers.convertToSlug(document.getElementById("en-name").value, /["._' ]/g, "-"),
            "slug_underscore": helpers.convertToSlug(document.getElementById("en-name").value, /["-.' ]/g, "_"),
            "image": (() => {
                return avatarElement.src === helpers.constants.urls.saint ? null : AvatarConstructor.options.img.src;
            })(),
            rank: document.getElementById("ranks").value,
            damage_type: document.getElementById("damage-types").value,
            focus: document.getElementById("focus").value,
            roles: helpers.getSelectMultipleValue("roles"),
            cosmos_suggestions: SuggestionsConstructor.getValue(),
            skills_suggestions: SkillsConstructor.getValue(),
            characteristics: {
                [document.getElementById("saint-levels").value]: {
                    "hp": document.getElementById("characteristic-hp").value,
                    "p.atk": document.getElementById("characteristic-p.atk").value,
                    "c.atk": document.getElementById("characteristic-c.atk").value,
                    "p.def": document.getElementById("characteristic-p.def").value,
                    "c.def": document.getElementById("characteristic-c.def").value,
                    "speed": document.getElementById("characteristic-speed").value
                }
            }
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
    
    startProcessComposition.addEventListener("click", () => {
        let data = {
            image: LargeAvatarConstructor.options.img.src,
            mask: LargeAvatarMaskConstructor.options.img.src
        };
        
        $.post("../../api/composite-image-with-mask", data, (response) => {
            helpers.updateThumbnail(largeAvatarResultElement, response.result);
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
