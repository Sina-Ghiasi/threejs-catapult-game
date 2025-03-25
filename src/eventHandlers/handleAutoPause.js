import { gameAssets } from "../game/gameAssets";
import gameStore from "../game/gameStore";

export function handleAutoPauseBlur() {
  const { isAutoPaused, isPlaying } = gameStore.getState();

  if (isPlaying) gameAssets.audioObjects["background"]?.pause();
  if (!isAutoPaused) {
    gameStore.dispatch({ type: "AUTO_PAUSE" });
  }
}

export function handleAutoPauseFocus() {
  const { isAutoPaused, isPlaying } = gameStore.getState();

  if (isPlaying) gameAssets.audioObjects["background"]?.play();
  if (isAutoPaused) {
    gameStore.dispatch({ type: "AUTO_UNPAUSE" });
  }
}
