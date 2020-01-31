export default class BgSlider {
    /**
     * Construct BgSlide instance
     * @return {BgSlider}
     * @param {Element} el
     * @param {Object} count
     * @param {number} index, active slide
     * @param {number} transitionBetween, transition time between each slide
     * @param {number} transitionTime, transition time in milliseconds
     * @param {boolean} random, display images randomly
     * @param {boolean} loop, to active the sliding
     * @param {boolean} arrows, enable arrows
     * @param {boolean} progressBar, enable progress bar
     * @param {boolean} infiniteLoop, enable infinite loop
     * @constructor
     */
    constructor (
        el,
        count = { mobile: 5, desktop: 5 },
        index = 0,
        transitionBetween = 1000,
        transitionTime = 8000,
        random = true,
        loop = false,
        arrows = {
            rounded: true,
            state: false,
            value: 2
        },
        progressBar = false,
        infiniteLoop = true
        ) {
        this.isOnMobile = (() => {
            let check = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
            return check;
        })();
        
        this.el = el;
        this.count = (() => {
            let value = JSON.parse(el.getAttribute('data-slide-count'));
            
            if (!value) {
                return this.isOnMobile ? count.mobile : count.desktop;
            }
            
            return this.isOnMobile ? value.mobile : value.desktop;
        })();
        this.index = el.getAttribute('data-slide-index') ? el.getAttribute('data-slide-index') : index;
        this.transitionBetween = el.getAttribute('data-slide-transition-between') ? el.getAttribute('data-slide-transition-between') : transitionBetween;
        this.transitionTime = el.getAttribute('data-slide-transition-time') ? el.getAttribute('data-slide-transition-time') : transitionTime;
        this.random = (() => {
            let value = JSON.parse(el.getAttribute('data-slide-random'));
            return value === null ? random : value;
        })();
        this.loop = (() => {
            let number = JSON.parse(el.getAttribute('data-slide-loop'));
            return number === null ? loop : number;
        })();
        this.container = el.querySelector(".bg-slides-container");
        this.slides = ((self) => {
            let slides = [],
                randomNumbers = (() => {
                    const numbers = [...Array(self.count).keys()].map(num => num + 1);
                    return numbers.sort(() => Math.random() - 0.5);
                })();
            
            for (let i = 0, count = self.count; i < count; i++) {
                let currentSlide = self.createElementSlide(self, i, randomNumbers);
                
                slides.push(currentSlide);
                self.container.appendChild(currentSlide);
            }
            
            return slides;
        })(this);
        this.activeSlide = this.getActiveSlide();
        this.arrowsContainer = el.querySelector('.bg-arrows-container');
        this.arrows = (() => {
            return JSON.parse(el.getAttribute('data-slide-arrows'));
        })();
        this.arrowsElements = {
            left: this.arrowsContainer.querySelector(".bg-arrow-left"),
            right: this.arrowsContainer.querySelector(".bg-arrow-right")
        };
        this.progressBarContainer = el.querySelector(".bg-progress-bar-container");
        this.progressBar = this.progressBarContainer.querySelector(".bg-progress-bar");
        this.loader = (() => {
            let value = JSON.parse(el.getAttribute('data-slide-progress-bar'));
            return value === null ? progressBar : value;
        })();
        this.animating = false;
        this.infiniteLoop = (() => {
            let value = JSON.parse(el.getAttribute('data-slide-infinite-loop'));
            return value === null ? infiniteLoop : value;
        })();
        
        if (this.loop) {
            this.start();
        }
        
        if (this.arrows) {
            this.setArrows();
        }
        
        if (this.loader) {
            this.progressBarContainer.classList.add("active");
            this.animBarLoadIn();
        }
        
        return this;
    }
    
    /**
     * Function createElementSlide element
     * @param {object} self, instance
     * @param {number} i, index
     * @param {array} randomNumbers, array from random numbers generated
     */
    createElementSlide (self, i, randomNumbers) {
        let element = document.createElement("div"),
            device = this.isOnMobile ? "mobile" : "desktop",
            url;
        
        if (self.random) {
            url = "url('https://res.cloudinary.com/dowdeo3ja/image/upload/f_auto,q_auto/slider/"+ device +"/slide-"+ randomNumbers[i] +".jpg')";
            element.classList.add("bg-slide", "bg-slide-" + randomNumbers[i]);
        } else {
            url = "url('https://res.cloudinary.com/dowdeo3ja/image/upload/f_auto,q_auto/slider/"+ device +"/slide-"+ i +".jpg')";
            element.classList.add("bg-slide", "bg-slide-" + i);
        }
        
        element.style.backgroundImage = url;
        
        if (i === self.index) {
            element.classList.add("active");
        }
        
        return element;
    }
    
    setArrows () {
        let self = this;
    
        this.arrowsContainer.classList.add("active");
        this.arrowsElements.left.addEventListener("click", () => {
            if (self.animating) {
                return;
            }
    
            self.activeSlide = self.goToPrevSlide();
        
            if (self.loop) {
                clearInterval(self.intervalLoop);
                self.createPrevLoop();
            }
        });
        this.arrowsElements.right.addEventListener("click", () => {
            if (self.animating) {
                return;
            }
        
            self.activeSlide = self.goToNextSlide();
        
            if (self.loop) {
                clearInterval(self.intervalLoop);
                self.createNextLoop();
            }
        });
        
        this.arrowsElements.left.style.borderRadius = this.arrows.value + "px";
        this.arrowsElements.right.style.borderRadius = this.arrows.value + "px";
    }
    
    createNextLoop () {
        this.intervalLoop = setInterval(() => {
            this.activeSlide = this.goToNextSlide();
        }, this.transitionTime);
    }
    
    createPrevLoop () {
        this.intervalLoop = setInterval(() => {
            this.activeSlide = this.goToPrevSlide();
        }, this.transitionTime);
    }
    
     getNextSlide () {
        return this.slides[this.index + 1];
    }
    
    getPrevSlide () {
        return this.slides[this.index - 1];
    }
    
    getActiveSlide () {
        return this.slides[this.index];
    }
    
    setNewActiveSlide (newIndex) {
        this.index = newIndex;
        this.activeSlide = this.slides[newIndex];
    }
    
    checkNextSlide () {
        return this.slides[this.index + 1];
    }
    
    checkPrevSlide () {
        return this.slides[this.index - 1];
    }
    
    goToNextSlide () {
        let self = this,
            nextSlideExist = !!this.getNextSlide(),
            activeSlide = this.activeSlide;
        
        if (!nextSlideExist && this.infiniteLoop) {
            return proceed(0);
        }
    
        if (nextSlideExist) {
            return proceed(this.index + 1);
        }
        
        function proceed (newIndex) {
            self.animating = true;
    
            activeSlide = self.getActiveSlide();
            self.fadeOutSlide(activeSlide);
            
            self.setNewActiveSlide(newIndex);
    
            activeSlide = self.getActiveSlide();
            self.fadeInSlide(activeSlide);
    
            setTimeout(() => {
                self.animating = false;
            }, self.transitionBetween);
            
            return activeSlide;
        }
    }
    
    goToPrevSlide () {
        let self = this,
            prevSlideExist = !!this.getPrevSlide(),
            activeSlide = this.activeSlide;
    
        if (!prevSlideExist && this.infiniteLoop) {
            return proceed(this.count - 1);
        }
    
        if (prevSlideExist) {
            return proceed(this.index - 1);
        }
    
        function proceed (newIndex) {
            self.animating = true;
        
            activeSlide = self.getActiveSlide();
            self.fadeOutSlide(activeSlide);
        
            self.setNewActiveSlide(newIndex);
        
            activeSlide = self.getActiveSlide();
            self.fadeInSlide(activeSlide);
        
            setTimeout(() => {
                self.animating = false;
            }, self.transitionBetween);
        
            return activeSlide;
        }
    }
    
    fadeInSlide (slide) {
        slide.classList.add("active", "anim-fade-in");
        this.animBarLoadIn();
        
        setTimeout(() => {
            slide.classList.remove("anim-fade-in");
        }, this.transitionBetween);
    }
    
    fadeOutSlide (slide) {
        slide.classList.add("anim-fade-out");
        
        setTimeout(() => {
            slide.classList.remove("active", "anim-fade-out");
        }, this.transitionBetween);
    }
    
    animBarLoadIn () {
        this.progressBar.classList.add("anim-load-in");
        this.progressBarProgression = setTimeout(() => {
            this.progressBar.classList.remove("anim-load-in");
        }, this.transitionTime - (this.transitionBetween / 4));
    }
    
    start () {
        this.intervalLoop = setInterval(() => {
            this.activeSlide = this.goToNextSlide();
        }, this.transitionTime);
    }
    
    pause () {
        clearInterval(this.intervalLoop);
    }
}
