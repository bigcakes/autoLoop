
// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var player,
  startTime,
  endTime,
  videoId,
  loopingTimeout;

function onYouTubeIframeAPIReady() {
  $("#loadVideo").click(function () {
    startTime = +$(".start-time").val();
    endTime = +$(".end-time").val();

    if (startTime > endTime) {
      alert("No!!");
      return;
    }

    var videoId = $(".video-link").val().split('v=')[1];
    var ampersandPosition = videoId.indexOf('&');
    if(ampersandPosition != -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }

    if (player) {
      player.destroy();
    }

    if (loopingTimeout) {
      clearTimeout(loopingTimeout);
    }
    
    player = new YT.Player('videoPlayer', {
      videoId: videoId,
      events: {
        'onReady': onPlayerReady
      }
    });
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
  player.seekTo(startTime);
  loopingTimeout = setTimeout(loop, 1000);
}

function loop() {
  var timePassed = player.getCurrentTime();

  console.log("looping", new Date(), "time", timePassed)

  if (timePassed > endTime) {

    player.seekTo(startTime);
  }

  loopingTimeout = setTimeout(loop, 1000);
}