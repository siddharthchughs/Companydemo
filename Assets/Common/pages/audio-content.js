/*
 * Audio Page
 * ----------
 * Standard audio page with audio player embedded and
 * completion alert.
 */

document.addEventListener('DOMContentLoaded', function () {

    var el = document.querySelector('.vu-audio-player');
    // wire up audio player
    AudioPlayer.create(el);

});
