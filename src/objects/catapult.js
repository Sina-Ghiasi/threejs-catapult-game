import { Body, Box, Vec3 } from "cannon-es";

export function createCatapultBody() {
  const halfExt = new Vec3(0.2, 0.8, 0.8);
  const catapultShape = new Box(halfExt);
  const catapultBody = new Body({ mass: 0, shape: catapultShape });
  catapultBody.collisionResponse = true;
  catapultBody.userData = { type: "catapult" };
  return catapultBody;
}
export function createCatapultMesh(catapultScene) {
  const catapultMesh = catapultScene.clone();
  catapultMesh.scale.set(1 / 3, 1 / 3, 1 / 3);
  return catapultMesh;
}
