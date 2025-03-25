import { Audio, PositionalAudio } from "three";
import { gameAssets } from "../game/gameAssets";

export function createAudio(bufferName, loop = false, volume = 1) {
  if (!gameAssets.audioBuffers[bufferName]) {
    console.warn(`Audio buffer ${bufferName} not found!`);
    return;
  }

  const listener = gameAssets.audioListener;
  if (!listener) {
    console.warn("No AudioListener found in gameAssets!");
    return;
  }

  const audio = new Audio(listener);
  audio.setBuffer(gameAssets.audioBuffers[bufferName]);
  audio.setLoop(loop);
  audio.setVolume(volume);

  return audio;
}

export function createPositionalAudio(
  bufferName,
  volume = 1,
  loop = false,
  distance = 10
) {
  if (!gameAssets.audioBuffers[bufferName]) {
    console.warn(`Positional audio buffer ${bufferName} not found!`);
    return;
  }

  const listener = gameAssets.audioListener;
  if (!listener) {
    console.warn("No AudioListener found in gameAssets!");
    return;
  }

  const positionalAudio = new PositionalAudio(listener);
  positionalAudio.setBuffer(gameAssets.audioBuffers[bufferName]);
  positionalAudio.setLoop(loop);
  positionalAudio.setVolume(volume);
  positionalAudio.setRefDistance(distance);

  return positionalAudio;
}
