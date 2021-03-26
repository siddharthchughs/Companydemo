/*
 * Audio Page
 * ----------
 * Standard audio page with audio player embedded and
 * completion alert.
 */

document.addEventListener('DOMContentLoaded', function () {

    var el = document.querySelector('.audio-player');
    // wire up audio player
    AudioPlayer.create(el);

    // show alert when audio player completes
    el.addEventListener('ended', function (e) { 
        alert('finished!');
    });

});
