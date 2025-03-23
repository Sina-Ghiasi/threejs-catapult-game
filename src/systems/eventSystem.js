import handleGameInput from "../eventHandlers/handleGameInput";
import {
  handleKeyboardDownTracking,
  handleKeyboardUpTracking,
} from "../eventHandlers/handleKeyboardTracking";
import {
  handleAutoPauseBlur,
  handleAutoPauseFocus,
} from "../eventHandlers/handleAutoPause";
import handleWindowResize from "../eventHandlers/handleWindowResize";
import {
  instructionBtnElement,
  menuBtnElement,
  resumeBtnElement,
  shootBtnElement,
  startBtnElement,
  switchCameraBtnElement,
} from "../domElements";
import handleStartBtn from "../eventHandlers/handleStartBtn";
import handleResumeBtn from "../eventHandlers/handleResumeBtn";
import handleMenuToggle from "../eventHandlers/handleMenuToggle";
import handleShoot from "../eventHandlers/handleShoot";
import handleSwitchCamera from "../eventHandlers/handleSwitchCamera";
import {
  handleButtonDownTracking,
  handleButtonUpTracking,
} from "../eventHandlers/handleBtnTracking";
import handleInstructionBtn from "../eventHandlers/handleInstructionBtn";

export default function initEventListeners() {
  // Game keyboard Input via Keyup (for discrete actions)
  window.addEventListener("keyup", handleGameInput);

  // Native Keyboard Tracking
  window.addEventListener("keydown", handleKeyboardDownTracking);
  window.addEventListener("keyup", handleKeyboardUpTracking);

  // Auto pause/unpause
  window.addEventListener("blur", handleAutoPauseBlur);
  window.addEventListener("focus", handleAutoPauseFocus);

  window.addEventListener("resize", handleWindowResize, false);

  // Menu buttons
  startBtnElement.addEventListener("click", handleStartBtn);
  resumeBtnElement.addEventListener("click", handleResumeBtn);
  instructionBtnElement.addEventListener("click", handleInstructionBtn);

  // Game buttons
  menuBtnElement.addEventListener("click", handleMenuToggle);
  switchCameraBtnElement.addEventListener("click", handleSwitchCamera);
  shootBtnElement.addEventListener("click", handleShoot);

  // Track shoot button
  shootBtnElement.addEventListener("mousedown", handleButtonDownTracking);
  shootBtnElement.addEventListener("mouseup", handleButtonUpTracking);
  shootBtnElement.addEventListener("touchstart", handleButtonDownTracking);
  shootBtnElement.addEventListener("touchend", handleButtonUpTracking);
}
