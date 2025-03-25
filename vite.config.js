import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";

export default defineConfig(({ mode }) => ({
  base: mode === "development" ? "/" : "/threejs-catapult-game/",
  plugins: [eslint()],
}));
