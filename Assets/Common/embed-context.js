/*
 * Embed Context
 * -------------
 * Figure out what platform the container is running in and then
 * communicate with is using the appropriate method.
 */
document.addEventListener("DOMContentLoaded", function () {
  window.EmbedContext = (function () {
    var platform = "web";
    if (window.webkit && window.webkit.messageHandlers) {
      platform = "ios";
    }
    if (window.AndroidBridge) {
      platform = "android";
    }

    // Forward message to app
    function iosSendMessage(key, message) {
      if (webkit.messageHandlers[key]) {
        webkit.messageHandlers[key].postMessage(JSON.stringify(message));
      } else {
        console.error(
          "Can't find context message handler for " + key + " message:"
        );
        console.error(message);
      }
    }

    function androidSendMessage(key, message) {
      AndroidBridge.onSendMessage(
        JSON.stringify({ key: key, message: message })
      );
    }

    function sendMessage(key, message) {
      window.parent.postMessage({ key: key, message: message });
    }

    function getMessage(key, callback, error) {
      // when we have the data for the message, call the callback
      // todo: return data from message queue or wait for it to arrive
      callback("get message callback");

      // todo: call error function if error
    }

    // For saving user settings, e.g. male or female voice
    // - could do this with messages but cleaner with own interface
    var values = {
      voiceGender: Math.random < 0.5 ? "male" : "female",
    };

    function setValue(key, value) {
      values[key] = value;
    }

    function getValue(key, callback) {
      callback(values[key]);
    }

    function getValue(key) {
      return values[key];
    }

    // Return an Embed Context for particular platform
    // (Not using ES6 object shorthand for platform support)
    if (platform === "ios") {
      return {
        sendMessage: iosSendMessage,
        getMessage: getMessage,
        setValue: setValue,
        getValue: getValue,
      };
    }
    if (platform === "android") {
      // Load survey json from Android if loadSurvey function exists

      window.addEventListener("load", function () {
        if (typeof loadSurvey === "function") {
          loadSurvey(window.AndroidBridge.getSurveyJson());
        }
      });
      return {
        sendMessage: androidSendMessage,
        getMessage: getMessage,
        setValue: setValue,
        getValue: getValue,
      };
    }
    return {
      sendMessage: sendMessage,
      getMessage: getMessage,
      setValue: setValue,
      getValue: getValue,
    };
  })();
});
