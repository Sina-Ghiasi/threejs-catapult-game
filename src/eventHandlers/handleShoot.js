import { Vector3 } from "three";
import gameStore from "../game/gameStore";
import { getCatapultByName, throwStone } from "../game/gameLogic";

export default function handleShoot() {
  const { isPlaying, userShootVelocity } = gameStore.getState();
  if (isPlaying) {
    const { mesh, body } = getCatapultByName("userCatapult");
    throwStone(
      body.position,
      new Vector3(1, 1, 0),
      userShootVelocity,
      "userStone"
    );

    const shootSound = mesh.userData.sounds.shootSound;
    if (shootSound && shootSound.isPlaying) shootSound.stop();
    shootSound?.play();

    gameStore.dispatch({
      type: "SET_USER_SHOOT_VELOCITY",
      payload: 4,
    });
  }
}
