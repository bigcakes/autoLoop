
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
      height: '390',
      width: '640',
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

function stopVideo() {
  player.stopVideo();
}

$(function () {
  $("#loadVideo").click(function () {

    //-------------------

    // // 2. This code loads the IFrame Player API code asynchronously.
    // var tag = document.createElement('script');

    // tag.src = "https://www.youtube.com/iframe_api";
    // var firstScriptTag = document.getElementsByTagName('script')[0];
    // firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // // 3. This function creates an <iframe> (and YouTube player)
    // //    after the API code downloads.
    // var player;
    // function onYouTubeIframeAPIReady() {
    //   player = new YT.Player('videoPlayer', {
    //     height: '390',
    //     width: '640',
    //     videoId: 'M7lc1UVf-VE',
    //     events: {
    //       'onReady': onPlayerReady,
    //       'onStateChange': onPlayerStateChange
    //     }
    //   });
    // }

    // // 4. The API will call this function when the video player is ready.
    // function onPlayerReady(event) {
    //   event.target.playVideo();
    // }

    // // 5. The API calls this function when the player's state changes.
    // //    The function indicates that when playing a video (state=1),
    // //    the player should play for six seconds and then stop.
    // var done = false;
    // function onPlayerStateChange(event) {
    //   if (event.data == YT.PlayerState.PLAYING && !done) {
    //     setTimeout(stopVideo, 6000);
    //     done = true;
    //   }
    // }
    // function stopVideo() {
    //   player.stopVideo();
    // }

    //---------------------


    // var tag = document.createElement('script');
    // tag.id = 'iframe-demo';
    // tag.src = 'https://www.youtube.com/iframe_api';
    // var firstScriptTag = document.getElementsByTagName('script')[0];
    // firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // var player;
    // function onYouTubeIframeAPIReady() {
    //   player = new YT.Player('existing-iframe-example', {
    //       events: {
    //         'onReady': onPlayerReady,
    //         'onStateChange': onPlayerStateChange
    //       }
    //   });
    // }
    // function onPlayerReady(event) {
    //   document.getElementById('existing-iframe-example').style.borderColor = '#FF6D00';
    // }
    // function changeBorderColor(playerStatus) {
    //   var color;
    //   if (playerStatus == -1) {
    //     color = "#37474F"; // unstarted = gray
    //   } else if (playerStatus == 0) {
    //     color = "#FFFF00"; // ended = yellow
    //   } else if (playerStatus == 1) {
    //     color = "#33691E"; // playing = green
    //   } else if (playerStatus == 2) {
    //     color = "#DD2C00"; // paused = red
    //   } else if (playerStatus == 3) {
    //     color = "#AA00FF"; // buffering = purple
    //   } else if (playerStatus == 5) {
    //     color = "#FF6DOO"; // video cued = orange
    //   }
    //   if (color) {
    //     document.getElementById('existing-iframe-example').style.borderColor = color;
    //   }
    // }
    // function onPlayerStateChange(event) {
    //   changeBorderColor(event.data);
    // }
  })
});