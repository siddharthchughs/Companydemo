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
  "completedHtml": "<div class='sv_last_image_section'><image class=\"center_align_img\" src='./01_WhySleep_010.svg'/></div>",
  "pages": [
    {
      "name": "page1",
      "elements": [
        {
          "type": "html",
          "name": "why_sleep1",
          "html":'<div class="why_sleep_img">\n<img alt="sleep_1 image" class=\"center_align_img\" src="./01_WhySleep_001.svg">\n</div>',
        },
        {
          "type": "html",
          "name": "why_sleep2",
          "html": "<img alt=\"Why sleep image 2a\" width=\"100%\" src=\"./01_WhySleep_002a.svg\" />\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./01_WhySleep_002b.svg\" />\n</div>"
        },
        {
          "type": "html",
          "name": "why_sleep3",
          "html": "<img alt=\"Why sleep image 2a\" width=\"100%\" src=\"./01_WhySleep_003a.svg\" />\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./01_WhySleep_003b.svg\" />\n</div>\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./01_WhySleep_003c.svg\" />\n</div>"
        },
        {
          "type": "html",
          "name": "why_sleep4",
          "html": "<img alt=\"Why sleep image 2a\" class=\"center_align_img\" width=\"100%\" src=\"./01_WhySleep_004.svg\" />\n"
        },
        {
          "type": "html",
          "name": "why_sleep5",
          "html": "<img alt=\"Why sleep image 2a\" width=\"100%\" src=\"./01_WhySleep_005a.svg\" />\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./01_WhySleep_005b.svg\" />\n</div>"
        },
        {
          "type": "html",
          "name": "why_sleep6",
          "html": "<img alt=\"Why sleep image 2a\" width=\"100%\" src=\"./01_WhySleep_006a.svg\" />\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./01_WhySleep_006b.svg\" />\n</div>\n  <div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./01_WhySleep_006c.svg\" />\n</div>"
        },
        {
          "type": "html",
          "name": "why_sleep7",
          "html": "<img alt=\"Why sleep image 2a\" width=\"100%\" src=\"./01_WhySleep_007a.svg\" />\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./01_WhySleep_007b.svg\" />\n</div>\n "
        },
        {
          "type": "html",
          "name": "why_sleep8",
          "html": "<img alt=\"Why sleep image 2a\" width=\"100%\" src=\"./01_WhySleep_008a.svg\" />\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./01_WhySleep_008b.svg\" />\n</div>\n "
        },
        {
          "type": "html",
          "name": "why_sleep9",
          "html": "<img alt=\"Why sleep image 2a\" width=\"100%\" src=\"./01_WhySleep_009a.svg\" />\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./01_WhySleep_009b.svg\" />\n</div>\n "
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
  $(".panel-body").addClass("module1_complete_height")
});

$("#surveyPrev").on("click", function () {
  $("#surveyNext").show();
  $("#surveyComplete").hide();
});

$(document).ready(function(){
  $("#surveyNext").show();
  $(".sv_complete_home, #surveyComplete").hide();
})

