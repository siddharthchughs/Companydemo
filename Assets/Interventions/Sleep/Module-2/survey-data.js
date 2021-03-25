var surveyData = {
  completedHtml:
    '<div class=\'sv_last_image_section\'><image class="center_align_img" src=\'./02_SleepHabits_210.svg\'/></div>\n<div class="sv_complete_home">\n<div class="sv_complete_description">\n<p>Nice one - you\'ve done half the modules!<p> \n<p>Check back soon for Module 3.</p>\n </div>\n<input type="button" onclick="interventionCompleted()" value="HOME" class="btn sv_home_btn" />\n</div>',
  pages: [
    {
      name: "page1",
      elements: [
        {
          type: "html",
          name: "sleep_habit1",
          html:
            '<div class="why_sleep_img">\n<img class="center_align_img" src="./02_SleepHabits_202.svg">\n</div>',
        },
        {
          type: "html",
          name: "sleep_habit2",
          html:
            '<div class="caption">\n<span>Regular bed/wake times</span>\n</div>\n<img width="100%" src="./02_SleepHabits_203a.svg" />\n<div class="mgn-top">\n<img width="100%" src="./02_SleepHabits_203b.svg" />\n</div>',
        },
        {
          type: "html",
          name: "sleep_habit3",
          html:
            '<div class="caption">\n<span>Regular bed/wake times</span>\n</div>\n<img width="100%" src="./02_SleepHabits_204a.svg" />\n</div>\n<div class="mgn-top">\n<img width="100%" src="./02_SleepHabits_204b.svg" />\n</div>',
        },
        {
          type: "html",
          name: "sleep_habit4",
          html:
            '<div class="caption">\n<span>Reducing naps</span>\n</div>\n<img width="100%" src="./02_SleepHabits_205a.svg" />\n<div class="mgn-top">\n<img width="100%" src="./02_SleepHabits_205b.svg" />\n</div>',
        },
        {
          type: "html",
          name: "sleep_habit5",
          html:
            '<div class="caption">\n<span>Create a wind down routine</span>\n</div>\n<img width="100%" src="./02_SleepHabits_206a.svg" />\n<div class="mgn-top">\n<img width="100%" src="./02_SleepHabits_206b.svg" />\n</div>\n<div class="mgn-top">\n<img width="100%" src="./02_SleepHabits_206c.svg" />\n</div>',
        },
        {
          type: "html",
          name: "sleep_habit6",
          html:
            '<div class="caption">\n<span>Create a wind down routine</span>\n</div>\n<img width="100%" src="./02_SleepHabits_207a.svg" />\n<div class="mgn-top">\n<img width="100%" src="./02_SleepHabits_207b.svg" />\n</div>\n',
        },
        {
          type: "html",
          name: "sleep_habit7",
          html:
            '<div class="caption">\n<span>Create a wind down routine</span>\n</div>\n<img width="100%" src="./02_SleepHabits_208a.svg" />\n<div class="mgn-top">\n<img width="100%" src="./02_SleepHabits_208b.svg" />\n</div>\n ',
        },
        {
          type: "html",
          name: "sleep_habit8",
          html:
            '<img class="center_align_img" width="100%" src="./02_SleepHabits_209.svg" />',
        },
      ],
    },
  ],
  showPrevButton: false,
  showProgressBar: "bottom",
  goNextPageAutomatic: true,
  questionsOnPageMode: "questionPerPage",
  goNextPageAutomatic: true,
};
