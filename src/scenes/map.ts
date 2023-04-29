import { Scene } from "webgl-engine";
import { drawFactory } from "../objects/factory";
import { createSpawner } from "../objects/spawner";
import { Retro2DShader } from "../shaders/retro2d";
import { StarboxShader } from "../shaders/starbox";

// const obj = drawBox(0, 0, 100, 100);
const factory = drawFactory();

export const MapScene = new Scene<unknown>({
  title: "map",
  shaders: [Retro2DShader, StarboxShader],
  once: (engine) => {
    const spawner = createSpawner(engine);

    MapScene.addObject(factory);
    MapScene.addObject(spawner);

    // initClickDrag(engine);

    // MapScene.addObject(lineTo(100, 100, 200, 200));
  },
  init: (engine) => {
    const { camera } = MapScene;
    const { canvas } = engine;
    MapScene.camera.position = [
      canvas.clientWidth / 2,
      -canvas.clientHeight / 2,
      0,
    ];

    engine.settings.fogColor = [0, 0, 0, 1];
  },
  update: (time, engine) => {
    // useClickDrag(engine);
    // obj.rotation[0] += rads(1);
  },
  status: "ready",
});
