/*
 * Embed Context
 * -------------
 * Implementation of the embed context for the test web context. Using
 * callbacks instead of promises since we can't be sure browser supports
 * it. Could patch but callback should be okay.
 */

(function () {

    // For sending message to the app, e.g. intervention completed
    // var dataCache = {};
    function sendMessage(key, message) {
        console.log({key: key, message: message});
    }
    
    function getMessage(key, callback, error) {
        // when we have the data for the message, call the callback
        // todo: get file data for survey for "getSurvey" message.
        callback("get message callback");
        // call error function if error
    }

    // For saving user settings, e.g. male or female voice
    // - could do this with messages but cleaner with own interface
    var values = {
        voiceGender: (Math.random < 0.5) ? 'male' : 'female'
    };

    function setValue (key, value) {
        values[key] = value;
    }

    function getValue (key, callback) {
        callback(values[key]);
    }

    // Not using ES6 object shorthand
    window.EmbedContext = {
        sendMessage: sendMessage,
        getMessage: getMessage,
        setValue: setValue,
        getValue: getValue
    };
})();