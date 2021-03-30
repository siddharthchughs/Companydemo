/*
 * Embed Context
 * -------------
 * Implementation of the embed context for the test web context. Using
 * callbacks instead of promises since we can't be sure browser supports
 * it. We could polyfill promises but callback should be okay.
 */
(function () {
  // Add listener for postMessages to the window
  // This is where we will handle instructions sent to the
  // frame.
  window.addEventListener("message", function (event) {
    // todo: put message data in key:queue
    // todo: check if callback waiting on data and call
    console.log({ messageEvent: event });
  });

  // For sending message to the app, e.g.:
  // - Survey completed
  // - Page change
  function sendMessage(key, message) {
    parent.postMessage({ key: key, message: message });
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

  // Not using ES6 object shorthand
  window.EmbedContext = {
    sendMessage: sendMessage,
    getMessage: getMessage,
    setValue: setValue,
    getValue: getValue,
  };
})();
