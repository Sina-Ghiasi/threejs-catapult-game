import { initializeNewGame } from "../game/gameLogic";
import gameStore from "../game/gameStore";
import { activeObjects, objectsPendingRemoval } from "../systems/objectSystem";
import handleMenuToggle from "./handleMenuToggle.js";
import handleSwitchCamera from "./handleSwitchCamera.js";
import handleShoot from "./handleShoot.js";

export default function handleGameInput(e) {
  switch (e.code) {
    // 'Space' key: start the game if not loading
    case "Space":
      initializeNewGame();

      break;

    // 'A' key: shoot stone from user's catapult
    case "KeyA":
      handleShoot();
      break;

    // 'C' key: switch active camera (if available)
    case "KeyC":
      handleSwitchCamera();
      break;

    // 'P' key: pause the game if not loading
    case "KeyP":
      handleMenuToggle();
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
