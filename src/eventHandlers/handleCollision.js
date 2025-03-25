import { getCatapultByName } from "../game/gameLogic";
import { activeObjects, objectsPendingRemoval } from "../systems/objectSystem";

export default function handleCollision(event) {
  const colliderBody = event.target;
  const colliderBodyName = colliderBody.userData.name;
  const otherBody = event.body;
  const otherBodyName = otherBody.userData.name;

  if (!colliderBody.userData || !otherBody.userData) {
    console.warn("User data not found for one of the colliding bodies.");
    return;
  }

  if (colliderBodyName === "enemyStone" && otherBodyName === "userCatapult") {
    objectsPendingRemoval.push(otherBody);
    getCatapultByName(otherBodyName).mesh.userData.sounds.hitSound.play();
  }

  if (
    colliderBodyName === "userStone" &&
    otherBodyName.startsWith("enemyCatapult")
  ) {
    const relatedStand = activeObjects.stands.find(
      ({ body }) => body.userData.name === otherBody.userData.relatedStandName
    );
    objectsPendingRemoval.push(otherBody);
    objectsPendingRemoval.push(relatedStand.body);
    getCatapultByName(otherBodyName).mesh.userData.sounds.hitSound.play();
  }
}
