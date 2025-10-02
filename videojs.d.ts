// videojs.d.ts
import videojs from "video.js";

declare module "video.js" {
  interface VideoJsPlayer {
    hlsQualitySelector: (options?: any) => void;
  }
}

declare module "videojs-contrib-quality-levels";
declare module "videojs-hls-quality-selector";
