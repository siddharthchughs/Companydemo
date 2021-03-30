/*
 * Survey Container
 * ----------------
 * JavaScript specific for surveys
 * todo: wrap in IIFE to scope functions
 */

// Configure SurveyJS library
Survey.StylesManager.applyTheme("bootstrap");
Survey.surveyLocalization.locales[
  Survey.surveyLocalization.defaultLocale
].requiredError = "Please enter a response.";

// loadSurvey will be called by the container
function loadSurvey(json) {
  var jsonObj = JSON.parse(json);
  var survey = new Survey.Model(jsonObj);

  // Auto dismiss the survey if there is no completion screen
  if (!json.includes("completedHtml")) {
    survey.onComplete.add(() => {
      dismissSurvey();
    });
  }

  // Create survey interface in element
  $("#surveyElement").Survey({
    model: survey,
    onCurrentPageChanged: onCurrentPageChanged,
    onStarted: surveyStarted,
    onComplete: surveyComplete,
    onTextMarkdown: convertMarkdownToHtml,
  });

  // Wire up next/prev buttons
  $("#surveyNext").click(surveyNext);
  $("#surveyPrev").click(surveyPrev);

  // Initialise progress text before page is changed
  onCurrentPageChanged(survey);
  // Set any custom properties defined in the JSON object
  setCustomProperties(survey, jsonObj);

  // Add survey to the global context for access
  window.survey = survey;
}

function surveyStarted(survey) {
  EmbedContext.sendMessage("surveyStarted", {});
  // Page doesn't change when survey started
  showNavigation();
  navigationUiApply(survey);
}

function surveyComplete(survey) {
  EmbedContext.sendMessage("surveyCompleted", survey.data);

  // Hide navigation buttons when survey over and possibly
  // showing completion screen.
  hideNavigation();
}

function onCurrentPageChanged(survey) {
  document.getElementById("surveyProgress").innerText =
    " " +
    (survey.currentPageNo + 1) +
    " of " +
    survey.visiblePageCount +
    " " +
    "answered";

  if (document.getElementById("surveyPageNo"))
    document.getElementById("surveyPageNo").value = survey.currentPageNo;

  // Do this thing...?
  $(":input").each(function () {
    if ($(this).is("input[type=radio]")) {
      $(".sv_next_btn").hide();
    } else if ($(this).is("input[type=checkbox]")) {
      $(".btn.sv_next_btn").show();
    } else if ($(this).is("input[type=text]")) {
      $(".btn.sv_next_btn").show();
    } else if ($(this).is("textarea[type=text]")) {
      $(".btn.sv_next_btn").show();
    } else if (survey.isLastPage) {
      $(".btn.sv_next_btn, .btn.sv_complete_btn").hide();
    }
  });

  // Send message to context that page has changed
  EmbedContext.sendMessage("pageChanged", { page: survey.currentPageNo });
}

function hideNavigation() {
  $(".pagination").hide();
}

function showNavigation() {
  $(".pagination").show();
}

function surveyPrev() {
  // Don't need to message embed context as this is done
  // in onCurrentPageChanged
  survey.prevPage();
}

function surveyNext() {
  // Don't need to message embed context as this is done
  // in onCurrentPageChanged
  if (survey.isLastPage) {
    survey.completeLastPage();
  } else {
    survey.nextPage();
  }
}

// Clean up and remove SurveyJS survey
function dismissSurvey() {
  EmbedContext.sendMessage("surveyDismiss", {});
  delete window.survey;
  $("#surveyElement").html("");
}

/**
 * Add additional properties to the Survey object.
 * 
 * @param survey - Survey object
 * @param jsonObj - Survey JSON object
 */
function setCustomProperties(survey, jsonObj) {
  if (typeof jsonObj === 'string') {
    jsonObj = JSON.parse(jsonObj);
  }
  if (jsonObj.questionNavigationUiType) {
    survey.setPropertyValue("questionNavigationUiType", jsonObj.questionNavigationUiType);
  }
}

/**
 * Apply navigation property changes to the survey layout.
 * 
 * @param survey - Survey object
 */
function navigationUiApply(survey) {
  if(survey.getPropertyValue("questionNavigationUiType") == "NO_PROGRESS_BAR"){
    $("#surveyProgress").hide();
    $(".pagination").addClass("no_progress_bar");
    $(".panel-footer").addClass("no_progress_footer_position");
  }
}

/**
 * The following converter allows for Markdown to be used within titles and descriptions of questions.
 * https://surveyjs.io/Examples/Library?id=survey-markdown-radiogroup&platform=jQuery&theme=default#content-js
 */
function convertMarkdownToHtml(survey) {
  var converter = new showdown.Converter();
  survey.onTextMarkdown.add(function (survey, options) {
    // Convert markdown text to html
    var str = converter.makeHtml(options.text);
    // Strip leading and trailing <p></p> tags from the string
    str = str.substring(3);
    str = str.substring(0, str.length - 4);
    options.html = str;
  });
}
