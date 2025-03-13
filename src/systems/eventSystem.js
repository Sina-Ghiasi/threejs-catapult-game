import handleGameInput from "../eventHandlers/handleGameInput";
import {
  handleKeyboardTrackingDown,
  handleKeyboardTrackingUp,
} from "../eventHandlers/handleKeyboardTracking";
import {
  handleAutoPauseBlur,
  handleAutoPauseFocus,
} from "../eventHandlers/handleAutoPause";
import handleWindowResize from "../eventHandlers/handleWindowResize";

export default function initEventListeners() {
  // Game Input via Keyup (for discrete actions)
  window.addEventListener("keyup", handleGameInput);

  // Native Keyboard Tracking
  window.addEventListener("keydown", handleKeyboardTrackingDown);
  window.addEventListener("keyup", handleKeyboardTrackingUp);

  // Auto pause/unpause
  window.addEventListener("blur", handleAutoPauseBlur);
  window.addEventListener("focus", handleAutoPauseFocus);

  window.addEventListener("resize", handleWindowResize, false);
}
