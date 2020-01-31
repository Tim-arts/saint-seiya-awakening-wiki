(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var cookies = require("cookies-js");

document.addEventListener("DOMContentLoaded", function () {
  var lang = document.getElementById("pick-lang"),
      dropdownMenu = lang.nextElementSibling;
  lang.addEventListener("click", function (e) {
    e.preventDefault();
  });
  dropdownMenu.querySelectorAll(".dropdown-item").forEach(function (item) {
    item.addEventListener("click", function (e) {
      var currentLanguage = this.getAttribute("data-language");
      cookies.set("lang", currentLanguage, {
        expires: 365
      });
      location.reload(true);
      e.preventDefault();
    });
  });
});

},{"cookies-js":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var BgSlider =
/*#__PURE__*/
function () {
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
  function BgSlider(el) {
    var _this = this;

    var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      mobile: 5,
      desktop: 5
    };
    var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var transitionBetween = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1000;
    var transitionTime = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 8000;
    var random = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;
    var loop = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
    var arrows = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : {
      rounded: true,
      state: false,
      value: 2
    };
    var progressBar = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
    var infiniteLoop = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : true;

    _classCallCheck(this, BgSlider);

    this.isOnMobile = function () {
      var check = false;

      (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);

      return check;
    }();

    this.el = el;

    this.count = function () {
      var value = JSON.parse(el.getAttribute('data-slide-count'));

      if (!value) {
        return _this.isOnMobile ? count.mobile : count.desktop;
      }

      return _this.isOnMobile ? value.mobile : value.desktop;
    }();

    this.index = el.getAttribute('data-slide-index') ? el.getAttribute('data-slide-index') : index;
    this.transitionBetween = el.getAttribute('data-slide-transition-between') ? el.getAttribute('data-slide-transition-between') : transitionBetween;
    this.transitionTime = el.getAttribute('data-slide-transition-time') ? el.getAttribute('data-slide-transition-time') : transitionTime;

    this.random = function () {
      var value = JSON.parse(el.getAttribute('data-slide-random'));
      return value === null ? random : value;
    }();

    this.loop = function () {
      var number = JSON.parse(el.getAttribute('data-slide-loop'));
      return number === null ? loop : number;
    }();

    this.container = el.querySelector(".bg-slides-container");

    this.slides = function (self) {
      var slides = [],
          randomNumbers = function () {
        var numbers = _toConsumableArray(Array(self.count).keys()).map(function (num) {
          return num + 1;
        });

        return numbers.sort(function () {
          return Math.random() - 0.5;
        });
      }();

      for (var i = 0, _count = self.count; i < _count; i++) {
        var currentSlide = self.createElementSlide(self, i, randomNumbers);
        slides.push(currentSlide);
        self.container.appendChild(currentSlide);
      }

      return slides;
    }(this);

    this.activeSlide = this.getActiveSlide();
    this.arrowsContainer = el.querySelector('.bg-arrows-container');

    this.arrows = function () {
      return JSON.parse(el.getAttribute('data-slide-arrows'));
    }();

    this.arrowsElements = {
      left: this.arrowsContainer.querySelector(".bg-arrow-left"),
      right: this.arrowsContainer.querySelector(".bg-arrow-right")
    };
    this.progressBarContainer = el.querySelector(".bg-progress-bar-container");
    this.progressBar = this.progressBarContainer.querySelector(".bg-progress-bar");

    this.loader = function () {
      var value = JSON.parse(el.getAttribute('data-slide-progress-bar'));
      return value === null ? progressBar : value;
    }();

    this.animating = false;

    this.infiniteLoop = function () {
      var value = JSON.parse(el.getAttribute('data-slide-infinite-loop'));
      return value === null ? infiniteLoop : value;
    }();

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


  _createClass(BgSlider, [{
    key: "createElementSlide",
    value: function createElementSlide(self, i, randomNumbers) {
      var element = document.createElement("div"),
          device = this.isOnMobile ? "mobile" : "desktop",
          url;

      if (self.random) {
        url = "url('https://res.cloudinary.com/dowdeo3ja/image/upload/f_auto,q_auto/slider/" + device + "/slide-" + randomNumbers[i] + ".jpg')";
        element.classList.add("bg-slide", "bg-slide-" + randomNumbers[i]);
      } else {
        url = "url('https://res.cloudinary.com/dowdeo3ja/image/upload/f_auto,q_auto/slider/" + device + "/slide-" + i + ".jpg')";
        element.classList.add("bg-slide", "bg-slide-" + i);
      }

      element.style.backgroundImage = url;

      if (i === self.index) {
        element.classList.add("active");
      }

      return element;
    }
  }, {
    key: "setArrows",
    value: function setArrows() {
      var self = this;
      this.arrowsContainer.classList.add("active");
      this.arrowsElements.left.addEventListener("click", function () {
        if (self.animating) {
          return;
        }

        self.activeSlide = self.goToPrevSlide();

        if (self.loop) {
          clearInterval(self.intervalLoop);
          self.createPrevLoop();
        }
      });
      this.arrowsElements.right.addEventListener("click", function () {
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
  }, {
    key: "createNextLoop",
    value: function createNextLoop() {
      var _this2 = this;

      this.intervalLoop = setInterval(function () {
        _this2.activeSlide = _this2.goToNextSlide();
      }, this.transitionTime);
    }
  }, {
    key: "createPrevLoop",
    value: function createPrevLoop() {
      var _this3 = this;

      this.intervalLoop = setInterval(function () {
        _this3.activeSlide = _this3.goToPrevSlide();
      }, this.transitionTime);
    }
  }, {
    key: "getNextSlide",
    value: function getNextSlide() {
      return this.slides[this.index + 1];
    }
  }, {
    key: "getPrevSlide",
    value: function getPrevSlide() {
      return this.slides[this.index - 1];
    }
  }, {
    key: "getActiveSlide",
    value: function getActiveSlide() {
      return this.slides[this.index];
    }
  }, {
    key: "setNewActiveSlide",
    value: function setNewActiveSlide(newIndex) {
      this.index = newIndex;
      this.activeSlide = this.slides[newIndex];
    }
  }, {
    key: "checkNextSlide",
    value: function checkNextSlide() {
      return this.slides[this.index + 1];
    }
  }, {
    key: "checkPrevSlide",
    value: function checkPrevSlide() {
      return this.slides[this.index - 1];
    }
  }, {
    key: "goToNextSlide",
    value: function goToNextSlide() {
      var self = this,
          nextSlideExist = !!this.getNextSlide(),
          activeSlide = this.activeSlide;

      if (!nextSlideExist && this.infiniteLoop) {
        return proceed(0);
      }

      if (nextSlideExist) {
        return proceed(this.index + 1);
      }

      function proceed(newIndex) {
        self.animating = true;
        activeSlide = self.getActiveSlide();
        self.fadeOutSlide(activeSlide);
        self.setNewActiveSlide(newIndex);
        activeSlide = self.getActiveSlide();
        self.fadeInSlide(activeSlide);
        setTimeout(function () {
          self.animating = false;
        }, self.transitionBetween);
        return activeSlide;
      }
    }
  }, {
    key: "goToPrevSlide",
    value: function goToPrevSlide() {
      var self = this,
          prevSlideExist = !!this.getPrevSlide(),
          activeSlide = this.activeSlide;

      if (!prevSlideExist && this.infiniteLoop) {
        return proceed(this.count - 1);
      }

      if (prevSlideExist) {
        return proceed(this.index - 1);
      }

      function proceed(newIndex) {
        self.animating = true;
        activeSlide = self.getActiveSlide();
        self.fadeOutSlide(activeSlide);
        self.setNewActiveSlide(newIndex);
        activeSlide = self.getActiveSlide();
        self.fadeInSlide(activeSlide);
        setTimeout(function () {
          self.animating = false;
        }, self.transitionBetween);
        return activeSlide;
      }
    }
  }, {
    key: "fadeInSlide",
    value: function fadeInSlide(slide) {
      slide.classList.add("active", "anim-fade-in");
      this.animBarLoadIn();
      setTimeout(function () {
        slide.classList.remove("anim-fade-in");
      }, this.transitionBetween);
    }
  }, {
    key: "fadeOutSlide",
    value: function fadeOutSlide(slide) {
      slide.classList.add("anim-fade-out");
      setTimeout(function () {
        slide.classList.remove("active", "anim-fade-out");
      }, this.transitionBetween);
    }
  }, {
    key: "animBarLoadIn",
    value: function animBarLoadIn() {
      var _this4 = this;

      this.progressBar.classList.add("anim-load-in");
      this.progressBarProgression = setTimeout(function () {
        _this4.progressBar.classList.remove("anim-load-in");
      }, this.transitionTime - this.transitionBetween / 4);
    }
  }, {
    key: "start",
    value: function start() {
      var _this5 = this;

      this.intervalLoop = setInterval(function () {
        _this5.activeSlide = _this5.goToNextSlide();
      }, this.transitionTime);
    }
  }, {
    key: "pause",
    value: function pause() {
      clearInterval(this.intervalLoop);
    }
  }]);

  return BgSlider;
}();

exports["default"] = BgSlider;

},{}],3:[function(require,module,exports){
"use strict";

require("../base");

var _BgSlider = _interopRequireDefault(require("./../modules/BgSlider"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

document.addEventListener("DOMContentLoaded", function () {
  var slideElements = document.querySelectorAll(".bg-slider");
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = slideElements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var slideElement = _step.value;
      new _BgSlider["default"](slideElement);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
});

},{"../base":1,"./../modules/BgSlider":2}],4:[function(require,module,exports){
/*
 * Cookies.js - 1.2.3
 * https://github.com/ScottHamper/Cookies
 *
 * This is free and unencumbered software released into the public domain.
 */
(function (global, undefined) {
    'use strict';

    var factory = function (window) {
        if (typeof window.document !== 'object') {
            throw new Error('Cookies.js requires a `window` with a `document` object');
        }

        var Cookies = function (key, value, options) {
            return arguments.length === 1 ?
                Cookies.get(key) : Cookies.set(key, value, options);
        };

        // Allows for setter injection in unit tests
        Cookies._document = window.document;

        // Used to ensure cookie keys do not collide with
        // built-in `Object` properties
        Cookies._cacheKeyPrefix = 'cookey.'; // Hurr hurr, :)
        
        Cookies._maxExpireDate = new Date('Fri, 31 Dec 9999 23:59:59 UTC');

        Cookies.defaults = {
            path: '/',
            secure: false
        };

        Cookies.get = function (key) {
            if (Cookies._cachedDocumentCookie !== Cookies._document.cookie) {
                Cookies._renewCache();
            }
            
            var value = Cookies._cache[Cookies._cacheKeyPrefix + key];

            return value === undefined ? undefined : decodeURIComponent(value);
        };

        Cookies.set = function (key, value, options) {
            options = Cookies._getExtendedOptions(options);
            options.expires = Cookies._getExpiresDate(value === undefined ? -1 : options.expires);

            Cookies._document.cookie = Cookies._generateCookieString(key, value, options);

            return Cookies;
        };

        Cookies.expire = function (key, options) {
            return Cookies.set(key, undefined, options);
        };

        Cookies._getExtendedOptions = function (options) {
            return {
                path: options && options.path || Cookies.defaults.path,
                domain: options && options.domain || Cookies.defaults.domain,
                expires: options && options.expires || Cookies.defaults.expires,
                secure: options && options.secure !== undefined ?  options.secure : Cookies.defaults.secure
            };
        };

        Cookies._isValidDate = function (date) {
            return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());
        };

        Cookies._getExpiresDate = function (expires, now) {
            now = now || new Date();

            if (typeof expires === 'number') {
                expires = expires === Infinity ?
                    Cookies._maxExpireDate : new Date(now.getTime() + expires * 1000);
            } else if (typeof expires === 'string') {
                expires = new Date(expires);
            }

            if (expires && !Cookies._isValidDate(expires)) {
                throw new Error('`expires` parameter cannot be converted to a valid Date instance');
            }

            return expires;
        };

        Cookies._generateCookieString = function (key, value, options) {
            key = key.replace(/[^#$&+\^`|]/g, encodeURIComponent);
            key = key.replace(/\(/g, '%28').replace(/\)/g, '%29');
            value = (value + '').replace(/[^!#$&-+\--:<-\[\]-~]/g, encodeURIComponent);
            options = options || {};

            var cookieString = key + '=' + value;
            cookieString += options.path ? ';path=' + options.path : '';
            cookieString += options.domain ? ';domain=' + options.domain : '';
            cookieString += options.expires ? ';expires=' + options.expires.toUTCString() : '';
            cookieString += options.secure ? ';secure' : '';

            return cookieString;
        };

        Cookies._getCacheFromString = function (documentCookie) {
            var cookieCache = {};
            var cookiesArray = documentCookie ? documentCookie.split('; ') : [];

            for (var i = 0; i < cookiesArray.length; i++) {
                var cookieKvp = Cookies._getKeyValuePairFromCookieString(cookiesArray[i]);

                if (cookieCache[Cookies._cacheKeyPrefix + cookieKvp.key] === undefined) {
                    cookieCache[Cookies._cacheKeyPrefix + cookieKvp.key] = cookieKvp.value;
                }
            }

            return cookieCache;
        };

        Cookies._getKeyValuePairFromCookieString = function (cookieString) {
            // "=" is a valid character in a cookie value according to RFC6265, so cannot `split('=')`
            var separatorIndex = cookieString.indexOf('=');

            // IE omits the "=" when the cookie value is an empty string
            separatorIndex = separatorIndex < 0 ? cookieString.length : separatorIndex;

            var key = cookieString.substr(0, separatorIndex);
            var decodedKey;
            try {
                decodedKey = decodeURIComponent(key);
            } catch (e) {
                if (console && typeof console.error === 'function') {
                    console.error('Could not decode cookie with key "' + key + '"', e);
                }
            }
            
            return {
                key: decodedKey,
                value: cookieString.substr(separatorIndex + 1) // Defer decoding value until accessed
            };
        };

        Cookies._renewCache = function () {
            Cookies._cache = Cookies._getCacheFromString(Cookies._document.cookie);
            Cookies._cachedDocumentCookie = Cookies._document.cookie;
        };

        Cookies._areEnabled = function () {
            var testKey = 'cookies.js';
            var areEnabled = Cookies.set(testKey, 1).get(testKey) === '1';
            Cookies.expire(testKey);
            return areEnabled;
        };

        Cookies.enabled = Cookies._areEnabled();

        return Cookies;
    };
    var cookiesExport = (global && typeof global.document === 'object') ? factory(global) : factory;

    // AMD support
    if (typeof define === 'function' && define.amd) {
        define(function () { return cookiesExport; });
    // CommonJS/Node.js support
    } else if (typeof exports === 'object') {
        // Support Node.js specific `module.exports` (which can be a function)
        if (typeof module === 'object' && typeof module.exports === 'object') {
            exports = module.exports = cookiesExport;
        }
        // But always support CommonJS module 1.1.1 spec (`exports` cannot be a function)
        exports.Cookies = cookiesExport;
    } else {
        global.Cookies = cookiesExport;
    }
})(typeof window === 'undefined' ? this : window);
},{}]},{},[3]);
