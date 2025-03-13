import { pausedElement, powerElement } from "../domElements";
import { keys } from "../eventHandlers/handleKeyboardTracking";
import { gameAssets } from "./gameAssets";
import gameStore from "./gameStore";
import {
  activeObjects,
  objectsPendingRemoval,
  removeObject,
} from "../systems/objectSystem.js";
import { TIME_STEP } from "../config/constants.js";
import { checkGameEnd } from "./gameLogic.js";

export default function gameUpdateLoop() {
  const { isPaused, userShootVelocity, activeCamera } = gameStore.getState();

  if (isPaused) pausedElement.classList.add("show");
  else pausedElement.classList.remove("show");

  if (!isPaused) {
    // Use our native key state: if A is held down, gradually increase shoot velocity
    if (keys["KeyA"] && userShootVelocity < 40) {
      gameStore.dispatch({
        type: "SET_USER_SHOOT_VELOCITY",
        payload: userShootVelocity + 0.5,
      });
      powerElement.children[0].innerHTML = userShootVelocity;
    }
    if (gameAssets.stats !== null) gameAssets.stats.update();
    updatePhysics();
    checkGameEnd();
    gameAssets.renderer.render(gameAssets.scene, activeCamera);
  }

  requestAnimationFrame(gameUpdateLoop);
}

function updatePhysics() {
  gameAssets.world.step(TIME_STEP);

  while (objectsPendingRemoval.length) {
    removeObject(objectsPendingRemoval.pop());
  }

  activeObjects.catapults.forEach(({ mesh, body }) => {
    mesh.position.copy(body.position);
    mesh.quaternion.copy(body.quaternion);
  });
  activeObjects.stands.forEach(({ mesh, body }) => {
    mesh.position.copy(body.position);
    mesh.quaternion.copy(body.quaternion);
  });
  activeObjects.stones.forEach(({ mesh, body }) => {
    mesh.position.copy(body.position);
    mesh.quaternion.copy(body.quaternion);
  });
}
