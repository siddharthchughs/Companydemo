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
  
  // Add survey to the global context for access
  window.survey = survey;

  // Create survey interface in element
  $("#surveyElement").Survey({
    model: survey,
    onCurrentPageChanged: onCurrentPageChanged,
    onAfterRenderPage: surveyRender,
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

  if (survey.firstPageIsStarted || survey.isLastPage) {
    // If the first page is a starter page, or is the last page, then hide the progress navigation
    hideNavigation();
  }
  else{
    showNavigation();
  }
}

function surveyRender(survey) {
  showNavigation();
  navigationUiApply(survey);
};

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

$(document).ready(function(){
  hideNavigation();
});

function hideNavigation() {
  $(".pagination").css("visibility", "hidden");
}

function showNavigation() {
  $(".pagination").css("visibility", "visible");
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
 * 
 */
function navigationUiApply(survey) {
  var customUI = survey.getPropertyValue("questionNavigationUiType");

  if(customUI == "NO_PROGRESS_BAR") {
    $("#surveyProgress").hide();
    $(".pagination").addClass("no_progress_bar");
  }
  else if(customUI == "WELL_BEING") {
    $(".form-control").addClass("well_being_form_control");
  }
  else if(customUI == "CEQ") {
    $(".btn-group > .btn").addClass("ceq_survey_label");
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

// The following method is for the Survey Navigation Footer Handler when the keyboard appears

var originalHeight = document.documentElement.clientHeight;
var originalWidth = document.documentElement.clientWidth;
$(window).resize(function () {
  // Control landscape/portrait mode switch
  if (document.documentElement.clientHeight == originalWidth &&
    document.documentElement.clientWidth == originalHeight) {
    originalHeight = document.documentElement.clientHeight;
    originalWidth = document.documentElement.clientWidth;
  }
  // Check if the available height is smaller (keyboard is shown) so we hide the footer.
  if (document.documentElement.clientHeight < originalHeight) {
    $('.panel-footer, .pagination, .progress').hide();
  } else {
    $('.panel-footer, .pagination, .progress').show();
  }
});
