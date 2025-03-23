import {
  menuBackdropElement,
  menuScreenElement,
  resumeBtnElement,
  startBtnElement,
} from "../domElements";
import gameStore from "../game/gameStore";

export default function handleMenuToggle() {
  const { isLoading, isPlaying, isAutoPaused, isPaused } = gameStore.getState();

  if (isLoading && isAutoPaused) return;

  gameStore.dispatch({ type: "TOGGLE_PAUSE" });
  if (isPaused) {
    menuScreenElement.classList.add("hidden");
  } else {
    menuScreenElement.classList.remove("hidden");
    if (isPlaying) {
      startBtnElement.innerHTML = "Restart";
      menuBackdropElement.classList.add("hidden");
      resumeBtnElement.classList.remove("hidden");
    } else {
      startBtnElement.innerHTML = "Start";
      menuBackdropElement.classList.remove("hidden");
      resumeBtnElement.classList.add("hidden");
    }
  }
}
