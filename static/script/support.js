/*
 * Support.js
 */

var support = support || {};
support.butterBar = support.butterBar || {};

// Butter Bar Functions
(function() {
  // CONSTANTS
  var DEFAULT_TIMEOUT  = 5000;
  var CLICK_EVENT = "click.butterBar";

  // Enumerations
  var BarStyle = {
    "INFO": "infoBar",
    "ERROR": "errorBar"
  };

  // Private Functions
  function getContainer() {
    return $("#butterBarContainer");
  }

  function getContent() {
    return $("#butterBarContent");
  }

  function hideBar() {
    getContainer().hide("blind");
    removeHandlers();
  }

  function addHandlers() {
    $(document).bind(CLICK_EVENT, function() {
      hideBar();
    });
    getContainer().bind(CLICK_EVENT, function(evt) {
      evt.stopPropagation();
    });
  }

  function removeHandlers() {
    clearTimeout(timeoutId);
    $(document).unbind(CLICK_EVENT);
    getContainer().unbind(CLICK_EVENT);
  }

  function setStyle(cssClass) {
    // remove all classes, then add the style
    getContent().removeClass().addClass(cssClass);
  }

  function showBar(renderer, timeout) {
    // clear any currently showing bar
    removeHandlers();

    // Provide a default timeout if none is provided
    if (_.isUndefined(timeout)) {
      timeout = DEFAULT_TIMEOUT;
    }

    // Did they provide a rendering function or a message
    if (_.isFunction(renderer)) {
      getContent().html(renderer());
    } else {
      getContent().text(renderer);
    }

    // Show and set a timeout to hide
    getContainer().show("blind");
    if (timeout != this.DONT_AUTO_HIDE) {
      timeoutId = setTimeout(function() {
        hideBar();
      }, timeout);
    }

    // Add our handlers after execution completes
    setTimeout(function() { addHandlers(); }, 0);
  }

  // Private Variables
  var timeoutId;

  // Exported Functions
  this.DONT_AUTO_HIDE = -1;

  this.showInfo = function(renderer, timeout) {
    setStyle(BarStyle.INFO);
    showBar(renderer, timeout);
  }

  this.showError = function(renderer, timeout) {
    setStyle(BarStyle.ERROR);
    showBar(renderer, timeout);
  }

  this.hide = function() {
    hideBar();
  }
}).call(support.butterBar);
