require("./../base");

import Autocomplete from "autocompleter";
import Sortable from "sortablejs";
import InputFile from "./../modules/InputFile";
import Modal from "./../../shared/modules/ModalResponse";
import helpers from "./../../shared/helpers";

document.addEventListener("DOMContentLoaded", () => {
    /* Elements */
    let formElement = document.getElementById("update-skill");
    let inputFileElement = document.getElementById("custom-file");
    let avatarElement = document.getElementById("avatar");
    let modalElement = document.getElementById("response-modal");
    let skillIndexElement = document.getElementById("skill-index");
    let costElement = document.getElementById("cost");
    let awakeningSkillElement = document.getElementById("awakening-skill-id");
    let linkedSaintIdElement = document.getElementById("linked-saint-id");
    let isPassiveElement = document.getElementById("is-passive");
    let skillsSortable = document.getElementById("sortable-skills");
    let typesSkill = document.getElementById("types-skill");
    
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
            "_date": Date.now(),
            "_name": {
                "en": document.getElementById("en-name").value,
                "fr": document.getElementById("fr-name").value
            },
            "lastUpdateTime": Date.now(),
            "type": typesSkill.value,
            "slug": helpers.convertToSlug(document.getElementById("en-name").value, /["._' ]/g, "-"),
            "slug_underscore": helpers.convertToSlug(document.getElementById("en-name").value, /["-.' ]/g, "_"),
            "description": {
                main: {
                    "en": document.getElementById("en-description").value,
                    "fr": document.getElementById("fr-description").value
                },
                levels: (() => {
                    let array = [];
                    
                    for (let i = 1; i <= 5; i++) {
                        let object = {
                            en: document.getElementById("level-" + i + "-description-en").value,
                            fr: document.getElementById("level-" + i + "-description-fr").value
                        };
                        
                        array.push(object);
                    }
                    
                    return array;
                })()
            },
            "image": (() => {
                return avatarElement.src === helpers.constants.urls.skill ? null : InputFileConstructor.options.img.src;
            })(),
            skill_index: Number(skillIndexElement.value),
            cost: Number(costElement.value),
            awakening_skill_id: awakeningSkillElement.getAttribute("data-serialize"),
            linked_saint_id: linkedSaintIdElement.getAttribute("data-serialize"),
            isPassive: !!isPassiveElement.checked,
            linked_modified_skills: (() => {
                if (skillsSortable.querySelectorAll(":scope > div").length > 0) {
                    return Array.from(skillsSortable.querySelectorAll(":scope > div")).map(x => x.getAttribute("data-serialize"));
                } else {
                    return null;
                }
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
    
    isPassiveElement.addEventListener("change", function () {
        helpers.applyPassive(this.checked, {
            cost: costElement
        });
    });
    
    awakeningSkillElement.addEventListener("change", function () {
        if (this.value === "") {
            let imageElement = this.parentElement.nextElementSibling.querySelector("img"),
                imageSrc = helpers.default.urls.skill;
            
            this.removeAttribute("data-serialize");
            helpers.updateThumbnail(imageElement, imageSrc);
        }
    });
    
    linkedSaintIdElement.addEventListener("change", function () {
        if (this.value === "") {
            let imageElement = this.parentElement.nextElementSibling.querySelector("img"),
                imageSrc = helpers.default.urls.saint;
            
            this.removeAttribute("data-serialize");
            helpers.updateThumbnail(imageElement, imageSrc);
        }
    });
    
    typesSkill.addEventListener("change", function () {
        helpers.displayElementsFromType(Array.from(document.querySelectorAll(".marker-type-main")), this.value, "modified");
    });
    
    /* On load */
    Autocomplete({
        input: document.getElementById("awakening-skill-id"),
        minLength: 3,
        emptyMsg: "There are no results that match this request",
        debounceWaitMs: 100,
        className: "skill",
        onSelect: function (skill) {
            let imageElement = this.input.parentElement.parentElement.querySelector("img.not-input-file"),
                imageSrc = "https://res.cloudinary.com/dowdeo3ja/image/upload/f_auto,q_auto/skills/" + skill.slug + ".png";
            
            this.input.value = skill._name;
            this.input.setAttribute("data-serialize", skill._id);
            helpers.updateThumbnail(imageElement, imageSrc);
        },
        fetch: (data, update) => {
            helpers.updateSuggestions({
                ajaxUrl: "../../api/skills",
                partialUrl: "../../api/partials/autocomplete-suggestion",
                data: {
                    data: data
                },
                update: update
            });
        },
        render: (skill) => {
            return helpers.addThumbnailIntoContainer(skill);
        },
        customize: (input, inputRect, container) => {
            input.parentElement.appendChild(container);
        },
        preventSubmit: true
    });
    
    Autocomplete({
        input: document.getElementById("modified-skills-ids"),
        minLength: 3,
        emptyMsg: "There are no results that match this request",
        debounceWaitMs: 100,
        className: "skill",
        onSelect: function (skill) {
            this.input.value = null;
            
            // If the skill already exists in the pool, don't add it again
            if (Array.from(skillsSortable.querySelectorAll(":scope > div")).map(x => x.getAttribute("data-serialize") === skill._id).indexOf(true) > -1) {
                return;
            }
            
            $.post("../../api/partials/linked-modified-skill", {
                _id: skill._id,
                slug: skill.slug,
                name: skill._name
            }, (html) => {
                skillsSortable.insertAdjacentHTML("beforeend", html);
                
                sortable.destroy();
                sortable = Sortable.create(skillsSortable);
            });
        },
        fetch: (data, update) => {
            helpers.updateSuggestions({
                ajaxUrl: "../../api/skills",
                partialUrl: "../../api/partials/autocomplete-suggestion",
                data: {
                    data: data,
                    $ne: _data._id
                },
                update: update
            });
        },
        render: (skill) => {
            return helpers.addThumbnailIntoContainer(skill);
        },
        customize: (input, inputRect, container) => {
            skillsSortable.appendChild(container);
        },
        preventSubmit: true
    });
    
    Autocomplete({
        input: linkedSaintIdElement,
        minLength: 3,
        emptyMsg: "There are no results that match this request",
        debounceWaitMs: 100,
        className: "saint",
        onSelect: function (saint) {
            let imageElement = this.input.parentElement.parentElement.querySelector("img.not-input-file"),
                imageSrc = "https://res.cloudinary.com/dowdeo3ja/image/upload/f_auto,q_auto/saints/" + saint.slug + "/" + saint.slug + ".png";
            
            this.input.value = saint._name;
            this.input.setAttribute("data-serialize", saint._id);
            helpers.updateThumbnail(imageElement, imageSrc);
        },
        fetch: (data, update) => {
            helpers.updateSuggestions({
                ajaxUrl: "../../api/saints",
                partialUrl: "../../api/partials/autocomplete-suggestion",
                data: {
                    data: data
                },
                update: update
            });
        },
        render: (saint) => {
            return helpers.addThumbnailIntoContainer(saint, true);
        },
        customize: (input, inputRect, container) => {
            input.parentElement.appendChild(container);
        },
        preventSubmit: true
    });
    
    let sortable = Sortable.create(skillsSortable);
    $(document).on("click", "#sortable-skills span.close", function () {
        ModalConstructor.show({
            message: "deleteConfirmation",
            submitContent: "Confirm",
            submit: () => {
                this.parentElement.parentElement.remove();
            },
            hideCloseButton: false
        });
    });
    
    helpers.displayElementsFromType(Array.from(document.querySelectorAll(".marker-type-main")), typesSkill.options[typesSkill.selectedIndex].value, "modified");
});
