require("./base");

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
    let skillsSortable = document.getElementById("skills-sortable");
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
                hideCloseButton: true
            });
            
            return;
        }
        
        data = {
            "_id": _data._id,
            "type": typesSkill.value,
            "name": {
                "en": document.getElementById("en-name").value,
                "fr": document.getElementById("fr-name").value
            },
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
            linked_skills_modified: Array.from(skillsSortable.querySelectorAll(":scope > div")).map(x => x.getAttribute("data-serialize"))
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
        helpers.displayElementsFromType(Array.from(document.querySelectorAll(".marker-type-standard")), this.value, "modified");
    });
    
    /* Dependencies usages */
    Autocomplete({
        input: document.getElementById("awakening-skill-id"),
        minLength: 3,
        emptyMsg: "There are no results that match this request",
        debounceWaitMs: 100,
        className: "skill",
        onSelect: function (skill) {
            let imageElement = this.input.parentElement.parentElement.querySelector("img"),
                imageSrc = "https://res.cloudinary.com/dowdeo3ja/image/upload/f_auto,q_auto/skills/" + skill.slug + ".png";
            
            this.input.value = skill.name;
            this.input.setAttribute("data-serialize", skill._id);
            helpers.updateThumbnail(imageElement, imageSrc);
        },
        fetch: (data, update) => {
            $.ajax({
                url: "../../api/skills",
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
            div.classList.add("suggestion");
            
            return div;
        },
        customize: (input, inputRect, container) => {
            input.parentElement.appendChild(container);
        },
        preventSubmit: true
    });
    
    Autocomplete({
        input: document.getElementById("skills-modified-ids"),
        minLength: 3,
        emptyMsg: "There are no results that match this request",
        debounceWaitMs: 100,
        className: "skill",
        onSelect: function (skill) {
            this.input.value = null;
            let slug = helpers.convertToName(skill.slug);
            
            // If the skill already exists in the pool, don't add it again
            if (Array.from(skillsSortable.querySelectorAll(":scope > div")).map(x => x.getAttribute("data-serialize") === skill._id).indexOf(true) > -1) {
                return;
            }
            
            let parent = document.createElement("div");
            parent.classList.add("col-4", "position-relative", "mb-2");
            parent.setAttribute("data-serialize", skill._id);
            
            let div = document.createElement("div");
            div.innerHTML = "<img src='https://res.cloudinary.com/dowdeo3ja/image/upload/f_auto,q_auto/skills/" + skill.slug + ".png' class='mr-2' alt='Skill icon' /><span>" + slug + "</span>";
            div.classList.add("skill-modified");
            div.querySelector("img").addEventListener("error", function () {
                this.src = helpers.constants.urls.skill;
            });
    
            let span = document.createElement("span");
            span.innerHTML = "×";
            span.classList.add("close");
            span.addEventListener("click", function () {
                ModalConstructor.show({
                    message: "deleteConfirmation",
                    submitContent: "Confirm",
                    submit: () => {
                        this.parentElement.parentElement.remove();
                    }
                });
            });
            
            div.appendChild(span);
            parent.appendChild(div);
            skillsSortable.appendChild(parent);
    
            sortable.destroy();
            sortable = Sortable.create(skillsSortable);
        },
        fetch: (data, update) => {
            $.ajax({
                url: "../../api/skills",
                data: {
                    data: data,
                    $ne: _data._id
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
            div.innerHTML = helpers.convertToName(skill.slug);
            div.classList.add("suggestion");
    
            return div;
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
            let imageElement = this.input.parentElement.parentElement.querySelector("img"),
                imageSrc = "https://res.cloudinary.com/dowdeo3ja/image/upload/f_auto,q_auto/saints/" + saint.slug + "/thumbnail.png";
            
            this.input.value = saint.name;
            this.input.setAttribute("data-serialize", saint._id);
            helpers.updateThumbnail(imageElement, imageSrc);
        },
        fetch: (data, update) => {
            $.ajax({
                url: "../../api/saints",
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
            div.classList.add("suggestion");
            
            return div;
        },
        customize: (input, inputRect, container) => {
            input.parentElement.appendChild(container);
        },
        preventSubmit: true
    });
    
    let sortable = Sortable.create(skillsSortable);
    
    /* On load */
    helpers.displayElementsFromType(Array.from(document.querySelectorAll(".marker-type-standard")), typesSkill.options[typesSkill.selectedIndex].value, "modified");
});
