import { Engine } from "webgl-engine";

export function useMouse(engine: Engine<unknown>) {
  const [ox, oy] = engine.activeScene.camera.position;
  return [engine.mousex - ox, engine.mousey - engine.canvas.clientHeight - oy];
}
