import { loadingScreenElement } from "../domElements";
import gameStore from "../game/gameStore";
import { createCatapultBody, createCatapultMesh } from "../objects/catapult";
import { createStandBody, createStandMesh } from "../objects/stand";
import { createStoneBody, createStoneMesh } from "../objects/stone";
import createPool from "../utils/createPool";
import { loadGltfModels } from "../utils/loadGltfModel";
import createCameras from "../envirement/cameras";
import createLights from "../envirement/lights";
import createSkyBox from "../envirement/skyBox";
import { World } from "cannon-es";
import { LoadingManager, Scene, WebGLRenderer } from "three";
import { createGround } from "../envirement/ground";
import createTower from "../objects/tower";
import { loadTextures } from "../utils/loadTexture";
import { loadAudios } from "../utils/loadAudio";
import createStats from "../utils/createStats";
import { BASE_URL, IS_DEV_MODE } from "../config/env";

export const gameAssets = {
  world: null,
  scene: null,
  renderer: null,
  stats: null,
  cameras: null,
  lights: null,
  ground: null,
  skyBox: null,
  audioBuffers: null,
  audioObjects: {},
  audioListener: null,
  userTower: null,
  catapultPool: null,
  stonePool: null,
  standPool: null,
  textures: null,
};

export default async function initGameAssets() {
  try {
    const { models, textures, audioBuffers } = await loadGameAssets();
    initEnvironment(textures);
    initGameEntities(models, textures);
    gameAssets.audioBuffers = audioBuffers;

    gameStore.dispatch({
      type: "SET_ACTIVE_CAMERA",
      payload: gameAssets.cameras.camera1,
    });
    gameStore.dispatch({ type: "LOADED" });
    loadingScreenElement.classList.add("hidden");
  } catch (error) {
    console.error("Error loading initial game assets:", error);
    alert("Error loading game assets");
  }
}

async function loadGameAssets() {
  const manager = new LoadingManager();
  const models = await loadGltfModels(
    {
      catapult: `${BASE_URL}models/catapult/scene.gltf`,
      tower: `${BASE_URL}models/tower/scene.gltf`,
    },
    manager
  );
  const textures = await loadTextures(
    {
      grassGround: `${BASE_URL}textures/grass-ground.jpg`,
      stoneWall: `${BASE_URL}textures/stone-wall.jpg`,
      stone: `${BASE_URL}textures/stone.jpg`,
    },
    manager
  );

  const audioBuffers = await loadAudios(
    {
      background: `${BASE_URL}sounds/background.ogg`,
    },
    manager
  );

  return {
    models,
    textures,
    audioBuffers,
  };
}

function initEnvironment(textures) {
  gameAssets.world = new World();
  gameAssets.scene = new Scene();
  gameAssets.renderer = new WebGLRenderer({ antialias: true });
  if (IS_DEV_MODE) gameAssets.stats = createStats();

  gameAssets.cameras = createCameras();
  gameAssets.lights = createLights();
  gameAssets.skyBox = createSkyBox();
  gameAssets.ground = createGround(textures.grassGround);

  Object.values(gameAssets.cameras).forEach((camera) => {
    gameAssets.scene.add(camera);
  });
  Object.values(gameAssets.lights).forEach((light) => {
    gameAssets.scene.add(light);
  });

  gameAssets.scene.background = gameAssets.skyBox;
  gameAssets.scene.add(gameAssets.ground.mesh);
  gameAssets.world.addBody(gameAssets.ground.body);
}

function initGameEntities(models, textures) {
  gameAssets.catapultPool = createPool(
    () => createCatapultMesh(models.catapult.scene),
    createCatapultBody,
    5
  );
  gameAssets.stonePool = createPool(
    () => createStoneMesh(textures.stone),
    createStoneBody,
    20
  );
  gameAssets.standPool = createPool(
    () => createStandMesh(textures.stoneWall),
    createStandBody,
    4
  );

  gameAssets.userTower = createTower(models.tower.scene);
}
