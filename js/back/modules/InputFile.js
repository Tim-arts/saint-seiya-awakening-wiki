const { updateThumbnail } = require("./../../shared/helpers");

export default class InputFile {
    /**
     * Construct InputFile instance
     * @return {InputFile}
     * @param {Element} el
     * @param {Object} options
     * @constructor
     */
    constructor(el, options) {
        let _this = this;

        _this.el = el;
        _this.options = options;
        _this.$el = $(this.el);
        _this.label = this.el.previousElementSibling.nodeName === 'LABEL';
        
        if (_this.label) {
            _this.label = this.el.previousElementSibling;
            _this.labelValue = _this.label.innerHTML;
        }

        // When the user click on the image, trigger click on the input itself
        _this.options.img.addEventListener("click", function () {
            _this.$el.trigger("click");
        });

        // When the image has been selected
        _this.el.addEventListener('change', function (e) {
            let files = this.files,
                fileName;
    
            if (!_this.checkFilesSize(files)) {
                alert.log("File too big!");
        
                return;
            }
            
            if (!_this.checkFilesAuthorizedFormat()) {
                alert("Format not supported!");
                
                return;
            }
    
            if (this.files && this.files[0]) {
                let reader = new FileReader();
                reader.onload = function (e) {
                    updateThumbnail(_this.options.img, e.target.result);
                };
                
                reader.readAsDataURL(this.files[0]);
                fileName = e.target.value.split('\\').pop();
            }
    
            if (_this.label)
                _this.label.querySelectorAll("span")[1].innerHTML = fileName;
        });
        
        return _this;
    }
    
    checkFilesSize (files) {
        let state = [...files].map(x => x.size > this.options.size);
        state = state.indexOf(true) > -1;
        
        return state;
    }
    
    checkFilesAuthorizedFormat () {
        let ext = this.el.value.split("\\")[2].split(".")[1];
        ext = ext.toLowerCase();
        
        if (!this.el) {
            return false;
        }
        
        return ext === "jpg" || ext === "jpeg" || ext === "png";
    }
}
