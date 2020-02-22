import DirectCompositeImages from "./DirectCompositeImages";

export default class AddSkinThumbnail {
    constructor(options) {
        let _this = this;
        this.container = options.container;
        this.closeElements = Array.from(options.container.querySelectorAll(".close"));
        this.options = options;
        _this.options.size = _this.options.size * 1000;
        
        this.options.img.addEventListener("click", () => {
            _this.options.input.click();
        });
        
        this.options.input.addEventListener("change", function () {
            let __this = this;
            let files = __this.files;
            
            if (!__this.files[0] || !__this.files[1]) {
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
            
            function fetch (file) {
                return new Promise(resolve => {
                    let reader = new FileReader();
                    reader.onload = function (e) {
                        resolve(e.target.result);
                    };
                    reader.readAsDataURL(file);
                });
            }
            
            Promise.all([
                fetch(__this.files[0]),
                fetch(__this.files[1])
            ]).then((values) => {
                function process () {
                    let crop = document.getElementById("large-image-checkbox").checked;
                    
                    return new Promise (resolve => {
                        new DirectCompositeImages({
                            image: values[1],
                            mask: values[0],
                            crop: crop ? {x: 60, y: 39, w: 136, h: 177} : null
                        }, resolve);
                    });
                }
                
                (async function () {
                    let data = {
                        index: options.helpers.generateUuidv4(),
                        starter: false,
                        skin: {
                            name: options.helpers.convertToSlug(__this.files[1].name.split(".")[0], /["._' ]/g),
                            src: await process()
                        }
                    };
                    
                    $.post("../../api/partials/add-skin-thumbnail", data, (response) => {
                        let HTMLElement = options.helpers.convertStringToDOMElement(response)[0];
                        HTMLElement.querySelector(".close").addEventListener("click", (e) => {
                            options.modal.show({
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
        });
    
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
        let ext = this.options.input.value.split("\\")[2].split(".")[1];
        ext = ext.toLowerCase();
        
        if (!this.options.input) {
            return false;
        }
        
        return ext === "jpg" || ext === "jpeg" || ext === "png";
    }
}
