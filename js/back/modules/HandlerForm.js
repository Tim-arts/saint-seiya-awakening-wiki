import { generateUuidv4 } from "./../../shared/helpers";

export default class HandlerForm {
    constructor(el, options) {
        this.el = el;
        this.options = options;
        this.hasChanged = false;
        this.init();
        
        return this;
    }
    
    init () {
        let _this = this;
        let _data = (() => {
            let isUpdate = this.el.hasAttribute("data-update"),
                data = {};
        
            if (isUpdate) {
                data._id = (() => {
                    let url = document.URL,
                        array = url.split("/");
                
                    return array[array.length - 1].substring(1);
                })();
                data.messageAction = () => {
                    this.options.modal.show({
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
                data._id = generateUuidv4();
                data.messageAction = () => {
                    this.options.show({
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
        
        this.el.addEventListener("submit", function (e) {
            e.preventDefault();
        
            if (!_this.hasChanged) {
                _this.options.modal.show({
                    message: "noChanges",
                    changeSubmitButton: "Close",
                    hideCloseButton: true
                });
            
                return;
            }
        
            $.post(this.getAttribute("action"), {
                data: _this.getData(this.options.type)
            }, (response) => {
                if (response.error) {
                    _this.options.modal.show({
                        message: "errorValidation",
                        hideCloseButton: true
                    });

                    return;
                }

                if (response.success) {
                    _this.hasChanged = false;
                    _data.messageAction();
                }
            });
        });
    
        window.onbeforeunload = () => {
            if (_this.hasChanged) {
                return true;
            }
        };
        
    };
    
    getData (type) {
        switch (type) {
            case "cosmos":
                return this.getCosmoData();
            case "skills":
                return this.getSkillData();
            case "saints":
                return this.getSaintData();
            case "news":
                return this.getNewsData();
            default:
                console.log(type + " isn't recognized!");
        }
    }
    
    getCosmoData () {
        return {
        
        }
    }
    
    getSkillData () {
        return {
        
        }
    }
    
    getSaintData () {
        return {
        
        }
    }
    
    getNewsData () {
        return {
        
        }
    }
}
