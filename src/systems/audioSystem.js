import { Audio, AudioListener, PositionalAudio } from "three";
import { gameAssets } from "../game/gameAssets";

export default function initAudio() {
  const listener = new AudioListener();
  gameAssets.cameras.camera1.add(listener);
  gameAssets.audioListener = listener;
}

export function createAudio(name, loop = false, volume = 1) {
  if (gameAssets.audioObjects?.[name]) return gameAssets.audioObjects[name];
  if (!gameAssets.audioBuffers[name]) {
    console.warn(`Audio ${name} not found!`);
    return;
  }

  const listener = gameAssets.audioListener;
  if (!listener) {
    console.warn("No AudioListener found in gameAssets!");
    return;
  }

  const audio = new Audio(listener);
  audio.setBuffer(gameAssets.audioBuffers[name]);
  audio.setLoop(loop);
  audio.setVolume(volume);
  gameAssets.audioObjects[name] = audio;

  return audio;
}

export function createPositionalAudio(name, object, volume = 1, distance = 10) {
  if (gameAssets.audioObjects?.[name]) return gameAssets.audioObjects[name];
  if (!gameAssets.audioBuffers[name]) {
    console.warn(`Positional audio ${name} not found!`);
    return;
  }

  const listener = gameAssets.audioListener;
  if (!listener) {
    console.warn("No AudioListener found in gameAssets!");
    return;
  }

  const positionalAudio = new PositionalAudio(listener);
  positionalAudio.setBuffer(gameAssets.audioBuffers[name]);
  positionalAudio.setVolume(volume);
  positionalAudio.setRefDistance(distance);

  object.add(positionalAudio);
  gameAssets.audioObjects[name] = positionalAudio;

  return positionalAudio;
}
