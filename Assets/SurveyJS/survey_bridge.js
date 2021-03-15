Survey.StylesManager.applyTheme();
window.onload = () => {
    /**
     * The survey injection on Android is performed on load.
     */
    if ('AndroidBridge' in window) {
        $("#surveyContainer").Survey({
            model: new Survey.Model(JSON.parse(AndroidBridge.getSurveyJson())),
            onComplete: function (result) {
                AndroidBridge.onSurveyComplete(JSON.stringify(result.data))
            }
        });
    }
}

/**
 * This function is used by the SurveyViewController to provide the JSON to the survey in iOS.
 */
function loadSurveyJson(e) {
    $("#surveyContainer").Survey({
        model: new Survey.Model(JSON.parse(e)),
        onComplete: function (e) {
            webkit.messageHandlers.submitSurvey.postMessage(JSON.stringify(e.data));
        }
    })
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
 * Indicate intervention has been completed.
 */
function interventionCompleted() {
    if ('AndroidBridge' in window) {
        AndroidBridge.onInterventionComplete();
    }
    else {
        webkit.messageHandlers.onInterventionComplete.postMessage({})
    }
}

window.loadSurveyJson = loadSurveyJson
window.dismissSurvey = dismissSurvey
window.interventionCompleted = interventionCompleted;
