/* JavaScript specific for surveys */

Survey.StylesManager.applyTheme("bootstrap");

function doOnCurrentPageChanged(survey) {
  document.getElementById("surveyProgress").innerText =
    " " +
    (survey.currentPageNo + 1) +
    " of " +
    survey.visiblePageCount +
    " " +
    "answered";
  if (document.getElementById("surveyPageNo"))
    document.getElementById("surveyPageNo").value = survey.currentPageNo;
}

function surveySuccesCallback(survey) {
  $(document).ready(function () {
    if (survey.firstPageIsStarted || survey.isLastPage) {
      // If the first page is a starter page, or is the last page, then hide the progress navigation
      hideNavigation();
    }
    else{
      showNavigation();
    }
  });
  
  doOnCurrentPageChanged(survey);

  survey.onAfterRenderPage.add(function (survey, options) {
    showNavigation();
    navigationUiApply(survey);
  });

  survey.onCurrentPageChanged.add(function (sender) { 
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
  });
  
  survey.onComplete.add(function () {
    hideNavigation();
  });

  Survey.surveyLocalization.locales[
    Survey.surveyLocalization.defaultLocale
  ].requiredError = "Please enter a response.";
}

// Added Custom Property in json "questionNavigationUiType"

function setCustomProperties(survey, json) {
  if (json.questionNavigationUiType) {
    survey.setPropertyValue("questionNavigationUiType", json.questionNavigationUiType);
  }
}

// navigationUi changes using custom property

function navigationUiApply(survey){ 
  if(survey.getPropertyValue("questionNavigationUiType")){
    $("#surveyProgress").hide();
    $(".pagination").addClass("panas_panel_footer");
  }
}

function showNavigation(){
  $("#surveyProgress, .pagination, #surveyContainer_addons").show();
}

function hideNavigation() {
  $("#surveyProgress, .pagination").hide();
}

function surveyPrev () {
  survey.prevPage();
}

function surveyNext () {
  if (survey.isLastPage) {
    survey.completeLastPage();
  }else{
    survey.nextPage();
  }
}

function surveyComplete(){
  survey.completeLastPage();
}