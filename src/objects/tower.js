import { clone as deepClone } from "three/examples/jsm/utils/SkeletonUtils.js";
import { physicsMaterial } from "../systems/physicsSystem";
import { Body, Box, Vec3 } from "cannon-es";

export default function createTower(towerScene) {
  const body = createTowerBody();
  const mesh = createTowerMesh(towerScene);
  return { body, mesh };
}

function createTowerBody() {
  const halfExt = new Vec3(2.2, 5.5, 3);
  const userTowerShape = new Box(halfExt);
  const userTowerBody = new Body({
    mass: 0,
    material: physicsMaterial,
    shape: userTowerShape,
  });
  userTowerBody.userData = { type: "tower" };
  return userTowerBody;
}

function createTowerMesh(towerScene) {
  const userTowerMesh = deepClone(towerScene);
  userTowerMesh.scale.set(1 / 22, 1 / 16, 1 / 22);
  userTowerMesh.castShadow = true;
  userTowerMesh.receiveShadow = true;
  return userTowerMesh;
}
