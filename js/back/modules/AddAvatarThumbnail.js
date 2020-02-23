import DirectCompositeImages from "./DirectCompositeImages";

export default class AddAvatarThumbnail {
    constructor(options) {
        let _this = this;
        this.options = options;
        this.parent = document.getElementById(options.parent);
        this.options.size = _this.options.size * 1000;
        this.result = null;
        
        if (options.library) {
            this.container = this.parent.querySelector(".library");
            this.input = this.parent.querySelector(".item.starter input[type='file']");
            this.img = this.parent.querySelector(".item.starter img");
            this.closeElements = Array.from(this.container.querySelectorAll(".close"));
         } else {
            this.input = this.parent.querySelector("input");
            this.img = this.parent.querySelector("img");
            this.label = this.parent.querySelector("label");
        }
        
        this.img.addEventListener("click", () => {
            _this.input.click();
        });
        
        this.input.addEventListener("change", function () {
            let __this = this;
            let files = __this.files;
            
            if (options.library && !__this.files[1]) {
                return;
            }
            
            if (!__this.files[0] && !__this.files[1]) {
                return;
            }
            
            if (_this.checkFilesSize(files)) {
                alert("File too big!");
        
                return;
            }
    
            if (!_this.checkFilesAuthorizedFormat()) {
                alert("Format not supported!");
        
                return;
            }
            
            if (__this.files[0] && __this.files[1]) {
                _this.compositeProcess(__this);
            } else {
                _this.singleProcess(__this);
            }
        });
    
        if (options.library) {
            this.closeElements.forEach(closeElement => {
                closeElement.addEventListener("click", function (e) {
                    options.modal.show({
                        message: "deleteConfirmation",
                        submitContent: "Confirm",
                        closeContent: "Cancel",
                        submit: () => {
                            this.parentElement.parentElement.remove();
                        },
                        hideCloseButton: false
                    });
            
                    e.preventDefault();
                });
            });
        }
    
        document.addEventListener("click", function (e) {
            if (options.helpers.hasClass(e.target, "label-editable")) e.preventDefault();
        }, false);
    
        document.addEventListener("input", function (e) {
            let target = e.target;
            
            if (options.helpers.hasClass(target, "label-editable")) {
                let value = options.helpers.convertToSlug(target.innerText, /[ ]/g);
                target.parentElement.parentElement.setAttribute("data-name", value);
            }
        });
    
        return this;
    }
    
    checkFilesSize (files) {
        let state = [...files].map(x => x.size > this.options.size);
        return state.indexOf(true) > -1;
    }
    
    checkFilesAuthorizedFormat () {
        let ext = this.getExtension(this.input);
        ext = ext.toLowerCase();
        
        if (!this.input) {
            return false;
        }
        
        return ext === "jpg" || ext === "jpeg" || ext === "png";
    }
    
    compositeProcess (__this) {
        let _this = this;
        
        Promise.all([
            _this.fetch(__this.files[0]),
            _this.fetch(__this.files[1])
        ]).then((values) => {
            function process () {
                let cropElement = _this.parent.querySelector(".item.starter input[type='checkbox']");
                let crop;
                
                if (cropElement) {
                    crop = cropElement.checked;
                } else {
                    crop = _this.options.crop;
                }
                
                return new Promise (resolve => {
                    new DirectCompositeImages({
                        image: values[1],
                        mask: values[0],
                        crop: crop ? {x: 60, y: 39, w: 136, h: 177} : null
                    }, resolve);
                });
            }
            
            (async function () {
                let result = await process();
                _this.result = result;
                
                if (!_this.options.library) {
                    _this.options.helpers.updateThumbnail(_this.img, result);
                    return;
                }
                
                let data = {
                    index: _this.options.helpers.generateUuidv4(),
                    starter: false,
                    skin: {
                        name: _this.options.helpers.convertToSlug(__this.files[1].name.split(".")[0], /["._' ]/g),
                        src: result
                    }
                };
    
                $.post("../../api/partials/add-skin-thumbnail", data, (response) => {
                    let HTMLElement = _this.options.helpers.convertStringToDOMElement(response)[0];
                    HTMLElement.querySelector(".close").addEventListener("click", (e) => {
                        _this.options.modal.show({
                            message: "deleteConfirmation",
                            submitContent: "Confirm",
                            closeContent: "Cancel",
                            submit: () => {
                                HTMLElement.remove();
                            },
                            hideCloseButton: false
                        });
            
                        e.preventDefault();
                    });
        
                    _this.container.appendChild(HTMLElement);
                });
            })();
        });
    }
    
    singleProcess (__this) {
        let _this = this;
        
        this.fetch(__this.files[0]).then(value => {
            _this.result = value;
            _this.options.helpers.updateThumbnail(this.img, value);
        });
    }
    
    fetch (file) {
        return new Promise(resolve => {
            let reader = new FileReader();
            reader.onload = function (e) {
                resolve(e.target.result);
            };
            reader.readAsDataURL(file);
        });
    }
    
    getName (file) {
        return this.options.helpers.capitalize(this.options.helpers.convertToSlug(file.name.split(".")[0], /[".-_' ]/g, " "));
    }
    
    getExtension (input) {
        return input.value.split("\\")[2].split(".")[1];
    }
    
    getValue () {
        if (this.options.library) {
            let array = [];
    
            Array.from(this.container.querySelectorAll(".skin:not(.starter)")).map(e => {
                array.push({
                    "name": e.getAttribute("data-name"),
                    "img": e.querySelector("img").src
                })
            });
    
            return array;
        } else {
            return this.result;
        }
    }
}
