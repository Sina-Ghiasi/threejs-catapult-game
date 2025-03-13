import initGameAssets from "./game/gameAssets.js";
import initAudio from "./systems/audioSystem.js";
import initPhysics from "./systems/physicsSystem.js";
import initRenderer from "./systems/renderSystem.js";
import initEventListeners from "./systems/eventSystem.js";
import gameUpdateLoop from "./game/gameUpdateLoop.js";

window.addEventListener("load", async () => {
  await initGameAssets();
  initEventListeners();

  initAudio();
  initPhysics();
  initRenderer();
  gameUpdateLoop();

  // Debug Tools
  if (import.meta.env.DEV) {
    import("./utils/debugTools.js");
  }
});
