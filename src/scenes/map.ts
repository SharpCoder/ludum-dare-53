import { rads, Scene } from "webgl-engine";
import { drawArc, drawBox, lineTo } from "../drawing";
import { initClickDrag, useClickDrag } from "../hooks/useClickDrag";
import { drawFactory } from "../objects/factory";
import { Retro2DShader } from "../shaders/retro2d";

// const obj = drawBox(0, 0, 100, 100);
const factory = drawFactory();

export const MapScene = new Scene<unknown>({
  title: "map",
  shaders: [Retro2DShader],
  once: (engine) => {
    MapScene.camera.position = [50, -200, 0];

    MapScene.addObject(factory);
    initClickDrag(engine);

    // MapScene.addObject(lineTo(100, 100, 200, 200));
  },
  init: (engine) => {
    const { camera } = MapScene;
    engine.settings.fogColor = [0, 0, 0, 1];
  },
  update: (time, engine) => {
    useClickDrag(engine);
    // obj.rotation[0] += rads(1);
  },
  status: "ready",
});
