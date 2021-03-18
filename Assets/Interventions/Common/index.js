/* JavaScript specific for interventions */
Survey.StylesManager.applyTheme("bootstrap");

function doOnCurrentPageChanged(survey) {
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

function interventionSuccessCallBack(survey) {
  survey.onAfterRenderPage.add(function (survey, options) {
    $("#surveyProgress, .pagination").show();
  });
 
  survey.onComplete.add(function () {
    $("#surveyProgress, .pagination").hide();
  });
}

function surveyPrev () {
  survey.prevPage();
}

function surveyNext () {
  if (survey.isLastPage) {
    survey.completeLastPage()
  }else{
    survey.nextPage();
  }
}

function surveyComplete(){
  survey.completeLastPage()
}
