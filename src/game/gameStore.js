import createStore from "../utils/createStore";
import { gameAssets } from "../game/gameAssets";

const gameInitialState = {
  isLoading: true,
  isPlaying: false,
  result: null,
  isPaused: false,
  isAutoPaused: false,
  level: 1,
  activeCamera: null,
  remainingCameraSwitch: 2,
  userShootVelocity: 4,
};

function gameReducer(state, action) {
  const { camera1, camera2 } = gameAssets.cameras;
  switch (action.type) {
    case "PLAYING":
      return { ...state, isPlaying: true };
    case "LOADED":
      return { ...state, isLoading: false };
    case "GAME_WON":
      return { ...state, isPlaying: false, result: "won" };
    case "GAME_LOST":
      return { ...state, isPlaying: false, result: "lost" };
    case "RESET_GAME":
      return {
        ...state,
        isPlaying: false,
        isPaused: false,
        isAutoPaused: false,
        result: null,
        activeCamera: camera1,
        userShootVelocity: 4,
        remainingCameraSwitch: 2,
      };
    case "AUTO_PAUSE":
      return { ...state, isPaused: true, isAutoPaused: true };
    case "AUTO_UNPAUSE":
      return { ...state, isPaused: false, isAutoPaused: false };
    case "TOGGLE_PAUSE":
      return { ...state, isPaused: !state.isPaused };
    case "SET_LEVEL":
      return { ...state, level: action.payload };
    case "SET_USER_SHOOT_VELOCITY":
      return {
        ...state,
        userShootVelocity: action.payload,
      };
    case "SWITCH_CAMERA":
      return {
        ...state,
        activeCamera: state.activeCamera === camera1 ? camera2 : camera1,
        remainingCameraSwitch: state.remainingCameraSwitch - 1,
      };
    case "SET_ACTIVE_CAMERA":
      return {
        ...state,
        activeCamera: action.payload,
      };
    default:
      return state;
  }
}

export default createStore(gameReducer, gameInitialState);
