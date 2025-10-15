import React, { useRef } from "react";
import VideoJS from "./videojs";

const VideoJSPlayer = () => {
  const playerRef = useRef(null);

  // Video.js configuration with HLS for quality switching
  const videoJsOptions = {
    controls: true,
    responsive: true,
    fluid: true,
    autoplay: false,
    muted: true,
    playbackRates: [0.25, 0.5, 1, 1.5, 2],
    sources: [
      {
        // Using ImageKit's HLS manifest URL
        src: "https://financialtrading.nyc3.digitaloceanspaces.com/testvideos/test/index.m3u8?tr=sr-240_360_480",
        type: "application/x-mpegURL",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // Log when player events occur
    player.on("waiting", () => {
      console.log("Player is waiting");
    });

    player.on("loadedmetadata", () => {
      console.log("Video metadata loaded");
    });

    player.on("dispose", () => {
      console.log("Player will dispose");
    });
  };

  return (
    <div style={{ margin: "20px 0" }}>
      <h2>Video.js Player with Quality Selection</h2>

      <div style={{ maxWidth: "800px" }}>
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
    </div>
  );
};

export default VideoJSPlayer;
