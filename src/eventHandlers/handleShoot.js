import { Vector3 } from "three";
import { USER_CATAPULT_POSITION } from "../config/constants";
import gameStore from "../game/gameStore";
import { throwStone } from "../game/gameLogic";

export default function handleShoot() {
  const { isPlaying, userShootVelocity } = gameStore.getState();
  if (isPlaying) {
    throwStone(
      USER_CATAPULT_POSITION,
      new Vector3(1, 1, 0),
      userShootVelocity,
      "userStone"
    );
  }
}
