require("./base");

import InputFile from "./../modules/InputFile";
import Modal from "./../../shared/modules/ModalResponse";
import helpers from "./../../shared/helpers";
import Autocomplete from "autocompleter";
import Sortable from "sortablejs";

document.addEventListener("DOMContentLoaded", () => {
    const DEFAULT = {
        skill: "https://res.cloudinary.com/dowdeo3ja/image/upload/f_auto,q_auto/skills/default.png",
        saint: "https://res.cloudinary.com/dowdeo3ja/image/upload/f_auto,q_auto/saints/default.png"
    };
    
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
        costElement = document.getElementById("cost"),
        awakeningSkillElement = document.getElementById("awakening-skill-id"),
        linkedSaintIdElement = document.getElementById("linked-saint-id"),
        isPassiveElement = document.getElementById("is-passive"),
        skillsSortable = document.getElementById("skills-sortable"),
        hasChanged = false,
        data;
    
    form
        .addEventListener("submit", (e) => {
        e.preventDefault();
        
        if (!hasChanged) {
            modal.show({
                message: "noChanges",
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
                return inputFileConstructor.options.img.src === defaultImageSrc ? null : inputFileConstructor.options.img.src;
            })(),
            cost: costElement.value,
            awakening_skill_id: awakeningSkillElement.getAttribute("data-serialize"),
            linked_saint_id: linkedSaintIdElement.getAttribute("data-serialize"),
            isPassive: !!isPassiveElement.checked,
            linked_skills_evolved: (() => {
    
            })()
        };
        
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
    });
    
    form.addEventListener("input", () => {
        hasChanged = true;
    });
    
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
            div.classList.add("suggestion");
            
            return div;
        },
        customize: (input, inputRect, container) => {
            input.parentElement.appendChild(container);
        },
        preventSubmit: true
    });
    
    Autocomplete({
        input: document.getElementById("skills-evolved-ids"),
        minLength: 3,
        emptyMsg: "There are no results that match this request",
        debounceWaitMs: 100,
        className: "skill-evolved",
        onSelect: function (skill) {
            console.log(skill);
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
            div.innerHTML = "<div class='skill-evolved'><span>" + skill.name + "</span></div>";
            div.classList.add("col-4", "suggestion");
            
            let span = document.createElement("span");
            span.innerHTML = "×";
            span.classList.add("close");
            span.addEventListener("click", function () {
                let _this = this;
    
                modal.show({
                    message: "deleteConfirmation",
                    submitContent: "Confirm",
                    submit: () => {
                        _this.parentElement.parentElement.remove();
                    }
                });
            });
            
            div.appendChild(span);
            
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
            div.classList.add("suggestion");
            
            return div;
        },
        customize: (input, inputRect, container) => {
            input.parentElement.appendChild(container);
        },
        preventSubmit: true
    });
    
    Sortable.create(skillsSortable);
    
    isPassiveElement.addEventListener("change", function () {
        helpers.applyPassive(this.checked, {
            cost: costElement
        });
    });
    
    awakeningSkillElement.addEventListener("change", function () {
        if (this.value === "") {
            let imageElement = this.parentElement.nextElementSibling.querySelector("img"),
                imageSrc = DEFAULT.skill;
            
            this.removeAttribute("data-serialize");
            helpers.updateThumbnail(imageElement, imageSrc);
        }
    });
    
    linkedSaintIdElement.addEventListener("change", function () {
        if (this.value === "") {
            let imageElement = this.parentElement.nextElementSibling.querySelector("img"),
                imageSrc = DEFAULT.saint;
            
            this.removeAttribute("data-serialize");
            helpers.updateThumbnail(imageElement, imageSrc);
        }
    });
    
    window.onbeforeunload = () => {
        if (hasChanged) {
            return true;
        }
    };
});
