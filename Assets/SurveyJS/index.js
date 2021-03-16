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

function surveySuccesCallBack(survey){
  doOnCurrentPageChanged(survey);

  $(document).ready(function () {
    if (survey.firstPageIsStarted) {
      $(
        "#surveyProgress, .pagination, .arrow_close_section, .sv_complete_home"
      ).hide();
    }
  });


  survey.onAfterRenderPage.add(function (survey, options) {
    $("#surveyProgress, .pagination, .arrow_close_section").show();
    $(".sv-logo--left, .sv_complete_home").hide();
  });

  survey.onCurrentPageChanged.add(function (sender) {
    $(".sv_row").attr({
      "data-aos": "slide-down",
      "data-aos-duration": "1000",
      "data-aos-easing": "linear",
    });
    $(".panel-body > div:first-child").addClass("slideUp_row");
    $(":input").each(function () {
      if ($(this).is("input[type=radio]")) {
        $(".sv_next_btn").hide();
      } else if ($(this).is("input[type=checkbox]")) {
        $(".btn.sv_next_btn").show();
      } else if ($(this).is("input[type=text]")) {
        $("..btn.sv_next_btn").show();
      } else if ($(this).is("textarea[type=text]")) {
        $(".btn.sv_next_btn").show();
      } else if (survey.isLastPage) {
        $(".btn.sv_next_btn, .btn.sv_complete_btn").hide();
      }
    });
  });
  survey.onComplete.add(function () {
    $("#surveyProgress, .pagination, .arrow_close_section").hide();
    $(".panel-body.card-block.mt-4").addClass("sv_complete");
    $(".sv_container").addClass("sv_circle_img");
    $(".sv_complete_home").show();
  });
  Survey.surveyLocalization.locales[
    Survey.surveyLocalization.defaultLocale
  ].requiredError = "Please enter a response.";
}

$.ajax({
  type: "GET",
  url: "./Files/mood-survey.json",
  crossDomain: true,
  success: function (data) {
     window.survey = new Survey.Model(data);
    surveySuccesCallBack(survey);
  },
});
