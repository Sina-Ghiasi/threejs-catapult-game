import { Vector3 } from "three";
import { USER_CATAPULT_POSITION } from "../config/constants.js";
import { initializeNewGame, throwStone } from "../game/gameLogic";
import gameStore from "../game/gameStore";
import { activeObjects, objectsPendingRemoval } from "../systems/objectSystem";
import promptHardshipLevel from "../utils/promptHardshipLevel";

export default function handleGameInput(e) {
  const {
    isLoading,
    isPlaying,
    isAutoPaused,
    remainingCameraToggle,
    userShootVelocity,
  } = gameStore.getState();

  switch (e.code) {
    // 'Space' key: start the game if not loading
    case "Space":
      if (!isLoading) {
        const level = promptHardshipLevel();
        gameStore.dispatch({ type: "SET_LEVEL", payload: level });
        initializeNewGame();
      }
      break;

    // 'A' key: shoot stone from user's catapult
    case "KeyA":
      if (isPlaying) {
        throwStone(
          USER_CATAPULT_POSITION,
          new Vector3(1, 1, 0),
          userShootVelocity,
          "userStone"
        );
      }
      break;

    // 'C' key: change active camera (if available)
    case "KeyC":
      if (remainingCameraToggle > 0) {
        gameStore.dispatch({
          type: "TOGGLE_CAMERA",
        });
      }
      break;

    // 'P' key: pause the game if not loading
    case "KeyP":
      if (isPlaying && !isAutoPaused) {
        gameStore.dispatch({ type: "TOGGLE_PAUSE" });
      }
      break;

    // 'L' key: debugging
    case "KeyL":
      console.log({
        gameState: gameStore.getState(),
        activeObjects,
        objectsPendingRemoval,
      });
      break;
    default:
      break;
  }
}
