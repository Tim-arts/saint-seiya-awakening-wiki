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

var _helpers = _interopRequireDefault(require("../../shared/helpers"));

var _ModalResponse = _interopRequireDefault(require("./../../shared/modules/ModalResponse"));

var _autocompleter = _interopRequireDefault(require("autocompleter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require("./base");

document.addEventListener("DOMContentLoaded", function () {
  var deleteButtons = document.querySelectorAll(".cosmo-delete a"),
      modalElement = document.getElementById("response-modal"),
      modal = new _ModalResponse["default"](modalElement),
      cosmosElements = Array.from(document.getElementById("cosmos-container").querySelectorAll(".cosmo")),
      sortCosmos = document.getElementById("sort-cosmos");
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
          var cosmosElementsParent = _this.closest(".cosmo"),
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
  (0, _autocompleter["default"])({
    input: sortCosmos,
    minLength: 3,
    debounceWaitMs: 100,
    className: "cosmos",
    fetch: function fetch(text) {
      text = text.toLowerCase();

      var suggestions = cosmos.filter(function (n) {
        return n.slug.toLowerCase().indexOf(text) > -1;
      }),
          results = function () {
        var results = [];

        for (var i = 0, iCount = suggestions.length; i < iCount; i++) {
          for (var j = 0, jCount = cosmosElements.length; j < jCount; j++) {
            if (cosmosElements[j].getAttribute("data-slug") === suggestions[i].slug) {
              results.push(cosmosElements[j]);
            }
          }
        }

        return results;
      }();

      resetDisplay();

      if (results.length > 0) {
        cosmosElements.forEach(function (element) {
          element.classList.add("hide");
        });
        results.forEach(function (result) {
          result.classList.remove("hide");
        });
      }
    },
    onSelect: null,
    preventSubmit: true
  });
  sortCosmos.addEventListener("keyup", function () {
    if (this.value.length <= 2) {
      resetDisplay();
    }
  });

  function resetDisplay() {
    cosmosElements.forEach(function (cosmoElement) {
      cosmoElement.classList.remove("hide");
    });
  }
});

},{"../../shared/helpers":3,"./../../shared/modules/ModalResponse":4,"./base":1,"autocompleter":5}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

},{}],5:[function(require,module,exports){
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.autocomplete = factory());
}(this, function () { 'use strict';

  /*
   * https://github.com/kraaden/autocomplete
   * Copyright (c) 2016 Denys Krasnoshchok
   * MIT License
   */
  function autocomplete(settings) {
      // just an alias to minimize JS file size
      var doc = document;
      var container = doc.createElement("div");
      var containerStyle = container.style;
      var userAgent = navigator.userAgent;
      var mobileFirefox = userAgent.indexOf("Firefox") !== -1 && userAgent.indexOf("Mobile") !== -1;
      var debounceWaitMs = settings.debounceWaitMs || 0;
      var preventSubmit = settings.preventSubmit || false;
      // 'keyup' event will not be fired on Mobile Firefox, so we have to use 'input' event instead
      var keyUpEventName = mobileFirefox ? "input" : "keyup";
      var items = [];
      var inputValue = "";
      var minLen = 2;
      var showOnFocus = settings.showOnFocus;
      var selected;
      var keypressCounter = 0;
      var debounceTimer;
      if (settings.minLength !== undefined) {
          minLen = settings.minLength;
      }
      if (!settings.input) {
          throw new Error("input undefined");
      }
      var input = settings.input;
      container.className = "autocomplete " + (settings.className || "");
      // IOS implementation for fixed positioning has many bugs, so we will use absolute positioning
      containerStyle.position = "absolute";
      /**
       * Detach the container from DOM
       */
      function detach() {
          var parent = container.parentNode;
          if (parent) {
              parent.removeChild(container);
          }
      }
      /**
       * Clear debouncing timer if assigned
       */
      function clearDebounceTimer() {
          if (debounceTimer) {
              window.clearTimeout(debounceTimer);
          }
      }
      /**
       * Attach the container to DOM
       */
      function attach() {
          if (!container.parentNode) {
              doc.body.appendChild(container);
          }
      }
      /**
       * Check if container for autocomplete is displayed
       */
      function containerDisplayed() {
          return !!container.parentNode;
      }
      /**
       * Clear autocomplete state and hide container
       */
      function clear() {
          keypressCounter++;
          items = [];
          inputValue = "";
          selected = undefined;
          detach();
      }
      /**
       * Update autocomplete position
       */
      function updatePosition() {
          if (!containerDisplayed()) {
              return;
          }
          containerStyle.height = "auto";
          containerStyle.width = input.offsetWidth + "px";
          var maxHeight = 0;
          var inputRect;
          function calc() {
              var docEl = doc.documentElement;
              var clientTop = docEl.clientTop || doc.body.clientTop || 0;
              var clientLeft = docEl.clientLeft || doc.body.clientLeft || 0;
              var scrollTop = window.pageYOffset || docEl.scrollTop;
              var scrollLeft = window.pageXOffset || docEl.scrollLeft;
              inputRect = input.getBoundingClientRect();
              var top = inputRect.top + input.offsetHeight + scrollTop - clientTop;
              var left = inputRect.left + scrollLeft - clientLeft;
              containerStyle.top = top + "px";
              containerStyle.left = left + "px";
              maxHeight = window.innerHeight - (inputRect.top + input.offsetHeight);
              if (maxHeight < 0) {
                  maxHeight = 0;
              }
              containerStyle.top = top + "px";
              containerStyle.bottom = "";
              containerStyle.left = left + "px";
              containerStyle.maxHeight = maxHeight + "px";
          }
          // the calc method must be called twice, otherwise the calculation may be wrong on resize event (chrome browser)
          calc();
          calc();
          if (settings.customize && inputRect) {
              settings.customize(input, inputRect, container, maxHeight);
          }
      }
      /**
       * Redraw the autocomplete div element with suggestions
       */
      function update() {
          // delete all children from autocomplete DOM container
          while (container.firstChild) {
              container.removeChild(container.firstChild);
          }
          // function for rendering autocomplete suggestions
          var render = function (item, currentValue) {
              var itemElement = doc.createElement("div");
              itemElement.textContent = item.label || "";
              return itemElement;
          };
          if (settings.render) {
              render = settings.render;
          }
          // function to render autocomplete groups
          var renderGroup = function (groupName, currentValue) {
              var groupDiv = doc.createElement("div");
              groupDiv.textContent = groupName;
              return groupDiv;
          };
          if (settings.renderGroup) {
              renderGroup = settings.renderGroup;
          }
          var fragment = doc.createDocumentFragment();
          var prevGroup = "#9?$";
          items.forEach(function (item) {
              if (item.group && item.group !== prevGroup) {
                  prevGroup = item.group;
                  var groupDiv = renderGroup(item.group, inputValue);
                  if (groupDiv) {
                      groupDiv.className += " group";
                      fragment.appendChild(groupDiv);
                  }
              }
              var div = render(item, inputValue);
              if (div) {
                  div.addEventListener("click", function (ev) {
                      settings.onSelect(item, input);
                      clear();
                      ev.preventDefault();
                      ev.stopPropagation();
                  });
                  if (item === selected) {
                      div.className += " selected";
                  }
                  fragment.appendChild(div);
              }
          });
          container.appendChild(fragment);
          if (items.length < 1) {
              if (settings.emptyMsg) {
                  var empty = doc.createElement("div");
                  empty.className = "empty";
                  empty.textContent = settings.emptyMsg;
                  container.appendChild(empty);
              }
              else {
                  clear();
                  return;
              }
          }
          attach();
          updatePosition();
          updateScroll();
      }
      function updateIfDisplayed() {
          if (containerDisplayed()) {
              update();
          }
      }
      function resizeEventHandler() {
          updateIfDisplayed();
      }
      function scrollEventHandler(e) {
          if (e.target !== container) {
              updateIfDisplayed();
          }
          else {
              e.preventDefault();
          }
      }
      function keyupEventHandler(ev) {
          var keyCode = ev.which || ev.keyCode || 0;
          var ignore = [38 /* Up */, 13 /* Enter */, 27 /* Esc */, 39 /* Right */, 37 /* Left */, 16 /* Shift */, 17 /* Ctrl */, 18 /* Alt */, 20 /* CapsLock */, 91 /* WindowsKey */, 9 /* Tab */];
          for (var _i = 0, ignore_1 = ignore; _i < ignore_1.length; _i++) {
              var key = ignore_1[_i];
              if (keyCode === key) {
                  return;
              }
          }
          // the down key is used to open autocomplete
          if (keyCode === 40 /* Down */ && containerDisplayed()) {
              return;
          }
          startFetch(0 /* Keyboard */);
      }
      /**
       * Automatically move scroll bar if selected item is not visible
       */
      function updateScroll() {
          var elements = container.getElementsByClassName("selected");
          if (elements.length > 0) {
              var element = elements[0];
              // make group visible
              var previous = element.previousElementSibling;
              if (previous && previous.className.indexOf("group") !== -1 && !previous.previousElementSibling) {
                  element = previous;
              }
              if (element.offsetTop < container.scrollTop) {
                  container.scrollTop = element.offsetTop;
              }
              else {
                  var selectBottom = element.offsetTop + element.offsetHeight;
                  var containerBottom = container.scrollTop + container.offsetHeight;
                  if (selectBottom > containerBottom) {
                      container.scrollTop += selectBottom - containerBottom;
                  }
              }
          }
      }
      /**
       * Select the previous item in suggestions
       */
      function selectPrev() {
          if (items.length < 1) {
              selected = undefined;
          }
          else {
              if (selected === items[0]) {
                  selected = items[items.length - 1];
              }
              else {
                  for (var i = items.length - 1; i > 0; i--) {
                      if (selected === items[i] || i === 1) {
                          selected = items[i - 1];
                          break;
                      }
                  }
              }
          }
      }
      /**
       * Select the next item in suggestions
       */
      function selectNext() {
          if (items.length < 1) {
              selected = undefined;
          }
          if (!selected || selected === items[items.length - 1]) {
              selected = items[0];
              return;
          }
          for (var i = 0; i < (items.length - 1); i++) {
              if (selected === items[i]) {
                  selected = items[i + 1];
                  break;
              }
          }
      }
      function keydownEventHandler(ev) {
          var keyCode = ev.which || ev.keyCode || 0;
          if (keyCode === 38 /* Up */ || keyCode === 40 /* Down */ || keyCode === 27 /* Esc */) {
              var containerIsDisplayed = containerDisplayed();
              if (keyCode === 27 /* Esc */) {
                  clear();
              }
              else {
                  if (!containerDisplayed || items.length < 1) {
                      return;
                  }
                  keyCode === 38 /* Up */
                      ? selectPrev()
                      : selectNext();
                  update();
              }
              ev.preventDefault();
              if (containerIsDisplayed) {
                  ev.stopPropagation();
              }
              return;
          }
          if (keyCode === 13 /* Enter */) {
              if (selected) {
                  settings.onSelect(selected, input);
                  clear();
              }
              if (preventSubmit) {
                  ev.preventDefault();
              }
          }
      }
      function focusEventHandler() {
          if (showOnFocus) {
              startFetch(1 /* Focus */);
          }
      }
      function startFetch(trigger) {
          // if multiple keys were pressed, before we get update from server,
          // this may cause redrawing our autocomplete multiple times after the last key press.
          // to avoid this, the number of times keyboard was pressed will be
          // saved and checked before redraw our autocomplete box.
          var savedKeypressCounter = ++keypressCounter;
          var val = input.value;
          if (val.length >= minLen || trigger === 1 /* Focus */) {
              clearDebounceTimer();
              debounceTimer = window.setTimeout(function () {
                  settings.fetch(val, function (elements) {
                      if (keypressCounter === savedKeypressCounter && elements) {
                          items = elements;
                          inputValue = val;
                          selected = items.length > 0 ? items[0] : undefined;
                          update();
                      }
                  }, 0 /* Keyboard */);
              }, trigger === 0 /* Keyboard */ ? debounceWaitMs : 0);
          }
          else {
              clear();
          }
      }
      function blurEventHandler() {
          // we need to delay clear, because when we click on an item, blur will be called before click and remove items from DOM
          setTimeout(function () {
              if (doc.activeElement !== input) {
                  clear();
              }
          }, 200);
      }
      /**
       * Fixes #26: on long clicks focus will be lost and onSelect method will not be called
       */
      container.addEventListener("mousedown", function (evt) {
          evt.stopPropagation();
          evt.preventDefault();
      });
      /**
       * This function will remove DOM elements and clear event handlers
       */
      function destroy() {
          input.removeEventListener("focus", focusEventHandler);
          input.removeEventListener("keydown", keydownEventHandler);
          input.removeEventListener(keyUpEventName, keyupEventHandler);
          input.removeEventListener("blur", blurEventHandler);
          window.removeEventListener("resize", resizeEventHandler);
          doc.removeEventListener("scroll", scrollEventHandler, true);
          clearDebounceTimer();
          clear();
          // prevent the update call if there are pending AJAX requests
          keypressCounter++;
      }
      // setup event handlers
      input.addEventListener("keydown", keydownEventHandler);
      input.addEventListener(keyUpEventName, keyupEventHandler);
      input.addEventListener("blur", blurEventHandler);
      input.addEventListener("focus", focusEventHandler);
      window.addEventListener("resize", resizeEventHandler);
      doc.addEventListener("scroll", scrollEventHandler, true);
      return {
          destroy: destroy
      };
  }

  return autocomplete;

}));


},{}]},{},[2]);
