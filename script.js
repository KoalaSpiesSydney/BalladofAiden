<script>
  document.addEventListener("DOMContentLoaded", function() {
    const audioPlayer = document.getElementById("audio-player");
    const audioSource = document.getElementById("audio-source");
    const nowPlayingTitle = document.getElementById("now-playing-title");

    document.querySelectorAll(".track").forEach(track => {
      const playButton = track.querySelector(".play-button");

      playButton.addEventListener("click", function() {
        const audioSrc = track.getAttribute("data-src");
        const title = track.getAttribute("data-title");

        if (audioSrc) {
          audioSource.src = audioSrc;
          audioPlayer.load();
          audioPlayer.currentTime = 0;
          audioPlayer.play().then(() => {
            nowPlayingTitle.textContent = `Now Playing: ${title}`;
          }).catch(err => {
            console.error("Audio playback failed:", err);
          });
        } else {
          console.error("Audio file not found:", audioSrc);
        }
      });
    });

    // Auto-play next track when current ends
    audioPlayer.addEventListener("ended", function() {
      const tracks = Array.from(document.querySelectorAll(".track"));
      const currentTrackIndex = tracks.findIndex(track =>
        track.getAttribute("data-src") === audioSource.src.split('/').pop()
      );

      if (currentTrackIndex !== -1 && currentTrackIndex + 1 < tracks.length) {
        const nextTrack = tracks[currentTrackIndex + 1];
        const nextSrc = nextTrack.getAttribute("data-src");
        const nextTitle = nextTrack.getAttribute("data-title");

        audioSource.src = nextSrc;
        audioPlayer.load();
        audioPlayer.play().then(() => {
          nowPlayingTitle.textContent = `Now Playing: ${nextTitle}`;
        }).catch(err => {
          console.error("Audio playback failed:", err);
        });
      }
    });
  });
</script>
