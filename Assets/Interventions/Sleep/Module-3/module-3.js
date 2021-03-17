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
  "completedHtml": "<div class='sv_last_image_section'><image class=\"center_align_img\" src='./03_SleepEnvironment_313.svg'/></div>",
  "pages": [
    {
      "name": "page1",
      "elements": [
        {
          "type": "html",
          "name": "SleepEnvironment1",
          "html":'<div class="why_sleep_img">\n<img alt="sleep_1 image" class=\"center_align_img\" src="./03_SleepEnvironment_302.svg">\n</div>',
        },
        {
          "type": "html",
          "name": "SleepEnvironment2",
          "html": "<div class=\"caption\">\n<span>A comfortable setting</span>\n</div>\n<img alt=\"Why sleep image 2a\" width=\"100%\" src=\"./03_SleepEnvironment_303a.svg\" />\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./03_SleepEnvironment_303b.svg\" />\n</div>"
        },
        {
          "type": "html",
          "name": "SleepEnvironment3",
          "html": "<div class=\"caption\">\n<span>A comfortable setting</span>\n</div>\n<img alt=\"Why sleep image 2a\" width=\"100%\" src=\"./03_SleepEnvironment_304a.svg\" />\n</div>\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./03_SleepEnvironment_304b.svg\" />\n</div>"
        },
        {
          "type": "html",
          "name": "SleepEnvironment4",
          "html": "<div class=\"caption\">\n<span>A comfortable setting</span>\n</div>\n<img alt=\"Why sleep image 2a\" width=\"100%\" src=\"./03_SleepEnvironment_305a.svg\" />\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./03_SleepEnvironment_305b.svg\" />\n</div>"
        },
        {
          "type": "html",
          "name": "SleepEnvironment5",
          "html": "<div class=\"caption\">\n<span>Sleep (and sex) only</span>\n</div>\n<img alt=\"Why sleep image 2a\" width=\"100%\" src=\"./03_SleepEnvironment_306a.svg\" />\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./03_SleepEnvironment_306b.svg\" />\n"
        },
        {
          "type": "html",
          "name": "SleepEnvironment6",
          "html": "<div class=\"caption\">\n<span>Sleep (and sex) only</span>\n</div>\n<img alt=\"Why sleep image 2a\" width=\"100%\" src=\"./03_SleepEnvironment_307a.svg\" />\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./03_SleepEnvironment_307b.svg\" />\n</div>\n"
        },
        {
          "type": "html",
          "name": "SleepEnvironment7",
          "html": "<div class=\"caption\">\n<span>Reducing screen use</span>\n</div>\n<img alt=\"Why sleep image 2a\" width=\"100%\" class=\"center_align_img\" src=\"./03_SleepEnvironment_308.svg\" />\n"
        },
        {
          "type": "html",
          "name": "SleepEnvironment8",
          "html": "<div class=\"caption\">\n<span>Reducing screen use</span>\n</div>\n<img alt=\"Why sleep image 2a\" width=\"100%\" src=\"./03_SleepEnvironment_309a.svg\" />\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./03_SleepEnvironment_309b.svg\" />\n</div>\n"
        },
        {
          "type": "html",
          "name": "SleepEnvironment9",
          "html": "<div class=\"caption\">\n<span>Get up and try again</span>\n</div>\n<img alt=\"Why sleep image 2a\" width=\"100%\" src=\"./03_SleepEnvironment_310a.svg\" />\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./03_SleepEnvironment_310b.svg\" />\n</div>\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./03_SleepEnvironment_310c.svg\" />\n</div>\n"
        },
        {
          "type": "html",
          "name": "SleepEnvironment10",
          "html": "<div class=\"caption\">\n<span>Get up and try again</span>\n</div>\n<img alt=\"Why sleep image 2a\" width=\"100%\" src=\"./03_SleepEnvironment_311a.svg\" />\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./03_SleepEnvironment_311b.svg\" />\n</div>\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./03_SleepEnvironment_311c.svg\" />\n</div>\n"
        },
        {
          "type": "html",
          "name": "SleepEnvironment11",
          "html": "<img alt=\"Why sleep image 2a\" class=\"center_align_img\" width=\"100%\" src=\"./03_SleepEnvironment_312.svg\" />\n"
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
    $("#surveyComplete").show();
    $("#surveyNext").hide();
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

