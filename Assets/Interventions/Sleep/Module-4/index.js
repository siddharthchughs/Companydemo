var json = {
  "completedHtml": "<div class='sv_last_image_section'><image class=\"center_align_img\" src='./04_DailyActivites_413.svg'/></div>\n<div class=\"sv_complete_home\">\n <div class=\"sv_complete_description\">\n  <p>That’s a wrap! Great job finishing Module 4.<p> \n<p>We hope the stategies help - keep logging your sleep and we’ll track your progress.</p>\n </div>\n <input type=\"button\" onclick=\"interventionCompleted()\" value=\"HOME\" class=\"btn sv_home_btn\" />\n </div>",
  "pages": [
    {
      "name": "page1",
      "elements": [
        {
          "type": "html",
          "name": "SleepEnvironment1",
          "html":'<div class="why_sleep_img">\n<img alt="sleep_1 image" class=\"center_align_img\" src="./04_DailyActivites_402.svg">\n</div>',
        },
        {
          "type": "html",
          "name": "SleepEnvironment2",
          "html": "<div class=\"caption\">\n<span>Reducing stimulants</span>\n</div>\n<img alt=\"Why sleep image 2a\" width=\"100%\" src=\"./04_DailyActivites_403a.svg\" />\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./04_DailyActivites_403b.svg\" />\n</div>"
        },
        {
          "type": "html",
          "name": "SleepEnvironment3",
          "html": "<div class=\"caption\">\n<span>Reducing stimulants</span>\n</div>\n<img alt=\"Why sleep image 2a\" width=\"100%\" src=\"./04_DailyActivites_404a.svg\" />\n</div>\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./04_DailyActivites_404b.svg\" />\n</div>\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./04_DailyActivites_404c.svg\" />\n</div>"
        },
        {
          "type": "html",
          "name": "SleepEnvironment4",
          "html": "<div class=\"caption\">\n<span>Reducing stimulants</span>\n</div>\n<img alt=\"Why sleep image 2a\" width=\"100%\" src=\"./04_DailyActivites_405a.svg\" />\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./04_DailyActivites_405b.svg\" />\n</div>\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./04_DailyActivites_405c.svg\" />\n</div>"
        },
        {
          "type": "html",
          "name": "SleepEnvironment5",
          "html": "<div class=\"caption\">\n<span>Reducing stimulants</span>\n</div>\n<img alt=\"Why sleep image 2a\" width=\"100%\" src=\"./04_DailyActivites_406a.svg\" />\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./04_DailyActivites_406b.svg\" />\n"
        },
        {
          "type": "html",
          "name": "SleepEnvironment6",
          "html": "<div class=\"caption\">\n<span>Diet</span>\n</div>\n<img alt=\"Why sleep image 2a\" width=\"100%\" src=\"./04_DailyActivites_407a.svg\" />\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./04_DailyActivites_407b.svg\" />\n</div>\n"
        },
        {
          "type": "html",
          "name": "SleepEnvironment7",
          "html": "<div class=\"caption\">\n<span>Diet</span>\n</div>\n<img alt=\"Why sleep image 2a\" width=\"100%\" src=\"./04_DailyActivites_408a.svg\" />\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./04_DailyActivites_408b.svg\" />\n</div>\n"
        },
        {
          "type": "html",
          "name": "SleepEnvironment8",
          "html": "<div class=\"caption\">\n<span>Exercise</span>\n</div>\n<img alt=\"Why sleep image 2a\" width=\"100%\" src=\"./04_DailyActivites_409a.svg\" />\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./04_DailyActivites_409b.svg\" />\n</div>\n"
        },
        {
          "type": "html",
          "name": "SleepEnvironment9",
          "html": "<div class=\"caption\">\n<span>Exercise</span>\n</div>\n<img alt=\"Why sleep image 2a\" width=\"100%\" src=\"./04_DailyActivites_410a.svg\" />\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./04_DailyActivites_410b.svg\" />\n</div>\n"
        },
        {
          "type": "html",
          "name": "SleepEnvironment10",
          "html": "<div class=\"caption\">\n<span>Exercise</span>\n</div>\n<img alt=\"Why sleep image 2a\" width=\"100%\" src=\"./04_DailyActivites_411a.svg\" />\n<div class=\"mgn-top\">\n<img alt=\"Why sleep image 2b\" width=\"100%\" src=\"./04_DailyActivites_411b.svg\" />\n</div>\n"
        },
        {
          "type": "html",
          "name": "SleepEnvironment11",
          "html": "<img alt=\"Why sleep image 2a\" class=\"center_align_img\" width=\"100%\" src=\"./04_DailyActivites_412.svg\" />\n"
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
interventionSuccessCallBack(survey);
