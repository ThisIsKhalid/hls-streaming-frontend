import { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

type Player = ReturnType<typeof videojs>;

interface VideoPlayerOptions {
  controls?: boolean;
  responsive?: boolean;
  fluid?: boolean;
  autoplay?: boolean;
  sources?: Array<{
    src: string;
    type: string;
  }>;
}

interface VideoPlayerProps {
  options: VideoPlayerOptions;
  onReady?: (player: Player) => void;
}

export const VideoPlayer = (props: VideoPlayerProps) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const { options, onReady } = props;

  useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      if (videoRef.current) {
        videoRef.current.appendChild(videoElement);
      }

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        if (onReady) {
          onReady(player);
        }
      }));

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      if (typeof player.autoplay === "function") {
        player.autoplay(options.autoplay);
      }
      if (typeof player.src === "function") {
        player.src(options.sources);
      }
    }
  }, [options, onReady]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (
        player &&
        typeof player.isDisposed === "function" &&
        !player.isDisposed()
      ) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div data-vjs-player style={{ width: "600px" }}>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoPlayer;
