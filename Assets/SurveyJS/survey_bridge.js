Survey.StylesManager.applyTheme("bootstrap");
window.onload = () => {
    /**
     * The survey injection on Android is performed on load.
     */
    if ('AndroidBridge' in window) {
        injectSurvey(JSON.parse(AndroidBridge.getSurveyJson()));
    }
}

/**
 * Add the survey model to the Survey.
 */
function injectSurvey(surveyJson) {
    var survey = new Survey.Model(surveyJson);
    window.survey = survey;
    $("#surveyContainer").Survey({
        model: survey,
        onCurrentPageChanged: doOnCurrentPageChanged,
        onComplete: function (e) {
            submitSurvey(JSON.stringify(e.data));
        }
    });
    surveySuccesCallback(survey);
    setCustomProperties(survey, surveyJson)
}

/**
 * This function is used by the SurveyViewController to provide the JSON to the survey in iOS.
 */
function loadSurveyJson(e) {
    injectSurvey(JSON.parse(e));
}

/**
 * Submit data on survey completion.
 */
function submitSurvey(e) {
    if ('AndroidBridge' in window) {
        AndroidBridge.onSurveyComplete(e)
    }
    else {
        webkit.messageHandlers.submitSurvey.postMessage(e);
    }
}

/**
 * Dismiss or close a survey without data submission.
 */
function dismissSurvey() {
    if ('AndroidBridge' in window) {
        AndroidBridge.onDismissClicked()
    }
    else {
        webkit.messageHandlers.finishSurvey.postMessage({})
    }
}

/**
 * Make functions globally available in HTML files.
 */
window.loadSurveyJson = loadSurveyJson;
window.dismissSurvey = dismissSurvey;
