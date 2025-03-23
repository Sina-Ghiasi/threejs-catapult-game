import { Mesh, Vector3 } from "three";
import {
  ENEMY_X_POSITIONS,
  USER_CATAPULT_POSITION,
  USER_TOWER_POSITION,
} from "../config/constants.js";
import { activeObjects, removeAllObjects } from "../systems/objectSystem";
import gameStore from "./gameStore";
import { gameAssets } from "./gameAssets";
import { createAudio } from "../systems/audioSystem";
import {
  gameResultElement,
  menuScreenElement,
  powerElement,
} from "../domElements";
import createModal from "../utils/createModal.js";

let attackInterval, stoneLimitInterval;

export async function initializeNewGame() {
  const { isLoading } = gameStore.getState();
  if (isLoading) return;

  const level = await getLevelFromUser();
  if (level === null) return;

  resetGame();

  gameStore.dispatch({ type: "SET_LEVEL", payload: level });
  positionUserTower();
  positionUserCatapult();
  positionEnemies();

  attackInterval = setInterval(enemyAttack, 3000);
  stoneLimitInterval = setInterval(() => enforceStoneLimit(10), 2000);

  const backgroundAudio = createAudio("background", true, 0.05);
  if (backgroundAudio && !backgroundAudio.isPlaying) backgroundAudio.play();

  powerElement.classList.remove("hidden");
  gameResultElement.classList.add("hidden");
  menuScreenElement.classList.add("hidden");
  gameStore.dispatch({ type: "PLAYING" });
}

function gameLost() {
  powerElement.classList.add("hidden");

  gameResultElement.innerHTML = "Game Lost";
  gameResultElement.classList.remove("hidden");
  gameResultElement.classList.remove("won");
  gameResultElement.classList.add("lost");

  gameStore.dispatch({ type: "GAME_LOST" });
}

function gameWon() {
  powerElement.classList.add("hidden");

  gameResultElement.innerHTML = "Victory";
  gameResultElement.classList.remove("hidden");
  gameResultElement.classList.remove("lost");
  gameResultElement.classList.add("won");

  gameStore.dispatch({ type: "GAME_WON" });
}

function resetGame() {
  // cleare intervals
  if (attackInterval) clearInterval(attackInterval);
  if (stoneLimitInterval) clearInterval(stoneLimitInterval);

  // reset game objects
  removeAllObjects();

  // reset game state and values
  gameStore.dispatch({ type: "RESET_GAME" });
}

function getNewPosition(index) {
  const position = new Vector3();
  const x = ENEMY_X_POSITIONS[index];
  const y = Math.floor(Math.random() * 15) + 5;
  position.set(x, y, 0);
  return position;
}

function positionUserTower() {
  const userTowerBody = gameAssets.userTower.body;
  const userTowerMesh = gameAssets.userTower.mesh;
  userTowerBody.position.set(
    USER_TOWER_POSITION.x - 0.2,
    USER_TOWER_POSITION.y + 5,
    USER_TOWER_POSITION.z
  );
  userTowerBody.userData.name = "playerTower";
  userTowerMesh.position.set(
    USER_TOWER_POSITION.x,
    USER_TOWER_POSITION.y,
    USER_TOWER_POSITION.z
  );
  gameAssets.world.addBody(userTowerBody);
  gameAssets.scene.add(userTowerMesh);
}

function positionUserCatapult() {
  const { body: userCatapultBody, mesh: userCatapultMesh } =
    gameAssets.catapultPool.getObject();

  userCatapultBody.userData.name = "playerCatapult";
  userCatapultBody.position.set(
    USER_CATAPULT_POSITION.x,
    USER_CATAPULT_POSITION.y,
    USER_CATAPULT_POSITION.z
  );

  userCatapultMesh.traverse((child) => {
    if (child instanceof Mesh) {
      child.geometry.center();
      child.rotation.y = Math.PI;
    }
  });

  gameAssets.world.addBody(userCatapultBody);
  gameAssets.scene.add(userCatapultMesh);
  activeObjects.catapults.push({
    body: userCatapultBody,
    mesh: userCatapultMesh,
  });
}

function positionEnemies() {
  const level = gameStore.getState().level;
  for (let i = 1; i < level + 1; i++) {
    const position = getNewPosition(i);

    const { body: standBody, mesh: standMesh } =
      gameAssets.standPool.getObject();
    standBody.position.set(position.x, position.y - 1.1, position.z);
    standBody.userData.name = `enemyStand_${i}`;

    gameAssets.world.addBody(standBody);
    gameAssets.scene.add(standMesh);
    activeObjects.stands.push({ body: standBody, mesh: standMesh });

    const { body: catapultBody, mesh: catapultMesh } =
      gameAssets.catapultPool.getObject();
    catapultBody.position.set(position.x, position.y, position.z);
    catapultBody.userData.name = `enemyCatapult_${i}`;
    catapultBody.userData.relatedStandName = `enemyStand_${i}`;

    gameAssets.world.addBody(catapultBody);
    gameAssets.scene.add(catapultMesh);
    activeObjects.catapults.push({ body: catapultBody, mesh: catapultMesh });
  }
}

export function enemyAttack() {
  if (gameStore.getState().isPaused) return;
  const enemyCatapults = getEnemyCatapults();

  for (const enemyCatapult of enemyCatapults) {
    throwStone(
      enemyCatapult.body.position,
      new Vector3(-1, 1, 0),
      Math.random() * 12.5 + 8,
      "enemyStone"
    );
  }
}

function enforceStoneLimit(limit) {
  if (gameStore.getState().isPaused) return;

  if (activeObjects.stones.length > limit) {
    const numToRelease = activeObjects.stones.length - limit;

    for (let i = 0; i < numToRelease; i++) {
      const stoneObj = activeObjects.stones.shift();
      gameAssets.scene.remove(stoneObj.mesh);
      gameAssets.world.removeBody(stoneObj.body);
      gameAssets.stonePool.releaseObject(stoneObj.mesh, stoneObj.body);
    }
  }
}

export function checkGameEnd() {
  if (!gameStore.getState().isPlaying) return;

  const enemyCatapults = getEnemyCatapults();
  const playerCatapult = getPlayerCatapult();
  if (enemyCatapults.length === 0) {
    gameWon();
  } else if (!playerCatapult) {
    gameLost();
  }
}

export function throwStone(position, shootDirection, shootVelocity, name) {
  let { x, y, z } = position;

  const { body: stoneBody, mesh: stoneMesh } = gameAssets.stonePool.getObject();
  stoneBody.userData.name = name;
  gameAssets.world.addBody(stoneBody);
  gameAssets.scene.add(stoneMesh);
  activeObjects.stones.push({ body: stoneBody, mesh: stoneMesh });
  stoneBody.velocity.set(
    shootDirection.x * shootVelocity,
    shootDirection.y * shootVelocity,
    shootDirection.z * shootVelocity
  );
  // Offset the stone's starting position
  x += shootDirection.x / 3;
  y += shootDirection.y * 3;
  z += shootDirection.z * 2;
  stoneBody.position.set(x, y, z);

  gameStore.dispatch({
    type: "SET_USER_SHOOT_VELOCITY",
    payload: 4,
  });
}

function getEnemyCatapults() {
  return activeObjects.catapults.filter((object) =>
    object.body.userData.name.startsWith("enemyCatapult")
  );
}
function getPlayerCatapult() {
  return activeObjects.catapults.find(
    (object) => object.body.userData.name === "playerCatapult"
  );
}

function getLevelFromUser() {
  return new Promise((resolve) => {
    createModal({
      title: "Level Selection",
      input: true,
      inputSettings: {
        label: "Please type the level number (1-4):",
        type: "number",
        value: 1,
        min: 1,
        max: 4,
        step: 1,
        required: true,
      },
      onConfirm: (level) => resolve(parseInt(level)),
      onCancel: () => resolve(null),
      confirmText: "Start",
      cancelText: "Cancel",
    });
  });
}
