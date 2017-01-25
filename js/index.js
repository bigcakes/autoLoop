(function ($, window, document, undefined){
  // Load the IFrame Player API code asynchronously.
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player,
    startTime,
    endTime,
    videoId,
    loopingTimeout;

  window.addEventListener('popstate', function(event) {
    if (event.state) {
      loadNewPlayer(event.state);
    } else {
      loadFromCurrentURL();
    }
  });

  function loadFromCurrentURL() {
    var urlVideoId = getParameterByName("videoId", window.location);
    var urlStartTime = getParameterByName("startTime", window.location);
    var urlEndTime = getParameterByName("endTime", window.location);

    if (urlVideoId && urlStartTime && urlEndTime) {
      loadNewPlayer({ startTime: urlStartTime, endTime: urlEndTime, videoId: urlVideoId })
    }
  }

  window.onYouTubeIframeAPIReady = function () {
    loadFromCurrentURL();
    $("#loadVideo").click(function () {
      startTime = +$(".start-time").val();
      endTime = +$(".end-time").val();

      if (startTime > endTime) {
        alert("No!!");
        return;
      }

      var tempVideoId = getParameterByName("v", $(".video-link").val());
      var data = { startTime: startTime, endTime: endTime, videoId: tempVideoId };
      loadNewPlayer(data);
      window.history.pushState(data, "Video - " + tempVideoId, "?videoId=" + tempVideoId + "&startTime=" + startTime + "&endTime=" + endTime);
    });
  }

  function loadNewPlayer(data) {
    $("#loadVideo i").addClass("fa-spinner fa-pulse");
    $("#loadVideo i").removeClass("fa-play");
    startTime = +data.startTime;
    endTime = +data.endTime;
    videoId = data.videoId;

    $(".start-time").val(data.startTime);
    $(".end-time").val(data.endTime);
    $(".video-link").val("https://www.youtube.com/watch?v=" + data.videoId);
    document.title = "AutoLoop - " + data.videoId;

    if (player) {
      player.destroy();
    }

    if (loopingTimeout) {
      clearTimeout(loopingTimeout);
    }
    
    player = new YT.Player('videoPlayer', {
      videoId: data.videoId,
      events: {
        'onReady': onPlayerReady
      },
      //TODO: Do we need this?
      playerVars: {
        controls: 0
      }
    });
  }

  function onPlayerReady(event) {
    event.target.playVideo();
    player.seekTo(startTime);
    loopingTimeout = setTimeout(loop, 1000);
    $("#loadVideo i").removeClass("fa-spinner fa-pulse");
    $("#loadVideo i").addClass("fa-play");
  }

  function loop() {
    var timePassed = player.getCurrentTime();

    //console.log("looping", new Date(), "time", timePassed)

    if (timePassed > endTime) {

      player.seekTo(startTime);
    }

    loopingTimeout = setTimeout(loop, 1000);
  }

  function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
})(jQuery, window, document);
