/* JavaScript specific for interventions */
Survey.StylesManager.applyTheme("bootstrap");
window.survey = new Survey.Model(surveyData);
survey.onComplete.add(surveyComplete);

document.addEventListener("DOMContentLoaded", function () {
  $("#surveyElement").Survey({
    model: survey,
    onCurrentPageChanged: onCurrentPageChanged,
  });

  $("#surveyPrev").click(surveyPrev);
  $("#surveyNext").click(surveyNext);

  onCurrentPageChanged(survey);
});

function onCurrentPageChanged(survey) {
  document.getElementById("surveyProgress").innerText =
    " " +
    (survey.currentPageNo + 1) +
    " of " +
    survey.visiblePageCount +
    " " +
    "complete";
  if (document.getElementById("surveyPageNo"))
    document.getElementById("surveyPageNo").value = survey.currentPageNo;
  
  // Send message to context that page has changed
  EmbedContext.sendMessage("pageChanged", { page: survey.currentPageNo });
}

function surveyComplete(survey) {
  // todo: Check for completion html and send surveyCompletedAndDismiss
  EmbedContext.sendMessage("interventionCompleted", survey.data);

  // Hide navigation buttons when survey over and possibly
  // showing completion screen.
  $("#surveyProgress, .pagination").hide();
}

function surveyPrev() {
  // todo: add call to embed context to send navigation message
  survey.prevPage();
}

function surveyNext() {
  // todo: add call to embed context to send navigation message
  if (survey.isLastPage) {
    survey.completeLastPage();
  } else {
    survey.nextPage();
  }
}

// Clean up and remove SurveyJS survey
function interventionCompleted() {
  EmbedContext.sendMessage("interventionDismiss", {});
  delete window.survey;
  $("#surveyElement").html("");
}