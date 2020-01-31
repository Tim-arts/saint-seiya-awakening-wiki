(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"./../../shared/helpers":5}],2:[function(require,module,exports){
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

var _ModalResponse = _interopRequireDefault(require("./../../shared/modules/ModalResponse"));

var _helpers = require("./../../shared/helpers");

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

require("./base");

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("update-cosmo"),
      inputFile = document.getElementById("custom-file"),
      defaultImageSrc = inputFile.nextElementSibling.src,
      multipleSelect = document.querySelectorAll("select[multiple]"),
      inputFileConstructor = new _InputFile["default"](inputFile, {
    img: document.getElementById("avatar"),
    size: 256
  }),
      modalElement = document.getElementById("response-modal"),
      modal = new _ModalResponse["default"](modalElement),
      _data = function () {
    var isUpdate = form.hasAttribute("data-update"),
        data = {};

    if (isUpdate) {
      data._id = function () {
        var url = document.URL,
            array = url.split("/");
        return array[array.length - 1].substring(1);
      }();

      data.messageAction = function () {
        modal.show({
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
        modal.show({
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
  }(),
      hasChanged = false,
      data;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var selectVerificationConstructor = new _SelectVerification["default"]([document.getElementById("cosmos-attributes-1"), document.getElementById("cosmos-types")]);
    data = {
      "_id": _data._id,
      "name": {
        "en": document.getElementById("en-name").value,
        "fr": document.getElementById("fr-name").value
      },
      "slug": document.getElementById("en-name").value.toLowerCase().replace(/["._' ]/g, "-"),
      "slug_underscore": document.getElementById("en-name").value.toLowerCase().replace(/["-.' ]/g, "_"),
      "description": {
        "en": document.getElementById("en-description").value,
        "fr": document.getElementById("fr-description").value
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
          return select.selectedIndex !== 0 ? [].concat(_toConsumableArray(Array.from(select.querySelectorAll("option:checked"), function (e) {
            return e.value;
          })), ["Sunday"]) : null;
        }(),
        "titans": function () {
          var select = document.getElementById("obtainment-system-titans");
          return select.selectedIndex !== 0 ? [].concat(_toConsumableArray(Array.from(select.querySelectorAll("option:checked"), function (e) {
            return e.value;
          })), ["Sunday"]) : null;
        }(),
        "shop": !!document.getElementById("obtainment-system-shop").checked
      },
      "image": function () {
        return inputFileConstructor.options.img.src === defaultImageSrc ? null : inputFileConstructor.options.img.src;
      }(),
      "exclusive_cn": !!document.getElementById("exclusive-cn").checked
    };

    if (!hasChanged) {
      modal.show({
        message: "noChanges",
        hideCloseButton: true
      });
      return;
    }

    if (selectVerificationConstructor.indexOf(false) === -1) {
      $.post(form.getAttribute("action"), {
        data: data
      }, function (response) {
        if (response.error) {
          modal.show({
            message: "errorValidation",
            hideCloseButton: true
          });
          return;
        }

        if (response.success) {
          _data.messageAction();
        }
      });
    } else {
      modal.show({
        message: "selectMissing",
        hideCloseButton: true
      });
    }
  });
  form.addEventListener("input", function () {
    hasChanged = true;
  });
  multipleSelect.forEach(function (select, i) {
    var link = select.previousElementSibling.querySelector("a");
    link.addEventListener("click", function (e) {
      select.selectedIndex = 0;
      e.preventDefault();
    });
  });
});

},{"./../../front/modules/SelectVerification":4,"./../../shared/helpers":5,"./../../shared/modules/ModalResponse":6,"./../modules/InputFile":1,"./base":2}],4:[function(require,module,exports){
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
      deleteConfirmation: "Are you sure you want to delete this item?"
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

},{}]},{},[3]);
