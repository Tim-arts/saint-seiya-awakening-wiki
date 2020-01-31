(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
    _this.label = this.el.previousSibling.previousSibling.nodeName === 'LABEL';

    if (_this.label) {
      _this.label = this.el.previousSibling.previousSibling;
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
          _this.options.img.classList.add("anim-fade-out-short");

          setTimeout(function () {
            _this.options.img.src = e.target.result;

            _this.options.img.classList.remove("anim-fade-out-short");

            _this.options.img.classList.add("anim-fade-in-short");

            setTimeout(function () {
              _this.options.img.classList.remove("anim-fade-in-short");
            }, 500);
          }, 500);
        };

        reader.readAsDataURL(this.files[0]);
        fileName = e.target.value.split('\\').pop();
      }

      if (_this.label) _this.label.querySelector("span").innerHTML = fileName;
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

},{}],2:[function(require,module,exports){
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var sidebarToggleButton = document.getElementById("sidebar-collapse"),
      sidebar = document.getElementById("sidebar");
  sidebarToggleButton.addEventListener("click", function () {
    var iconElement = this.querySelector("i");

    if (sidebar.classList.contains("active")) {
      iconElement.innerHTML = "close";
    } else {
      iconElement.innerHTML = "menu";
    }

    sidebar.classList.toggle("active");
  });
});

},{}],3:[function(require,module,exports){
"use strict";

var _InputFile = _interopRequireDefault(require("./../modules/InputFile"));

var _SelectVerification = _interopRequireDefault(require("./../../front/modules/SelectVerification"));

var _helpers = require("./../../shared/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

require("./base");

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("add-new-cosmo"),
      input = document.getElementById('custom-file'),
      defaultImageSrc = input.nextElementSibling.src,
      inputFileConstructor = new _InputFile["default"](document.getElementById('custom-file'), {
    img: document.getElementById('avatar'),
    size: 256
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var selectVerificationConstructor = new _SelectVerification["default"]([document.getElementById("cosmos-attributes-1"), document.getElementById("cosmos-attributes-2"), document.getElementById("bonus-attribute"), document.getElementById("cosmos-types"), document.getElementById("loot-day"), document.getElementById("loot-system")]),
        data = {
      "_id": (0, _helpers.generateUuidv4)(),
      "name": {
        "en": document.getElementById("en-name").value,
        "fr": document.getElementById("fr-name").value
      },
      "slug": document.getElementById("en-name").value.toLowerCase().replace(new RegExp(" ", 'g'), "-"),
      "description": {
        "en": document.getElementById("en-description").value,
        "fr": document.getElementById("fr-description").value
      },
      "basic_attributes": {
        "type": [function () {
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
      "bonus_attribute": {
        "type": function () {
          var select = document.getElementById("bonus-attribute");
          return select.options[select.selectedIndex].value;
        }(),
        "value": document.getElementById("bonus-attribute-value").value
      },
      "type": function () {
        var select = document.getElementById("cosmos-types");
        return select.options[select.selectedIndex].value;
      }(),
      "loot_day": function () {
        var select = document.getElementById("loot-day");
        return _toConsumableArray(select.options).filter(function (x) {
          return x.selected;
        }).map(function (x) {
          return x.value;
        });
      }(),
      "loot_system": function () {
        var select = document.getElementById("loot-system");
        return select.options[select.selectedIndex].value;
      }(),
      "image": function () {
        return inputFileConstructor.options.img.src === defaultImageSrc ? null : inputFileConstructor.options.img.src;
      }()
    };

    if (selectVerificationConstructor.indexOf(false) === -1) {
      $.post(form.getAttribute("action"), {
        data: data
      }, function (response) {
        if (response.error) {
          alert("error! \n\n" + response.data);
        }

        if (response.success) {
          alert("success! \n\n" + response.data);
          form.reset();
        }
      });
    } else {
      alert("One or more select have no selected option!");
    }
  });
});

},{"./../../front/modules/SelectVerification":4,"./../../shared/helpers":5,"./../modules/InputFile":1,"./base":2}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SelectVerification =
/**
 * Construct BgSlide instance
 * @constructor
 * @param elements
 * @return {Array}
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
  generateUuidv4: function generateUuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
          v = c == 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  }
};

},{}]},{},[3]);
