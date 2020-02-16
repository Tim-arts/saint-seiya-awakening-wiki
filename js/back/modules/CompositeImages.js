export default class CompositeImages {
    constructor(InputFile, el, options) {
        let _this = this;
        
        this.el = el;
        this.elements = {
            avatar: {
                input: this.el.querySelector(".avatar").querySelector("input"),
                image: this.el.querySelector(".avatar").querySelector("img")
            },
            mask: {
                input: this.el.querySelector(".mask").querySelector("input"),
                image: this.el.querySelector(".mask").querySelector("img")
            },
            result: this.el.querySelector(".result").querySelector("img"),
            process: this.el.querySelector(".process")
        };
        this.constructors = {
            avatar: new InputFile(this.elements.avatar.input, {
                img: this.elements.avatar.image,
                size: options.size
            }),
            mask: new InputFile(this.elements.mask.input, {
                img: this.elements.mask.image,
                size: options.size
            })
        };
        this.result = null;

        this.elements.process.addEventListener("click", () => {
            let data = {
                image: _this.constructors.avatar.options.img.src,
                mask: _this.constructors.mask.options.img.src
            };

            $.post("../../api/composite-images", data, (response) => {
                _this.result = response.result;
    
                options.updateThumbnail(_this.elements.result, response.result);
            });
        });
        
        return this;
    }
    
    getValue () {
        return this.result;
    }
}
