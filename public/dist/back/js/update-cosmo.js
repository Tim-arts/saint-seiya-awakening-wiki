(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var cookies = require("cookies-js");

document.addEventListener("DOMContentLoaded", function () {
  var sidebarToggleButton = document.getElementById("sidebar-collapse"),
      sidebar = document.getElementById("sidebar"),
      languagesButtons = Array.from(document.querySelectorAll(".language"));
  sidebarToggleButton.addEventListener("click", function () {
    var iconElement = this.querySelector("i");

    if (sidebar.classList.contains("active")) {
      iconElement.innerHTML = "close";
    } else {
      iconElement.innerHTML = "menu";
    }

    sidebar.classList.toggle("active");
  });
  languagesButtons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      var currentLanguage = this.getAttribute("data-language");
      cookies.set("lang", currentLanguage, {
        expires: 365
      });
      location.reload(true);
      e.preventDefault();
    });
  });
});

},{"cookies-js":7}],2:[function(require,module,exports){
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

var _require = require("./../../shared/helpers"),
    updateThumbnail = _require.updateThumbnail;

var InputFile =
/*#__PURE__*/
function () {
  /**
   * Construct InputFile instance
   * @return {InputFile}
   * @param {Element} el
   * @param {Object} options
   * @constructor
   */
  function InputFile(el, options) {
    _classCallCheck(this, InputFile);

    var _this = this;

    _this.el = el;
    _this.options = options;
    _this.$el = $(this.el);
    _this.label = this.el.previousElementSibling.nodeName === 'LABEL';

    if (_this.label) {
      _this.label = this.el.previousElementSibling;
      _this.labelValue = _this.label.innerHTML;
    } // When the user click on the image, trigger click on the input itself


    _this.options.img.addEventListener("click", function () {
      _this.$el.trigger("click");
    }); // When the image has been selected


    _this.el.addEventListener('change', function (e) {
      var files = this.files,
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
        var reader = new FileReader();

        reader.onload = function (e) {
          updateThumbnail(_this.options.img, e.target.result);
        };

        reader.readAsDataURL(this.files[0]);
        fileName = e.target.value.split('\\').pop();
      }

      if (_this.label) _this.label.querySelectorAll("span")[1].innerHTML = fileName;
    });

    return _this;
  }

  _createClass(InputFile, [{
    key: "checkFilesSize",
    value: function checkFilesSize(files) {
      var _this2 = this;

      var state = _toConsumableArray(files).map(function (x) {
        return x.size > _this2.options.size;
      });

      state = state.indexOf(true) > -1;
      return state;
    }
  }, {
    key: "checkFilesAuthorizedFormat",
    value: function checkFilesAuthorizedFormat() {
      var ext = this.el.value.split("\\")[2].split(".")[1];
      ext = ext.toLowerCase();

      if (!this.el) {
        return false;
      }

      return ext === "jpg" || ext === "jpeg" || ext === "png";
    }
  }]);

  return InputFile;
}();

exports["default"] = InputFile;

},{"./../../shared/helpers":5}],3:[function(require,module,exports){
"use strict";

var _InputFile = _interopRequireDefault(require("./../modules/InputFile"));

var _SelectVerification = _interopRequireDefault(require("./../../front/modules/SelectVerification"));

var _ModalResponse = _interopRequireDefault(require("./../../shared/modules/ModalResponse"));

var _helpers = require("../../shared/helpers");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

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

require("./../base");

document.addEventListener("DOMContentLoaded", function () {
  /* Elements */
  var formElement = document.getElementById("update-cosmo");
  var inputFile = document.getElementById("custom-file");
  var avatarElement = document.getElementById("avatar");
  var selects = document.querySelectorAll("select");
  var modalElement = document.getElementById("response-modal");

  var _data = function () {
    var isUpdate = formElement.hasAttribute("data-update"),
        data = {};

    if (isUpdate) {
      data._id = function () {
        var url = document.URL,
            array = url.split("/");
        return array[array.length - 1].substring(1);
      }();

      data.messageAction = function () {
        ModalConstructor.show({
          message: "successfullyUpdated",
          title: "Success!",
          backdrop: "static",
          submit: function submit() {
            window.location.reload(true);
          },
          hideCloseButton: true
        });
      };
    } else {
      data._id = (0, _helpers.generateUuidv4)();

      data.messageAction = function () {
        ModalConstructor.show({
          message: "successfullyAdded",
          title: "Success!",
          backdrop: "static",
          submit: function submit() {
            window.location.reload(true);
          },
          hideCloseButton: true
        });
      };
    }

    return data;
  }();

  var hasChanged = false;
  var data;
  /* Constructors */

  var InputFileConstructor = new _InputFile["default"](inputFile, {
    img: document.getElementById("avatar"),
    size: 256
  });
  var ModalConstructor = new _ModalResponse["default"](modalElement);
  /* Events */

  formElement.addEventListener("submit", function (e) {
    e.preventDefault();
    var selectVerificationConstructor = new _SelectVerification["default"](document.querySelectorAll("select[required]"));
    data = {
      "_id": _data._id,
      "name": {
        "en": document.getElementById("en-name").value,
        "fr": document.getElementById("fr-name").value
      },
      "slug": (0, _helpers.convertToSlug)(document.getElementById("en-name").value, /["._' ]/g, "-"),
      "slug_underscore": (0, _helpers.convertToSlug)(document.getElementById("en-name").value, /["-.' ]/g, "_"),
      "description": {
        "en": document.getElementById("en-description").value,
        "fr": document.getElementById("fr-description").value
      },
      "comment": {
        "en": document.getElementById("en-comment").value,
        "fr": document.getElementById("fr-comment").value
      },
      "basic_attributes": {
        "types": [function () {
          var select = document.getElementById("cosmos-attributes-1");
          return select.options[select.selectedIndex].value.toLowerCase();
        }(), function () {
          var select = document.getElementById("cosmos-attributes-2");
          return select.options[select.selectedIndex].value.toLowerCase();
        }()],
        "values": {
          "SS": {
            "level_10": [document.getElementById("ss-cosmos-attributes-value-1").value, document.getElementById("ss-cosmos-attributes-value-2").value]
          },
          "S": {
            "level_10": [document.getElementById("s-cosmos-attributes-value-1").value, document.getElementById("s-cosmos-attributes-value-2").value]
          }
        }
      },
      "bonus_attributes": {
        "type": function () {
          var select = document.getElementById("bonus-attributes");
          return select.options[select.selectedIndex].value.toLowerCase();
        }(),
        "value": document.getElementById("bonus-attribute-value").value
      },
      "type": function () {
        var select = document.getElementById("cosmos-types");
        return select.options[select.selectedIndex].value.toLowerCase();
      }(),
      "obtainment_system": {
        "shrine": function () {
          var select = document.getElementById("obtainment-system-shrine");
          return select.selectedIndex !== 0 ? _toConsumableArray(Array.from(select.querySelectorAll("option:checked"), function (e) {
            return e.value;
          })) : null;
        }(),
        "titans": function () {
          var select = document.getElementById("obtainment-system-titans");
          return select.selectedIndex !== 0 ? _toConsumableArray(Array.from(select.querySelectorAll("option:checked"), function (e) {
            return e.value;
          })) : null;
        }(),
        "shop": !!document.getElementById("obtainment-system-shop").checked
      },
      "image": function () {
        return avatarElement.src === _helpers.constants.urls.cosmo ? null : InputFileConstructor.options.img.src;
      }(),
      "exclusive_cn": !!document.getElementById("exclusive-cn").checked
    };

    if (!hasChanged) {
      ModalConstructor.show({
        message: "noChanges",
        changeSubmitButton: "Close",
        hideCloseButton: true
      });
      return;
    }

    if (selectVerificationConstructor.indexOf(false) === -1) {
      $.post(formElement.getAttribute("action"), {
        data: data
      }, function (response) {
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
    } else {
      ModalConstructor.show({
        message: "selectMissing",
        hideCloseButton: true
      });
    }
  });
  formElement.addEventListener("input", function () {
    hasChanged = true;
  });

  window.onbeforeunload = function () {
    if (hasChanged) {
      return true;
    }
  };

  selects.forEach(function (select) {
    var link = select.previousElementSibling.querySelector("a");
    link.addEventListener("click", function (e) {
      select.selectedIndex = 0;
      e.preventDefault();
    });
  });
});

},{"../../shared/helpers":5,"./../../front/modules/SelectVerification":4,"./../../shared/modules/ModalResponse":6,"./../base":1,"./../modules/InputFile":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var SelectVerification =
/**
 * Construct SelectVerification instance
 * @constructor
 * @return {Array}
 * @param elements
 */
function SelectVerification(elements) {
  _classCallCheck(this, SelectVerification);

  this.result = function () {
    var check = [];

    for (var i = 0, count = elements.length; i < count; i++) {
      var select = elements[i],
          selectedOption = select.options[select.selectedIndex];

      if (selectedOption.hasAttribute("disabled")) {
        check.push(false);
      } else {
        check.push(true);
      }
    }

    return check;
  }();

  return this.result;
};

exports["default"] = SelectVerification;

},{}],5:[function(require,module,exports){
"use strict";

module.exports = {
  constants: {
    urls: {
      skill: "https://res.cloudinary.com/dowdeo3ja/image/upload/f_auto,q_auto/v1/skills/default.png",
      cosmo: "https://res.cloudinary.com/dowdeo3ja/image/upload/f_auto,q_auto/v1/cosmos/default.png",
      saint: "https://res.cloudinary.com/dowdeo3ja/image/upload/f_auto,q_auto/v1/saints/default.png"
    }
  },
  generateUuidv4: function generateUuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  },
  updateThumbnail: function updateThumbnail(image, source) {
    image.classList.add("anim-fade-out-short"); // Preload image

    var tempImage = document.createElement("img");
    tempImage.src = source;
    setTimeout(function () {
      image.src = source;
      image.classList.remove("anim-fade-out-short");
      image.classList.add("anim-fade-in-short");
      tempImage = null;
      setTimeout(function () {
        image.classList.remove("anim-fade-in-short");
      }, 500);
    }, 500);
  },
  capitalize: function capitalize(string) {
    var result;

    if (string.length === 2 && string[0] === string[1]) {
      result = string.toUpperCase();
    } else {
      result = string.charAt(0).toUpperCase() + string.slice(1);
    }

    return result;
  },
  resetDisplay: function resetDisplay(elements, className) {
    elements.forEach(function (element) {
      element.classList.remove(className);
    });
  },
  convertToSlug: function convertToSlug(string, expression, replacer) {
    return string.trim().toLowerCase().replace(expression, replacer);
  },
  convertToName: function convertToName(slug) {
    var name = [];
    slug = slug.split("-");

    for (var i = 0, count = slug.length; i < count; i++) {
      if (slug[i] !== "") {
        name.push(this.capitalize(slug[i]));
      }
    }

    name = name.join(" ");
    return name;
  },
  applyPassive: function applyPassive(bool, elements) {
    if (bool) {
      elements.cost.value = null;
      elements.cost.setAttribute("disabled", "disabled");
    } else {
      elements.cost.removeAttribute("disabled");
    }
  },
  displayElementsFromType: function displayElementsFromType(markers, value, type) {
    if (value === type) {
      markers.forEach(function (marker) {
        marker.classList.add("hide");
      });
    } else {
      markers.forEach(function (marker) {
        marker.classList.remove("hide");
      });
    }
  }
};

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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

var Modal =
/*#__PURE__*/
function () {
  /**
   * Construct Modal instance
   * @return {Object}
   * @param el
   * @constructor
   */
  function Modal(el) {
    var _this = this;

    _classCallCheck(this, Modal);

    this.el = el;
    this.title = this.el.querySelector(".modal-title");
    this.content = this.el.querySelector(".modal-content-to-replace");
    this.submitButton = this.el.querySelector(".submit");
    this.closeButton = this.el.querySelector(".dismiss");
    this.messages = {
      errorValidation: "There was an error in the attempt to add the entity, please refer to the administrator and check the logs.",
      selectMissing: "One or more select have no selected option <span class='text-green'>OR</span> one of the default option is selected!",
      noChanges: "You haven't changed any data!",
      successfullyAdded: "The item has been successfully added!",
      successfullyUpdated: "The item has been successfully updated!",
      deleteConfirmation: "Do you really want to delete this item?"
    };
    this.options = {};
    $(document).on("click", this.submitButton, function (e) {
      if (e.target === _this.submitButton) {
        _this.submit(_this.options.submit);
      }
    });
    return this;
  }

  _createClass(Modal, [{
    key: "show",
    value: function show(options) {
      if (options.title) this.changeTitle(options.title);
      if (options.message) this.changeContent(options.message);
      if (options.submitContent) this.changeSubmitButton(options.submitContent);
      if (options.closeContent) this.changeCloseButton(options.closeContent);
      if (options.hideCloseButton) this.hideCloseButton();
      this.options = options;
      $(this.el).modal({
        show: true,
        backdrop: options.backdrop ? "static" : true
      });
    }
  }, {
    key: "changeTitle",
    value: function changeTitle(title) {
      this.title.innerHTML = title;
    }
  }, {
    key: "changeContent",
    value: function changeContent(message) {
      this.content.innerHTML = this.messages[message];
    }
  }, {
    key: "changeSubmitButton",
    value: function changeSubmitButton(content) {
      this.submitButton.innerHTML = content;
    }
  }, {
    key: "changeCloseButton",
    value: function changeCloseButton(content) {
      this.closeButton.innerHTML = content;
    }
  }, {
    key: "hideCloseButton",
    value: function hideCloseButton() {
      this.closeButton.classList.add("hide");
    }
  }, {
    key: "submit",
    value: function submit(_submit) {
      if (typeof _submit === "function") {
        _submit();
      }
    }
  }]);

  return Modal;
}();

exports["default"] = Modal;

},{}],7:[function(require,module,exports){
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
