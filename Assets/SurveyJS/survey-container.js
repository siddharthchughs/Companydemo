/*
 * Survey Container
 * ----------------
 *  JavaScript specific for surveys
 */

// Configure SurveyJS library
Survey.StylesManager.applyTheme("bootstrap");
Survey.surveyLocalization.locales[
  Survey.surveyLocalization.defaultLocale
].requiredError = "Please enter a response.";

// loadSurvey will be called by the container
function loadSurvey(json) {
  let survey = new Survey.Model(json);

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
  });

  // Wire up next/prev buttons
  $("#surveyNext").click(surveyNext);
  $("#surveyPrev").click(surveyPrev);

  // Initialise progress text before page is changed
  onCurrentPageChanged(survey);

  // Add survey to the global context for access
  window.survey = survey;
}

function surveyStarted(survey) {
  EmbedContext.sendMessage("Survey started", {});

  // Show navigation buttons when survey started
  showNavigation();
}

function surveyComplete(survey) {
  EmbedContext.sendMessage("Survey completed", survey.data);

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
  EmbedContext.sendMessage("Survey dismissed", {});
  delete window.survey;
  $("#surveyElement").html("");
}
