(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
"use strict";

var _ModalResponse = _interopRequireDefault(require("./../../shared/modules/ModalResponse"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

require("./base");

document.addEventListener("DOMContentLoaded", function () {
  var deleteButtons = document.querySelectorAll(".skill-delete a"),
      modalElement = document.getElementById("response-modal"),
      modal = new _ModalResponse["default"](modalElement);
  deleteButtons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      var _this = this;

      modal.show({
        message: "deleteConfirmation",
        backdrop: "static",
        submitContent: "Yes",
        closeContent: "No",
        submit: function submit() {
          var cosmosElementsParent = _this.closest(".skill"),
              href = _this.href,
              data = {
            _id: cosmosElementsParent.getAttribute("data-id"),
            slug: cosmosElementsParent.getAttribute("data-slug")
          };

          $.post(href, {
            data: data
          }, function (response) {
            if (response.success) {
              cosmosElementsParent.remove();
            }
          });
        }
      });
    });
  });
});

},{"./../../shared/modules/ModalResponse":3,"./base":1}],3:[function(require,module,exports){
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

},{}]},{},[2]);
