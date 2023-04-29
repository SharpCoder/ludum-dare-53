import { DefaultShader, Scene } from "webgl-engine";

export const InitialScene = new Scene<unknown>({
  title: "initial",
  shaders: [DefaultShader],
  init: (engine) => {
    const { camera } = InitialScene;
    engine.settings.fogColor = [0, 0, 0, 1];
  },
  update: (time, engine) => {},
  status: "ready",
});
