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
}

function surveyComplete(survey) {
  // todo: add call to embed context to send survey completion message
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
