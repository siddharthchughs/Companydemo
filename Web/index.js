var loadForm;
var surveyContainer;
var surveyContainer_addons;

window.addEventListener('DOMContentLoaded', () => {
    // Target the SurveyJS Asset directory for access to images
    document.querySelector('base').href += '../Assets/SurveyJS/';

    let readBtn = document.getElementById("submitBtn");
    readBtn.onclick = loadSelectedFile
    loadForm = document.getElementById("loadForm");
    surveyContainer = document.getElementById("surveyContainer");

    Survey
        .StylesManager
        .applyTheme("bootstrap");
    if (localStorage.getItem('active_survey')) {
        let json = localStorage.getItem('active_survey');
        populateSurvey(json);
        toggleVisibility();
    }
});

/**
 * Toggel visibility of the form and survey. The form will be visible when the survey is not, and visa versa.
 */
function toggleVisibility() {
    if (loadForm.style.display == "none") {
        loadForm.style.display = "block";
        surveyContainer.style.display = "none";
        surveyContainer_addons.style.display = "none";
    }
    else {
        loadForm.style.display = "none";
        surveyContainer.style.display = "block";
        surveyContainer_addons.style.display = "block";
    }
}

/**
 * Populate the survey container with the json object.
 */
function populateSurvey(json) {
    let survey = new Survey.Model(json);
    if (!json.includes("completedHtml")) {
        // Auto dismiss the survey if there is no completion screen
        survey.onComplete.add(() => { dismissSurvey() });
    }
    $("#surveyContainer").Survey({ model: survey, onCurrentPageChanged: doOnCurrentPageChanged });
    surveySuccesCallback(survey);
    window.survey = survey
}

/**
 * Load the selected JSON file and populate the survey.
 */
function loadSelectedFile() {
    let file = document.querySelector("#file-input").files[0];
    let reader = new FileReader();
    reader.addEventListener('load', function (e) {
        var json = e.target.result;
        localStorage.setItem('active_survey', json);
        populateSurvey(json);
        toggleVisibility();
    });
    reader.readAsText(file);
}

function dismissSurvey() {
    localStorage.clear();
    toggleVisibility();
}
