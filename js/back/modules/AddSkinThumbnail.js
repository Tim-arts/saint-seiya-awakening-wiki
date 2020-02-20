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
            let files = this.files;
            
            if (_this.checkFilesSize(files)) {
                alert("File too big!");
        
                return;
            }
    
            if (!_this.checkFilesAuthorizedFormat()) {
                alert("Format not supported!");
        
                return;
            }
            
            let __this = this;
            let data = {
                index: options.generateUuidv4(),
                starter: false
            };
    
            if (__this.files && __this.files[0]) {
                let reader = new FileReader();
                reader.onload = function (e) {
                    setTimeout(() => {
                        data.skin = {
                            name: options.convertToSlug(_this.options.input.value.split('\\').pop().split(".")[0], /["._' ]/g),
                            data: e.target.result
                        };
    
                        $.post("../../api/partials/add-skin-thumbnail", data, (response) => {
                            let HTMLElement = options.convertStringToDOMElement(response)[0];
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
                    }, 0);
                };
                reader.readAsDataURL(__this.files[0]);
            }
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
