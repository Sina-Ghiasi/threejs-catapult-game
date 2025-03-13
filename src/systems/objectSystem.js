import { gameAssets } from "../game/gameAssets";

export const activeObjects = {
  catapults: [],
  stands: [],
  stones: [],
};
export const objectsPendingRemoval = [];

export function removeObject(body) {
  let index = -1;
  switch (body?.userData?.type || "") {
    case "catapult":
      index = activeObjects.catapults.findIndex((obj) => obj.body === body);
      if (index !== -1) {
        const { mesh, body } = activeObjects.catapults[index];
        gameAssets.scene.remove(mesh);
        gameAssets.world.removeBody(body);
        activeObjects.catapults.splice(index, 1);
        gameAssets.catapultPool.releaseObject(mesh, body);
      }
      break;
    case "stand":
      index = activeObjects.stands.findIndex((obj) => obj.body === body);
      if (index !== -1) {
        const { mesh, body } = activeObjects.stands[index];
        gameAssets.scene.remove(mesh);
        gameAssets.world.removeBody(body);
        activeObjects.stands.splice(index, 1);
        gameAssets.standPool.releaseObject(mesh, body);
      }
      break;
    case "stone":
      index = activeObjects.stones.findIndex((obj) => obj.body === body);
      if (index !== -1) {
        const { mesh, body } = activeObjects.stones[index];
        gameAssets.scene.remove(mesh);
        gameAssets.world.removeBody(body);
        activeObjects.stones.splice(index, 1);
        gameAssets.stonePool.releaseObject(mesh, body);
      }
      break;

    default:
      return;
  }
}

export function removeAllObjects() {
  activeObjects.catapults.forEach(({ mesh, body }) => {
    gameAssets.scene.remove(mesh);
    gameAssets.world.removeBody(body);
    gameAssets.catapultPool.releaseObject(mesh, body);
  });
  activeObjects.catapults = [];

  activeObjects.stands.forEach(({ mesh, body }) => {
    gameAssets.scene.remove(mesh);
    gameAssets.world.removeBody(body);
    gameAssets.standPool.releaseObject(mesh, body);
  });
  activeObjects.stands = [];

  activeObjects.stones.forEach(({ mesh, body }) => {
    gameAssets.scene.remove(mesh);
    gameAssets.world.removeBody(body);
    gameAssets.stonePool.releaseObject(mesh, body);
  });
  activeObjects.stones = [];
}
