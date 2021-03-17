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
var json = {
  "completedHtml": "<div class='sv_last_image_section'><image class=\"center_align_img\" src='./02_SleepHabits_210.svg'/></div>",
  "pages": [
    {
      "name": "page1",
      "elements": [
        {
          "type": "html",
          "name": "sleep_habit1",
          "html":'<div class="why_sleep_img">\n<img alt="sleep_1 image" class=\"center_align_img\" src="./02_SleepHabits_202.svg">\n</div>',
        },
        {
          "type": "html",
          "name": "sleep_habit2",
          "html": "<div class=\"caption\">\n<span>Regular bed/wake times</span>\n</div>\n<img alt=\"Why sleep image 2a\" width=\"100%\" src=\"./02_SleepHabits_203a.svg\" />\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./02_SleepHabits_203b.svg\" />\n</div>"
        },
        {
          "type": "html",
          "name": "sleep_habit3",
          "html": "<div class=\"caption\">\n<span>Regular bed/wake times</span>\n</div>\n<img alt=\"Why sleep image 2a\" width=\"100%\" src=\"./02_SleepHabits_204a.svg\" />\n</div>\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./02_SleepHabits_204b.svg\" />\n</div>"
        },
        {
          "type": "html",
          "name": "sleep_habit4",
          "html": "<div class=\"caption\">\n<span>Reducing naps</span>\n</div>\n<img alt=\"Why sleep image 2a\" width=\"100%\" src=\"./02_SleepHabits_205a.svg\" />\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./02_SleepHabits_205b.svg\" />\n</div>"
        },
        {
          "type": "html",
          "name": "sleep_habit5",
          "html": "<div class=\"caption\">\n<span>Create a wind down routine</span>\n</div>\n<img alt=\"Why sleep image 2a\" width=\"100%\" src=\"./02_SleepHabits_206a.svg\" />\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./02_SleepHabits_206b.svg\" />\n</div>\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./02_SleepHabits_206c.svg\" />\n</div>"
        },
        {
          "type": "html",
          "name": "sleep_habit6",
          "html": "<div class=\"caption\">\n<span>Create a wind down routine</span>\n</div>\n<img alt=\"Why sleep image 2a\" width=\"100%\" src=\"./02_SleepHabits_207a.svg\" />\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./02_SleepHabits_207b.svg\" />\n</div>\n"
        },
        {
          "type": "html",
          "name": "sleep_habit7",
          "html": "<div class=\"caption\">\n<span>Create a wind down routine</span>\n</div>\n<img alt=\"Why sleep image 2a\" width=\"100%\" src=\"./02_SleepHabits_208a.svg\" />\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./02_SleepHabits_208b.svg\" />\n</div>\n "
        },
        {
          "type": "html",
          "name": "sleep_habit8",
          "html": "<img alt=\"Why sleep image 2a\" class=\"center_align_img\" width=\"100%\" src=\"./02_SleepHabits_209.svg\" />"
        }
      ],
    },
  ],
  "showPrevButton": false,
  "showProgressBar": "bottom",
  "goNextPageAutomatic": true,
  "questionsOnPageMode": "questionPerPage",
  "goNextPageAutomatic": true,
};

window.survey = new Survey.Model(json);
$("#surveyElement").Survey({
  model: survey,
  onCurrentPageChanged: doOnCurrentPageChanged,
});
doOnCurrentPageChanged(survey);


survey.onAfterRenderPage.add(function (survey, options) {
  $("#surveyProgress, .pagination").show();
});
 survey.onCurrentPageChanged.add(function (sender) {
  if(survey.isLastPage) {
    $("#surveyNext").hide();
    $("#surveyComplete").show();
  }
}); 

survey.onComplete.add(function () {
  $("#surveyProgress, .pagination").hide();
  $(".sv_complete_home").show();
  $(".panel-body").addClass("module2_complete_height")
});

$("#surveyPrev").on("click", function () {
  $("#surveyNext").show();
  $("#surveyComplete").hide();
});

$(document).ready(function(){
  $("#surveyNext").show();
  $(".sv_complete_home, #surveyComplete").hide();
})

